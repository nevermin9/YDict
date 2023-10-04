import type { IdbClientConfig } from "$lib/types"
import IdbClient from "./IdbClient.js"
import { QueueController } from "../helpers"

let _client: IdbClient | null = null
const setClient = (client: IdbClient) => {
    if (!_client)
        _client = client
    return _client
}
const getClient = () => {
    return _client
}

export default class IdbManager {
    static queue = new QueueController()

    static async init(name: string, version: number, config: IdbClientConfig) {
        if (getClient()) {
            return
        }
        let _c: IdbClient = new IdbClient(name, version)
        _c = await _c.createClient(config)
        setClient(_c)
        console.info("[IDB_MANAGER] Created IndexedDB client")
    }

    static async #getDB(): Promise<IdbClient> {
        const check = (resolve: (v: IdbClient) => void): number | void => {
            const db = getClient()?.db

            if (!db) {
                return requestAnimationFrame(check.bind(null, resolve))
            }

            return resolve(getClient() as IdbClient)
        }

        if (!getClient()?.db) {
            const _client = (await this.queue.process(
                "get-db-client",
                () => new Promise((resolve) => check(resolve))
            )) as Promise<IdbClient>

            return _client
        }

        return getClient() as IdbClient
    }

    static async getAll(
        storeName: string,
        options?: { count?: number; query?: string | IDBKeyRange }
    ) {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readonly").then((store) => {
                    const request = store.getAll(options?.query, options?.count)
                    request.onsuccess = (e) => {
                        resolve((e.target as IDBRequest).result)
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async get<T>(storeName: string, key: string): Promise<T> {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readonly").then((store) => {
                    const request = store.get(key)
                    request.onsuccess = (e) => {
                        resolve((e.target as IDBRequest).result as T)
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async insert<T>(storeName: string, data: T): Promise<string> {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readwrite").then((store) => {
                    const request = store.put(data)
                    request.onsuccess = (e) => {
                        resolve((e.target as IDBRequest).result as string)
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async getIndexAll<T>(storeName: string, indexName: string, options: {key: IDBKeyRange | string, count?: number}): Promise<T> {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readonly").then((store) => {
                    const request = store.index(indexName).getAll(options.key, options?.count)
                    request.onsuccess = (e) => {
                        resolve((e.target as IDBRequest).result as T)
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async delete(storeName: string, key: string | IDBKeyRange): Promise<boolean> {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readwrite").then((store) => {
                    const request = store.delete(key)
                    request.onsuccess = () => {
                        resolve(true)
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    static async getIndexWithCursor<T>(
        storeName: string,
        indexName: string,
        options: { key?: string | IDBKeyRange; dir?: IDBCursorDirection, count?: number, advance?: number}
    ): Promise<T[]> {
        try {
            const db = await this.#getDB()
            return new Promise((resolve, reject) => {
                return db.startTransaction(storeName, "readonly").then((store) => {
                    const request = store.index(indexName).openCursor(options.key, options?.dir)
                    const list: T[] = []
                    let jumped = false
                    let count = 0

                    request.onsuccess = (e) => {
                        const cursor = (e.target as IDBRequest).result as IDBCursorWithValue

                        if (!cursor || (options?.count && count >= options.count)) {
                            return resolve(list as T[])
                        }

                        if (!jumped && options?.advance) {
                            jumped = true
                            cursor.advance(options.advance)
                        } else {
                            list.push(cursor.value)

                            count += 1
                            cursor.continue()
                        }
                    }
                    request.onerror = (e_1) => {
                        reject(e_1)
                    }
                })
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

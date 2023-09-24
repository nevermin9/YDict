import type { ObjectStoreConfigs } from "$lib/types"
import IdbClient from "./IdbClient.js"
import { QueueController } from "../helpers"

let _client: IdbClient | null = null
const setClient = (client: IdbClient) => {
    _client = client
    return _client
}
const getClient = () => {
    return _client
}

export default class IdbManager {
    static queue = new QueueController()

    static async init(name: string, version: number, configs: ObjectStoreConfigs) {
        let _c: IdbClient = new IdbClient(name, version)
        _c = await _c.createClient(configs)
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

    // static async insert<T>(storeName: string, data: T): Promise<T> {
    //     try {
    //         const db = await this.#getDB()

    //         return new Promise((resolve, reject) => {
    //             return db.startTransaction(storeName, "readwrite").then((store) => {
    //                 const request = store.add(data)
    //                 request.onsuccess = (e) => {
    //                     resolve((e.target as IDBRequest).result as T)
    //                 }
    //                 request.onerror = (e_1) => {
    //                     reject(e_1)
    //                 }
    //             })
    //         })
    //     } catch (err) {
    //         return Promise.reject(err)
    //     }
    // }
    // //
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
    //
    // static async get(storeName, key) {
    //   return _client.get(storeName, key)
    // }
    //
    // static async update(storeName, data) {
    //   return _client.update(storeName, data)
    // }
    //
    // static async delete(storeName, key) {
    //   return _client.delete(storeName, key)
    // }
}

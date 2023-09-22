import type { ObjectStoreConfigs } from "$lib/types"

export default class IdbClient {
    static LOG_PREFIX = "[IDB_CLIENT]"

    private _db: IDBDatabase | null
    public readonly name: string
    private readonly _version: number

    constructor(n: string, v: number) {
        this.name = n
        this._db = null
        this._version = v
    }

    get db(): IDBDatabase | null {
        return this._db
    }

    #onError(event: Event) {
        console.error(IdbClient.LOG_PREFIX, "error", event)
    }

    #waitStoreComplete(store: IDBObjectStore): Promise<IdbClient> {
        return new Promise((resolve, reject) => {
            store.transaction.oncomplete = () => {
                resolve(this)
            }
            store.transaction.onerror = (event) => {
                reject(event)
            }
        })
    }

    async #createObjectStores(objectStores: ObjectStoreConfigs): Promise<IdbClient> {
        const promises: Promise<IdbClient>[] = []
        for (const [name, config] of objectStores) {
            const store = this._db!.createObjectStore(name, config)
            promises.push(this.#waitStoreComplete(store))
        }

        await Promise.race(promises)

        return this
    }

    createClient(configs: ObjectStoreConfigs): Promise<IdbClient> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this._version)
            request.onupgradeneeded = (event) => {
                this._db = (event.target as IDBOpenDBRequest).result
                this._db.onerror = this.#onError
                return this.#createObjectStores(configs)
                    .then(() => resolve(this))
                    .catch(reject)
            }
            request.onsuccess = (event) => {
                this._db = (event.target as IDBOpenDBRequest).result
                this._db.onerror = this.#onError
                resolve(this)
            }
            request.onerror = (event) => {
                this.#onError(event)
                reject(event)
            }
        })
    }

    startTransaction(
        storeName: string,
        mode: IDBTransactionMode = "readonly"
    ): Promise<IDBObjectStore> {
        return Promise.resolve(this._db!.transaction(storeName, mode).objectStore(storeName))
    }

    // throwErr() {
    //
    // }
}

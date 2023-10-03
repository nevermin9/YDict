import type { IdbClientConfig } from "$lib/types"

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
        const target = event.target as IDBOpenDBRequest
        const name = target?.error?.name
        const msg = target.error?.message
        console.error(IdbClient.LOG_PREFIX, `[${name}]`, msg)
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

    async #createObjectStores(config: IdbClientConfig): Promise<IdbClient> {
        const promises: Promise<IdbClient>[] = []
        for (const [name, _c] of config) {
            const store = this._db!.createObjectStore(name, _c.storeConfig)

            if (!_c.indexes?.length) {
                promises.push(this.#waitStoreComplete(store))
                continue
            }

            for (const index of _c.indexes) {
                console.log(IdbClient.LOG_PREFIX, "create index", index.name)

                store.createIndex(index.name, index.keyPath, index.option)
            }

            promises.push(this.#waitStoreComplete(store))
        }

        await Promise.race(promises)

        return this
    }

    createClient(config: IdbClientConfig): Promise<IdbClient> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this._version)
            request.onupgradeneeded = (event) => {
                this._db = (event.target as IDBOpenDBRequest).result
                this._db.onerror = this.#onError
                return this.#createObjectStores(config)
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
                reject((event.target as IDBOpenDBRequest).error)
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

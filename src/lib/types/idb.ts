export interface IIdbClient {
    name: string

    _db: IDBDatabase
    _version: number
}

export type ObjectStoreConfig = {
    keyPath: string
    autoIncrement?: boolean
}

export type ObjectStoreIndex = {
    name: string
    keyPath: string
    option: {
        unique: boolean
        multiEntry: boolean
    }
}

export type IdbStoresConfig = {
    storeConfig: ObjectStoreConfig,
    indexes?: ObjectStoreIndex[]
}

export type IdbClientConfig = Map<string, IdbStoresConfig>

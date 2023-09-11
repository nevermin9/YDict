export interface IIdbClient {
    name: string;

    _db: IDBDatabase;
    _version: number;
}

export type ObjectStoreConfig = {
    keyPath: string;
    autoIncrement?: boolean;
}

export type ObjectStoreConfigs = Map<string, ObjectStoreConfig>

import { IdbManager } from "$lib/utils/idb"
import type { IDictionary } from "$lib/types"

export default class Dictionary implements IDictionary {
    name: string
    description: string
    words: string[]

    static STORE_NAME = "dictionary"
    static STORE_CONFIG = {
        keyPath: "name",
    }
    static MIN_DICT_NAME_LENGTH = 3
    static DEFAULT_DICT = "saved"
    static RESERVED_NAMES = [this.DEFAULT_DICT]
    static MAX_DICT_NAME_LENGTH = 20
    static DEFAULT_DICT = "saved"

    constructor({ name, description, words = [] }: IDictionary) {
        this.name = name
        this.description = description
        this.words = words
    }

    static async isExisting(name: string) {
        const dict = await this.get(name)
        return Boolean(dict)
    }

    static create(dict: IDictionary) {
        return IdbManager.insert(this.STORE_NAME, dict)
    }

    static get(name: string): Promise<IDictionary> {
        return IdbManager.get(this.STORE_NAME, name) as Promise<IDictionary>
    }

    static getAll(): Promise<IDictionary[]> {
        return IdbManager.getAll(this.STORE_NAME) as Promise<IDictionary[]>
    }

    static async getAllDictsNames() {
        const dicts = await this.getAll()
        const _d = dicts.map((dict: IDictionary) => dict.name)
        return [this.DEFAULT_DICT, ..._d]
    }
}

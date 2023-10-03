import { IdbManager } from "$lib/utils/idb"
import type { IDictionary } from "$lib/types"

export default class Dictionary implements IDictionary {
    name: string
    description: string
    length: number

    static STORE_NAME = "dictionary"
    static STORE_CONFIG = {
        keyPath: "name",
    }
    static MIN_DICT_NAME_LENGTH = 3
    static DEFAULT_DICT = "saved"
    static RESERVED_NAMES = [this.DEFAULT_DICT]
    static MAX_DICT_NAME_LENGTH = 20

    constructor({ name, description }: { name: string, description: string }) {
        this.name = name
        this.description = description
        this.length = 0
    }

    static async isExisting(name: string) {
        const dict = await this.get(name)
        return Boolean(dict)
    }

    static save(dict: Dictionary) {
        return IdbManager.insert(this.STORE_NAME, dict)
    }

    static get(name: string): Promise<Dictionary> {
        return IdbManager.get(this.STORE_NAME, name) as Promise<Dictionary>
    }

    static getAll(): Promise<Dictionary[]> {
        return IdbManager.getAll(this.STORE_NAME) as Promise<Dictionary[]>
    }

    static async getAllDictsNames() {
        const dicts = await this.getAll()
        return dicts.map((dict: IDictionary) => dict.name)
    }

    static async getLength(name: string) {
        const dict = await this.get(name)
        return dict.length
    }

    static async increaseLength(names: string[]) {
        for (const name of names) {
            const dict = await this.get(name)
            if (dict) {
                dict.length++
                await this.save(dict)
            }
        }
    }

    static async decreaseLength(names: string[]) {
        for (const name of names) {
            const dict = await this.get(name)
            if (dict) {
                dict.length--
                await this.save(dict)
            }
        }
    }
}

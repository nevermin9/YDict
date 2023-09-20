import { IdbManager } from "$lib/utils/idb"
import type { ObjectStoreConfig, IWord, WordApiData } from "$lib/types"

export default class Word implements IWord {
    word: string
    data: WordApiData
    dicts: string[]
    cards: string[]

    static STORE_NAME = "word"
    static STORE_CONFIG: ObjectStoreConfig = {
        keyPath: "word",
    }

    constructor({ word, dicts, data, cards = [] }: IWord) {
        this.word = word
        this.dicts = dicts
        this.cards = cards
        this.data = data
    }

    static save(word: string) {
        return IdbManager.insert(this.STORE_NAME, word)
    }

    static getAll(): Promise<Word[]> {
        return IdbManager.getAll(this.STORE_NAME) as Promise<Word[]>
    }

    static get(word: string): Promise<Word> {
        return IdbManager.get<Word>(this.STORE_NAME, word)
    }
}

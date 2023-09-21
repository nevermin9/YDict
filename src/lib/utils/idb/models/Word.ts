import { IdbManager } from "$lib/utils/idb"
import type { ObjectStoreConfig, IWord, WordApiData } from "$lib/types"
import { copyObj } from "$lib/utils/helpers"

type StoredWordData = Partial<WordApiData>
export default class Word implements IWord {
    word: string
    data: StoredWordData
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

    static #getWordData(data: WordApiData): StoredWordData {
        const copy = copyObj(data)
        delete (copy as StoredWordData).word
        return copy
    }

    static create(_data: WordApiData, dicts: string[] = [], cards: string[] = []) {
        const word = _data.word
        const data = this.#getWordData(_data)
        return new Word({ word, data, dicts, cards })
    }

    static save(word: Word) {
        return IdbManager.insert(this.STORE_NAME, word)
    }

    static getAll(): Promise<Word[]> {
        return IdbManager.getAll(this.STORE_NAME) as Promise<Word[]>
    }

    static get(word: string): Promise<Word> {
        return IdbManager.get<Word>(this.STORE_NAME, word)
    }
}

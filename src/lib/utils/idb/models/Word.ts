import { IdbManager } from "$lib/utils/idb"
import type { ObjectStoreConfig, IWord, WordApiData } from "$lib/types"
import { copyObj } from "$lib/utils/helpers"

type StoredWordData = Partial<WordApiData>

const INDEX_NAMES = {
    DICTS: "dicts"
}
export default class Word implements IWord {
    word: string
    data: StoredWordData
    dicts: string[]
    cards: string[]

    static STORE_NAME = "word"
    static STORE_CONFIG: ObjectStoreConfig = {
        keyPath: "word",
    }
    static STORE_INDEXES = [
        {
            name: INDEX_NAMES.DICTS,
            keyPath: INDEX_NAMES.DICTS,
            option: { unique: false, multiEntry: true },
        },
        // {
        //     name: "cards",
        //     keyPath: "cards",
        //     multiEntry: true,
        // },
    ]

    constructor({ word, dicts, data, cards = [] }: IWord) {
        this.word = word
        this.dicts = dicts
        this.cards = cards
        this.data = data
    }

    static #getWordData(data: WordApiData, defs: string[]): StoredWordData {
        const copy = copyObj(data)
        delete (copy as StoredWordData).word
        copy.results = copy.results.filter((r) => defs.includes(r.definition))
        return copy
    }

    static create(_data: WordApiData, definitions: string[], dicts: string[] = [], cards: string[] = []) {
        const word = _data.word
        const data = this.#getWordData(_data, definitions)
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

    static getFromDict(name: string): Promise<Word[]> {
        return IdbManager.getIndex<Word[]>(this.STORE_NAME, INDEX_NAMES.DICTS, { key: name })
    }

    static delete(word: string, dicts?: string[]) {
        if (dicts?.length) {
            return IdbManager.get<Word>(this.STORE_NAME, word).then((w) => {
                w.dicts = w.dicts.filter((d) => !dicts.includes(d))
                return IdbManager.insert(this.STORE_NAME, w)
            })
        }
        return IdbManager.delete(this.STORE_NAME, word)
    }
}

import {IdbManager} from "$lib/utils/idb"
import type {ObjectStoreConfig, IWord, WordApiData} from "$lib/types"

export default class Word implements IWord {
  word: string
  data: WordApiData
  dicts: string[]
  cards: string[]

  static STORE_NAME = "word"
  static STORE_CONFIG: ObjectStoreConfig = {
    keyPath: "word"
  }

  constructor({word, dicts, data, cards = []}: IWord) {
    this.word = word
    this.dicts = dicts
    this.cards = cards
    this.data = data
  }

  static async save(word: string) {
    return await IdbManager.insert(this.STORE_NAME, word)
  }

  static async getAll(): Promise<Word[]> {
    return await IdbManager.getAll(this.STORE_NAME) as Promise<Word[]>
  }
}

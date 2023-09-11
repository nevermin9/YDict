// import IdbManager from "$lib/utils/idb/IdbManager"
import type {ObjectStoreConfig, IWord} from "$lib/types"

export default class Word implements IWord {
  word: string
  // private data: IWordApiData,
  dicts: string[]
  cards: string[]

  static STORE_NAME = "word"
  static STORE_CONFIG: ObjectStoreConfig = {
    keyPath: "word"
  }

  constructor({word, dicts, cards}: IWord) {
    this.word = word
    this.dicts = dicts
    this.cards = cards
  }

  // static async save(word: string) {
  //   return IdbManager.insert(this.STORE_NAME, word)
  // }
  //
  // static async getAll() {
  //   return IdbManager.getAll(this.STORE_NAME)
  // }
}

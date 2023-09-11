// import IdbManager from "$lib/utils/idb/IdbManager"
import type {IDictionary} from "$lib/types"

export default class Dictionary implements IDictionary {
  name: string
  description: string
  words: string[]

  static STORE_NAME = 'dictionary'
  static STORE_CONFIG = {
    keyPath: "name"
  }

  constructor({name, description, words = []}: IDictionary) {
    this.name = name
    this.description = description
    this.words = words
  }

  // static create(dict: string) {
    // return IdbManager.insert(Dictionary.objectStoreName, dict)
  // }

  // static getAll() {
    // return IdbManager.getAll(this.objectStoreName)
  // }

  // static async getAllDictsNames() {
    // const dicts = await this.getAll()
    // return dicts.map((dict: IDictionary) => dict.name)
  // }
}

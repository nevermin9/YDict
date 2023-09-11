import type { ObjectStoreConfigs } from "$lib/types"
import IdbClient from "./IdbClient.js"
import { QueueController } from "../helpers"

let _client: IdbClient | null = null
const setClient = (client: IdbClient) => {
  _client = client
}
const getClient = () => {
  return _client
}

export default class IdbManager {
  static queue = new QueueController()

  static async init(name: string, version: number, configs: ObjectStoreConfigs) {
    let _c: IdbClient = new IdbClient(name, version)
    _c = await _c.createClient(configs)
    setClient(_c)
  }

  static async getDB() {
    const check = () => {
      return new Promise(resolve => {
        const db = getClient()?.db

        if (!db) {
          requestAnimationFrame(check)
        }

        resolve(db)
      })
    }

    if (!getClient()?.db) {
      return await this.queue.process("get-db-client", () => check())
    }

    return getClient()!.db
  }

  // static async insert(storeName, data) {
  //   return _client.insert(storeName, data)
  // }
  //
  // static async getAll(storeName) {
  //   return _client.getAll(storeName)
  // }
  //
  // static async get(storeName, key) {
  //   return _client.get(storeName, key)
  // }
  //
  // static async update(storeName, data) {
  //   return _client.update(storeName, data)
  // }
  //
  // static async delete(storeName, key) {
  //   return _client.delete(storeName, key)
  // }
}

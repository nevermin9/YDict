import type {LayoutLoad} from "./$types"
import {browser} from "$app/environment"
import IdbManager from "$lib/utils/idb/IdbManager"
import {Dictionary, Word} from "$lib/utils/idb/models"
import {PUBLIC_IDB_VERSION, PUBLIC_IDB_NAME} from "$env/static/public"

const createIndexedDB = async () => {
  if (typeof IDBIndex === 'undefined') {
    return {
      is_success: false,
      reason: "Not a browser",
    }
  }

  let is_success = false
  let reason = ""

  try {
    const ver = parseInt(PUBLIC_IDB_VERSION, 10)
    if (Number.isNaN(ver) || ver < 1) {
      throw new Error('Invalid version')
    }

    await IdbManager.init(
      PUBLIC_IDB_NAME,
      ver,
      new Map([
        [Word.STORE_NAME, Word.STORE_CONFIG],
        [Dictionary.STORE_NAME, Dictionary.STORE_CONFIG],
        ['card', {keyPath: 'name'}],
      ]),
    ).then(() => {
      is_success = true
    })
  } catch (e) {
    reason = (e as Error).message
    console.error(e)
  }

  return {
    is_success,
    reason,
  }
}

export const load: LayoutLoad = async () => {
  if (!browser) {
    return {
      is_success: true,
    }
  }

  let is_success = false
  let reason = ""

  try {
    const ver = parseInt(PUBLIC_IDB_VERSION, 10)
    if (Number.isNaN(ver) || ver < 1) {
      throw new Error('Invalid version')
    }

    await IdbManager.init(
      PUBLIC_IDB_NAME,
      ver,
      new Map([
        [Word.STORE_NAME, Word.STORE_CONFIG],
        [Dictionary.STORE_NAME, Dictionary.STORE_CONFIG],
        ['card', {keyPath: 'name'}],
      ]),
    )

    is_success = true
  } catch (e) {
    reason = (e as Error).message
    console.error(e)
  }

  return {
    is_success,
    reason,
  }
}

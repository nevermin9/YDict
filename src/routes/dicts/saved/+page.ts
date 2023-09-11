import {browser} from '$app/environment'
import {Word} from "$lib/utils/idb/models"
import type {PageLoad} from "./$types"


export const load: PageLoad = async () => {
  let wordList = []

  if (browser) {
    wordList = await Word.getAll()
  }

  return {
    wordList,
  }
}

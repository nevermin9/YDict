import type { PageLoad } from "./$types"
import {browser} from "$app/environment"
import { Word } from "$lib/utils/idb/models"

export const load: PageLoad = async () => {
    let wordsList: Word[] = []

    if (browser) {
        wordsList = await Word.getAll()
    }

    return {
        wordsList, 
    }
}
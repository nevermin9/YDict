import type { PageLoad } from "./$types"
import {browser} from "$app/environment"
import { Word } from "$lib/utils/idb/models"

export const load: PageLoad = async () => {
    let words: Word[] = []

    if (browser) {
        words = await Word.getAll()
    }

    return {
        words,
    }
}
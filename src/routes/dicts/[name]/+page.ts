import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { Word, Dictionary } from "$lib/utils/idb/models"

export const load: PageLoad = async ({ params }) => {
    if (!browser) {
        return {
            word: "fuck"
        }
    }

    const { name } = params

    if (!await Dictionary.isExisting(name) && Dictionary.DEFAULT_DICT !== name.toLowerCase()) {
        throw error(404, {message: "Cannot find such a dictionary"})
    }

    let words: Word[] = []

    try {
        words = await Word.getFromDict(name)
    } catch (err) {
        console.log("result", err)
    }

    return {
        words,
        name,
    }
}
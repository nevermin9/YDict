import type { PageLoad } from "./$types"
import { browser } from "$app/environment"
import { Word } from "$lib/utils/idb/models"
import { error } from "@sveltejs/kit"

export const load: PageLoad = async ({ params }) => {
    let wordData: Word | null = null
    try {
        if (browser) {
            wordData = await Word.get(params.word)
            console.log("word", wordData)

            if (!wordData) {
                throw error(404, "Word not found")
            }
        }
    } catch (err) {
        throw error(500, (err as Error).message)
    }

    return {
        wordData,
    }
}

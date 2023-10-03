import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { Word, Dictionary } from "$lib/utils/idb/models"

const PAGIANATION = {
    limit: 10,
    page: 1,
}

export const load: PageLoad = async ({ params, depends, url }) => {
    if (!browser) {
        return {
            word: "fuck"
        }
    }

    const { name } = params
    let page = url.searchParams.get("page")

    if (!page) {
        page = PAGIANATION.page.toString()
    }

    if (!await Dictionary.isExisting(name)) {
        throw error(404, {message: "Cannot find such a dictionary"})
    }

    let words: Word[] = []

    try {
        words = await Word.getFromDict(name)
    } catch (err) {
        console.log("result", err)
    }

    console.log("words", words)

    depends("dict:name")

    return {
        words,
        name,
        page: 1,
    }
}
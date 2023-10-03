import type { PageLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { Word, Dictionary } from "$lib/utils/idb/models"

const PAGINATION = {
    limit: 10,
    page: 1,
}

export const load: PageLoad = async ({ params, url }) => {
    if (!browser) {
        return {}
    }

    const { name } = params
    const _p = url.searchParams.get("page")
    const page = _p ? parseInt(_p, 10) : PAGINATION.page

    if (Number.isNaN(page)) {
        throw error(400, {message: "Invalid page number"})
    }

    if (!await Dictionary.isExisting(name)) {
        throw error(404, {message: "Cannot find such a dictionary"})
    }

    let words: Word[] = []

    try {
        words = await Word.getPaginated(name, page, PAGINATION.limit)
    } catch (err) {
        console.log("result", err)
    }

    console.log("words", words)

    return {
        words,
        name,
        page,
    }
}
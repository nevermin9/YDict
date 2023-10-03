import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { Word, Dictionary } from "$lib/utils/idb/models"

const PAGINATION = {
    limit: 7,
    page: 1,
} as const

export const load: PageLoad = async ({ params, url }) => {
    if (!browser) {
        return {}
    }

    const { name } = params

    if (!await Dictionary.isExisting(name)) {
        throw error(404, {message: "Cannot find such a dictionary"})
    }

    let words: Word[] = []

    try {
        words = await Word.getPaginated(name, PAGINATION.page, PAGINATION.limit)
    } catch (err) {
        throw error(500, {message: "Cannot get words from the database"})
    }

    return {
        words,
        name,
        pagination: PAGINATION,
    }
}
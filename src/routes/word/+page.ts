import api from "$api"
import {browser} from "$app/environment"
import { error, redirect } from "@sveltejs/kit"
import HTTPResponseError from "$lib/utils/http-client/HTTPResponseError"
import { Word } from "$lib/utils/idb/models"
import type {ReturnType, PromiseType} from "$lib/types"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get("search")

    if (!search) {
        throw redirect(307, "/")
    }

    let wordFromDB: Word | null = null
    let searchedWord: PromiseType<ReturnType<typeof api.word.getWord>>

    try {
        searchedWord = await api.word.getWord(search || "")
    } catch (e) {
        if (e instanceof HTTPResponseError) {
            const res = e.response
            if (res.status >= 400) {
                throw error(res.status, res.statusText)
            }
        }

        throw e
    }

    if (browser) {
        wordFromDB = await Word.get(search)
    }

    return {
        searchedWord,
        wordFromDB
    }
}

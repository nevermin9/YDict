import type { PageLoad } from "./$types"
import { browser } from "$app/environment"
import { Dictionary } from "$lib/utils/idb/models"

export const load: PageLoad = async ({ params }) => {
    if (!browser) {
        return {
            word: "fuck"
        }
    }

    const { name } = params

    // const result = Dictionary.get

    return {
        word: "fuck"
    }
}
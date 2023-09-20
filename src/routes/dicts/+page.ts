import { Dictionary } from "$lib/utils/idb/models"
import { browser } from "$app/environment"

export const load = async () => {
    let names: string[] = []

    if (browser) {
        names = await Dictionary.getAllDictsNames()
    }

    return {
        names,
    }
}

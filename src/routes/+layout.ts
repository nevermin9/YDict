import type { LayoutLoad } from "./$types"
import { browser } from "$app/environment"
import IdbManager from "$lib/utils/idb/IdbManager"
import { Dictionary, Word } from "$lib/utils/idb/models"
import { PUBLIC_IDB_VERSION, PUBLIC_IDB_NAME } from "$env/static/public"

export const load: LayoutLoad = async ({ url }) => {
    if (!browser) {
        return {
            is_success: true,
        }
    }

    let is_success = false
    let reason = ""

    try {
        const ver = parseInt(PUBLIC_IDB_VERSION, 10)
        if (Number.isNaN(ver) || ver < 1) {
            throw new Error("Invalid version")
        }

        const config = new Map([
            [Word.STORE_NAME, { storeConfig: Word.STORE_CONFIG, indexes: Word.STORE_INDEXES }],
            [Dictionary.STORE_NAME, { storeConfig: Dictionary.STORE_CONFIG }],
            ["card", { storeConfig: { keyPath: "name" } }],
        ])

        await IdbManager.init(
            PUBLIC_IDB_NAME,
            ver,
            config,
        )
    } catch (e) {
        reason = (e as Error).message
    }

    if (!await Dictionary.isExisting(Dictionary.DEFAULT_DICT)) {
        try {
            await Dictionary.save(new Dictionary({
                name: Dictionary.DEFAULT_DICT,
                description: "Default dictionary",
            }))

            is_success = true
        } catch (e) {
            reason = (e as Error).message
        }
    } else {
        is_success = true
    }


    return {
        is_success,
        reason,
        pathname: url.pathname,
    }
}

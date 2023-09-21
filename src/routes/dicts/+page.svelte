<script lang="ts">
    import { getContext } from "svelte"
    import {modalsRootContext, notificationsContext} from "$lib/context"
    import { addNotification } from "$lib/store"
    import type { Notification } from "$lib/types"

    export let data

    const { open } = modalsRootContext.get()
    const { add: notify } = notificationsContext.get()

    let dictsNames: string[] = [...data.names]

    const openFormCreateDict = async () => {
        const name = await open({ name: "create-dict-form" })

        if (name) {
            notify({
                message: `<span class="text-lime-50">Dict "${name}" created<span>`,
                level: "INFO",
            } as Notification)
            notify({
                message: `<span class="text-lime-50">check if she is gone<span>`,
                level: "INFO",
            } as Notification)
            dictsNames = [...dictsNames, name]
        }
    }
</script>

<section class="dicts p-4">
    <ul class="grid grid-cols-2 auto-rows-fr gap-1 max-w-lg m-auto text-deepblue-500">
        <li>
            <a href="/dicts/saved" class="flex w-full h-full clickable-light px-5 py-2">
                <span class="m-auto uppercase"> Saved </span>
            </a>
        </li>

        {#each dictsNames as dictName (dictName)}
            <li>
                <a
                    href="/dicts/{dictName}"
                    class="flex items-center justify-center text-center w-full h-full clickable-light px-5 py-2"
                >
                    {dictName}
                </a>
            </li>
        {/each}

        <li>
            <button
                type="button"
                class="flex w-full h-full clickable-light px-5 py-2"
                on:click={openFormCreateDict}
            >
                <span class="m-auto"> + </span>
            </button>
        </li>
    </ul>
</section>

<script lang="ts">
    import {modalsRootContext, notificationsContext} from "$lib/context"
    import type { Notification } from "$lib/types"
    import type { PageData } from "./$types"

    export let data: PageData

    const { open } = modalsRootContext.get()
    const { add: notify } = notificationsContext.get()

    let dictsNames: string[] = [...data.names]

    const openFormCreateDict = async () => {
        let name
        try {
            name = await open<string>({ name: "create-dict-form" })
        } catch (e) {
            notify({
                message: `<span class="text-lime-50">Dict is not created<span>`,
                level: "ERROR",
            } as Notification)
            console.log(e)
        }

        if (name) {
            notify({
                message: `<span class="text-lime-50">Dict "${name}" created<span>`,
                level: "INFO",
            } as Notification)

            dictsNames = [...dictsNames, name]
        }
    }
</script>

<section class="dicts p-4">
    <ul class="grid grid-cols-2 auto-rows-fr gap-1 max-w-lg m-auto text-deepblue-500">
        {#each dictsNames as dictName (dictName)}
            <li>
                <a
                    href="/dicts/{dictName}"
                    class="flex items-center justify-center text-center w-full h-full clickable-blue px-5 py-2"
                >
                    {dictName}
                </a>
            </li>
        {/each}

        <li>
            <button
                type="button"
                class="flex w-full h-full clickable-blue px-5 py-2"
                on:click={() => openFormCreateDict()}
            >
                <span class="m-auto"> + </span>
            </button>
        </li>
    </ul>
</section>

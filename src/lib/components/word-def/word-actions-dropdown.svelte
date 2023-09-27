<script lang="ts">
    import SDropdown from "$lib/components/form/s-dropdown.svelte"
    import SvgRoot from "$lib/components/svg/svg-root.svelte"
    import MoreIco from "$lib/components/svg/more-ico.svelte"
    import { Word } from "$lib/utils/idb/models"
    import { notificationsContext } from "$lib/context"
    import { createEventDispatcher } from "svelte"

    let clazz = ""
    export { clazz as class }
    export let word: string
    export let dict: string
    const dispatch = createEventDispatcher()
    let search = new URLSearchParams()
    search.set("search", word)

    const { add: notify } = notificationsContext.get()

    const deleteWord = (_d?: string[]) => {
        return Word.delete(word, _d)
            .then(res => {
                if (res) {
                    notify({
                        message: `<span class="text-lime-50">Word "${word}" is deleted<span>`,
                        level: "INFO",
                    })
                    dispatch("deleted", word)
                } else {
                    notify({
                        message: `<span class="text-lime-50">Word "${word}" is not deleted<span>`,
                        level: "ERROR",
                    })
                }
            })
            .catch((err) => {
                notify({
                    message: `<span class="text-lime-50">Word "${word}" is not deleted<span>`,
                    level: "ERROR",
                })
                throw err
            })
    }
</script>

<SDropdown
    on:close={() => {
        console.log("close")
    }}
    let:open
    let:close
    let:isOpen
>
    <button
        type="button"
        on:click={() => {
            if (isOpen) {
                close()
            } else {
                open()
            }
        }}
    >
        <SvgRoot class="inline-block">
            <MoreIco />
        </SvgRoot>
    </button>

    <ul
        slot="options"
        class="flex flex-col gap-1 w-full 
        whitespace-nowrap text-deepblue-500 text-left
        bg-sand-300 p-2 rounded-md border border-deepblue-500"
    >
        <li>
            <a href="/word?{search.toString()}"> Update </a>
        </li>

        <li class="h-[1px] w-full bg-deepblue-500" />

        <li>
            <button type="button" on:click={() => deleteWord([dict])}> Delete </button>
        </li>

        <li class="h-[1px] w-full bg-deepblue-500" />

        <li>
            <button type="button" on:click={() => deleteWord()}> Delete everywhere </button>
        </li>
    </ul>
</SDropdown>

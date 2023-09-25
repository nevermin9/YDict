<script lang="ts">
    import SDropdown from "$lib/components/form/s-dropdown.svelte"
    import SvgRoot from "$lib/components/svg/svg-root.svelte"
    import MoreIco from "$lib/components/svg/more-ico.svelte"
    import { Word } from "$lib/utils/idb/models"
    import {page} from "$app/stores"

    // export let options: { text: string; value: any }[] = []
    let clazz = ""
    export { clazz as class }
    export let word: string
    export let dict: string
    let search = new URLSearchParams()
    search.set("search", word)

    const deleteWord = () => {
        console.log("removeWord", $page)
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
            <button type="button" on:click={() => deleteWord()}> Delete </button>
        </li>

        <li class="h-[1px] w-full bg-deepblue-500" />

        <li>
            <button type="button" on:click={() => deleteWord()}> Delete everywhere </button>
        </li>
    </ul>
</SDropdown>

<script lang="ts">
    import type { PageData } from "./$types"
    import type { IWord } from "$lib/types"
    import AlphabetWordList from "$lib/components/routes/dicts/alphbet-word-list.svelte"
    import { page } from "$app/stores"
    import { goto } from "$app/navigation"

    export let data: PageData
    let dictName = $page.params.name
    let wordList: IWord[] = []

    $: {
        wordList = wordList.concat(data.words || [])
    }

    const updatePath = () => {
        const prevPage = data.page ? data.page : 1
        goto(`?page=${prevPage + 1}`, { noScroll: true })
    }
</script>

<section class="flex flex-col items-center pt-2 gap-2">
    <h1 class="text-3xl text-deepblue-500 underline">
        {dictName}
    </h1>

    <button class="clickable-light">
        <button on:click={() => updatePath()}>

            Next page
        </button>
    </button>

    <AlphabetWordList
        {dictName}
        {wordList}
        class="w-full"
    />
    <button class="clickable-light">
        <button on:click={() => updatePath()}>
            Next page
        </button>
    </button>
</section>

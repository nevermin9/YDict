<script lang="ts">
    import type { PageData } from "./$types"
    import type { IWord } from "$lib/types"
    import { page } from "$app/stores"
    import { Word } from "$lib/utils/idb/models"
    import AlphabetWordList from "$lib/components/routes/dicts/alphbet-word-list.svelte"
    import Intersection from "$lib/components/Intersection.svelte"

    export let data: PageData
    let dictName = $page.params.name
    let wordList: IWord[] = data.words || []
    let pageN = data.pagination?.page || 1
    let limit = data.pagination?.limit || 10

    const updateList = async (nextPage = false) => {
        if (nextPage) {
            pageN += 1
        }
        const nextWords = await Word.getPaginated(dictName, pageN, limit)
        wordList = [...wordList, ...nextWords]
    }
</script>

<section class="flex flex-col items-center pt-2 gap-2">
    <h1 class="text-3xl text-deepblue-500 underline">
        {dictName}
    </h1>

    <AlphabetWordList
        {dictName}
        {wordList}
        on:deleted={() => updateList()}
        class="w-full"
    />

    <Intersection on:intersected={() => updateList(true)} />
</section>

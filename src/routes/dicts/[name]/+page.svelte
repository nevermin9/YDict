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
    let pageN: number = data.pagination?.page || 1
    let limit = data.pagination?.limit || 10
    let alphabetIndexes: Map<string, number> = new Map()
    const mapAlphabet = (wList: IWord[]) => {
        for (let i = 0; i < wList.length; i++) {
            const firstLetter = wList[i].word[0].toUpperCase()
            if (!alphabetIndexes.has(firstLetter)) {
                alphabetIndexes.set(firstLetter, i)
            }
        }
    }
    $: mapAlphabet(wordList)

    const nextPage = async () => {
        pageN += 1
        const nextWords = await Word.getPaginated(dictName, pageN, limit)
        wordList = [...wordList, ...nextWords]
    }

    const updateList = async (event: CustomEvent<Word>) => {
        const word = event.detail
        const firstLetter = word.word[0].toUpperCase()
        const index = alphabetIndexes.get(firstLetter)
        if (index === undefined) return
        for (let i = index; i < wordList.length; i++) {
            if (wordList[i].word === word.word) {
                wordList.splice(i, 1)
                wordList = [...wordList]
                break
            }
        }
    }
</script>

<section class="flex flex-col items-center pt-2 gap-2">
    <h1 class="text-3xl text-deepblue-500 underline">
        {dictName}
    </h1>

    <AlphabetWordList
        {dictName}
        {wordList}
        on:deleted={(e) => updateList(e)}
        class="w-full"
    />

    <Intersection on:intersected={() => nextPage()} />
</section>

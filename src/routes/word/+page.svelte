<script lang="ts">
    import { getContext } from "svelte"
    import { teleport } from "$lib/utils/actions"
    import SButton from "$lib/components/buttons/s-button.svelte"
    // import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"
    import WordDefsList from "$lib/components/word-def/defs-list.svelte"
    // import WordDef from '$lib/components/word-def/word-def.svelte'
    import { Word } from "$lib/utils/idb/models"
    import { copyObj } from "$lib/utils/helpers"
    import type { PageData } from "./$types"

    export let data: PageData

    let selectedDefs: string[] = []

    const { open } = getContext("modals-root")

    const saveWord = (dicts) => {
        const wordDataCopy = copyObj(data.wordData)
        const word = wordDataCopy.word
        delete wordDataCopy.word
        wordDataCopy.results = wordDataCopy.results.filter((def) => {
            return selectedDefs.includes(def.definition)
        })
        const wordToSave = new Word({
            word,
            dicts,
            data: wordDataCopy,
        })

        return Word.save(wordToSave)
    }

    const openDictListModal = () => {
        return open({
            name: "dicts-list-modal",
        }).then((dicts) => {
            if (dicts) {
                return saveWord(dicts)
            }
        })
    }

    const addToDict = async () => {
        await openDictListModal()
    }
</script>

<section>
    <WordTitle
        class="mb-4"
        word={data.wordData.word}
        pronunciation={data.wordData?.pronunciation?.all}
    />

    <WordDefsList bind:selectedDefs definitions={data.wordData?.results} />

    <!--{#each data.wordData?.results as result, i (i)}-->
    <!--  <CheckboxContent-->
    <!--      value={result.definition}-->
    <!--      bind:group={selectedDefs}-->
    <!--      class="block mb-2"-->
    <!--  >-->
    <!--    <WordDef-->
    <!--        wordDefinition="{result}"-->
    <!--    />-->

    <!--  </CheckboxContent>-->
    <!--{:else }-->
    <!--    <p>no results</p>-->
    <!--{/each}-->

    <div
        use:teleport={"fixed-bottom"}
        class="fixed bottom-0 left-0 flex w-full p-3 justify-around bg-green-500 border-t border-sand-300"
    >
        <SButton type="button" disabled={!selectedDefs.length} on:click={() => addToDict()}>
            <span class="text-deepblue-500 uppercase"> add to dict </span>
        </SButton>

        <SButton type="button" disabled={!selectedDefs.length}>
            <span class="text-deepblue-500 uppercase"> add to card group </span>
        </SButton>
    </div>
</section>

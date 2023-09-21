<script lang="ts">
    import { teleport } from "$lib/utils/actions"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"
    import WordDefsList from "$lib/components/word-def/defs-list.svelte"
    import { Word } from "$lib/utils/idb/models"
    import type { PageData } from "./$types"
    import { modalsRootContext } from "$lib/context"

    export let data: PageData

    let selectedDefs: string[] = []

    const { open } = modalsRootContext.get()

    const saveWord = (dicts: string[]) => {
        const w = Word.create(data.wordData, dicts)
        return Word.save(w)
    }

    const openDictListModal = async () => {
        const dicts = await open({
            name: "dicts-list-modal",
        }) as string[]

        if (dicts && dicts.length) {
            return saveWord(dicts)
        }
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

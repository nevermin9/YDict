<script lang="ts">
    import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
    import WordDef from "$lib/components/word-def/word-def.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"

    export let data
    let selectedDefs: string[] = []

    const generateExample = async () => {
        const result = await fetch(`/api/create-sentence?with=${data.wordData.word}`).then((r) =>
            r.json()
        )

        console.log("the result", result)
    }
</script>

<section>
    {#if !data?.wordData?.word}
        <p class="text-center">No definitions found</p>
    {:else}
        <WordTitle
            class="mb-4"
            word={data.wordData.word}
            pronunciation={data.wordData.data?.pronunciation?.all}
        />

        <button type="button" on:click={() => generateExample()}> generate </button>

        {#each data.wordData?.data.results as result, i (i)}
            <CheckboxContent
                value={result.definition}
                bind:group={selectedDefs}
                class="flex gap-2 max-w-screen-md m-auto mb-2"
            >
                <WordDef wordDefinition={result} />
            </CheckboxContent>
        {/each}
    {/if}

    <div>
        <!--    <button-->
        <!--        class="p-3 uppercase bg-blue-900 text-slate-300 rounded-md"-->
        <!--        type="button"-->
        <!--        on:click={() => addToDict()}-->
        <!--    >-->
        <!--      add to dict-->
        <!--    </button>-->

        <!--    <button-->
        <!--        class="p-3 uppercase bg-blue-900 text-slate-300 rounded-md"-->
        <!--        type="button"-->
        <!--    >-->
        <!--      add to card group-->
        <!--    </button>-->
    </div>
</section>

<script lang="ts">
    import WordDef from "$lib/components/word-def/word-def.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"
    import WordDefsList from "$lib/components/word-def/defs-list.svelte"

    export let data
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

        <WordDefsList definitions={data.wordData.data.results}>
            <WordDef slot="def" let:def wordDefinition={def} />
        </WordDefsList>
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

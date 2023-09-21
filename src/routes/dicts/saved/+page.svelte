<script lang="ts">
    import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
    import type { PageData } from "./$types"

    export let data: PageData
</script>

<section>
    <AlphabetWordList wordList={data.wordsList} />
</section>

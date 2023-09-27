<script lang="ts">
    import type { PageData } from "./$types"
    import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
    import { page } from "$app/stores"

    export let data: PageData
    let dictName = $page.params.name
</script>

<section class="flex flex-col items-center pt-2 gap-2">
    <h1 class="text-3xl text-deepblue-500 underline">
        {dictName}
    </h1>

    <AlphabetWordList
        {dictName}
        wordList={data.words}
        class="w-full"
    />
</section>

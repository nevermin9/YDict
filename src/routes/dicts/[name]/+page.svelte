<script lang="ts">
    import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
    import { onMount } from "svelte"
    import type { PageData } from "./$types"

    export let data: PageData
    console.log("[name]", data);
    

    onMount(() => {
        console.log("onMount")
    })
</script>

<section class="flex flex-col items-center pt-2 gap-2">
    <h1 class="text-3xl text-deepblue-500 underline">
        {data.name}
    </h1>

    <AlphabetWordList class="w-full" wordList={data.words} />
</section>

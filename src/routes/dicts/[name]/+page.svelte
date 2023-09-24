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

<section>
    <AlphabetWordList wordList={data.words} />
</section>

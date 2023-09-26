<script lang="ts">
    import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
    import { onMount } from "svelte"
    import type { PageData } from "./$types"
    import {page} from "$app/stores"

    export let data: PageData

    onMount(() => {
        console.log("onMount", $page)
    })
</script>

<section>
    <AlphabetWordList dictName={$page.params.name} wordList={data.words} />
</section>

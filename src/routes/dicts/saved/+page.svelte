<script lang="ts">
    import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
    import { Word } from "$lib/utils/idb/models"
    import { onMount } from "svelte"

    let list: Word[] = []

    onMount(async () => {
        console.log("i am mounted")
        list = await Word.getAll()
        console.log("i am saved", list)
    })
</script>

<section>
    <AlphabetWordList wordList={list} />
</section>

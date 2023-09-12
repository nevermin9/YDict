
<script>
  import AlphabetWordList from "$lib/components/lists/alphbet-word-list.svelte"
  import {Word} from "$lib/utils/idb/models"
  import {onMount} from "svelte"

  let list = []

  onMount(async () => {
    list = await Word.getAll()
  })
</script>

<section>
  <AlphabetWordList wordList={list} />
</section>

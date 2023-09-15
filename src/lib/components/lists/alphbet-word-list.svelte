<script lang="ts">
  import type {IWord} from "$lib/types"
  import { onMount } from "svelte"

  export let wordList: IWord[] = []

  const createDict = (dict: Map<string, IWord[]>, current: IWord) => {
    const firstLetter = current.word[0].toUpperCase()
    if (dict.has(firstLetter)) {
      dict.get(firstLetter).push(current)
    } else {
      dict.set(firstLetter, [current])
    }
    return dict
  }

  let dict = new Map<string, IWord[]>()
  $: {
    console.log("wordList", wordList)
    dict = wordList.reduce(createDict, dict)
    console.log("dict", dict)
  }
</script>

<ul>
  {#each dict.entries() as [letter, words] (letter) }
    <h2>{letter}</h2>
    <ul>
      {#each words as w, i (i)}
        <li>
          <a href="/word/{w.word}">
            {w.word}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
      <span>
        Loading...
      </span>
  {/each}
</ul>

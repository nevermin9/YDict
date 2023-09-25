<script lang="ts">
    import type { IWord } from "$lib/types"
    import WordActionsDropdown from "$lib/components/word-def/word-actions-dropdown.svelte";

    let clazz = ""
    export { clazz as class }
    export let wordList: IWord[] = []

    const createDict = (dict: Map<string, IWord[]>, current: IWord) => {
        const firstLetter = current.word[0].toUpperCase()
        if (dict.has(firstLetter)) {
            dict.get(firstLetter)!.push(current)
        } else {
            dict.set(firstLetter, [current])
        }
        return dict
    }

    let dict = new Map<string, IWord[]>()
    $: {
        dict = wordList.reduce(createDict, dict)
    }
</script>

<ul class="flex flex-col gap-2 {clazz}">
    {#each dict.entries() as [letter, words] (letter)}
        <h2
            class="max-w-[50px] w-full text-deepblue-500 text-center text-lg font-bold bg-sand-300 px-3 py-2 rounded shadow"
        >
            {letter}
        </h2>

        <ul class="flex flex-col gap-1 mb-3">
            {#each words as w, i (i)}
                <li
                    class="
                    flex justify-between items-center
                    text-deepblue-500 text-left bg-sand-300 cursor-pointer rounded shadow px-1 py-2"
                >
                    <a class="inline-block w-full h-full hover:underline" href="/word/{w.word}">
                        {w.word}
                    </a>

                    <WordActionsDropdown word={w.word} />
                </li>
            {/each}
        </ul>
    {:else}
        <li>
            You've saved nothing so far
        </li>
    {/each}
</ul>

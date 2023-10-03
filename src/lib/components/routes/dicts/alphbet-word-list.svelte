<script lang="ts">
    import type { IWord } from "$lib/types"
    import WordActionsDropdown from "$lib/components/word-def/word-actions-dropdown.svelte";
    import { invalidate } from "$app/navigation"

    let clazz = ""
    export { clazz as class }
    export let wordList: IWord[] = []
    export let dictName: string

    const createDict = (_d: Map<string, IWord[]>, current: IWord) => {
        const firstLetter = current.word[0].toUpperCase()
        if (_d.has(firstLetter)) {
            _d.get(firstLetter)!.push(current)
        } else {
            _d.set(firstLetter, [current])
        }
        return _d
    }

    let dict: Map<string, IWord[]>
    $: {
        dict = wordList.reduce(createDict, new Map)
    }

    const onDelete = () => {
        return invalidate("dict:name")
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

                    <WordActionsDropdown on:deleted={onDelete} dict={dictName} word={w} />
                </li>
            {/each}
        </ul>
    {:else}
        <li>
            You've saved nothing so far
        </li>
    {/each}
</ul>

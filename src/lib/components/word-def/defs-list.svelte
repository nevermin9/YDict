<script lang="ts">
    import type { WordDefinition } from "$lib/types"
    import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
    import WordDef from "$lib/components/word-def/word-def.svelte"

    let clazz = ""
    export { clazz as class }
    export let definitions: WordDefinition[] = []
    export let selectedDefs: string[] = []
    export let checkedDefsObj: WordDefinition[] = []

    let checkedDefs: string[] = definitions.map((def) => def.definition)
        .filter((def) => checkedDefsObj.map((_cdef) => _cdef.definition).includes(def))
</script>

<ul class="{clazz}">
    {#each definitions as def, i (i)}
        <li>
            <CheckboxContent
                value={def.definition}
                bind:group={selectedDefs}
                checked={checkedDefs.includes(def.definition)}
                class="flex items-start gap-2 max-w-screen-md mx-auto mb-2"
            >
                <WordDef wordDefinition={def} />
            </CheckboxContent>
        </li>
        {:else}
        <li> No definitions found </li>
    {/each}

</ul>

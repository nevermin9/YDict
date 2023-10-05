<script lang="ts">
    import type { WordDefinition } from "$lib/types"

    let clazz = ""
    export { clazz as class }
    export let definitions: WordDefinition[] = []
</script>

<ul class="{clazz} flex flex-col gap-2">
    {#each definitions as def, i (i)}
        <li>
            <slot name="def" {def} />
        </li>
    {:else}
        <li> No definitions found </li>
    {/each}
</ul>

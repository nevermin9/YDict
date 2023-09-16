<script lang="ts">
  import type {WordDefinition} from "$lib/types"
  import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
  import WordDef from '$lib/components/word-def/word-def.svelte'

  let clazz = ""
  export {clazz as class}
  export let definitions: WordDefinition[] = []
  export let selectedDefs: string[] = []

</script>

<ul class="{clazz}">
  {#each definitions as def, i (i)}
    <li>
      <CheckboxContent
          value={def.definition}
          bind:group={selectedDefs}
          class="flex items-start gap-2 max-w-screen-md mx-auto mb-2"
      >
        <WordDef
            wordDefinition="{def}"
        />
      </CheckboxContent>
    </li>
  {/each}
</ul>

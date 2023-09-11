<script lang="ts">
  import {getContext, onMount} from "svelte"
  import {Dictionary} from "$lib/utils/idb/models"

  const {open} = getContext("modals-root")

  let dictsNames = []

  const openFormCreateDict = async () => {
    const result = await open({ name: 'create-dict-form' })
    console.log ("dicts page openFormCreateDict result", result)

    if (result) {
      dictsNames = [...dictsNames, result]
    }
  }

  onMount(async () => {
    dictsNames = await Dictionary.getAllDictsNames()
  })
</script>


<section class="dicts p-4">
  <ul class="grid grid-cols-2 auto-rows-auto gap-1 max-w-lg m-auto">
    <li
        class="dicts__dict-container flex bg-blue-900"
    >
      <a
          href="/dicts/saved"
          class="dicts__dict-container-in flex w-full h-full bg-blue-600"
      >
        <span class="m-auto uppercase">
          Saved
        </span>
      </a>
    </li>

    {#each dictsNames as dictName (dictName)}
      <li
          class="dicts__dict-container flex bg-blue-900"
      >
        <a
            href="/dicts/{dictName}"
            class="dicts__dict-container-in flex w-full h-full bg-blue-600"
        >
        <span class="m-auto">
          {dictName}
        </span>
        </a>
      </li>
    {/each}

    <li
        class="dicts__dict-container flex bg-blue-900"
    >
      <button
          type="button"
          class="dicts__dict-container-in flex w-full h-full bg-blue-600"
          on:click={openFormCreateDict}
      >
        <span class="m-auto">
          +
        </span>
      </button>
    </li>
  </ul>
</section>

<style lang="scss">
  .dicts {
    $border-radius: .175rem;
    $border-width: .175rem;

    &__dict-container {
      border-radius: calc($border-radius + $border-width);
      padding: $border-width;
    }

    &__dict-container-in {
      border-radius: $border-radius;
    }
  }
</style>



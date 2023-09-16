<script lang="ts">
  import {getContext, onMount} from "svelte"

  export let data

  const {open} = getContext("modals-root")

  let dictsNames = [...data.names]

  const openFormCreateDict = async () => {
    const result = await open({ name: 'create-dict-form' })

    if (result) {
      dictsNames = [...dictsNames, result]
    }
  }

  onMount(async () => {
    console.log('dicts mounted')
  })
</script>


<section class="dicts p-4">
  <ul class="grid grid-cols-2 auto-rows-auto gap-1 max-w-lg m-auto">
    <li>
      <a
          href="/dicts/saved"
          class="flex w-full h-full clickable-light px-5 py-2"
      >
        <span class="m-auto uppercase">
          Saved
        </span>
      </a>
    </li>

    {#each dictsNames as dictName (dictName)}
      <li>
        <a
            href="/dicts/{dictName}"
            class="flex w-full h-full clickable-light px-5 py-2"
        >
        <span class="m-auto">
          {dictName}
        </span>
        </a>
      </li>
    {/each}

    <li>
      <button
          type="button"
          class="flex w-full h-full clickable-light px-5 py-2"
          on:click={openFormCreateDict}
      >
        <span class="m-auto">
          +
        </span>
      </button>
    </li>
  </ul>
</section>



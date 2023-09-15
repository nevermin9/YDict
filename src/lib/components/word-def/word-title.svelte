<script lang="ts">
  let clazz: string
  export {clazz as class}
  export let word: string
  export let pronunciation: string | undefined
</script>

<div class="px-2 max-w-screen-md m-auto {clazz}">
  <h1
      class="text-3xl w-full px-2 pt-1 pb-2 bg-slate-300 shadow-md shadow-black"
  >
    {word}

    {#if pronunciation}
      <i class="text-gray-600">
        {pronunciation}
      </i>
    {/if}
  </h1>
</div>

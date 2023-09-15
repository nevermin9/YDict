
<script lang="ts">
  import "../style/base/1index.scss"
  import ModalsRoot from '$lib/components/modals/components/modals-root.svelte'
  import TheHeader from "$lib/components/the-header.svelte"
  import IdbManager from "$lib/utils/idb/IdbManager"
  import {Dictionary, Word} from "$lib/utils/idb/models"
  import {PUBLIC_IDB_VERSION, PUBLIC_IDB_NAME} from "$env/static/public"

  import {onMount} from "svelte"

  let isDbCreated = false

  const createIndexedDB = async () => {
    console.log('createIndexedDB mounted')
    try {
      await IdbManager.init(
        PUBLIC_IDB_NAME,
        PUBLIC_IDB_VERSION,
        new Map([
          [Word.STORE_NAME, Word.STORE_CONFIG],
          [Dictionary.STORE_NAME, Dictionary.STORE_CONFIG],
          ['card', {keyPath: 'name'}],
        ]),
      )
      isDbCreated = true
    } catch (e) {
      console.error(e)
    }
  }

  onMount(() => createIndexedDB())

</script>

<ModalsRoot>
  {#if isDbCreated}
    <div id="notify-block"
         class="absolute top-1/2 left-1/2 width[100px] height[100px] bg-red-500"
    >
      <p>
        <span>
          the db is created
        </span>
      </p>
    </div>
  {/if}

  <div class="flex flex-col h-full">
    <TheHeader />

    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</ModalsRoot>

<style lang="scss">
  :global(html) {
    height: 100%;
    font-family: 'Roboto Slab', serif;
    background-color: #2b665e;
    //@apply bg-blue-600 text-slate-900;
  }

  :global(body) {
    //display: flex;
    //flex-direction: column;
    //min-height: 100vh;
    //min-height: 100svh;
    height: 100%;
  }
</style>

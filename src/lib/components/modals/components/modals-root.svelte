<script context="module">
  export const MODALS_DIR = "../../modals"
  export const MODALS_LIST = {
    DICT_LIST_MODAL: "dicts-list-modal"
  }
</script>

<script lang="ts">
  import {setContext} from 'svelte'

  let name = ''
  // eslint-disable-next-line no-unused-vars
  let data = null

  // let promise = null
  let resolve = () => {}
  // let reject = () => {}

  const reset = () => {
    name = ''
    data = null
  }

  const open = ({name: _name, data: _data = null}) => {
    return new Promise (res => {
      name = _name
      data = _data
      resolve = res
    }).finally(() => {
      reset()
    })
  }

  setContext("modals-root", {
    open,
    close: (...args) => resolve(...args),
  })
</script>

<!--app entry-->
<slot></slot>

<!--overlay-->
{#if name.length > 0}
  {#await import(/* @vite-ignore */ `${MODALS_DIR}/components/overlay.svelte`) then overlay}
    <svelte:component this={overlay.default} />
  {/await}
{/if}

<!--modals-->
{#if name === 'create-dict-form'}
  {#await import(/* @vite-ignore */ `${MODALS_DIR}/create-dict-form.svelte`) then createDictForm}
    <svelte:component this={createDictForm.default} />
  {/await}
{/if}

{#if name === MODALS_LIST.DICT_LIST_MODAL}
  {#await import(/* @vite-ignore */ `${MODALS_DIR}/${MODALS_LIST.DICT_LIST_MODAL}.svelte`) then createDictForm}
    <svelte:component this={createDictForm.default} />
  {/await}
{/if}

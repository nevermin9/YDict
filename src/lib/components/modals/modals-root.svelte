<script lang="ts">
  import {setContext} from 'svelte'

  type ModalName = 'create-dict-form' | 'dicts-list-modal'

  let name: ModalName = ''
  let data = null

  let resolve = () => {}

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
  {#await import('./components/overlay.svelte') then overlay}
    <svelte:component this={overlay.default} />
  {/await}
{/if}

<!--modals-->
{#if name === 'create-dict-form'}
  {#await import('./create-dict-form.svelte') then createDictForm}
    <svelte:component this={createDictForm.default} />
  {/await}
{/if}

{#if name === "dicts-list-modal"}
  {#await import('./dicts-list-modal.svelte') then createDictForm}
    <svelte:component this={createDictForm.default} />
  {/await}
{/if}

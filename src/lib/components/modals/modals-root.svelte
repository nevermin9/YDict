<script context="module" lang="ts">
</script>

<script lang="ts">
    import type {ModalName} from "$lib/context"
    import {modalsRootContext, checkModalName} from "$lib/context"

    let name: ModalName | "" = ""
    let data = null

    let resolve: (...args: any[]) => void

    const reset = () => {
        name = ""
        data = null
    }

    const open = <T>({ name: _name, data: _data = null }: {name: ModalName, data?: T | null}) => {
        const isValid = checkModalName(_name)
        if (!isValid) throw new Error("[modals-root.svelte] invalid modal name")
        return new Promise((res) => {
            name = _name
            data = _data
            resolve = res
        }).finally(() => {
            reset()
        })
    }


    modalsRootContext.set({
        open,
        close: (...args) => resolve(...args),
    })
</script>

<!--app entry-->
<slot />

<!--overlay-->
{#if name.length > 0}
    {#await import("./components/overlay.svelte") then overlay}
        <svelte:component this={overlay.default} />
    {/await}
{/if}

<!--modals-->
{#if name === "create-dict-form"}
    {#await import("./create-dict-form.svelte") then createDictForm}
        <svelte:component this={createDictForm.default} />
    {/await}
{/if}

{#if name === "dicts-list-modal"}
    {#await import("./dicts-list-modal.svelte") then createDictForm}
        <svelte:component this={createDictForm.default} />
    {/await}
{/if}

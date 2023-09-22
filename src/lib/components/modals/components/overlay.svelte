<script lang="ts">
    import { modalsRootContext } from "$lib/context"
    const { close } = modalsRootContext.get()
</script>

<div
    id="modal-overlay"
    class="fixed top-0 left-0 z-8888
    w-full h-full
     cursor-pointer"
    on:click|stopPropagation={close}
/>

<style lang="scss">
    #modal-overlay {
        background-color: hsl(0, 0%, 0%, 0.5);
    }
</style>

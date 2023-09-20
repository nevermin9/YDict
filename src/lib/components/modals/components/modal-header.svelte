<script>
    import { getContext } from "svelte"
    import SvgRoot from "$lib/components/svg/svg-root.svelte"
    import CancelIco from "$lib/components/svg/cancel-ico.svelte"

    let clazz = ""
    export { clazz as class }
    export let firstColor = ""
    export let secondColor = "bg-green-500"

    const { close } = getContext("modals-root")
</script>

<header id="modal-header" class="relative flex p-1 rounded {clazz} {firstColor}">
    <div
        class="flex items-center justify-between w-full h-full p-4 bg-green-500 rounded {secondColor}"
    >
        <h2>
            <slot />
        </h2>

        <slot name="close-btn">
            <button class="text-deepblue-500" type="button" on:click={() => close()}>
                <SvgRoot width="24px" height="24px">
                    <CancelIco />
                </SvgRoot>
            </button>
        </slot>
    </div>
</header>

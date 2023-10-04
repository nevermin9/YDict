<script lang="ts">
    import { createEventDispatcher } from "svelte"

    let clazz = ""
    export { clazz as class }
    export let isOpen = false
    export let multiple = false
    let _group: any[] = []
    let root: HTMLDivElement
    let positionX = 0;
    let positionY = 0;
    let positioning = ""


    const dispatch = createEventDispatcher()

    const open = () => {
        isOpen = true
        // calculatePosition()
        positioning = "right: 100%; top: 100%;"
    }

    const close = () => {
        dispatch("close", _group)
        _group = []
        document.removeEventListener("click", clickOutsideHandler)
        isOpen = false
    }

    const clickOutsideHandler = (event: Event) => {
        if (root.contains(event.target as Node)) return

        close()
    }

    const calculatePosition = () => {
        if (root) {
            const rect = root.getBoundingClientRect()
            
            const rightSpace = window.innerWidth - rect.right
            const leftSpace = rect.left
            const bottomSpace = window.innerHeight - rect.bottom
            const topSpace = rect.top

            // Determine where to position the options based on available space
            if (rightSpace >= rect.width) {
                // There's enough space to the right, so position there
                positionX = rect.left
            } else if (leftSpace >= rect.width) {
                // There's enough space to the left, so position there
                positionX = rect.right - rect.width
            } else {
                // Not enough space on either side, so choose the side with more space
                if (rightSpace > leftSpace) {
                    positionX = rect.left
                } else {
                    positionX = rect.right - rect.width
                }
            }

            // Determine vertical position
            if (bottomSpace >= rect.height) {
                // There's enough space below, so position below
                positionY = rect.bottom
            } else if (topSpace >= rect.height) {
                // There's enough space above, so position above
                positionY = rect.top - rect.height
            } else {
                // Not enough space above or below, so choose the side with more space
                if (bottomSpace > topSpace) {
                    positionY = rect.bottom
                } else {
                    positionY = rect.top - rect.height
                }
            }
        }
    }

    $: {
        if (isOpen) {
            document.addEventListener("click", clickOutsideHandler)
        }
        if (_group.length >= 1 && !multiple) {
            close()
        }
    }
</script>

<div class="{clazz} relative" bind:this={root}>
    <slot open="{open}" isOpen="{isOpen}" close="{close}"></slot>

    {#if isOpen}
        <div class="absolute min-w-min"
            style="{positioning} z-index: 50;"
        >
            <slot name="options" />
            <!-- <ul class="flex flex-col gap-1">
                {#each options as option, i (i)}
                    <li>
                        <label class="flex justify-start w-full h-full cursor-pointer">
                            <input
                                type="checkbox"
                                value="{option.value}"
                                bind:group={_group}
                                class="invisible w-0 h-0"
                            >
                            <span class="text-sm text-deepblue-500">
                                {option.text}
                            </span>
                        </label>
                    </li>

                    {#if ++i % 2 > 0}
                        <li class="h-[1px] w-full bg-deepblue-500"></li>
                    {/if}
                {/each}
            </ul> -->
        </div>
    {/if}
</div>
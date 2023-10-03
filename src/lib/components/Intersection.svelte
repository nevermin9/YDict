<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    const dispatch = createEventDispatcher()

    export let rootMargin = "0px"
    let observed: HTMLElement
    let observer: IntersectionObserver

    const options = {
        rootMargin,
        threshold: 1.0,
    }

    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch("intersected", entry)
                }
            })
        }, options)

        observer.observe(observed)

        return () => {
            observer.disconnect()
        }
    })


</script>

<div bind:this={observed} id="observed"></div>

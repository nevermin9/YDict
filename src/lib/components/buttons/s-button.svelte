<script>
    export let type = "button"
    export let theme = "light"
    let clazz
    export { clazz as class }
    export let disabled = false
    export let title = ""
</script>

<button on:click class="px-3 py-1 clickable-{theme} {clazz}" {type} {disabled} {title}>
    <slot />
</button>

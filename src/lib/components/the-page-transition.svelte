<script lang="ts">
    import { fly } from "svelte/transition"
    let clazz = ""
    export { clazz as class }
    export let refresh = ""
</script>

{#key refresh}
    <div
        class={clazz}
        in:fly={{ y: -50, duration: 250, delay: 300 }}
        out:fly={{ y: -50, duration: 250 }}
    >
        <slot />
    </div>
{/key}

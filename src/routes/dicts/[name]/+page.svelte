<script lang="ts">
    import { onMount } from "svelte"

    onMount(() => {
        console.log("onMount")
    })
</script>

<section>
    <h2>{data}</h2>
</section>

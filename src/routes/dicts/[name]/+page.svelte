<script lang="ts">
    import { onMount } from "svelte"
    import type { PageData } from "./$types"

    export let data: PageData

    onMount(() => {
        console.log("onMount")
    })
</script>

<section>
    <h2>{data}</h2>
</section>

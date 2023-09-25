<script lang="ts">
    let clazz: string
    export { clazz as class }
    export let word: string
    export let pronunciation: string | undefined
</script>

<div class="{clazz}">
    <h1
        class="text-3xl w-full px-2 pt-1 pb-2 bg-sand-300 text-deepblue-500 shadow-md shadow-black rounded"
    >
        {word}

        {#if pronunciation}
            <i class="text-gray-500">
                {pronunciation}
            </i>
        {/if}
    </h1>
</div>

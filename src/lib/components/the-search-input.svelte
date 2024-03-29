<script lang="ts" context="module">
    export const MIN_SEARCH_LENGTH = 3
    export const MAX_SEARCH_LENGTH = 50
</script>

<script lang="ts">
    import Loader from "$lib/components/loader.svelte"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import { debounce } from "lodash-es"
    import api from "$api"

    let clazz = ""
    export { clazz as class }

    let search: string = ""
    let searchResult: string[] = []
    let p: Promise<string[] | void> | null = null
    let abortController: AbortController | null = null

    const doSearch = async () => {
        if (search.length < MIN_SEARCH_LENGTH) return

        if (abortController) abortController.abort()

        abortController = new AbortController()

        const signal = abortController.signal

        p = api.word
            .search({
                search,
                limit: 10,
                options: {
                    signal,
                },
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("Aborted")
                    return
                }

                throw err
            })
            .finally(() => {
                abortController = null
            })

        searchResult = await p as string[]

        if (searchResult.length === 0) {
            searchResult = ["nothing"]
        }
    }

    const debouncedDoSearch = debounce(doSearch, 500)

    const stopSearchAndClear = () => {
        abortController?.abort()
        searchResult = []
    }

    $: {
        if (search?.length >= MIN_SEARCH_LENGTH) {
            debouncedDoSearch()
        } else if (!search?.length || search?.length < MIN_SEARCH_LENGTH) {
            stopSearchAndClear()
        }
    }
</script>

<div class="relative {clazz}">
    {#if searchResult?.length > 0}
        <ul
            data-sveltekit-preload-data="tap"
            class="
        the-search-input__block-result-items
        absolute w-full"
        >
            {#each searchResult.reverse() as word (word)}
                <li
                    class="
            flex
            py-2 px-0.5 clickable-light mb-1 rounded"
                >
                    <a
                        class="block w-full flex-1"
                        href={`/word?search=${encodeURIComponent(word)}`}
                    >
                        {word}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}

    <form action="/word" method="GET" data-name="lookup-form" autocomplete="off" class="flex gap-2">
        <label
            class="relative
      flex"
        >
            {#await p}
                <Loader class="absolute -left-6 top-1 text-deepblue-500" width={20} />
            {/await}

            <input
                type="text"
                name="search"
                class="text-deepblue-500 bg-transparent outline-0 border-b-2 border-deepblue-500 placeholder-deepblue-500/40"
                bind:value={search}
                maxlength="{MAX_SEARCH_LENGTH}"
                autocomplete="off"
                placeholder="Search for a word"
            />
        </label>

        <SButton type="submit">
            <span class="text-deepblue-500 font-bold text-md sm:text-lg uppercase"> look up </span>
        </SButton>
    </form>
</div>

<style lang="scss">
    .the-search-input {
        &__block-result-items {
            z-index: 10;
            bottom: 40px;
        }
    }
</style>

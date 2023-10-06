<script lang="ts" context="module">
    export const MIN_SEARCH_LENGTH = 3
    export const MAX_SEARCH_LENGTH = 50
</script>

<script lang="ts">
    import { debounce } from "lodash-es"
    import api from "$api"
    import Loader from "$lib/components/loader.svelte"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import SvgRoot from "$lib/components/svg/svg-root.svelte"
    import SearchIco from "$lib/components/svg/search-ico.svelte"

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
            py-2 px-3 bg-slate-800 border border-slate-800 hover:border-slate-200 transition-all mb-1 rounded"
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
                <Loader class="absolute -left-6 top-1" width={20} />
            {/await}

            <input
                type="text"
                name="search"
                class="bg-slate-800 outline-0 px-3 py-2 rounded shadow placeholder-white/40"
                bind:value={search}
                maxlength="{MAX_SEARCH_LENGTH}"
                autocomplete="off"
                placeholder="Search for a word"
            />
        </label>

        <SButton class="shadow" type="submit">
            <SvgRoot class="align-middle">
                <SearchIco />
            </SvgRoot>
        </SButton>
    </form>
</div>

<style lang="scss">
    .the-search-input {
        &__block-result-items {
            z-index: 10;
            bottom: 50px;
        }
    }
</style>

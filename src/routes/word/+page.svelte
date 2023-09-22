<script lang="ts">
    import type { PageData } from "./$types"
    import { teleport } from "$lib/utils/actions"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"
    import WordDefsList from "$lib/components/word-def/defs-list.svelte"
    import { Word } from "$lib/utils/idb/models"
    import { modalsRootContext, notificationsContext } from "$lib/context"

    export let data: PageData

    let selectedDefs: string[] = []
    console.log("WORD PAGE", data.wordFromDB)

    const { open } = modalsRootContext.get()
    const { add: notify } = notificationsContext.get()

    const saveWord = (dicts: string[]) => {
        const w = Word.create(data.searchedWord, dicts)
        
        return Word.save(w).then(() => {
            notify({
                message: `<span class="text-lime-50">Word "${w.word}" is saved<span>`,
                level: "INFO",
            })
        })
    }

    const openDictListModal = async () => {
        const dicts = await open({
            name: "dicts-list-modal",
        }) as string[]

        if (dicts) {
            return saveWord(dicts)
        }
    }

    const addToDict = async () => {
        await openDictListModal()
    }
</script>

<section>
    <WordTitle
        class="mb-4"
        word={data.searchedWord.word}
        pronunciation={data.searchedWord?.pronunciation?.all}
    />

    <WordDefsList bind:selectedDefs definitions={data.searchedWord?.results} />

    <div
        use:teleport={{targetId: "fixed-bottom", fixHeight: true}}
        class="fixed bottom-0 left-0 flex w-full p-3 justify-around bg-green-500 border-t border-sand-300"
    >
        <SButton type="button" disabled={!selectedDefs.length} on:click={() => addToDict()}>
            <span class="text-deepblue-500 uppercase"> add to dict </span>
        </SButton>

        <SButton type="button" disabled={!selectedDefs.length}>
            <span class="text-deepblue-500 uppercase"> add to card group </span>
        </SButton>
    </div>
</section>

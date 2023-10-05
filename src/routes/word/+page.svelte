<script lang="ts">
    import type { PageData } from "./$types"
    import { teleport } from "$lib/utils/actions"
    import { copyObj } from "$lib/utils/helpers"
    import { Word, Dictionary } from "$lib/utils/idb/models"
    import { modalsRootContext, notificationsContext } from "$lib/context"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import WordTitle from "$lib/components/word-def/word-title.svelte"
    import WordDefsList from "$lib/components/word-def/defs-list.svelte"
    import CheckboxContent from "$lib/components/form/checkbox-content.svelte"
    import WordDef from "$lib/components/word-def/word-def.svelte"

    export let data: PageData

    let selectedDefs: string[] = []
    const isSaved = Boolean(data.wordFromDB?.data?.results?.length)
    const savedDefsObj = copyObj(data.wordFromDB?.data?.results || [])
    const savedDefs = savedDefsObj.map((def) => def.definition)
    const savedDefsLength = savedDefs.length
    let checkedDefs: string[] = data.searchedWord?.results?.map((def) => def.definition)
        .filter((def) => savedDefs.includes(def)) || []
    let shouldUpdate = false
    $: {
        if (isSaved
            && selectedDefs.some((def) => !savedDefs.includes(def))
            || selectedDefs.length != savedDefsLength) {
            shouldUpdate = true
        } else {
            shouldUpdate = false
        }
    }

    const { open } = modalsRootContext.get()
    const { add: notify } = notificationsContext.get()

    const saveWord = (dicts: string[]) => {
        const w = Word.create(data.searchedWord, selectedDefs, dicts)
        
        return Word.save(w).then(async () => {
            await Dictionary.increaseLength(dicts)
            notify({
                message: `<span class="text-lime-50">Word "${w.word}" is saved<span>`,
                level: "INFO",
            })
        }).catch(() => {
            notify({
                message: `<span class="text-lime-50">Word "${w.word}" is not saved<span>`,
                level: "ERROR",
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

    const updateWord = () => {
        const w = Word.create(data.searchedWord, selectedDefs, data.wordFromDB!.dicts)

        return Word.save(w).then(() => {
            notify({
                message: `<span class="text-lime-50">Word "${w.word}" is updated<span>`,
                level: "INFO",
            })
        }).catch(() => {
            notify({
                message: `<span class="text-lime-50">Word "${w.word}" is not updated<span>`,
                level: "ERROR",
            })
        })
    }
</script>

<section>
    <WordTitle
        class="mb-4"
        word={data.searchedWord.word}
        pronunciation={data.searchedWord?.pronunciation?.all}
    />

    <WordDefsList definitions={data.searchedWord?.results}>
            <CheckboxContent
                slot="def"
                let:def
                value={def.definition}
                bind:group={selectedDefs}
                checked={checkedDefs.includes(def.definition)}
                class="flex items-start gap-2"
            >
                <WordDef wordDefinition={def} />
            </CheckboxContent>
    </WordDefsList>

    <div
        use:teleport={{targetId: "fixed-bottom", fixHeight: true}}
        class="fixed bottom-0 left-0 flex w-full p-3 justify-around bg-green-500 border-t border-sand-300"
    >
        <SButton type="button" disabled={!selectedDefs.length} on:click={() => addToDict()}>
            <span class="text-deepblue-500 uppercase"> add to dict </span>
        </SButton>

        {#if isSaved}
            <SButton type="button" disabled={!shouldUpdate} on:click={() => updateWord()}>
                <span class="text-deepblue-500 uppercase"> update </span>
            </SButton>
        {/if}

        <!-- <SButton type="button" disabled={!selectedDefs.length}>
            <span class="text-deepblue-500 uppercase"> add to card group </span>
        </SButton> -->
    </div>
</section>

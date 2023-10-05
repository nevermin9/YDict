<script lang="ts">
    import { onMount } from "svelte"
    import ModalBody from "./components/modal-body.svelte"
    import ModalHeader from "./components/modal-header.svelte"
    import ModalContent from "./components/modal-content.svelte"
    import { Dictionary } from "$lib/utils/idb/models"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import { modalsRootContext } from "$lib/context"

    const { close } = modalsRootContext.get()
    let dictsNames: string[] = []
    let selectedDicts: string[] = [Dictionary.DEFAULT_DICT]

    const getDictsNames = async () => {
        dictsNames = await Dictionary.getAllDictsNames()
    }

    onMount(async () => {
        await getDictsNames()
    })

    const closeModal = async () => {
        close(selectedDicts)
    }
</script>

<ModalBody class="bg-sand-300 rounded">
    <ModalHeader>
        <span class="text-deepblue-500 text-2xl"> Choose dictionaries </span>
    </ModalHeader>

    <ModalContent class="flex flex-col justify-between">
        <div class="m-auto max-h-[250px] h-full">
            <ul class="grid auto-rows-min items-center gap-1 h-full pr-4 overflow-auto">
                {#each dictsNames as dictName, i (i)}
                    <li>
                        <label class="inline-block px-3 py-1 clickable-blue" for={dictName}>
                            <input
                                id={dictName}
                                name={dictName}
                                value={dictName}
                                bind:group={selectedDicts}
                                type="checkbox"
                            />

                            <span class="text-deepblue-500 uppercase">
                                {dictName}
                            </span>
                        </label>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="flex p-1">
            <SButton class="m-auto shadow-md" on:click={() => closeModal()}>
                <span class="text-deepblue-500"> FINISH SELECTING </span>
            </SButton>
        </div>
    </ModalContent>
</ModalBody>

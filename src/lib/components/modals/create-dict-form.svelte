<script>
    import ModalBody from "./components/modal-body.svelte"
    import ModalHeader from "./components/modal-header.svelte"
    import ModalContent from "./components/modal-content.svelte"
    import { getContext } from "svelte"
    import { Dictionary } from "$lib/utils/idb/models"
    import SButton from "$lib/components/buttons/s-button.svelte"

    const { close: closeModal } = getContext("modals-root")
    let dictName = ""
    let dictDescription = ""
    const createDictionary = async () => {
        const dict = {
            name: dictName,
            description: dictDescription,
            words: [],
        }
        const dictToCreate = new Dictionary(dict)
        const result = await Dictionary.create(dictToCreate)
        closeModal(result)
    }
</script>

<ModalBody class="bg-sand-300 rounded">
    <ModalHeader>
        <span class="text-deepblue-500 text-2xl"> Create dictionary </span>
    </ModalHeader>

    <ModalContent>
        <form
            class="flex flex-col h-full w-full"
            on:submit|preventDefault={() => createDictionary()}
        >
            <label class="m-auto flex flex-col">
                <span class="text-deepblue-500 text-xl"> The name of the dictionary: </span>

                <input
                    class="text-deepblue-500 bg-transparent outline-0 border-b-2 border-deepblue-500"
                    bind:value={dictName}
                    type="text"
                    name="name"
                    placeholder="Name"
                />
            </label>

            <SButton class="shadow-md" type="submit">
                <span class="uppercase text-deepblue-500"> create </span>
            </SButton>
        </form>
    </ModalContent>
</ModalBody>

<script lang="ts">
    import ModalBody from "./components/modal-body.svelte"
    import ModalHeader from "./components/modal-header.svelte"
    import ModalContent from "./components/modal-content.svelte"
    import SvgRoot from "$lib/components/svg/svg-root.svelte"
    import DoneIco from "$lib/components/svg/done-ico.svelte"
    import CancelIco from "$lib/components/svg/cancel-ico.svelte"
    import { Dictionary } from "$lib/utils/idb/models"
    import SButton from "$lib/components/buttons/s-button.svelte"
    import { modalsRootContext } from "$lib/context"
    import { fade } from "svelte/transition"
    import { onMount } from "svelte"

    const { close: closeModal, reject } = modalsRootContext.get()
    let dictsNames: string[] = []
    let dictName = ""
    let dictDescription = ""
    let isValidName = false
    let isValidLength = false
    let isValids: { valid: boolean; message: string }[] = []
    let isValid = false
    const update = () => {
        isValids = [
            {
                valid: isValidLength,
                message: "At least 3 characters long",
            },
            {
                valid: isValidName,
                message: "The name is unique",
            },
        ]
        isValid = isValids.every((v) => v.valid)
    }
    
    const validate = (name: string) => {
        const n = name.trim()
        if (n.length < Dictionary.MIN_DICT_NAME_LENGTH) {
            isValidLength = false
            isValidName = false
            return
        }

        isValidLength = true

        if (dictsNames.includes(n.toLowerCase())) {
            isValidName = false
            return
        }

        isValidName = true
    }
    $: {
        validate(dictName)
        update()
    }

    const createDictionary = async () => {
        if (!isValid) {
            return
        }
        const dict = {
            name: dictName,
            description: dictDescription,
            words: [],
        }
        const dictToCreate = new Dictionary(dict)
        let result
        try {
            result = await Dictionary.save(dictToCreate)

            closeModal(result)
        } catch (e) {
            reject(e)
        }
    }

    onMount(async () => {
        dictsNames = await Dictionary.getAllDictsNames()
    })

</script>

<ModalBody class="bg-sand-300 rounded">
    <ModalHeader>
        <span class="text-deepblue-500 text-2xl"> Create dictionary </span>
    </ModalHeader>

    <ModalContent class="flex flex-col">
        <ul class="m-auto">
            {#each isValids as isV, i (i)}
                <li
                    class="flex gap-1 items-center transition-colors duration-700 {isV.valid
                        ? 'text-green-600'
                        : 'text-gray-500'}"
                >

                    {#if !isV.valid}
                        <div in:fade={{duration: 300}} class="w-[24px] h-[24px]">
                            <SvgRoot class="block">
                                <CancelIco />
                            </SvgRoot>
                        </div>
                    {:else}
                        <div in:fade={{duration: 300}} class="w-[24px] h-[24px]">
                            <SvgRoot class="block">
                                <DoneIco />
                            </SvgRoot>
                        </div>
                    {/if}


                    <span class={isV.valid ? "drop-shadow" : ""}>
                        {isV.message}
                    </span>
                </li>
            {/each}
        </ul>

        <form
            class="flex flex-col h-full w-full"
            on:submit|preventDefault={() => createDictionary()}
        >
            <label class="m-auto flex flex-col gap-2">
                <span class="text-deepblue-500 text-xl"> The name of the dictionary: </span>

                <input
                    class="text-deepblue-500 bg-transparent outline-0 border-b-2 border-deepblue-500"
                    bind:value={dictName}
                    type="text"
                    name="name"
                    placeholder="Name"
                    maxlength="{Dictionary.MAX_DICT_NAME_LENGTH}"
                    autocomplete="off"
                />
            </label>

            <SButton disabled={!isValid} class="shadow-md" type="submit">
                <span class="uppercase text-deepblue-500"> create </span>
            </SButton>
        </form>
    </ModalContent>
</ModalBody>

<script>
  import {getContext, onMount} from 'svelte'
  import ModalBody from "./components/modal-body.svelte"
  import ModalHeader from "./components/modal-header.svelte"
  import {Dictionary} from '$lib/utils/idb/models'
  import SButton from "$lib/components/buttons/s-button.svelte"

  const {close} = getContext("modals-root")
  let dictsNames = []
  let selectedDicts = ["saved"]

  const getDictsNames = async () => {
    dictsNames = await Dictionary.getAllDictsNames()
  }

  onMount(async () => {
    await getDictsNames()
  })

  const closeModal = async () => {
    close(selectedDicts.filter(d => d !== "saved"))
  }
</script>

<ModalBody class="bg-sand-300 rounded">
  <ModalHeader>
    <span class="text-deepblue-500">
      Choose dictionaries to save in
    </span>
  </ModalHeader>

  <section class="flex-1 flex flex-col justify-between">
    <div class="m-auto max-h-[250px] h-full">
      <ul class="grid items-center gap-1 h-full pr-4 overflow-auto">
        <li>
          <label class="inline-block px-3 py-1 clickable-light" for="saved">
            <input
                id="saved"
                name="saved"
                value="saved"
                bind:group={selectedDicts}
                type="checkbox"
                disabled
            >

            <span class="text-deepblue-500 uppercase">
              Saved
            </span>
          </label>
        </li>

        {#each dictsNames as dictName}
          <li>
            <label
                class="inline-block px-3 py-1 clickable-light"
                for={dictName}>
              <input
                  id={dictName}
                  name={dictName}
                  value={dictName}
                  bind:group={selectedDicts}
                  type="checkbox"
              >

              <span class="text-deepblue-500 uppercase">
                {dictName}
              </span>
            </label>
          </li>
        {/each}
      </ul>

    </div>

    <div class="flex p-1 pb-2">
      <SButton
          class="m-auto shadow-md"
          on:click={() => closeModal()}
      >
        <span class="text-deepblue-500">
          FINISH SELECTING
        </span>
      </SButton>
    </div>
  </section>
</ModalBody>


<script>
  import {getContext} from "svelte"

  let clazz = ""
  export {clazz as class}
  const {close} = getContext("modals-root")
</script>

<header
    id="modal-header"
    class="relative flex p-1 rounded {clazz}"
>
  <div
      class="flex items-center justify-between w-full h-full p-4 bg-skyblue-500 rounded"
  >
    <h2>
      <slot/>
    </h2>

    <slot name="close-btn">
        <span
            class="inline-block p-1 bg-skyblue-700 w-6 h-6 rounded"
        >
          <button
              class="w-full h-full bg-gray-400 rounded"
              type="button"
              on:click={() => close()}
          >
            x
          </button>
        </span>
    </slot>
  </div>
</header>

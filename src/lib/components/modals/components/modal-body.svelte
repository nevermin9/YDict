<script>
  let clazz = ''
  export { clazz as class }
</script>

<section
    id="modal-body"
    class="fixed z-9999 top-0 left-0 h-full w-full p-4
  flex flex-col justify-center items-center"
>
  <div
      class="flex flex-col max-w-md w-full max-h-96 h-full {clazz}"
  >
    <slot />
  </div>
</section>

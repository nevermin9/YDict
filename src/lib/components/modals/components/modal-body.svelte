<script>
  let clazz = ''
  export { clazz as class }
</script>

<section
    id="modal-body"
    class="fixed top-1/2 left-1/2 z-9999
     flex flex-col max-w-md w-full max-h-96 h-full
      -translate-x-1/2 -translate-y-1/2
      bg-gray-400 rounded {clazz}">
  <slot />
</section>

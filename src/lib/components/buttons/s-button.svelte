<script>
  export let type = "button";
  export let theme = "light"
  let clazz
  export {clazz as class}
</script>

<button
    on:click
    class="px-3 py-1 clickable-{theme} {clazz}"
    {type}
>
    <slot />
</button>

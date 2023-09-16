<script>
  export let width = "1em"
  export let height = "1em"
  let clazz
  export { clazz as class }
</script>


<svg width={width} height={height} class="{clazz}">
  <slot />
</svg>

<style>
  :global(svg) {
    fill: currentColor;
    display: inline-block;
    vertical-align: middle;
  }
</style>


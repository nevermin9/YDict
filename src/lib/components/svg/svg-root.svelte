<script>
  export let width = "24"
  export let height = "24"
  let clazz
  export { clazz as class }
</script>


<svg width={width} height={height}  class="{clazz}">
<!--  <svg width={width} height={height} viewBox="0 0 {width} {height}" class="{clazz}">-->
  <slot />
</svg>

<style>
  :global(svg) {
    fill: currentColor;
    display: inline-block;
    vertical-align: middle;
  }
</style>


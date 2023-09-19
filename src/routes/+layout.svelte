
<script lang="ts">
  import "$lib/style/index.scss"
  import ModalsRoot from '$lib/components/modals/modals-root.svelte'
  import TheHeader from "$lib/components/the-header.svelte"
  import NotifBlock from "$lib/components/notif-block.svelte"
  import type { Notification } from "$lib/types"
  import {
    getFirstNotification,
    removeFirstNotification,
    notifications,
  } from "$lib/store"
	import { onDestroy } from "svelte";

  export let data
  let openNotificationBlock: (v: Notification) => Promise<void>

  let currentNotif: Notification | null = null
  const showNotification = async () => {
    currentNotif = getFirstNotification()
    await openNotificationBlock(currentNotif)
      .then(() => {
        removeFirstNotification()
        return showNotification()
      })
      .finally(() => {
        currentNotif = null
      })
  }

  const uns = notifications.subscribe(async v => {
    if (!v.length || currentNotif) return
    await showNotification()
  })

  onDestroy(() => {
    uns()
  })

</script>

<ModalsRoot>
  <NotifBlock
      bind:open={openNotificationBlock}
      class="absolute left-1/2 -translate-x-1/2 top-24 z-9999"
  />

  {#if !data.is_success}
    <div id="notify-block"
         class="absolute top-1/2 left-1/2 width[100px] height[100px] bg-red-500"
    >
      <p>
        <span>
          {data.reason}
        </span>
      </p>
    </div>
  {/if}

  <div class="flex flex-col h-full">
    <TheHeader class="shrink-0" />

    <div class="flex-1 h-full px-2">
      <slot />
    </div>
  </div>

  <div
      id="fixed-bottom"
      class="min-w-min min-h-min"
  > </div>
</ModalsRoot>

<style lang="scss">
  :global(html) {
    height: 100%;
    font-family: 'Roboto Slab', serif;
    @apply bg-green-500;
    //background-color: #81B29A;
    //#3D405B - deepblue
    //#E07A5F - terra code (red)
    // antique white #F4F1DE
    //muted sage green #81B29A
  }

  :global(body) {
    height: 100%;
  }
</style>

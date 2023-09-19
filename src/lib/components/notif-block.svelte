<script lang="ts" context="module">
  const DEFAULT_SHOW_TIME = 3000
</script>

<script lang="ts">
  import {slide} from "svelte/transition"
  import { onMount } from "svelte"
  import type { NotifLevel, Notification, NotifLevelKey } from "$lib/types"

  const COLORS: Record<NotifLevel, string> = {
    0: "lime-400",
    1: "yellow-500",
    2: "red-500",
  } as const

  const LVL_TO_NUM: Record<NotifLevelKey, NotifLevel> = {
    INFO: 0,
    WARN: 1,
    ERROR: 2,
  }

  let clazz = ""
  export { clazz as class }

  let message = ""
  let level: NotifLevel = 0
  const setLevel = (v: NotifLevel | NotifLevelKey) => {
    if (typeof v === "number") {
      level = v
      return
    }

    const _n = LVL_TO_NUM[v.toUpperCase() as NotifLevelKey]

    if (_n == null) {
      throw new Error("[notif-block.svelte] invalid notif level")
    }
    

    level = _n
  }

  export const open = (_n: Notification): Promise<void> => {
    setLevel(_n.level)
    message = _n.message

    return new Promise(resolve => {
      setTimeout(async () => {
        message = ""
        await (new Promise(r => setTimeout(r, 500)))
        resolve()
      }, _n.showTime || DEFAULT_SHOW_TIME)
    })
  }

  const getColor = (_lvl: NotifLevel) => {
    return COLORS[_lvl]
  }
</script>

<ul class="{clazz} pointer-events-none">
  {#if message}
    <li
        transition:slide={{duration: 400}}
        class="text-deepblue-500 px-3 py-1 bg-{getColor(level)} rounded"
    >
      {@html message}
    </li>
  {/if}
</ul>

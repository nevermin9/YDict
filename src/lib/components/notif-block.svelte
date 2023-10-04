<script lang="ts" context="module">
    const DEFAULT_SHOW_TIME = 2000
</script>

<script lang="ts">
    import { slide } from "svelte/transition"
    import type { NotifLevel, Notification, NotifLevelKey } from "$lib/types"

    const COLORS: Record<NotifLevel, string> = {
        0: "text-lime-50 bg-green-600",
        1: "bg-yellow-500",
        2: "text-deepblue-500 bg-red-500",
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

        return new Promise((resolve) => {
            setTimeout(async () => {
                message = ""
                await new Promise((r) => setTimeout(r, 500))
                resolve()
            }, _n.showTime || DEFAULT_SHOW_TIME)
        })
    }

    const getColor = (_lvl: NotifLevel) => {
        return COLORS[_lvl]
    }
</script>

<ul class="{clazz} pointer-events-none px-4">
    {#if message}
        <li
            transition:slide={{ duration: 400 }}
            class="text-deepblue-500 px-3 py-1 {getColor(level)} rounded text-center border border-deepblue-500"
        >
            {@html message}
        </li>
    {/if}
</ul>

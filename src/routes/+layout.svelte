<script lang="ts">
    import "$lib/style/index.scss"
    import ModalsRoot from "$lib/components/modals/modals-root.svelte"
    import TheHeader from "$lib/components/the-header.svelte"
    import NotifBlock from "$lib/components/notif-block.svelte"
    import type { Notification } from "$lib/types"
    import { getFirstNotification, removeFirstNotification, notifications } from "$lib/store"
    import { onDestroy } from "svelte"
    import ThePageTransition from "$lib/components/the-page-transition.svelte"

    // import {page} from "$app/stores"
    // console.log($page);

    export let data

    let openNotificationBlock: (v: Notification) => Promise<void>
    let currentNotif: Notification | null = null
    const showNotification = async () => {
        currentNotif = getFirstNotification()
        if (currentNotif == null) return
        await openNotificationBlock(currentNotif)
            .then(() => {
                removeFirstNotification()
                return showNotification()
            })
            .finally(() => {
                currentNotif = null
            })
    }

    const uns = notifications.subscribe(async (v) => {
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
        <div
            id="notify-block"
            class="absolute top-1/2 left-1/2 width[100px] height[100px] bg-red-500"
        >
            <p>
                <span>
                    {data.reason}
                </span>
            </p>
        </div>
    {/if}

    <TheHeader class="h-full" />

    <ThePageTransition class="main-wrapper h-full" refresh={data.pathname}>
        <main class="flex-1 h-full px-2 pt-2 pb-6">
            <slot />
        </main>
    </ThePageTransition>

    <div id="fixed-bottom" class="min-w-min min-h-min" />
</ModalsRoot>

<style lang="scss">
    :root {
        --header-height-mob: 4rem;
        --header-height-desktop: 4.7rem;
    }
    :global(html) {
        height: 100%;
        font-family: "Roboto Slab", serif;
        @apply bg-green-500;
        //background-color: #81B29A;
        //#3D405B - deepblue
        //#E07A5F - terra code (red)
        // antique white #F4F1DE
        //muted sage green #81B29A
    }

    :global(body) {
        height: 100%;
        display: grid;
        overflow: auto;
        grid-template:
            "header" var(--header-height-mob)
            "main" 1fr
            "footer" auto
            / auto;
        // gap: ;
        
        @media screen and (min-width: 768px) {
            grid-template:
                "header" var(--header-height-desktop)
                "main" 1fr
                "footer" auto
                / 1fr auto;
        }
    }

    :global(header) {
        grid-area: header;
    }

    .fixed-bottom {
        grid-area: footer;
    }

    :global(.main-wrapper) {
        grid-area: main;
    }
</style>

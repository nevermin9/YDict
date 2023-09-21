<script lang="ts" context="module">
    import CardIco from "$lib/components/svg/card-ico.svelte"
    import DictIco from "$lib/components/svg/dict-ico.svelte"
    import HomeIco from "$lib/components/svg/home-ico.svelte"

    type MenuItem = {
        id: string
        name: string
        href: string
        icon: typeof CardIco
        itIsMe: (pathname: string) => boolean
    }

    const MENU_ITEMS: MenuItem[] = [
        {
            id: "cards",
            name: "Card sets",
            href: "/cards",
            icon: CardIco,
            itIsMe: (pathname) => pathname.startsWith("/cards"),
        },
        {
            id: "home",
            name: "Home",
            href: "/",
            icon: HomeIco,
            itIsMe: (pathname) => pathname === "/",
        },
        {
            id: "dicts",
            name: "My dicts",
            href: "/dicts",
            icon: DictIco,
            itIsMe: (pathname) => pathname.startsWith("/dicts"),
        },
    ]
</script>

<script lang="ts">
    import SvgRoot from "$lib/components/svg/svg-root.svelte"

    let clazz = ""

    export { clazz as class }
</script>

<header class="the-header {clazz}">
    <div class="the-header__body
    fixed z-7777 top-0 left-1/2 -translate-x-1/2
    w-full max-w-md p-1 pt-2"
    >
        <nav class="the-header__nav shadow-xl w-full h-full">
            <ul
                class="
        the-header__nav-list
        grid grid-cols-3 grid-rows-1 gap-1 w-full h-full
        "
            >
                {#each MENU_ITEMS as item (item.id)}
                    <li
                        class="
              the-header__nav-list-item
              w-full h-full
              p-0.5 text-xs
              rounded
              border-deepblue-500
              border
              bg-sand-300
              shadow-md"
                    >
                        <a
                            href={item.href}
                            class="
                the-header__nav-list-link
                flex flex-col
                w-full h-full
                active:shadow-inner
                text-deepblue-500
                 items-center justify-center"
                        >
                            <SvgRoot class="the-header__svg-root" width="24" height="24">
                                <svelte:component this={item.icon} />
                            </SvgRoot>

                            <span class="the-header__link-name font-bold text-center">
                                {item.name}
                            </span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</header>

<style lang="scss">
    .the-header {
        $root: &;

        &__body {
            height: var(--header-height-mob);

            @media screen and (min-width: 768px) {
                height: var(--header-height-desktop);
            }
        }

        &__nav-list-link:active {
            :global(#{$root}__svg-root) {
                transition: transform 0.3s;
                transform: translateY(2px);
            }
        }
    }
</style>

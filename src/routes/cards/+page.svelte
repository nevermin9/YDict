<script>
    import Card, {
        generateCardTransform,
        throwLeftAnimationClass,
        throwRightAnimationClass,
    } from "$lib/components/card/card.svelte"
    import { onMount } from "svelte"
    import SButton from "$lib/components/buttons/s-button.svelte"

    let listOfData = [
        { id: 1, word: "the card", translation: "карта" },
        { id: 2, word: "the ant", translation: "муравей" },
        { id: 3, word: "the war", translation: "война" },
    ]
    let currentCard = 0
    let cards = []
    let card = null

    onMount(() => {
        card = cards[currentCard]
    })

    let rotY = 0
    let ROTATE = 180

    const moveToNextCard = () => {
        card.remove()
        listOfData.shift()
        currentCard += 1
        card = cards[currentCard]
        rotY = 0
    }

    const rotateCard = () => {
        const rotZ = parseFloat(getComputedStyle(card).getPropertyValue("--card-rotate-z"))
        rotY = rotY < 0 ? rotY + ROTATE : rotY - ROTATE
        card.style.transform = generateCardTransform(rotZ, rotY)
    }

    const toLearnCard = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // relative to what transform translate() is calculated?
        card.addEventListener("animationend", () => {
            moveToNextCard()
        })
        card.classList.add(throwLeftAnimationClass)
    }

    const markAsLearned = (e) => {
        e.preventDefault()
        e.stopPropagation()
        card.addEventListener("animationend", () => {
            console.log("animationend 1")
            moveToNextCard()
        })
        card.classList.add(throwRightAnimationClass)
    }
</script>

<section class="h-full">
    <div on:pointerdown={rotateCard} class="relative w-full h-full" style:perspective="1000px">
        {#each listOfData as data, i (data.id)}
            <Card
                bind:card={cards[i]}
                {data}
                --card-z-index={listOfData.length - i}
                --card-rotate-z="{Math.sin(Math.random() + i) * 10}deg"
            />
        {/each}
    </div>

    <div class="flex flex-1 justify-center pb-2.5">
        <SButton class="p-1" on:click={toLearnCard}>to learn</SButton>

        <button on:click={markAsLearned}> mark as learned </button>
    </div>
</section>

<style lang="scss">
</style>

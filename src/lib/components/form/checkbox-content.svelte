<script lang="ts">
    let clazz = ""
    export let disabled = false
    export let value = ""
    export let checked = false
    export let group: string[] = []

    export { clazz as class }

    const ID = "checkbox-" + Math.random().toString(36).slice(2, 9)

    $: updateGroup(checked)
    $: updateCheckbox(group)

    function updateCheckbox(group: string[]) {
        checked = group.includes(value)
    }

    function updateGroup(checked: boolean) {
        const index = group.indexOf(value)

        if (checked) {
            if (index < 0) {
                group.push(value)
            }
        } else {
            if (index >= 0) {
                group.splice(index, 1)
            }
        }

        group = group
    }
</script>

<label class={clazz} for={ID}>
    <input id="{ID}" type="checkbox" bind:checked {value} {disabled} />

    <slot />
</label>

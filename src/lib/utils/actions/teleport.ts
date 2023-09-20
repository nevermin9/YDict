export const teleport = (node: HTMLElement, targetId: string) => {
    const target = document.getElementById(targetId)
    if (target === null) throw new Error(`Target element with id ${targetId} not found`)
    target.appendChild(node)
    return {
        destroy() {
            node.remove()
        },
    }
}

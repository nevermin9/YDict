type TeleportParams = {targetId: string, fixHeight?: boolean}
export const teleport = ( node: HTMLElement, {targetId, fixHeight = false}: TeleportParams) => {
    const target = document.getElementById(targetId)
    if (target === null) throw new Error(`Target element with id ${targetId} not found`)
    const targetHeight = target.offsetHeight
    if (fixHeight) {
        const nodeHeight = node.offsetHeight
        target.style.height = `${nodeHeight}px`
    }
    target.appendChild(node)
    return {
        destroy() {
            if (fixHeight) {
                target.style.height = `${targetHeight}px`
            }
            node.remove()
        },
    }
}

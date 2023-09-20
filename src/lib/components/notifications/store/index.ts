import { writable } from "svelte/store"
import type { INotification } from "$lib/types"

const notifications = writable<INotification[]>([])

export const addNotification = (notification: { text: string; ico: string }) => {
    notifications.update((notifications) => [
        ...notifications,
        {
            id: Math.random().toString(36).slice(2, 9),
            ...notification,
        },
    ])
}

export const removeNotification = (id: string) => {
    notifications.update((notifications) => notifications.filter((n) => n.id !== id))
}

export default notifications

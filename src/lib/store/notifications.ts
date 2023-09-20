import { writable, get } from "svelte/store"
import type { Notification } from "$lib/types"

export const notifications = writable<Notification[]>([])

export const addNotification = (notification: Notification) => {
    notifications.update((n) => [...n, notification])
}
export const getFirstNotification = () => {
    return get(notifications)[0]
}
export const removeFirstNotification = () => {
    notifications.update((n) => n.slice(1))
}

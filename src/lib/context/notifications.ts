import { createContext } from "./context"
import type { Notification } from "$lib/types"

const CTX_NAME = "notifications"

export type NotificationsContext = {
    add: (notification: Notification) => void
}

export const notificationsContext = createContext<NotificationsContext>(CTX_NAME)
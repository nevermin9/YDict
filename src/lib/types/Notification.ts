const NOTIF_LEVEL = {
  INFO: 0,
  WARN: 1,
  ERROR: 2,
} as const

export type NotifLevel = typeof NOTIF_LEVEL[keyof typeof NOTIF_LEVEL]
export type NotifLevelKey = keyof typeof NOTIF_LEVEL
export interface Notification {
  message: string
  level: NotifLevel | NotifLevelKey
  showTime?: number
}
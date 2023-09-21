import { createContext } from "./context"

const CTX_NAME = "modals-root"

export type ModalName = "create-dict-form" | "dicts-list-modal"

export const checkModalName = (name: string): name is ModalName => {
    return ["create-dict-form", "dicts-list-modal"].includes(name)
}

export type ModalsRootContext = {
    open: <T>(v: { name: ModalName; data?: T | null }) => Promise<unknown>
    close: <T>(...args: T[]) => void
}

export const modalsRootContext = createContext<ModalsRootContext>(CTX_NAME)
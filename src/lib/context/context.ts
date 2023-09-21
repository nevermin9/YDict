import { getContext, setContext } from "svelte"

/**
 * The context object.
 */
export interface Context<T> {
    get: () => T;
    set: (ctx: T) => T;
}

function randomContextName() {
    return `$$context_${Math.random().toString(36).slice(2)}`
}

/**
 * Creates a context.
 */
export function createContext<T>(key: string = randomContextName()): Context<T> {
    return {
        get: () => getContext<T>(key),
        set: (ctx: T) => setContext(key, ctx),
    }
}
declare module "$env/static/public" {
    export const PUBLIC_IDB_VERSION: string
    export const PUBLIC_IDB_NAME: string
}

declare module "$env/static/private" {
    export const PRIVATE_OPENAI_API_KEY: string
}

import HTTPResponseError from "./HTTPResponseError"
// const url = 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf';
const options = {
    headers: {
        "X-RapidAPI-Key": "922985cebdmsh116899822948343p1a8c90jsn3e3039ef24b3",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
}

class HttpClient {
    static LOG_PREFIX = "[HttpClient]"
    private baseUrl: string
    private options: RequestInit

    constructor(baseUrl: string, options: RequestInit) {
        this.baseUrl = baseUrl
        this.options = options
        // this.onErrorHandler = options.onErrorHandler || (() => {
        // });
    }

    async #makeRequest(
        url: string,
        method: string,
        options: RequestInit & { params?: Record<string, string> }
    ) {
        if (!url?.length) {
            throw new Error("url is required")
        }

        const link = new URL(url, this.baseUrl)
        const queries = options.params ?? {}
        link.search = new URLSearchParams(queries).toString()

        try {
            const res = await fetch(link, {
                method,
                ...this.options,
                ...options,
            })

            if (!res.ok) {
                throw new HTTPResponseError(res)
            }

            return res
        } catch (error) {
            console.error(`${HttpClient.LOG_PREFIX}`, error)
            throw error
        }
    }

    async get(url: string, options: RequestInit & { params?: Record<string, string> } = {}) {
        return this.#makeRequest(url, "GET", options)
    }
}

export default new HttpClient("https://wordsapiv1.p.rapidapi.com", options)

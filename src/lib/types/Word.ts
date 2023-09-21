export interface IWord {
    word: string
    dicts: string[]
    cards: string[]
    data: StoredWordData
}

export type StoredWordData = Partial<WordApiData>

export type WordDefinition = {
    definition: string
    hasTypes: string[]
    partOfSpeech: string
    synonyms: string[]
    typeOf: string[]
    derivation: string[]
}

// translate bc
export type WordApiData = {
    word: string
    frequency?: number
    pronunciation: {
        all: string
    }
    // separate type
    results: WordDefinition[]
    syllables?: {
        count: number
        list: string[]
    }
}

export type WordSearchParams = {
    search: string
    limit: number
    options: RequestInit & {
        params?: {
            letterPattern: string
            limit: number
        }
    }
}

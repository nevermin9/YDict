export interface IWord {
  word: string
  dicts: string[]
  cards: string[]
  data: WordApiData
}

export type WordDefinition = {
  definition: string
  hasTypes: string[]
  partOfSpeech: string
  synonyms: string[]
  typeOf: string[]
}

// translate bc
export type WordApiData = {
  frequency?: number
  pronunciation: {
    all: string
  };
  // separate type
  results: WordDefinition[],
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


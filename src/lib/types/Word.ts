export interface IWord {
  word: string
  dicts: string[]
  cards: string[]
  // data: IWordApiData;
}

export type IWordDefinition = {
  definition: string
  hasTypes: string[]
  partOfSpeech: string
  synonyms: string[]
  typeOf: string[]
}

// translate bc
export type IWordApiData = {
  frequency?: number
  pronunciation: {
    all: string
  };
  // separate type
  results: IWordDefinition[],
  syllables?: {
    count: number
    list: string[]
  }
}



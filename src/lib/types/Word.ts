export interface IWord {
  word: string;
  dicts: string[];
  cards: string[];
  // data: IWordApiData;
}

// translate bc
export interface IWordApiData {
  frequency: number;
  pronunciation: {
    all: string;
  };
  // separate type
  results: {
    definition: string;
    hasTypes: string[];
    partOfSpeech: string;
    synonyms: string[];
    typeOf: string[];
  },
  syllables: {
    count: number;
    list: string[];
  }
}



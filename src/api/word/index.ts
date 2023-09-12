import httpClient from "$lib/utils/http-client"
import type {WordSearchParams, WordApiData} from "$lib/types"

const word = {
  async getWord(word: string): Promise<WordApiData> {
    try {
      const wordData = await httpClient.get(`/words/${ word }`)
        .then(res => res.json())

      return wordData
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async search({search, limit, options }: WordSearchParams): Promise<string[]> {
    const params = {
      letterPattern: `^${search}`,
      limit: limit.toString(),
    }

    return httpClient.get('/words', {...options, params})
      .then(res => res.json())
      .then(json => json.results.data as string[])
      .catch(err => {
        // handle error
        throw err
      })
  }
}

export default word

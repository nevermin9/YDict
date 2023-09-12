import httpClient from "$lib/utils/http-client"

type SearchParams = {
  search: string
  limit: number
  options: {
    params?: {
      letterPattern: string
      limit: number
    }
  }
}
const word = {
  async getWord(word: string) {
    try {
      const wordData = await httpClient.get(`/words/${ word }`)
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async search({search, limit, options }: SearchParams) {
    const params = {
      letterPattern: `^${search}`,
      limit: limit.toString(),
    }

    return httpClient.get('/words', {...options, params})
      .then(res => res.json())
      .then(json => json.results.data)
      .catch(err => {
        // handle error
        throw err
      })
  }
}

export default word

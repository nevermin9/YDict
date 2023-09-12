import api from "$api"

import type {PageLoad} from "./$types"

export const load: PageLoad = ({url}) => {
  const search = url.searchParams.get ('search')
  console.log({name: "search", search})
  // if there is no search query, return 404
  const wordData = await httpClient.get(`/words/${search ?? ''}`)
    .then(res => res.json())
  console.log({name: "wordData", wordData})

  return {
    wordData,
  }
}

import api from "$api"
import {error, redirect} from "@sveltejs/kit"
import HTTPResponseError from "$lib/utils/http-client/HTTPResponseError"

import type {PageLoad} from "./$types"

export const load: PageLoad = async ({url}) => {
  const search = url.searchParams.get ('search')

  if (!search) {
    throw redirect(307, '/')
  }

  let wordData

  try {
    wordData = await api.word.getWord(search || '')
  } catch(e) {
    if (e instanceof HTTPResponseError) {
      const res = e.response
      if (res.status >= 400 && res.status < 500) {
        throw error(res.status, res.statusText)
      }
    }

    throw e
  }

  return {
    wordData,
  }
}

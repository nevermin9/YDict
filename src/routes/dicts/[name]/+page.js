import {browser} from "$app/environment"
/** @type {import('./$types').PageLoad} */
export function load({params}) {
  if (browser) {
    console.log ('params', params)
    return {}
  }

  return {}
}

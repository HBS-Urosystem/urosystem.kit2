//export const hydrate = true
export const prerender = true

import { client } from '/src/lib/sanityClient.js'
import { hirlev } from '/src/lib/api.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async (/*{ params, route, url, fetch, page }*/) => {
  //console.log('ev.serv.js',route.id,{ params, route, url, fetch/*, page*/ })

  const news = await client.fetch(hirlev);

  if (news) {
    return {news}
  }
  return false
}

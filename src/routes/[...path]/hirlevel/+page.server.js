import { client } from '/src/lib/sanityClient.js'
import { hirlev, hirlev_doc } from '/src/lib/api.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async (/*{ params, route, url, fetch, page }*/) => {
  //console.log('ev.serv.js',route.id,{ params, route, url, fetch/*, page*/ })

  const news = await client.fetch(hirlev)
  const news_doc = await client.fetch(hirlev_doc)

  //if (news) {
    return {news, news_doc}
  //}
  return false
}

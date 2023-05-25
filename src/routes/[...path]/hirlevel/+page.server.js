import { client } from '/src/lib/sanityClient.js'
import { hirlev, hirlev_doc } from '/src/lib/api.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
  //console.log('ev.serv.js', url.searchParams.get('filter') )

  const news = await client.fetch(hirlev)
  const news_doc = await client.fetch(hirlev_doc)
  const filter = url.searchParams.get('filter')
  //if (news) {
    return {news, news_doc, filter}
  //}
  //return false
}

//export const hydrate = true
//export const prerender = true
//export const prerender = false

import { client } from '/src/lib/sanityClient.js'
import { allEvents } from '/src/lib/api.js'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, route, url, fetch/*, page*/ }) => {
  console.log('params.path',params.path/*, {route}, {url}, {fetch}, {page}*/)

  const data = await client.fetch(allEvents);

  if (data) {
    return { data }
  }
  return false
}

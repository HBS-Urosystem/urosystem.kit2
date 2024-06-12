//export const hydrate = true
//export const prerender = true

import { client } from '/src/lib/sanityClient.js'
import { allEvents } from '/src/lib/api.js'

/** @type {import('./$types').LayoutLoad} */
export const load = async (/*{ params, route, url, fetch, page }*/) => {
  //console.log('ev.serv.js',route.id,{ params, route, url, fetch/*, page*/ })

  const events = /*new Array();*/ await client.fetch(allEvents);

  if (events) {
    return {events}
  }
  return false
}

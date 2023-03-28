import { getSanityImageUrl, formatBlogPostDate } from '$lib/helpers.js'
import RSS from 'rss'
import { client } from '/src/lib/sanityClient.js'
import { allEvents } from '/src/lib/api.js'
import {toHTML} from '@portabletext/to-html'

export async function get() {
  const data = await client.fetch(allEvents)

  const feed = new RSS({
    title: 'Urosystem Events',
    description: 'We aim to give guidance for individuals who think they may have IC, as well as tips and tricks for those who have already received a diagnosis and are looking for ways to alleviate symptoms. Our company, Urosystem Ltd. is focused on spreading awareness of IC/BPS and encourages you to share our content with anyone who is affected by this disease.',
    site: 'https://www.urosystem.com/events/',//import.meta.env.SITE,
    site_url: 'https://www.urosystem.com/events',
    feed_url: 'https://www.urosystem.com/events/rss.xml', // This links to our endpoint
    customData: `<language>en-us</language>`,
  })

  for (const item of data) {
    feed.item({
      title: item.title,
      description: toHTML(item.body, {
        components: {
          /* optional object of custom components to use */
        },
      }),
      //link: `https://www.urosystem.com/events/`,
      //date: item.date1,
      enclose: {url: `${item.images?.length && getSanityImageUrl(item.images[0]).width(400).url() || ''}`},
      /*custom_elements: [
        {'img': `${item.images?.length && getSanityImageUrl(item.images[0]).width(400).url() || ''}`},
        {'date1': `${item.date1 || null}`},
        {'date2': `${item.date2 || null}`},
      ],*/
    })
  }
  return {
    body: feed.xml({ indent: true }),
  }
}
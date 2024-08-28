//export const csr = false
export const prerender = true
//export const trailingSlash = 'never' // default

import { redirect } from '@sveltejs/kit'
//import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

import { client } from "$lib/sanity/client"
/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, url/*, route, fetch, page*/ }) => {
  const CONTENT_QUERY = `*[_type == "page"] {
    ...,
    "id": slug["current"],
    "slug": slug["current"],
    sections[] {
      _type,
      _type == "heroBlock" => {
        heroBlock {
          ...
        }
      },
      _type == "textBlock" => {
        textBlock {
          ...
        }
      },
      _type == "ctaBlock" => {
        ctaBlock {
          ...
        }
      },
      _type == "imageCarousel" => {
        ...
      }
    }
  }`  
  const NAV_QUERY = `*[_type == "page"] {
    ...,
    sections[] {
      _type,
      _type == "heroBlock" => {
        heroBlock {
          ...
        }
      },
      _type == "textBlock" => {
        textBlock {
          ...
        }
      },
      _type == "ctaBlock" => {
        ctaBlock {
          ...
        }
      },
      _type == "imageCarousel" => {
        ...
      }
    }
  }
  `
  const pages = await client.fetch(CONTENT_QUERY)

  const subpage = null
  const post = {
    id: 'index',
    slug: 'en',
    fallback: '',
    published: true,
    title: 'UroDapter® – Replacing Catheter in the Field of Bladder Instillation',
    keywords: 'instillation, urological adapter, bladder treatment, urethra treatment, pain-free, catheter replacement',
    description: 'The UroDapter® urological adapter replaces catheter. It enables painless and complication-free bladder treatment for several lower urinary tract diseases.',
    menutitle: 'UroDapter®',
    subpage: null,
    ...pages[0] 
  }
  if (post.sections[0]._type == 'heroBlock') post.hero = post.sections.shift()
  const thislang = {
    id: 'en',
    title: 'English',
    dir: 'ltr',
    font: 'default',
    active: true
  }

  return {post, thislang}
}
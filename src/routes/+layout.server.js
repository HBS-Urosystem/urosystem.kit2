//export const csr = false
export const prerender = true
//export const trailingSlash = 'never' // default

import { redirect } from '@sveltejs/kit'
//import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

import { client } from "$lib/sanityClient"
/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, url/*, route, fetch, page*/ }) => {
  const CONTENT_QUERY = `*[_type == "page"] {
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
  console.log({pages})
  return {pages}
}
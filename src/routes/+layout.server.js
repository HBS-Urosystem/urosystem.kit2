//export const csr = false
export const prerender = true
//export const trailingSlash = 'never' // default

import { getSanityImageUrl/*, formatBlogPostDate*/ } from '$lib/sanity/helpers.js'
import {toHTML} from '@portabletext/to-html'

import { redirect } from '@sveltejs/kit'
//import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

import { client } from "$lib/sanity/client"
/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, url, route, page/*, fetch*/ }) => {
  //console.log(params, url, route, page)
  const CONTENT_QUERY = `*[_type == "page"] {
    ...,
    "id": slug["current"],
    "slug": slug["current"],
    sections[] {
      _type,
      _type == "heroBlock" => {
        ...
      },
      _type == "textBlock" => {
        ...
      },
      _type == "ctaBlock" => {
        ...
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

  for (const p of pages) {
    for (const s of p.sections || []) {
      if (s.image) {
        s.image.src = getSanityImageUrl(s.image).width(720).url()
        //console.log(s.image)
      }
      if (s._type == 'heroBlock') {
        s.slide = true
        //console.log(s)
      }
      if (s._type == 'ctaBlock') {
        s.slide = true
        //console.log(s)
      }
      if (s._type == 'textBlock') {
        s.text = toHTML(s.content, {
          //components: {
          //   optional object of custom components to use 
          //},
        })
        //console.log(s.text)
      }
    }
  }
  

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
    subpage: subpage,
    sections: [],
    ...pages[0] 
  }
  if (post.sections[0]?._type == 'heroBlock') {
    post.hero = post.sections.shift()
    
  }
  const thislang = {
    id: 'en',
    title: 'English',
    dir: 'ltr',
    font: 'default',
    active: true
  }

  //console.log({post})
  return {post, thislang}
}
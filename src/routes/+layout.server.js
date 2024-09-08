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
      ...,
      content[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      }
    },
    _type == "ctaBlock" => {
      ...,
      ctas[] {
        ...,
        "page": page->["slug"]["current"]
      }
    },
    _type == "cta" => {
      ...,
      "page": page->["slug"]["current"]
    },
    _type == "imageCarousel" => {
      ...
    },
    _type == "detailsBlock" => {
      ...,
      details[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      }
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
}`

const portableTextComponents = {
  types: {
    image: ({value}) => {
      //console.log('image:',{value})
      const src =  getSanityImageUrl(value.asset).width(1440).url()
      let comp = `<figure>
        <img src="${src}" alt="" />`
      if (value.caption) comp += `<figcaption>${value.caption}</figcaption>`
      comp += `</figure>`
      return comp
    },
    unknownType: ({value}) => {
      console.log('unknownType',{value})
    }
  },
  marks: {
    internalLink: ({children, value}) => {
      //console.log('internalLink:',{value})
      let comp = `<a class="II" href="${value.slug.current}">${children}</a>`
      return comp
    },
    externalLink: ({children, value}) => {
      //console.log('externalLink:',{value})
      let comp = value.blanc ? `<a class="QQ" href="${value.href}" rel="external noopener" target="_blanc">${children}</a>` : `<a href="${value.href}">${children}</a>`
      return comp
    },
  }
}

const sorting = (pages) => {
  for (const p of pages || []) {
    for (const s of p.sections || []) {
      //console.log(s)
      if (s.image) {
        s.image.src = getSanityImageUrl(s.image).width(1440).url()
        //console.log(s.image)
      }
      if (s._type == 'imageCarousel') {
        //console.log(s)
        for (const i of s.images || []) {
          i.src = getSanityImageUrl(i).width(1440).url()
        }
      }
      if (s._type == 'textBlock') {
        s.text = toHTML(s.content, {
          components: portableTextComponents,
          onMissingComponent: (message, options) => {
            console.log('onMissingComponent',{message}, {options})
          }
        })
      }
      if (s._type == 'detailsBlock') {
        s.text = toHTML(s.details, {
          components: portableTextComponents,
          onMissingComponent: (message, options) => {
            console.log('onMissingComponent',{message}, {options})
          }
        })
      }
      if (s._type == 'heroBlock') {
        s.slide = true
        //console.log(s)
      }
      if (s._type == 'ctaBlock') {
        s.slide = true
      }
    }
  }
  return pages
}

let pages
export const load = async ({ params, url, route/*, fetch*/ }) => {
  //console.log(params, url, route)

  pages = /*pages ||*/ await client.fetch(CONTENT_QUERY).then((p) => sorting(p))
  //console.log({pages})

  const slug = () => {
    const p = params.path || 'index'
    console.log(p)
    const i = p.indexOf('/') + 1
    console.log(p.slice(i))
    return p.slice(i)
  }
  const page = pages.find(p => p.slug == slug())

  //console.log(page.sections[1])

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
    ...page
  }
  if (post.sections[0]?._type == 'heroBlock') {
    post.hero = post.sections.shift()
    //console.log(post.hero)
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
//export const csr = false
export const prerender = true
//export const trailingSlash = 'never' // default

import Details from '$lib/my/Details.svelte'
import Cta from '$lib/my/Cta.svelte'
import { getSanityImageUrl/*, formatBlogPostDate*/ } from '$lib/sanity/helpers.js'
import {toHTML} from '@portabletext/to-html'

import { redirect } from '@sveltejs/kit'
//import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

import { client } from "$lib/sanity/client"
/** @type {import('./$types').LayoutServerLoad} */

const CTA_QUERY = `...,
  "page": page->slug.current`
const MARKS_QUERY = `...,
_type == "internalLink" => {
  "slug": @.reference->slug
}`
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
          ${MARKS_QUERY}
        }
      }
    },
    _type == "cardBlock" => {
      ...,
      sections[] {
        _type == "cta" => { 
          ${CTA_QUERY} 
        }
      }
    },
    _type == "cta" => {
      ${CTA_QUERY}
    },
    _type == "imageCarousel" => {
      ...
    },
    _type == "detailsItem" => {
      ...,
      details[]{
        ...,
        markDefs[]{
          ${MARKS_QUERY}
        },
        _type == "cta" => {
            ${CTA_QUERY}
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
    cta: ({value}) => {
      //console.log('CTA:',value)
      const { html, css } = Cta.render({comp: value})
      //console.log('CTA:',{html, css})
      //let comp = `<CTA comp=${value}>`
      return html
    },
    image: ({value}) => {
      //console.log('image:',{value})
      const src =  getSanityImageUrl(value.asset).width(1440).url()
      let comp = `<figure>
        <img src="${src}" alt="" />`
      if (value.caption) comp += `<figcaption>${value.caption}</figcaption>`
      comp += `</figure>`
      return comp
    },
    details: ({children, value}) => {
      //console.log('types/details:',{value})
      let comp = `<div class="collapse collapse-arrow">
        <input type="radio" name="details" style="width:100%" /> 
        <p class="collapse-title">
          ${value.summary}
        </p>
        <div class="collapse-content text-sm"> 
          ${toHTML(value.details, {
            components: portableTextComponents,
            onMissingComponent: (message, options) => {
              console.log('onMissingComponent/details',{message}, {options})
            }
          })}
        </div>
      </div>`
      //console.log('types/details:',{comp})
      return comp
    },
    unknownType: ({value}) => {
      console.log('unknownType',{value})
    }
  },
  marks: {
    internalLink: ({children, value}) => {
      let comp = `<a class="II" href="${value.slug?.current}">${children}</a>`
      //console.log('internalLink:',{comp})
      return comp
    },
    externalLink: ({children, value}) => {
      //console.log('externalLink:',{value})
      let comp = value.blanc ? `<a class="QQ" href="${value.href}" rel="external noopener" target="_blanc">${children}</a>` : `<a href="${value.href}">${children}</a>`
      return comp
    },

  },
  detailsItem: ({children, value}) => {
    //console.log('detailsItem:',{children, value})
    let comp = `<div class="collapse collapse-arrow">
      <input type="radio" name="details" /> 
      <p class="collapse-title">
        ${value.summary}
      </p>
      <div class="collapse-content text-sm"> 
        ${value.text}
      </div>
    </div>`
    return comp
  }
}

const sorting = (pages) => {
  for (const p of pages || []) {
    for (const sect of p.sections || []) {
      //console.log(sect)
      if (sect.image) {
        sect.image.src = getSanityImageUrl(sect.image).width(1440).url()
        //console.log(sect.image)
      }
      if (sect._type == 'imageCarousel') {
        //console.log(sect)
        for (const i of sect.images || []) {
          i.src = getSanityImageUrl(i).width(1440).url()
        }
      }
      if (sect._type == 'textBlock') {
        sect.text = toHTML(sect.content, {
          components: portableTextComponents,
          onMissingComponent: (message, options) => {
            console.log('onMissingComponent/text',{message}, {options})
          }
        })
      }
      if (sect._type == 'detailsItem') {
        //console.log(sect)
        sect.text = toHTML(sect.details, {
          components: portableTextComponents,
          onMissingComponent: (message, options) => {
            console.log('onMissingComponent/details',{message}, {options})
          }
        })
        //console.log(sect)
      }
      if (sect._type == 'heroBlock') {
        sect.slide = true
        //console.log(sect)
      }
      if (sect._type == 'ctaBlock') {
        sect.slide = true
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
    //console.log(p)
    const i = p.indexOf('/') + 1
    //console.log(p.slice(i))
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
    description: 'The UroDapter® urological adapter replaces catheter. It enables painless and complication-free bladder treatment for several lower urinary tract diseasesect.',
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
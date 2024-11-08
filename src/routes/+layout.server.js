//export const csr = false
//export const prerender = true
//export const trailingSlash = 'never' // default

import {toHTML} from '@portabletext/to-html'

import Card from '$lib/my/Card.svelte'
import Details from '$lib/my/Details.svelte'
import Slider from '$lib/my/Slider.svelte'
import Video from '$lib/my/Video.svelte'
import Cta from '$lib/my/Cta2.svelte'
import { getSanityImageUrl/*, formatBlogPostDate*/ } from '$lib/sanity/helpers.js'

import { redirect } from '@sveltejs/kit'
//import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

import { client } from "$lib/sanity/client"
/** @type {import('./$types').LayoutServerLoad} */

//const CTA_QUERY = `...,
//"page": page->slug.current
//`
const CTA_QUERY = `...,
"page": @.page->slug.current,
`

const VIDEO_QUERY = `...,
"file": @.file.asset->url,
"poster": @.poster.asset->url
`

const MARKS_QUERY = `...,
_type == "internalLink" => {
  "slug": @.reference->slug
},
`
const TEXT_BLOCK = `...,
content[]{
  ...,
  markDefs[]{
    ${MARKS_QUERY}
  },
  _type == "video" => {
    ${VIDEO_QUERY}
  },
  _type == "cta" => {
    ${CTA_QUERY}
  },
}`

const SLIDER_QUERY = `...,
sections[] {
  ...,
  _type == "textBlock" => {
    content[] { 
      ...,
      markDefs[]{
        ${MARKS_QUERY}
      },
      _type == "video" => {
        ${VIDEO_QUERY}
      },
      _type == "cta" => {
        ${CTA_QUERY}
      },
    },
  },

  _type == "cta" => { 
    ${CTA_QUERY} 
  },
},`

const CARD_QUERY = `...,
sections[] {
  ...,
  type,
  _type == "cta" => { 
    ${CTA_QUERY} 
  },
  _type == "slider" => {
    ${SLIDER_QUERY} 
  },
  _type == "textBlock" => {
    ${TEXT_BLOCK}
  },
  _type == "video" => {
    ${VIDEO_QUERY}
  },
},`

const DETAILS_QUERY = `...,
details[]{
  ...,
  markDefs[]{
    ${MARKS_QUERY}
  },
  _type,
  _type == "cta" => {
    ${CTA_QUERY} 
  },
  _type == "video" => {
    ${VIDEO_QUERY}
  },
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
      ${TEXT_BLOCK}
    },
    _type == "cta" => {
      ${CTA_QUERY}
    },
    _type == "slider" => {
      ${SLIDER_QUERY}
    },
    _type == "video" => {
      ${VIDEO_QUERY}
    },
    _type == "detailsItem" => {
      ${DETAILS_QUERY}
    },
    _type == "cardBlock" => {
      ${CARD_QUERY}
    }
  }
}`  

const CONFIG_QUERY = `*[_type == "config"] {
  ...,
  "footer": @.footer { 
    ${CARD_QUERY}
  },
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
      return html
    },
    //slider: ({value}) => {
    //  //console.log('text/slider:',value)
    //  for (let s of value.sections || []) {
    //    s = sects(s)
    //  }
    //  const { html, css } = Slider.render({comp: value})
    //  return html
    //},
    video: ({value}) => {
      const i = value.file?.lastIndexOf('.') + 1 || value.link?.lastIndexOf('.') + 1
      value.ext = value.file?.slice(i) || value.link?.slice(i) || ''
      //console.log('text/video:',value)
      const { html, css } = Video.render({comp: value})
      //console.log('text/video:',html)
      return html
    },
    image: ({value}) => {
      //console.log('image:',{value})
      const src = getSanityImageUrl(value.asset).width(1440).url()
      let out = `<figure>
        <img src="${src}" alt="" />`
      if (value.caption) out += `<figcaption>${value.caption}</figcaption>`
      out += `</figure>`
      return out
    },
    /*details: ({children, value}) => {
      //console.log('types/details:',{value})
      const { html, css } = Details.render({comp: value})
      return html
    },*/
    unknownType: ({value}) => {
      console.log('unknownType',{value})
    }
  },
  marks: {
    /*em: ({children, value}) => {
      return `<i>${children}</i>`
    },
    strong: ({children, value}) => {
      return `<b>${children}</b>`
    },*/
  
    internalLink: ({children, value}) => {
      let out = `<a class="IL" href="${value.slug?.current}">${children}</a>`
      //console.log('internalLink:',{comp})
      return out
    },
    externalLink: ({children, value}) => {
      //console.log('externalLink:',{value})
      let out = value.blank ? `<a class="EL" href="${value.href}" rel="external noopener" target="_blanc">${children}</a>` : `<a href="${value.href}">${children}</a>`
      return out
    },
    /*video: ({value}) => {
      console.log('video:',value)
      const { html, css } = Video.render({comp: value})
      return html
    },*/
    unknownMark: ({value}) => {
      console.log('unknownMark',{value})
    }
  },
  /*listItem: ({children, value}) => {
    console.log('listItem:',children, value.children)
    let out = `<li class="listItem">${toHTML(value, {
      components: portableTextComponents,
      onMissingComponent: (message, options) => {
        console.log('onMissingComponent/text',{message}, {options})
      }
    })}
    </li>`
    return out
  }*/
}

const sects = (sect) => {
  if (sect._type == 'video') {
    const i = sect.file?.lastIndexOf('.') + 1
    sect.ext = sect.file?.slice(i)
    //console.log('sects/video:',sect)
  }
  if (sect.image) {
    sect.image.src = getSanityImageUrl(sect.image).width(1440).url()
    //console.log(sect.image)
  }
  //if (sect._type == 'imageCarousel') {
  //  //console.log(sect)
  //  for (const i of sect.images || []) {
  //    i.src = getSanityImageUrl(i).width(1440).url()
  //  }
  //}
  if (sect._type == 'textBlock') {
    //console.log('sects/text', sect)
    sect.text = toHTML(sect.content, {
      components: portableTextComponents,
      onMissingComponent: (message, options) => {
        console.log('onMissingComponent/text',{message}, {options})
      }
    })
  }
  if (sect._type == 'cardBlock' || sect._type == 'slider' || sect._type == 'footerBlock') {
    for (let s of sect.sections || []) {
      s = sects(s)
    }
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
  // + CTA, SLIDER, VIDEO
}

const sorting = (pages) => {
  //console.log(pages)
  for (let p of pages || []) {
    for (let sect of p.sections || []) {
      sect = sects(sect)
    }
  }
  return pages
}



export const load = async ({ params/*, url, route, fetch*/ }) => {
  let config = {}, pages = []
  //console.log(params, url, route)

  const c = /*config ||*/ await client.fetch(CONFIG_QUERY)
  //console.log(c)
  //const footer = sorting([c[0].footer])[0]
  const footer = c[0].footer
  for (let sect of footer.sections || []) {
    sect = sects(sect)
  }
  //console.log(footer)
  config.footer = footer

  pages = /*pages ||*/ await client.fetch(CONTENT_QUERY).then((p) => sorting(p))

  const slug = () => {
    const p = params.path || 'index'
    return p;
    /*console.log(p)
    const i = p.indexOf('/') + 1
    console.log(i,p.slice(i))
    return p.slice(i)*/
  }
  const page = pages.find(p => p.slug == slug())

  //console.log(page/*.sections[1]*/)

  const subpage = null
  const post = {
    //id: 'index',
    //slug: 'en',
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

  //console.log({config})
  return {config, post, thislang}
}
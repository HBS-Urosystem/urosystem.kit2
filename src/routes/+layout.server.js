//export const hydrate = true
//export const prerender = 'auto'
//export const trailingSlash = 'never' // default

import { redirect } from '@sveltejs/kit'
import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

//import { page } from '$app/stores'
//console.log(store(page))

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, url/*, route, fetch, page*/ }) => {
  //console.log('layout.search',url.searchParams.get('lang'))

  let [lang, path, sub] = params.path?.split('/') || []
  //let { lang, path } = {...params}
  //const path = route.id || ''
  lang = lang || /*url.searchParams.get('lang') || */'en'
  path = path || ''
  sub = sub || ''

	let post, conf

	conf = await _getConf(lang)
  //console.log('conf.thislang',conf.thislang.id,'->',lang)
  if (!conf.thislang) {
		conf = await _getConf(/*url.searchParams.get('lang') ||*/ store(sitelang) || 'en')
    //console.log(conf.thislang)
    if (!conf.thislang) return false
    sub = path
    path = lang
    lang = conf.thislang.id || 'en'
		//path = lang + (!!path ? '/' + path : '')
	}
  //console.log([lang, path, sub])

	//const parts = path?.split('/') || []
	//post = await _getPost({path: parts[0], lang, sub: parts[1] || null})
	post = await _getPost({lang, path, sub})
  //console.log('post',post.id)
	if (post.title && !!post.published) {
		return {
			post, ...conf
		}
	}
  //return fail( 307 , {...conf} )
  throw redirect(303, '/'/*'/en'*/)
  //throw error(404, 'Enhance your calm')
	//return false
}

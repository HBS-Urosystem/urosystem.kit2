//export const hydrate = true
//export const prerender = true
//export const trailingSlash = 'never' // default

import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

/** @type {import('./$types').LayoutServerLoad} */
//import { page } from '$app/stores'
//console.log(store(page))

export const load = async ({ params/*, route, url, fetch, page*/ }) => {
  //console.log('layout.path',params.path/*, {route}, {url}, {fetch}, {page}*/)

  let [lang, path, sub] = params.path?.split('/') || []
  //let { lang, path } = {...params}
  //const path = route.id || ''
  lang = lang || 'en'
  path = path || ''
  sub = sub || ''

	let post, conf

	conf = await _getConf(lang)
  //console.log('conf.thislang',conf.thislang.id,'->',lang)
  if (!conf.thislang) {
		conf = await _getConf(store(sitelang) || 'en')
    if (!conf.thislang) return false
    sub = path
    path = lang
    lang = conf.thislang.id || 'en'
		//path = lang + (!!path ? '/' + path : '')
	}
  //console.log('conf.path',path)

	//const parts = path?.split('/') || []
	//post = await _getPost({path: parts[0], lang, sub: parts[1] || null})
	post = await _getPost({lang, path, sub})
  //console.log('post',post)
	//if (post.id && !!post.published) {
		return {
			post, ...conf
		}
	//}
	//return false
}

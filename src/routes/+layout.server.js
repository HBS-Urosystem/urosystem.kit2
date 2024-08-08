//export const csr = false
export const prerender = true
export const trailingSlash = 'never' // default

import { redirect } from '@sveltejs/kit'
import { _getPost, _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ params, url/*, route, fetch, page*/ }) => {
  let [l, p, s] = params.path?.split('/') || []
  let [x, lang, path, sub] = url.pathname.split('/') || []
  lang = lang || /*url.searchParams.get('lang') || */'en'
  path = path || ''
  sub = sub || ''

	let post, conf

	conf = await _getConf(lang)
  //console.log('conf.thislang',conf.thislang.id,'->',lang)
  if (!conf.thislang) {
		conf = await _getConf(/*url.searchParams.get('lang') ||*/ store(sitelang) || 'en')
    if (!conf.thislang) return false
    sub = path
    path = lang
    lang = conf.thislang.id || 'en'
	}

  post = await _getPost({lang, path, sub})
  //console.log('post',{lang, path, sub},post.blocks[0].components)
	if (post.title && !!post.published) {
		return {
			post, ...conf
		}
	}
  throw redirect(303, '/'/*'/en'*/)
}

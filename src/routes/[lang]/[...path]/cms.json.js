import { _getPost } from '$lib/utils'
import { _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'
//import { amp, browser, dev, prerendering } from '$app/env'

export const get = async (request) => {
	let { lang, path } = {...request.params}
//console.log('CMS',request.params)
	if (path.endsWith('.json')) { ///?
		console.log('JSON',path)
		return false
	}

	let post, conf

	conf = await _getConf(lang)
//console.log('_getConf', conf.thislang)
//console.log('sitelang',store(sitelang))
  if (!conf.thislang) {
		conf = await _getConf(store(sitelang) || 'en')
		if (!conf.thislang) return false
		path = lang + (!!path ? '/' + path : '')
		lang = store(sitelang) || 'en'
	}

	const parts = !!path && path.split('/') || []
//console.log('cms_parts',parts)

	post = await _getPost({path: parts[0], lang, sub: parts[1] || null})
//console.log('post',post)
	if (post.id) {
			return {
			body: {post, ...conf}
		}
	}
	return false
}

import { _getPost } from '$lib/utils'
import { _getConf } from '$lib/utils'
import { get as store} from 'svelte/store'
import { sitelang } from '$lib/stores'
//import { amp, browser, dev, prerendering } from '$app/env'

export const get = async (request) => {
	let { lang, path } = {...request.params}
  //console.log('CMS',request.params)
  //console.log({lang},{path})
	if (path.endsWith('.json')) { ///?
		return false
	}

	let post, conf

	conf = await _getConf(lang || 'en')
  //console.log('conf.thislang',conf.thislang.id,'->',lang)
  if (!conf.thislang) {
		conf = await _getConf(store(sitelang) || 'en')
    if (!conf.thislang) return false
      path = lang
      lang = conf?.thislang?.id || 'en'
		//path = lang + (!!path ? '/' + path : '')
	}
  //console.log('conf.path',path)

	const parts = path?.split('/') || []
  //console.log({parts},{lang})

	post = await _getPost({path: parts[0], lang, sub: parts[1] || null})
//console.log('post',post)
	if (post.id && !!post.published) {
			return {
			body: {post, ...conf}
		}
	}
	return false
}

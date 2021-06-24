import { _getPost } from '$lib/utils'
import { _getConf } from '$lib/utils'
//import { amp, browser, dev, prerendering } from '$app/env'

export const get = async (request) => {
	const { lang, path } = {...request.params}

	if (path.endsWith('.json')) { ///?
		console.log('JSON',path)
		return false
	}

	let post, conf

	conf = await _getConf(lang)
	if (!conf.thislang) {
		return false
		/*path = lang
		lang = 'en'
		conf = await _getConf(lang)*/
	}

	const parts = !!path && path !== 'undefined' && path.split('/')
  console.log('conf',parts)

	post = await _getPost({path: parts[0], lang, sub: parts[1]})
	if (post.id) {
			return {
			body: {post, ...conf}
		}
	}
	return false
}

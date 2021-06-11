import { _getPost } from '$lib/utils'
import { _getConf } from '$lib/utils'
//import { amp, browser, dev, prerendering } from '$app/env'

export const get = async (request) => {
	const { lang, path } = {...request.params}

	if (path.endsWith('.json')) { ///?
		console.log('JSON',path)
		return true
	}

	const parts = path.split('/')
	const post = await _getPost({path: parts[0], lang, sub: parts[1]})
	const conf = await _getConf()
  //console.log('conf',conf)
	
	//const langs = await _getLangs()
	
	return {
		body: {post, ...conf}
	}
}

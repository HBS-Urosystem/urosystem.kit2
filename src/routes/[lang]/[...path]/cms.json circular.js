import mixing from 'mixing'
const allposts = import.meta.glob('/cms/pages/**/*.md')
const allblocks = import.meta.glob('/cms/blocks/**/*.md')
console.log('allposts')
let posts = []

//export async function get({ params }) {
export const get = async (request) => {
	const { lang, path } = {...request.params}
	console.log('path', path)

	if (!posts[lang]) posts[lang] = []
	if (!posts[lang][path]) {
		
		post = await _findPost(path, lang)

		if (post) {

			if (post.fallback && post.fallback !== lang) {
				//const fbpost = await _findPost(path, post.fallback)
				post = mixing(post, await _findPost(path, post.fallback), {recursive: true})
			}

			let subpages = []//, newpost = post
			if (post.subpages || parent.subpages) {
				for (let s of parent.subpages || post.subpages) {
					console.log('s.link',s)
					if (s.link) s.link = s.link.replace('/.', '/whatis') // TODO: remove this
					let sub = await _findPost(s.link, lang)
					if (sub.fallback && sub.fallback !== lang) {
						sub = mixing(sub, await _findPost(s.link, sub.fallback), {recursive: true})
					}
					//console.log('sub',sub)
					if (sub.slug == '.') {
						sub.slug = ''
						//newpost = sub
					} else {
						sub.slug = sub.slug || sub.id
					}
					subpages.push(sub)
				}
			}
			//post = newpost
			post.subpages = subpages
			//console.log('cms', post, subpages)

			if (post.hero) {
				post.hero = await _findBlock(post.hero, lang)
				console.log('h', post.hero)
			}
			if (post.blocks) {
				//console.log('p.b', post.blocks)
				let blocks = []
				for (let b of post.blocks) {
					const block = await _findBlock(b.id, lang)
					/*if (block.components) {
						console.log('b.c', block.components)
						let comps = []
						for (let c in blocks.components) {
							console.log(c)
						}
					}*/
					blocks.push(block)
					//console.log(b.id,await _findBlock(b.id, lang))
				}
				post.blocks = blocks
				//console.log('blocks',post.blocks)
			}
		}
		posts[lang][path] = post
	}
	return {
		body: posts[lang][path]
	}

	function _findPost(pa = path, l = lang, all = allposts) {
		//console.log(all)
		//console.log(pa + '.' + l)
		for (const p in all) {
			//console.log(p)
			if (p.indexOf(pa + '.' + l) >= 0) {
				//console.log('find',pa, l, p, p.indexOf(pa + '.' + l))
				return all[p]().then(({metadata}) => metadata)
			}
		}
		return false
	}

	function _findBlock(pa = path, l = lang, all = allblocks) {
		//console.log(all)
		//console.log(pa + '.' + l)
		for (const b in all) {
			//console.log(p)
			if (b.indexOf(pa + '.' + l) >= 0) {
				//console.log('find',pa, l, p, p.indexOf(pa + '.' + l))
				return all[b]().then(({metadata}) => metadata)
			}
		}
		return false
	}

}

import mixing from 'mixing'
const allposts = import.meta.glob('/cms/pages/**/*.md')
const allblocks = import.meta.glob('/cms/blocks/**/*.md')
console.log('allposts')
let posts = []

//export async function get({ params }) {
export const get = async (request) => {
	const { lang, path } = {...request.params}
	//console.log('>>posts', posts)

	if (!posts[lang]) posts[lang] = []
	if (!posts[lang][path]) {
		
		//post = await _findPost(path, lang)

		//if (post) {

		/*if (post.fallback && post.fallback !== lang) {
			post = mixing(post, await _findPost(path, post.fallback), {recursive: true})
		}*/

		let post = false, subpost = false, subposts = [], hero = false, blocks = []
		const parts = path.split('/')
		//console.log('>root >sub',parts[0],parts[1])

		if (parts[0]) {
			post = await _findPost(parts[0], lang)
			//console.log('>post >subpost',post,subpost)
			if (post.fallback && post.fallback !== lang) {
				post = mixing(post, await _findPost(parts[0], post.fallback), {recursive: true})
			}
			/*if (parts[1]) {
				subpost = await _findPost(parts[1], lang)
				if (subpost.fallback && subpost.fallback !== lang) {
					subpost = mixing(subpost, await _findPost(parts[1], subpost.fallback), {recursive: true})
				}
			}*/
			
			if (post.subpages) {
				for (let s of post.subpages) {
					if (s.link) s.link = s.link.replace('/.', '/whatis') // TODO: remove this
					//console.log('>>>>> s.link',s)
					let sp = await _findPost(s.link, lang)
					if (sp.fallback && sp.fallback !== lang) {
						sp = mixing(sp, await _findPost(s.link, sp.fallback), {recursive: true})
					}
					// else {
					sp.slug = sp.slug || sp.id
					//}
					//console.log('///sp',sp.slug,parts[1])
					if (sp.slug == '.' && !parts[1] || sp.slug == parts[1]) {
						subpost = sp
						//console.log('>subpost',sp.slug)
					}
					//console.log('>slug',sp.slug)
					subposts.push(sp)
				}
			}

			//console.log('post.hero',post.hero)
			if (post.hero) {
				hero = await _getBlock(post.hero, lang)
				//hero = await _findBlock(post.hero, lang)
				//if (hero.fallback && hero.fallback !== lang) {
				//	hero = mixing(hero, await _findBlock(post.hero, hero.fallback), {recursive: true})
				//}
			}

			if (post.blocks) {
				for (let b of post.blocks) {
					/*let block = await _findBlock(b.id, lang)
					if (block.fallback && block.fallback !== lang) {
						block = mixing(block, await _findBlock(block, block.fallback), {recursive: true})
					}*/
					const block = await _getBlock(b.id, lang)

					//	if (block.background) {
					//	console.log('b.b', block.background)
					//	let bgs = []
					//	for (let b in block.background) {
					//		console.log(b)
					//	}
					//}
					blocks.push(block)
				}
			}

			posts[lang][path] = post
			posts[lang][path].posthero = hero
			posts[lang][path].postblocks = blocks
			posts[lang][path].subpost = subpost
			posts[lang][path].subposts = subposts
			console.log('>>>new',lang,path,subpost ? subpost.id : post.id)
		} else {
			posts[lang][path] = false
			console.log('>>>PNF',lang,path)
		}
	} else {
		console.log('<<<old',lang,path,posts[lang][path].subpost ? posts[lang][path].subpost.id : posts[lang][path].id)
		//posts[lang][path] = posts[lang][path]
	}
	console.log('return',posts[lang][path])
	return {
		body: posts[lang][path]
	}

}

	function _findPost(pa = path, l = lang, all = allposts) {
		//console.log('>pa + . + l',pa + '.' + l)
		for (const p in all) {
			//console.log(p)
			if (p.indexOf(pa + '.' + l) >= 0) {
				//console.log('find',pa, l, p, p.indexOf(pa + '.' + l))
				return all[p]().then(({metadata}) => metadata)
			}
		}
		return false
	}

	async function _getBlock(pa = path, l = lang) {
		let block = await _findBlock(pa, l)
		if (block.fallback && block.fallback !== l) {
			block = mixing(block, await _findBlock(pa, block.fallback), {recursive: true})
		}
		if (block) {
			block.bg = ''
			if (block.background) block.bg = _getBg(block.background)
		} else {
			console.log('BAD', pa,l)
		}
		//console.log('.bg', block.id, block.bg)
		return block
	}

	function _findBlock(pa = path, l = lang, all = allblocks) {
		for (const b in all) {
			if (b.indexOf(pa + '.' + l) >= 0) {
				return all[b]().then(({metadata}) => metadata)
			}
		}
		return false
	}

	function _getBg(obj) {
		//console.log(obj)
		let bgs = [], pos = [], siz = []
		for (let bg of obj) {
			//console.log(bg)
			/*if (bg.type == 'color') {
				bgs[0] = (`var(--${bg.name})`)
			}*/
			if (bg.type == 'gradient') {
				bgs.push(`var(--grad-${bg.name})`)
			}
			if (bg.type == 'image') {
				bgs.push(`url(${bg.src})`)
			}
			pos.push(`${bg.posx || 50}% ${bg.posy || 50}%`)
			siz.push(bg.scale ? `${bg.scale}%` : 'cover')
		}
		//bgs = bgs.filter(bg => bg)
		//return { img: bgs.join(), pos: pos.join(), siz: siz.join() }
		return `background-image:${bgs.join()};background-position:${pos.join()};background-size:${siz.join()};`
	}
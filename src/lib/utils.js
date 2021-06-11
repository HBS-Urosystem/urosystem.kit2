import _ from 'lodash'
import mixing from 'mixing'
import marked from 'marked'

const allblocks = import.meta.glob('/cms/blocks/**/*.md')
const allposts = import.meta.glob('/cms/pages/**/*.md')
const allconfs = import.meta.glob('/cms/config/*.md')

let theposts = []
for (const p in allposts) {
	//const post = all[p]().then(({metadata}) => metadata)
	const lang = p.substring(p.length - 5, p.length - 3)
	const parts = p.split('/')
	//console.log(parts)
	const filename = parts[parts.length - 1]
	const id = filename.substring(0, filename.length - 6)
	const folder = parts[parts.length - 2]//.replace('pages', 'index')
	const slug = folder == 'pages' ? id : folder + '/' + id
	if (!theposts[lang]) theposts[lang] = []
	//if (!posts[lang][folder]) posts[lang][folder] = []
	theposts[lang][slug] = allposts[p]
	//console.log(allposts[p])
	//console.log(lang,slug,posts[lang][slug])
}

let conf = []
for (const p in allconfs) {
	const parts = p.split('/')
	const filename = parts[parts.length - 1]
	const id = filename.substring(0, filename.length - 3)
  conf[id] = allconfs[p]().then(({metadata}) => metadata)
}

export async function _getConf() {
  let config = []
  for (const b in conf) {
    //console.log('config[b]',await conf[b])
    const c = await conf[b]
    //console.log(Object.keys(c)[0])
    config[Object.keys(c)[0]] = c[Object.keys(c)[0]]
    //config.push(await conf[b])//().then(({metadata}) => metadata)
  }
  config.nav = 'NAV'
  //console.log('config',config)
  return config
}

/*export async function _getLangs() {
  const langs = await conf.langs().then(({metadata}) => metadata)
  return {...langs}
}*/


export async function _getPost({path = 'index', lang = 'en', sub = null}) {
  const p = await _findPost({path, lang})
  //console.log('_getPost',post.subpages || post.id)
  let post = {...p}
  //console.log('...p',p)
  if (p.hero) {
    //console.log('awaithero', lang)
    post.hero = await _getBlock(p.hero, lang)
  }

  if (p.blocks) {
    let blocks = []
    for (const b of p.blocks) {
      const block = await _getBlock(b.id, lang)
      blocks.push(block)
    }
    post.blocks = blocks
  }

  if (post.subpages) {
    let subpages = []
    post.subpage = null
    for (let s of post.subpages) {
      if (s.link) s.link = s.link.replace('/.', '/whatis') // TODO: remove this
      //const parts = s.link.split('/')
      //console.log('parts2',parts,path)
      let sp = await _getPost({path: s.link, lang, sub})
      sp.slug = sp.slug || sp.id
      if (sp.slug == '.' && !sub || sp.slug == sub) {
        //subpage = sp
        post.subpage = sp
        //console.log('>subpage',sp.slug)
      }
      //console.log('>slug',sp.slug)
      subpages.push(sp)
    }
    post.subposts = subpages
  } else {
    post.subposts = null
    //console.log('_getPost',post)
  }

  //console.log('>>>new',post)
  return post
}

async function _findPost({path = 'index', lang = 'en'}) {
for (const s in theposts[lang]) {
  if (s.endsWith(path)) {
    //console.log('_findPost', path)
    let p = await theposts[lang][s]().then(({metadata}) => metadata)
    //console.log(p)
    if (p.fallback && p.fallback !== lang) {
      p = mixing(p, await _findPost({path, lang: p.fallback}), {recursive: true})
    }
    //console.log('_findPost', lang, p.id)
    return p
  }
}
return false
}


async function _getBlock(id = path, l = lang) {
let block = await _findBlock(id, l)
//console.log('_get', l, id)
if (block) {
  for (let c of block.components) {
    c.lang = l
  }
  block.lang = l
} else {
  console.log('BAD', id,l)
  return {}
}
//console.log('.bg', block.id, block.bg)
return block
}

async function _findBlock(id, l = lang, all = allblocks) {
for (const b in all) {
  if (b.indexOf(id + '.' + l) >= 0) {
    const block = await all[b]().then(({metadata}) => metadata)
    //console.log('b.fb',block.fallback)
    if (block.fallback && block.fallback !== l) {
      return mixing(_.cloneDeepWith(block, mdtext), await _findBlock(id, block.fallback), {recursive: true})
    }
    //return block
  //console.log('indexOf', id + '.' + l, block.id)
  return _.cloneDeepWith(block, mdtext)
  }
}
return false
}
function mdtext(value, key) {
if (key == 'text') {
  //console.log(marked(value))
  return marked(value)
}
if (key == 'background') {
  return _getBg(value);
}
}

function _getBg(obj) {
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
//console.log(bgs)
//bgs = bgs.filter(bg => bg)
//return { img: bgs.join(), pos: pos.join(), siz: siz.join() }
return `background-image:${bgs.join()};background-position:${pos.join()};background-size:${siz.join()};`
}


import _ from 'lodash'
import mixing from 'mixing'
import { marked } from 'marked'
import { variables } from '$lib/stores'
//console.log({variables})

const _site = variables.site || '_us'

const allblocks = import.meta.glob('/cms2/blocks/**/*.md')
const allposts = import.meta.glob('/cms2/pages/**/*.md')
const allconfs = import.meta.glob('/cms2/config/*.md')

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

//console.log({allconfs})
let theconf = []
for (const p in allconfs) {
	const parts = p.split('/')
	const filename = parts[parts.length - 1]
	const id = filename.substring(0, filename.length - 3)
  theconf[id] = allconfs[p]//().then(({metadata}) => metadata)
}
//console.log(allconfs,theconf)

export async function _getConf(lang = 'en') {
  let config = {}, conf = {}
  /*const langs = await theconf['langs']().then(({metadata}) => metadata)
  //for (c in langs.langs)
  config[langs] = _.chain(c)
    .filter(lang => console.log('lang',lang))//.active)
    .value()
  console.log(config[langs])*/

  //console.log({theconf})
  for (const b in theconf) {
    const c = await theconf[b]().then(({metadata}) => metadata)
    conf[Object.keys(c)[0]] = c[Object.keys(c)[0]]
  }

  const langs = 'langs'//`langs${_site}`
  const topnav = 'top'//`top${_site}`
  const footnav = 'footer'//`footer${_site}`

  //console.log(`langs${_site}`, conf[langs])

  _.remove(conf[langs], (n) => { return !n.active })
  config.langs = conf[langs] || []

  //console.log(langs,config[langs])

  config.thislang = 'en'
  for (const l of conf.langs) {
    if (l?.id == lang) config.thislang = l
  }
  config.topnav = await Promise.all(conf[topnav]?.map(async (subs) => _subnav(subs)))
  config.footnav = await Promise.all(conf[footnav]?.map(async (subs) => _subnav(subs)))
  console.log({config})
  
  return config

  async function _subnav(obj) {
    //console.log({obj})
    let p
    //console.log('obj.link',obj.link)
    delete obj.title
    if (obj.titles && obj.titles.length) {
      //console.log('obj.titles',obj.titles)
      for (let item of obj.titles) {
        if (item.lang == lang) {
          //console.log('obj.title1',item.title)
          obj.title = item.title
        }
      }
      //delete obj.titles /// ?
    } else if (!!obj.link && (p = await _findPost({path: obj.link, lang}))) {
      obj.title = p.menutitle || p.title
      //console.log('obj.title2',obj.title)
    } else {
      obj.title = null
    }
    //obj.title = (!!obj.link && await _findPost({path: obj.link, lang}).then(x => {return x}))
    //console.log('obj.title',obj)

    /*if (!!obj.link && (modal = await _findBlock('modal/' + obj.link.substring(1), lang))) {
      obj.modal = modal
      //console.log('obj.modal',await obj.modal)
    }*/
    //obj.modal = null
    if (!!obj.link && obj.link.startsWith('#')) obj.modal = await _findBlock('modal/' + obj.link.substring(1), lang)
  
    if (obj.subpages) {
      //console.log('obj.subpages',obj.subpages)
      let subs = []
      for (let page of obj.subpages) {
        if (page.titles?.length) {
          page.title = null
          for (let item of page.titles) {
            //console.log(lang, {item})
            if (item.lang == lang) page.title = item.title
          }
          //delete page.titles /// ?
        } else if (!!page.link && (p = await _findPost({path: page.link, lang}))) {
          page.title = p.menutitle || p.title
        } else {
          page.title = null
        }
        //console.log('sub.title',page.title)
        //if (!!page.link) modal = await _findBlock('modal/' + page.link.substring(1), lang)
        //if (modal) page.modal = modal
        if (!!page.link && page.link.startsWith('#')) page.modal = await _findBlock('modal/' + page.link.substring(1), lang)
        //console.log('page.modal',await page.modal)
        
        subs.push(page)
      }
      //console.log('obj.subs',subs)
      obj.sublinks = subs
    }
    return obj || {}
  }
}

export async function _getPost({path, lang = 'en', sub = null}) {
  const p = await _findPost({path, lang})
  //console.log({lang},{path},{sub}) /// works
  //console.log(p.blocks)
  let post = {...p}
  post.path = path
  //console.log('...p',p)
  if (p.hero) {
    //console.log('awaithero', lang)
    post.hero = await _getBlock(p.hero, lang)
  }
  if (p.subhero) {
    //console.log('awaithero', lang)
    post.subhero = await _getBlock(p.subhero, lang)
  }

  post.blocks = null
  if (p.blocks) {
    let blocks = []
    post.canonlang = p.fallback
    for (const b of p.blocks) {
      const block = await _getBlock(b.id, lang)
      //console.log(b.id, lang,{block})
      if (!block.canonlang) post.canonlang = false
      blocks.push(block)
    }
    post.blocks = blocks
  }

  post.subpages = null
  post.subpage = null
  //console.log({p})
  if (p.subpages) {
    post.subpages = []
    for (let s of p.subpages) {
      //if (!!s.link) s.link = s.link.replace('/.', '/whatis') // TODO: remove this
      //const parts = s.link.split('/')
      let sp = await _getPost({path: s.link, lang, sub: s.id})
      sp.slug = sp.slug || sp.id
      //console.log('>>', s.link)

      if (sp.slug == '.' && !sub || sp.slug == sub) {
        //subpage = sp
        //post = sp
        //post.subpages = []
        post.subpage = sp
      }
              //console.log('>subpage',sp.slug)
      post.subpages.push(sp)
    }
    //post.subposts = subpages
    /*} else {
    post.subposts = null*/
    //console.log('post.subpages',post.subpages.length)
  }

  //console.log('>new',post.blocks[0])
  //console.log('>>>new',post.blocks[0].components)
  return await post
}

export async function _findPost({path, lang}) {
  path = path || 'index'
  const path_site = `${path}${_site}`
  for (const s in theposts[lang]) {
    if (s.endsWith(path_site)) {
      let p = await theposts[lang][s]().then(({metadata}) => metadata)
      if (p.fallback && p.fallback !== lang) {
        p = mixing(p, await _findPost({path, lang: p.fallback}), {recursive: true}) // A) recursive fallbacks / cascading blocks
      }
      return p
    }
  }
  for (const s in theposts[lang]) {
    //if (path == 'contact') console.log({s})
    if (s.endsWith(path)) {
      //if (s.match(`.*${path}`)) {
      //console.log('_findPost', path)
      let p = await theposts[lang][s]().then(({metadata}) => metadata) || {}
      //if (path == 'details') console.log(p)
      //console.log(p.menutitle)
      if (p.fallback && p.fallback !== lang) {
        p = mixing(p, await _findPost({path, lang: p.fallback}), {recursive: true}) // A) recursive fallbacks / cascading blocks
      }
      //console.log('_findPost', p.menutitle)
      return p
    }
  }
  return false
}


export async function _getBlock(id = path, l) {
  let block = await _findBlock(id, l)
  //console.log('_get', id, l)
  if (block && block.components?.length) {
    for (let c of block.components) {
      c.lang = l
    }
    block.lang = l
    //console.log('GOOD', id,l)
  } else {
    //console.log('BAD', id,l)
    return {}
  }
  //console.log('.bg', block.id, block.bg)
  return block
}

async function _findBlock(id, l, all = allblocks) {
//console.log(id + '.' + l)
for (const b in all) {
  if (b.indexOf(id + '.' + l) >= 0) {
    const block = await all[b]().then(({metadata}) => metadata)
    //console.log('')
    //console.log(l)
    if (block?.fallback && block.fallback !== l) {
      //console.log('')
      //console.log(block.id, block.canonlang)
      //console.log(block.components?.length)
      if (!block.components || !block.components.length) block.canonlang = block.fallback
      //console.log(block.canonlang)
      return mixing(_.cloneDeepWith(block, mdtext), await _findBlock(id, block.fallback), {recursive: true}) // A) recursive fallbacks / cascading blocks
    } else {
      //console.log(block.id)
    }
    return _.cloneDeepWith(block, mdtext)
  }
}
return null
}
function mdtext(value, key) {
  if (key == 'text') {
    //console.log('text')
    return marked(value)
  }
  if (key == 'background') {
    //console.log('background')
    return value && _getBg(value);
  }
  //console.log(key)
}
function _getBg(obj = []) {
  //console.log(!!obj || obj)
  let bgs = [], bgc, pos = [], siz = []
  for (let bg of obj) {
    //console.log(bg)
    if (bg.type == 'color') {
      bgc = `var(--${bg.name})`
    }
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
  return `background-color:${bgc};` + (bgs.length ? `background-image:${bgs.join()};` : '') + (pos.length ? `background-position:${pos.join()};` : '') + (siz.length ? `background-size:${siz.join()};` : '')
}


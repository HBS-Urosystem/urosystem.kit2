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

let theconf = []
for (const p in allconfs) {
	const parts = p.split('/')
	const filename = parts[parts.length - 1]
	const id = filename.substring(0, filename.length - 3)
  theconf[id] = allconfs[p]//().then(({metadata}) => metadata)
}
//console.log(allconfs,theconf)

export async function _getConf(lang) {
  let config = []
  /*const langs = await theconf['langs']().then(({metadata}) => metadata)
  //for (c in langs.langs)
  config.langs = _.chain(c)
    .filter(lang => console.log('lang',lang))//.active)
    .value()
  console.log(config.langs)*/
  for (const b in theconf) {
    //console.log('config[b]',await conf[b])
    const c = await theconf[b]().then(({metadata}) => metadata)
    //if (c.active) 
    config[Object.keys(c)[0]] = c[Object.keys(c)[0]]
    //config.push(c[Object.keys(c)[0]])
    //console.log(c)
  }

  config.thislang = null
  for (const l of config.langs) {
    if (l.id == lang) config.thislang = l
  }

  //config.topnav = await _navs(config.top)
  //config.topnav = await config.top.map(props => {return {...props}}).map(subs => _subnav(subs))
  //config.footnav = await config.footer.map(props => {return {...props}}).map(subs => _subnav(subs))
  config.topnav = await Promise.all(config.top.map(async (subs) => _subnav(subs)))
  config.footnav = await Promise.all(config.footer.map(async (subs) => _subnav(subs)))
  //_navs(config.footer).then(function(ret) {console.log(ret); config.footnav = ret})
  //console.log('config.topnav',config.topnav)
  //console.log('topfoot',config)
  
  return config

  /*async function _navs (c) {
    //console.log('config.top',c)
    const ret = c.map(props => {return {...props}}).map(_subnav)
    //
    //.map(async obj => {return _subnav(obj)})
    return ret
  }*/

  async function _subnav(obj) {
    let p
    //console.log('obj',obj)
    //console.log('obj.link',obj)
    if (!!obj.link && (p = await _findPost({path: obj.link, lang}))) {
      obj.title = p.menutitle || p.title

    }
    //obj.title = (!!obj.link && await _findPost({path: obj.link, lang}).then(x => {return x}))
    //console.log('obj.title',obj)

    if (obj.titles) {
      for (let item of obj.titles) {
        if (item.lang == lang) obj.title = item.title
      }
      delete obj.titles /// ?
    }

    /*if (!!obj.link && (modal = await _findBlock('modal/' + obj.link.substring(1), lang))) {
      obj.modal = modal
      //console.log('obj.modal',await obj.modal)
    }*/
    obj.modal = (!!obj.link && await _findBlock('modal/' + obj.link.substring(1), lang))
  
    if (obj.subpages) {
      //console.log('obj.subpages',obj.subpages)
      let subs = []
      for (let page of obj.subpages) {
        if (!!page.link && (p = await _findPost({path: page.link, lang}))) {
          page.title = p.menutitle || p.title
        }
        if (page.titles) {
          for (let item of page.titles) {
            //console.log(lang, item.lang, item.title)
            if (item.lang == lang) page.title = item.title
          }
          delete page.titles /// ?
        }
        //if (!!page.link) modal = await _findBlock('modal/' + page.link.substring(1), lang)
        //if (modal) page.modal = modal
        page.modal = (!!page.link && await _findBlock('modal/' + page.link.substring(1), lang))
        //console.log('page.modal',await page.modal)
        
        subs.push(page)
      }
      //console.log('obj.subs',subs)
      obj.sublinks = subs
    }

    /*if (sublinks = _findPosts(obj.link)) {
      obj.sublinks = sublinks
    }*/

    //console.log('return obj',obj)

    return obj || {}
  }
  /*async function _findPosts(path) {
    let posts = []
    for (const s in theposts[lang]) {
      //if (s.endsWith(path)) {
        //console.log(s)
      if (s.match(`.*${path}`)) {
        //console.log('_findPost', path)
        let p = await theposts[lang][s]().then(({metadata}) => metadata)
        //console.log(p)
        if (p.fallback && p.fallback !== lang) {
          //p = mixing(p, _findPost({path, lang: p.fallback}), {recursive: true}) // A) recursive fallbacks
          p = mixing(p, await theposts[p.fallback][s]().then(({metadata}) => metadata), {recursive: true}) // B) faster – single fallback
        }
        //console.log('_findPost', lang, p.id)
        posts.push(p)
      }
      return posts
    }
    return false
    

    let ps = theposts.filter(post => (post.lang == lang) && post.slug.indexOf(f) >= 0) || []
    console.log('_findPosts',f, ps)
    if (ps.length) {
      let postmix = []
      for (let p of ps) {
        if (p.fallback && p.fallback !== lang) {
          postmix.push(mixing(p, _findPost({path: p.id, lang: p.fallback}),{recursive: true, mixArray: true}))
        } else {
          postmix.push(p)
        }
      }
      return postmix
    }
    //return []
    //return posts.filter(post => post.lang == lang && post.folder == f)
  }*/
}

/*export async function _getLangs() {
  const langs = await conf.langs().then(({metadata}) => metadata)
  return {...langs}
}*/


export async function _getPost({path, lang = 'en', sub = null}) {
  const p = await _findPost({path, lang})
  //console.log('_getPost',p.menutitle)
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
    for (const b of p.blocks) {
      const block = await _getBlock(b.id, lang)
      blocks.push(block)
    }
    post.blocks = blocks
  }

  post.subpages = null
  post.subpage = null
  if (p.subpages) {
    post.subpages = []
    for (let s of p.subpages) {
      if (!!s.link) s.link = s.link.replace('/.', '/whatis') // TODO: remove this
      const parts = s.link.split('/')
      let sp = await _getPost({path: s.link, lang/*, sub*/})
      sp.slug = sp.slug || sp.id
      //console.log('util_sub', sp.slug, lang, parts)
      if (sp.slug == '.' && !sub || sp.slug == sub) {
        //subpage = sp
        post.subpage = sp
        //console.log('>subpage',sp.slug)
      }
      //console.log('>slug',sp.slug)
      post.subpages.push(sp)
    }
    //post.subposts = subpages
  /*} else {
    post.subposts = null
    //console.log('_getPost',post)*/
  }

  //console.log('>>>new',post)
  return await post
}

export async function _findPost({path = 'index', lang = 'en'}) {
  for (const s in theposts[lang]) {
    if (s.endsWith(path)) {
      //console.log('endsWith', path,s)
    //if (s.match(`.*${path}`)) {
      //console.log('_findPost', path)
      let p = await theposts[lang][s]().then(({metadata}) => metadata)
      //console.log(p.menutitle)
      if (p.fallback && p.fallback !== lang) {
        p = mixing(p, await _findPost({path, lang: p.fallback}), {recursive: true}) // A) recursive fallbacks / cascading blocks
        //p = mixing(p, await theposts[p.fallback][s]().then(({metadata}) => metadata), {recursive: true}) // B) faster – single block fallback
        //console.log('bad mixing: no native desc & kw', await theposts[lang][s])
        //console.log('bad mixing: no native desc & wk', await theposts[p.fallback][s])
      }
      //console.log('_findPost', p.menutitle)
      return p
    }
  }
  return false
}


export async function _getBlock(id = path, l) {
  let block = await _findBlock(id, l)
  //console.log('_get', l, id)
  if (block) {
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
    //console.log('b.fb',block.fallback)
    if (block.fallback && block.fallback !== l) {
      return mixing(_.cloneDeepWith(block, mdtext), await _findBlock(id, block.fallback), {recursive: true}) // A) recursive fallbacks / cascading blocks
    }
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
  return (bgs.length ? `background-image:${bgs.join()};` : '') + (pos.length ? `background-position:${pos.join()};` : '') + (siz.length ? `background-size:${siz.join()};` : '')
}


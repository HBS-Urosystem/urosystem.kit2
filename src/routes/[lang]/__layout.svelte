<script context="module">
  //export const hydrate = false
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { state, sitelang, pagepath } from '$lib/stores'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}
    //path = !!path && path !== 'undefined' && path + '/' || ''
    //if (!path) path = 'index'
    //console.log('params_l',page.params)
		//const url = `/${lang}/${path}/cms.json`
    let u = []
		if (!!path) {
      u.push(lang)
      u.push(path)
    } else {
      u.push(lang || get(sitelang))
    }
    u.push('cms.json')
		const url = '/'+u.join('/')

    //console.log('1.fetch(url)', url)
		let res = await fetch(url);

		if (res.ok) {
      const result = await res.json()
      //console.log('result_l',result.post)

			if (result.thislang) return {
				props: {
          result: result/*,
          lang: result.thislang.id*/
        }
			}
		}/*
    //console.log(`1.Could not load ${url}`)
    console.log(`2.Trying /${get(sitelang)}/${lang}/cms.json`)

    res = await fetch(`/${get(sitelang)}/${lang}/cms.json`)
		if (res.ok) {
      const result = await res.json()
      //console.log('result_l2',result.post)

			if (result.thislang) return {
				props: {
          result: result,
          lang: get(sitelang),
          path: lang
        }
			}
		}
    console.log(`2.Could not load /${get(sitelang)}/${lang}`)

    res = await fetch(`/${get(sitelang)}/cms.json`);
		if (res.ok) {
      const result = await res.json()
      console.log('result_l3',result.post)

			if (result.thislang) return {
				props: {
          result: result,
          lang: get(sitelang),
          path: ''
        }
			}
		}

		return {
			status: res.status,
			error: new Error(`3.Could not load /${get(sitelang)}`)
		}*/
  }
</script>
<script>
  export let result//, lang, path
  $: $state = result
  $: $sitelang = result.thislang.id
  //$: console.log('__layout $state:',$state.post.id)
  //let thislang = {dir: 'ltr'}
	onMount(() => {
    document.querySelector('html').lang = $state.thislang.id
    //thislang = $state.thislang
    document.querySelector('html').dir = $state.thislang.dir
    //console.log(thislang)
	});
</script>

<Nav/><!--  dir={thislang.dir} -->
<slot></slot>
<Footer/>
<Cookies/>

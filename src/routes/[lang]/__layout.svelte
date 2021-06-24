<script context="module">
  //export const hydrate = false
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { state, sitelang, pagepath } from '$lib/stores'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}
    //path = !!path && path !== 'undefined' && path + '/' || ''
    //if (!path) path = 'index'
    //console.log('path_l',`/${lang}/${path}/cms.json`)
		const url = `/${lang}/${path}/cms.json`

		let res = await fetch(url);

		if (res.ok) {
      const result = await res.json()
      //console.log('result_l',result.post)

			if (result.thislang) return {
				props: {
          result: result,
          lang: lang,
          path: path
        }
			}
		}
    console.log(`Could not load ${url}`)
    console.log(`Trying ${get(sitelang)}/${lang}/cms.json`)

    res = await fetch(`/${get(sitelang)}/${lang}/cms.json`);
		if (res.ok) {
      const result = await res.json()
      console.log('result_l2',result.post)

			if (result.thislang) return {
				props: {
          result: result,
          lang: get(sitelang),
          path: lang
        }
			}
		}
    console.log(`Could not load anything!`)

    res = await fetch(`/${get(sitelang)}/cms.json`);
		if (res.ok) {
      const result = await res.json()
      //console.log('result_l3',result.post)

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
			error: new Error(`Could not load ${url}`)
		}
  }
</script>
<script>
  export let result, lang, path
  $:  $state = result
  $:  $pagepath = path
  $: if (lang && lang != 'undefined') $sitelang = lang
  //$: console.log('__layout $state:',$state)
  let thislang = {dir: 'ltr'}
	onMount(() => {
    document.querySelector('html').lang = $sitelang
    thislang = $state.thislang
    document.querySelector('html').dir = thislang.dir
    //console.log(thislang)
	});
</script>

<Nav/><!--  dir={thislang.dir} -->
<slot></slot>
<Footer/>
<!--<Cookies/>-->

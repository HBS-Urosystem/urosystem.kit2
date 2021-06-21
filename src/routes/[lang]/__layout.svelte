<script context="module">
  export const hydrate = false
  import { state } from '$lib/stores'
  import { sitelang } from '$lib/stores'
  import { pagepath } from '$lib/stores'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}

    //if (!lang || lang == 'undefined') lang = 'en'
    if (!path) path = 'index'
    //console.log('path_l',`/${lang}/${path}/cms.json`)
		const url = `/${lang}/${path}/cms.json`

		const res = await fetch(url);

		if (res.ok) {
      const result = await res.json()
      //console.log('result_l',result.post)
			return {
				props: {
          result: result,
          lang: lang,
          path: path
        }
			}
			/*return {
				props: {
          post: result.post,
          nav: result.nav,
          conf: result.conf,
          lang: lang,
          path: path
        }
			}*/
		}
    console.log(`Could not load ${url}`)
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
</script>

<!--<nav style="z-index: 999;">
  <a href="/en/{path}">en</a>
  <a href="/hu/{path}">hu</a>
  <a href="/{lang}/ic-bps">ic/bps</a>
  <a href="/{lang}/rutis">rutis</a>
  <a href="/{lang}/urodapter">urodapter</a>
</nav>-->
<Nav/><!--  dir={thislang.dir} -->
<slot></slot>
<Footer/>
<!--<Cookies/>-->

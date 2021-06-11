<script context="module">
  //export const hydrate = false
  import { state } from '$lib/stores'
  import { sitelang } from '$lib/stores'
  import NewNav from '$lib/NewNav.svelte'
  //import Footer from '$lib/Footer.svelte'

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}

    //if (!lang || lang == 'undefined') lang = 'en'
    if (!path) path = 'index'
    //console.log('path_l',`/${lang}/${path}/cms.json`)
		const url = `/${lang}/${path}/cms.json`

		const res = await fetch(url);

		if (res.ok) {
      const result = await res.json()
      //console.log('result_l',result)
			return {
				props: {
          result: result,
          lang: lang
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
  export let result, lang
  $:  $state = result
  $: if (lang && lang != 'undefined') $sitelang = lang

</script>

<NewNav/><!--  dir={thislang.dir} -->
<nav>
  <a href="/en">en</a>
  <a href="/hu">hu</a>
  <a href="/hu/ic-bps">ic/bps</a>
  <a href="/hu/rutis">rutis</a>
  <a href="/hu/urodapter">urodapter</a>
</nav>
<slot></slot>
<!--<Footer/>-->
<!--<Cookies/>-->

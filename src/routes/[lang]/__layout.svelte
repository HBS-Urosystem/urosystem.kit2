<script context="module">
  //export const hydrate = false
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { state, sitelang/*, cookies*/ } from '$lib/stores'
  //import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/env'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}
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
          result: await result/*,
          lang: result.thislang.id*/
        }
			}
		}
    return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
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

<svelte:head>
  {#each $state.langs as lang}
    <link rel="alternate" href="https://www.urosystem.com/{lang.id}/{$state.post.path || ''}" hreflang="{lang.id}" />
  {/each}

</svelte:head>

<Nav/><!--  dir={thislang.dir} -->
<slot></slot>
<Footer/>
<Cookies/>

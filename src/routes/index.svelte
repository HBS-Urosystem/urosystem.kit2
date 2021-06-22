<script context="module">
  import { sitelang } from '$lib/stores'
  export const load = async ({ page }) => {
    console.log('page',{...page})
    return {
				props: {
          params: {...page.params}/*,
          lang: lang,
          path: path*/
        }
			}
  }
</script>
<script>
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  export let params
  console.log($sitelang, params)
  //if (!params) goto($sitelang || 'en')
  //async ()=> {
    console.log('goto')
    goto('/' + $sitelang, { replaceState: true });
  //}
</script>

<svelte:head>
<title>URO</title>
</svelte:head>
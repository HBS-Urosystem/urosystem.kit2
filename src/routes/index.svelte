<script context="module">
  import { onMount } from 'svelte'
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  import { sitelang } from '$lib/stores'
  /*export const load = async ({ page }) => {
    console.log('page',{...page})
    return {
				props: {
          page: {...page}
        }
			}
  }*/
</script>
<script>
  //export let page
  //if (!page) goto($sitelang || 'en')
  onMount(() => {
    //console.log('goto/' + page)
    goto('/' + $sitelang, { replaceState: true });
	})
  //async ()=> {
  //}
</script>

<svelte:head>
<title>UroSystem Inc</title>
</svelte:head>
<script context="module">
  import { onMount } from 'svelte'
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
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
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
<title>UroSystem_Inc</title>
</svelte:head>
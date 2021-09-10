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
    goto('/' + $sitelang, { replaceState: false });
	})
  //async ()=> {
  //}
</script>

<svelte:head>
  <link rel="canonical" href="https://urosystem.com/en"/>
  <meta name='robots' content='noindex,follow' />
  <title>Bladder instillation with UroDapter® urological syringe adapter</title>
  <meta name="description" content="The UroDapter® urological adapter replaces catheter. It enables painless and complication-free bladder treatment for several lower urinary tract diseases.">
  <meta name="keywords" content="instillation, urological adapter, bladder disease, pain-free, cystitis, catheter replacement, painless, complication-free, bladder, treatment">
</svelte:head>
<main>
  <a href="/" aria-label="home"><img src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block;margin:0 auto; aspect-ratio: 100 / 90.861"/></a>
  <p>Welcome!</p>
  <noscript><p><a href="/en">NO JAVASCRIPT… Click here to load the website</a></p></noscript>
</main>

<style>
  main {
    text-align: center;
    /*padding-top: 9rem;*/
  }
</style>
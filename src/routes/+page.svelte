<script context="module">
  import { onMount } from 'svelte'
  import { sitelang, variables, state, cookies } from '$lib/stores'
  import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/environment'
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
</script>
<script>
  onMount(() => {
    //console.log('MOUNT', `/${$sitelang || '/en'}`)
    goto(`/${$sitelang || '/en'}`, { replaceState: true });
	})
</script>

<svelte:head>
  <!--<link rel="canonical" href="https://urosystem.com/en"/>-->
  <meta name='robots' content='follow, noindex' />
  <title>UroDapter® – Replacing Catheter in the Field of Bladder Instillation</title>
  <meta name="description" content="The UroDapter® urological adapter replaces catheter. It enables painless and complication-free bladder treatment for several lower urinary tract diseases.">
  <meta name="keywords" content="instillation, urological adapter, bladder treatment, urethra treatment, pain-free, catheter replacement, cystitis, painless, complication-free, bladder">
  <link rel="canonical" href="{_siteurl}/{$sitelang || 'hu'}"/>

</svelte:head>

<main>
  <header class="full">
    <a href="/" aria-label="home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block;margin:0 auto; aspect-ratio: 100 / 90.861"/></a>
    <p>Welcome! The website is loading…</p>
    <noscript><p><a href="/en">NO JAVASCRIPT… Click here to load the website</a></p></noscript>
  </header>
</main>

<style>
  header {
    padding-top: 12rem;
    padding-bottom: 1rem;
  }
  header.full {
    padding-top: 9rem;
    padding-bottom: 6rem;
    min-height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  main {
    text-align: center;
    /*padding-top: 9rem;*/
  }
</style>
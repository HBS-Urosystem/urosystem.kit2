<script context="module">
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'
  //const _siteurl = variables.siteurl[variables.site] || 'https://www.urosystem.com'
  //import { onMount } from 'svelte';
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/environment'
  import { browser } from '$app/environment'
  import { PortableText } from '@portabletext/svelte'
  import { getSanityImageUrl, formatBlogPostDate } from '$lib/helpers.js'
  import Identity from '$lib/Identity.svelte'
</script>

<main>

  <header>
    <!--<div class="hero-overlay bg-opacity-60"></div>-->
    
    <div class="text-center hero-content flex-wrap">

      {#if browser}
      <!--<div class="text-center hero-content text-neutral-content w-full">-->
        <Identity slot="header" bind={true}/>
      <!--</div>-->
      {/if}
    </div>
  </header>

</main>

<style>
  header {
    min-height: 100vh;
    background-image:url(/uploads/radials.png),var(--grad-dark-blue);
    background-position:50% -15%,50% 50%;
    background-size:150%,cover;
  }
  /*.hero-overlay {
    backdrop-filter: blur(2px);
    grid-column-start: 1;
    grid-row-start: 1;
    height: 100%;
    width: 100%;
  }*/
  .hero-content {
    grid-column-start: 1;
    grid-row-start: 1;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 80rem;
    gap: 1rem;
    /*padding-bottom: 6rem;*/
    padding-bottom: 8rem;
    padding-top: 12rem;
  }
</style>
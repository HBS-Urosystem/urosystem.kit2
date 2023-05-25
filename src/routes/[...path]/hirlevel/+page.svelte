<script context="module">
  import "./hirlev.postcss"
  //import { onMount, afterUpdate } from 'svelte'
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'
  //const _siteurl = variables.siteurl[variables.site] || 'https://www.urosystem.com'
  import { onMount } from 'svelte'
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/environment'
  import { PortableText } from '@portabletext/svelte'
  import { getSanityImageUrl, formatBlogPostDate } from '$lib/helpers.js'
  import Subscribe from '$lib/SubscribeActivecamp.svelte'
  //import { client } from '/src/lib/sanityClient.js'

  /*export const load = async ({fetch}) => {
    let res = await fetch('/hirlevel.json')
		if (res.ok) {
      const result = await res.json()
			return {
				props: {
          hirlevel: await result
        }
			}
    }
  }*/
</script>

<script>
  export let data
  //console.log(hirlevel)
  data.post.id = 'hirlevel'
  data.post.slug = 'hirlevel'
  data.post.canonical = 'hirlevel'
  data.post.menutitle = 'Hírlevelek'
  //console.log({result})
  $state = data
  onMount(() => {
    $sitelang = 'hu'
    //console.log({$sitelang})
	})
  let news, filter = data.filter == 'doc' || false
  $: news = filter && data.news_doc || data.news
</script>

<svelte:head>
  <title>UroSystem – Hírlevelek</title>
  <meta name="description" content="Urosystem is dedicated to lower urinary tract conditions, especially IC\u002FBPS. Get to know its diverse portfolio, from diagnosis to medication, including the UroDapter.">
  <meta name="keywords" content="Urosystem, UroDapter, IC/BPS, bladder disease, cystitis, urological">
</svelte:head>

<main id="hirlev">
  <header class="fu-ll">
    <h1>Hírleveleink</h1>
    <form>
      <label for="filter">
        <span>Páciens</span>
        <input id="filter" type="checkbox" bind:checked={filter}/>
        <span>Orvos</span>
      </label>
    </form>
  </header>
  
  <div id="content" class="s-xEUe3BhquCBG"></div>

  {#each news as hirlev}
    <article id={hirlev.slug.current} class="text-center w-full">
      <time>{formatBlogPostDate(hirlev.publishedAt)}</time>
      <h2 class="">{hirlev.title}</h2>
      <details class="text-left mx-auto">
        <!--<h5>{hirlev.excerpt}</h5>
        <PortableText value={hirlev.body}/>-->
        <summary>{hirlev.excerpt}</summary>
        <PortableText value={hirlev.body}/>
      </details>
    </article>
  {/each}

  <!--<p class="text-center mt-16"><a href="/hirlevel/rss.xml">RSS feed</a></p>-->
</main>


<style>
  header {
    padding-top: 12rem;
    padding-bottom: 1rem;
  }
  article {
    padding: var(--gap) var(--sides);
  }
  aside, details {
    max-width: 56ch;
    padding: 0;
    margin-inline: auto;
  }
  form {
    @apply form-control mb-12;
    align-items: center;
  }
  input#filter {
    @apply toggle toggle-sm bg-none;
  }
  /*header {
    display: grid;
    width: 100%;
    place-items: center;
    background-position: center;
    padding: 0;
  }
  header.full {
    background-image: url('/uploads/+.svg');
    background-size: 568px;
    background-repeat: initial;
    min-height:100vh;
  }
  .hero-overlay {
    backdrop-filter: blur(2px);
    grid-column-start: 1;
    grid-row-start: 1;
    height: 100%;
    width: 100%;
  }
  header > .hero-content {
    padding-top: 4rem;
  }
  .hero-content {
    grid-column-start: 1;
    grid-row-start: 1;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 80rem;
    gap: 1rem;
    padding-bottom: 8rem;
  }
  main {
    @apply container max-w-6xl mx-auto px-4;
  }
  article {
    @apply mt-32 py-16 shadow-xl image-full;
    background-color: var(--dark-blue);
    display: flex;
    flex-wrap: wrap;
    gap: 4ch;
    align-items: flex-end;
  }*/
  /*h1 {
    @apply text-2xl font-bold pb-4;
    text-align:initial;
  }*/
  time {
    /*@apply h-8;*/
    display: block;
    font-size: smaller;
    font-variant: small-caps;
  }
  time + h2 {
    margin-top: 1em;
  }

  /*.carousel {
    flex: 1 0 32ch;
    position: relative;
    gap: 2ch;
    width: 100%;
    max-width: 100%;
    grid-column-end: auto;
    align-self: stretch;
  }
  .carousel-item {
    width: min(32ch,100%);
  }
  .carousel button {
    @apply btn btn-circle btn-sm;
    position: sticky;
    top: 50%;
    width: 2rem;
    color: #3da4c9;
  }
  .carousel button:first-of-type {
    left: .25em;
  }
  .carousel button:last-of-type {
    right: .25em;
  }
  img {
    @apply shadow-2xl;
    object-fit: contain;
  }*/

</style>
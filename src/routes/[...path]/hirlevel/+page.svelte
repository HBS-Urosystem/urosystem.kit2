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
  //import Subscribe from '$lib/SubscribeActivecamp.svelte'
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
  data.post.canonical = '_us'
  data.post.menutitle = 'Hírlevelek'
  //console.log({result})
  $state = data
  let news, doc, filter
  onMount(() => {
    $sitelang = 'hu'
    //console.log({$sitelang})
    doc = data.filters.indexOf('doc') > -1
    $snapto = location.hash
    //console.log(location.hash)
  })
  $: {
    filter = doc && '?filter=doc' || ''
    news = doc && data.news_doc || data.news
  }
  //$: console.log(doc, filter)
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
      <label for="doc">
        <span>Páciens</span>
        <input id="doc" type="checkbox" bind:checked={doc}/>
        <span>Orvos</span>
      </label>
    </form>
  </header>
  
  <div id="content" class="s-xEUe3BhquCBG"></div>

  {#each news as hirlev}
    <article id={hirlev.slug.current} class="text-center w-full">
      <a href={`/hirlevel${filter}#${hirlev.slug.current}`} on:click={() => $snapto = `#${hirlev.slug.current}`}><time class="-mb-4 mt-6">{formatBlogPostDate(hirlev.publishedAt)}</time>
        <h2 class="">{hirlev.title}</h2>
      </a>
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
  details {
    max-width: 56ch;
    padding: 0;
    margin-inline: auto;
  }
  form {
    @apply form-control mb-12;
    align-items: center;
  }
  input#doc {
    @apply toggle toggle-sm bg-none;
  }

  label span {
    @apply mx-4;
  }
  time {
    /*@apply h-8;*/
    display: block;
    font-size: smaller;
    font-variant: small-caps;
  }
  time + h2 {
    margin-top: 1em;
  }

</style>
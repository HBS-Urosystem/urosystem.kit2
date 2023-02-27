<script context="module">
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'
  //const _siteurl = variables.siteurl[variables.site] || 'https://www.urosystem.com'
  //import { onMount } from 'svelte';
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/environment'
  import { browser } from '$app/environment'
  import { PortableText } from '@portabletext/svelte'
  import { getSanityImageUrl, formatBlogPostDate } from '$lib/helpers.js'
</script>

<script>
  //import { onMount, afterUpdate } from 'svelte'
  import Subscribe from '$lib/SubscribeActivecamp.svelte'

  console.log($state)

  const d = new Date()
  const futureEvents = new Array()
  const pastEvents = $state.filter(event => { /// 'ELOG'
    //console.log({event})
    const date = new Date(event.date2 || event.date1 || d)
    if (d.getTime() < date.getTime()) {
      futureEvents.push(event) /// future event
      //console.log('FUTURE')
      return false
    }
    if (event.images?.length) return true /// good past event

    //console.log('NONE'/*, date, event*/)
    futureEvents.push(event) /// future event 
    return false /// past or no date event, but not updated yet
  })

  let carous = {}
  const _carleft = (car) => {
    //console.log('L',car)
    car.scrollLeft -= 380
  }
  const _carright = (car) => {
    //console.log('R',car)
    car.scrollLeft += 380
  }
</script>


<header class="full">
  <div class="hero-overlay bg-opacity-60"></div>
  
  <div class="text-center hero-content flex-wrap">
    {#each futureEvents as event}
      <article class="max-w-lg">
        <aside>
          <time><span class="badge badge-md badge-accent">Upcoming</span> {formatBlogPostDate(event.date1)}{event.date2 ? ' – ' + formatBlogPostDate(event.date2) : ''}</time>
          <h1 class="">{event.title}</h1>
          <PortableText value={event.body}/>
        </aside>
      </article>
    {/each}

    {#if browser}
    <div class="text-center hero-content text-neutral-content w-full">
      <div class="ma-x-w-lg">
        <Subscribe/>
      </div>
    </div>
    {/if}
  </div>
</header>

<main id="events">
  {#each pastEvents as event}
    <article>
      <aside>
        <time>{formatBlogPostDate(event.date1)}{event.date2 ? ' – ' + formatBlogPostDate(event.date2) : ''}</time>
        <h1 class="">{event.title}</h1>
        <PortableText value={event.body}/>
      </aside>
      <div bind:this={carous[event.slug.current]} class="carousel rounded-lg" id={event.slug.current}>
        <button on:click={_carleft(carous[event.slug.current])}>◀︎</button>
        {#each event.images as img} 
        <div class="carousel-item" id={`${img._key}`}>
          <img loading="lazy" alt="" src={getSanityImageUrl(img).width(720).url()} class={img.portray ? 'portray' : 'landscape'}>
        </div>
        {/each}
        <button on:click={_carright(carous[event.slug.current])}>▶︎</button>
      </div>
    </article>
  {/each}

  <p class="text-center mt-16"><a href="/events/rss.xml">RSS feed</a></p>
</main>

<style>
  header {
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
    /*padding-bottom: 6rem;*/
    padding-bottom: 8rem;
  }
/*  main {
    padding-bottom: var(--gap);
  }*/
  main {
    @apply container max-w-6xl mx-auto px-4;
  }
  article {
    @apply mt-16 shadow-xl image-full;
    background-color: var(--dark-blue);
    display: flex;
    flex-wrap: wrap;
    gap: 4ch;
    padding: 3ch;
    align-items: flex-end;
  }
  aside {
    /*flex: 0 1 48ch;*/
    padding: 0;
    /*margin-inline: auto;*/
  }
  h1 {
    @apply text-2xl font-bold pb-4;
    text-align:initial;
  }
  time {
    /*@apply h-8;*/
    display: block;
    font-size: smaller;
    font-variant: small-caps;
  }

  .carousel {
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
  }

</style>
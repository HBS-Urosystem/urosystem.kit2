<script context="module">
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'
  import Components from '$lib/Components.svelte'
  import Slider from '$lib/my/Slider.svelte'
  import Hero from '$lib/my/Hero.svelte'
  import SubPage from '$lib/SubPage.svelte'
  //import { getSanityImageUrl/*, formatBlogPostDate*/ } from '$lib/sanity/helpers.js'
  //import { onMount } from 'svelte';
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/env'
  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
</script>
<script>
  //console.log({$state})
  let post, subs
  $: {
    post = $state.post.subpage || $state.post
    //subs = /*$state.post.subpage?.subpages || */$state.post.subpages
    //console.log('ID',$state.post.id,$state.post.subpage?.id)
    //console.log('POST',post.id)
    //console.log(post.sections)
  }
  $: console.log(post.sections)
</script>

{#if !!post.hero}
  
  <header id="header" class="full" style={post.hero.image ? `background-image: url(${post.hero.image.src})` : `background-image: url(/intro_loop_seq.apng); background-size: auto`} on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'} tabindex="0" role="link">

    <Hero comp={post.hero}/>
  </header>
{:else}
  <header id="header" on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'} tabindex="0" role="link">
    
    {#if $state.post.title != ''}
      <h1>{$state.post.title}</h1>
      {#if $state.post.subtitle}
        <h2>{$state.post.subtitle}</h2>
      {/if}
    {/if}
  </header>
{/if}

<main id="content">

  <!--{#if !!post.hero}
    <h2>{post.title}</h2>
  {/if}-->

  {#if $state.post.subpage && $state.post.subpage.subpages && !$state.post.subpage.hidesubs}
    <nav>
      <ul>
        {#each $state.post.subpage.subpages as sub}
        <li class:active={post.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
        {/each}
      </ul>
    </nav>
  {/if}

  {#each post.sections || [] as comp}
    <!--<div style="{comp.background}">-->
      <Components {comp}/>
    <!--</div>-->
  {/each}

  <!--{#if $state.post.subpage}
    <div style="{$state.post.background}">
      <h2>{post.title}</h2>
      {#each $state.post.blocks || [] as block}
        {#if block.published == undefined || (block.published === true || !!$gateway[block.published])}
          <div style="{block.background}">
            {#each block.components || [] as comp}
              <Components {comp}/>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/if}-->

  {#if $state.post.subpages && !$state.post.hidesubs}
    <nav>
      <h2>{$state.post.title}</h2>
      <ul>
        {#each $state.post.subpages as sub}
          <li class:active={post.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
        {/each}
      </ul>
    </nav>
  {/if}
<!--{/if}-->
</main>
<!--{#if $sitelang == 'en' && $state.thislang.id == 'en'}-->
<!--<a hidden aria-hidden="true" rel="redirect" href="/{!!$state.post.subpage && $state.post.slug !== '.' ? $state.post.path : ($state.post.path || '')}">&nbsp;</a>-->
<!--{/if}-->

<style>
  header {
    margin-bottom: var(--gap2);
  }
  header.full {
    padding-block: 3rem;
    height: auto;
    /*min-height: 100vh;
    min-height: calc(100vh - var(--gap2));*/
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
/*  main {
    padding-bottom: var(--gap);
  }*/
  h1/*, .h1*/ {
    cursor: pointer;
    margin-inline: auto;
  }
  nav {
    padding-block: 3rem;
  }
</style>
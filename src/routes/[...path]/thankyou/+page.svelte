<script context="module">
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'
  import Components from '$lib/Components.svelte'
  import SubPage from '$lib/SubPage.svelte'
  //import { onMount } from 'svelte';
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/env'
  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
</script>
<script>
  //export let form
  //console.log({form})
  let post, subs
  $: {
    post = $state.post.subpage || $state.post
    //subs = /*$state.post.subpage?.subpages || */$state.post.subpages
    //console.log('ID',$state.post.id,$state.post.subpage?.id)
    //console.log({post})
    //console.log()
  }
  //console.log($state.post)
</script>

<main>
  <!--{#if $state && !!$state.id}-->
  {#if !!post.hero}
    <header class="full" style="{post.hero.background ? post.hero.background : ``}" on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'}>

      {#if post.herotitle && post.herotitle != ''}
        <h1>{post.herotitle}</h1>
      {:else if $state.post.hero.title && $state.post.title != ''}
        <h1>{$state.post.hero.title}</h1>
      {/if}

      {#each post.hero.components || [] as comp}
        <Components {comp}/>
      {/each}

      {#if post.subhero}
        {#each post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {/if}

      <!--{#if subs && !post.hidesubs}-->
      {#if $state.post.subpages && !$state.post.hidesubs}
        <nav>
          <ul>
            <!--{#each subs as sub}-->
            {#each $state.post.subpages as sub}
              <li class:active={post.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
            {/each}
          </ul>
        </nav>
      {/if}

    </header>
  {:else}
    <header on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'}>
      
      {#if $state.post.title != ''}
        <h1>{$state.post.title}</h1>
      {/if}

      {#if post.subhero}
        {#each post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {/if}

      {#if $state.post.subpages && !$state.post.hidesubs}
        <nav>
          <ul>
            {#each $state.post.subpages as sub}
              <li class:active={post.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
            {/each}
          </ul>
        </nav>
      {/if}
    </header>
  {/if}

  <div id="content"></div>

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

  {#each post.blocks || [] as block}
    {#if block.published == undefined || (block.published === true || !!$gateway[block.published])}
      <div style="{block.background}">
        {#each block.components || [] as comp}
          <Components {comp}/>
        {/each}
      </div>
    {/if}
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
<a hidden aria-hidden="true" rel="redirect" href="/{!!$state.post.subpage && $state.post.slug !== '.' ? $state.post.path : ($state.post.path || '')}">&nbsp;</a>
<!--{/if}-->

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
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

<svelte:head>
  
  {#each $state.langs || [] as lang}
    {#if !!lang.active && lang.id != $sitelang}
      <link rel="alternate" href="{_siteurl}/{lang.id}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}" hreflang="{lang.id}" />
    {/if}
  {/each}

</svelte:head>

<main>
<!--{#if $state && !!$state.id}-->
  {#if !!$state.post.hero}
    <header class="full" style="{$state.post.hero.background ? $state.post.hero.background : ``}" on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'}>
      {#if $state.post.herotitle && $state.post.herotitle != ''}
      <h1>{$state.post.herotitle}</h1>
      {:else if $state.post.herotitle != ''}
      <h1>{$state.post.title}</h1>
      {/if}
      {#each $state.post.hero.components || [] as comp}
        <Components {comp}/>
      {/each}
      {#if $state.post.subhero}
        {#each $state.post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {/if}
      {#if /*$state.post.submenu && */$state.post.subpages}
        <nav>
          <ul>
            {#each $state.post.subpages as sub}
            <li class:active={$state.post.subpage?.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
            {/each}
          </ul>
        </nav>
      {/if}
    </header>
  {:else}
    <header on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'}>
      <h1>{$state.post.title}</h1>
      {#if $state.post.subhero}
        {#each $state.post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {/if}
      {#if /*$state.post.submenu && */$state.post.subpages}
        <nav>
          <ul>
            {#each $state.post.subpages as sub}
            <li class:active={$state.post.subpage?.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
            {/each}
          </ul>
        </nav>
      {/if}
    </header>
  {/if}

  <div id="content"></div>

  {#each $state.post.blocks || [] as block}
  {#if block.published == undefined || (block.published === true || !!$gateway[block.published])}
    <div style="{block.background}">
      {#each block.components || [] as comp}
        <Components {comp}/>
      {/each}
    </div>
  {/if}
  {/each}

  {#if $state.post.subpage}
    <div style="{$state.post.subpage.background}">
      <h2>{$state.post.subpage.title}</h2>
      {#each $state.post.subpage.blocks || [] as block}
        {#if block.published == undefined || (block.published === true || !!$gateway[block.published])}
          <div style="{block.background}">
            {#each block.components || [] as comp}
              <Components {comp}/>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
  {#if /*$state.post.submenu && */$state.post.subpages && $state.post.subpage}
    <nav>
      <h2>{$state.post.title}</h2>
      <ul>
        {#each $state.post.subpages as sub}
        <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
        {/each}
      </ul>
    </nav>
  {/if}
<!--{/if}-->
</main>
<!--{#if $sitelang == 'en' && $state.thislang.id == 'en'}-->
<a hidden aria-hidden="true" rel="redirect" href="/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}">&nbsp;</a>
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
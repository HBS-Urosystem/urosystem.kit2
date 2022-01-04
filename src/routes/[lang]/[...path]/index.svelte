<script context="module">
  //export const hydrate = true
  //export const prerender = true
  //export const prerender = false

  import { state, snapto, gateway } from '$lib/stores'
  import Components from '$lib/Components.svelte'
  import SubPage from '$lib/SubPage.svelte'
  //import { onMount } from 'svelte';
  //import * as scroller from "svelte-scrollto"
  //import { amp, browser, dev, prerendering } from '$app/env'
</script>
<script>

</script>

<svelte:head>
<!--{#if $state && !!$state.id}-->
  {#if $state.post.subpage}
    <title>{$state.post.subpage.title}</title>
    <meta name="description" content="{$state.post.subpage.description}">
    <meta name="keywords" content="{$state.post.subpage.keywords}">
    {#if $state.post.subpage.meta}
      {#each $state.post.subpage.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {:else}
    <title>{$state.post.title}</title>
    <meta name="description" content="{$state.post.description}">
    <meta name="keywords" content="{$state.post.keywords}">
    {#if $state.post.meta}
      {#each $state.post.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {/if}
<!--{/if}-->
</svelte:head>

<main>
<!--{#if $state && !!$state.id}-->
  {#if !!$state.post.hero}
    <header class="full" style="{$state.post.hero.background ? $state.post.hero.background : ``}" on:click={() => $snapto = '#content'}>
      <h1 hidden>{$state.post.title}</h1>
      {#each $state.post.hero.components || [] as comp}
        <Components {comp}/>
      {/each}
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
    <!--{#if $state.post.subpages}
      <nav>
        <ul>
          {#each $state.post.subpages as sub}
          <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} noscroll/></li>
          {/each}
        </ul>
      </nav>
    {/if}-->
  {:else}
    <header on:click={() => $snapto = '#content'}>
      <!--<h1 on:click={() => scroller.scrollTo({element: '#content', offset: 0})}>{$state.post.title}</h1>-->
      {#if $state.post.subhero}
        {#each $state.post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {:else}
      <h1>{$state.post.title}</h1>
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
  {#if /*$state.post.submenu && */$state.post.subpages && $state.post.blocks}
    <nav>
      <h2>{$state.post.title}</h2>
      <ul>
        {#each $state.post.subpages as sub}
        <li class:active={$state.post.subpage?.id == sub.id}><SubPage {sub} scrollto="#content"/></li>
        {/each}
      </ul>
    </nav>
  {/if}
<!--{/if}-->
</main>

<style>
  header {
    padding-top: 12rem;
    padding-bottom: 1rem;
  }
  header.full {
    padding-top: 9rem;
    /*padding-bottom: 12rem;*/
    min-height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
/*  main {
    padding-bottom: var(--gap);
  }*/
  h1 {
    cursor: pointer;
  }
  nav {
    margin-block: 6rem;
  }
</style>
<script context="module">
  //export const hydrate = false

  import { state } from '$lib/stores'
  import Components from '$lib/Components.svelte'
  import SubPage from '$lib/SubPage.svelte'
  //import { amp, browser, dev, prerendering } from '$app/env'

</script>
<script>
  //$: console.log('state.subpage', $state.post.subpage)
</script>

<svelte:head>
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
</svelte:head>

<main>
  {#if $state.post.hero}
    <header style="min-height:100vh;display: flex;flex-direction: column;justify-content: center;{$state.post.hero.background ? $state.post.hero.background : ``}">
      <h1 hidden>{$state.post.title}</h1>
      {#each $state.post.hero.components || [] as comp}
        <Components {comp}/>
      {/each}
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
    <header>
      <h1>{$state.post.title}</h1>
      {#if $state.post.subhero}
        {#each $state.post.subhero.components || [] as comp}
          <Components {comp}/>
        {/each}
      {/if}
      {#if $state.post.subpages}
        <nav>
          <ul>
            {#each $state.post.subpages as sub}
            <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} noscroll/></li>
            {/each}
          </ul>
        </nav>
      {/if}
    </header>
  {/if}

  {#each $state.post.blocks || [] as block}
    <div style="{block.background}">
      {#each block.components || [] as comp}
        <Components {comp}/>
      {/each}
    </div>
  {/each}

  {#if $state.post.subpage}
    <div id="content"></div>
    <h2>{$state.post.subpage.title}</h2>
    {#each $state.post.subpage.blocks || [] as block}
      <div style="{block.background}">
        {#each block.components || [] as comp}
          <Components {comp}/>
        {/each}
      </div>
    {/each}
  {/if}
  {#if $state.post.subpages}
    <nav>
      <h2>{$state.post.title}</h2>
      <ul>
        {#each $state.post.subpages as sub}
        <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} noscroll/></li>
        {/each}
      </ul>
    </nav>
  {/if}
</main>

<style></style>
<script context="module">
  export const hydrate = false

  import { state, sitelang } from '$lib/stores'
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
    <header style="{$state.post.hero.background ? $state.post.hero.background : ``}">
      <h1 hidden>{$state.post.title}</h1>
      {#each $state.post.hero.components || [] as comp}
      <Components {comp}/><!-- <h2>{comp.type}</h2> --><!--  lang={$state.post.hero.lang} -->
      {/each}
    </header>
    {#if $state.post.subposts}
      <nav>
        <ul>
          {#each $state.post.subposts as sub}
          <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} noscroll/></li>
          {/each}
        </ul>
      </nav>
    {/if}
  {:else}
    <header>
      <h1>{$state.post.title}</h1>
      <nav>
        {#if $state.post.subposts}
          <ul>
            {#each $state.post.subposts as sub}
            <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub} noscroll/></li>
            {/each}
          </ul>
        {/if}
      </nav>
    </header>
  {/if}

  {#each $state.post.blocks || [] as block}
    <div style="{block.background}">
      {#each block.components || [] as comp}
        <Components {comp}/><!-- <h2>{comp.type}</h2> --><!--  lang={block.lang} -->
      {/each}
    </div>
  {/each}

  {#if $state.post.subpage}
    <div id="content"></div>
    <h2>{$state.post.subpage.title}</h2>
    {#each $state.post.subpage.blocks || [] as block}
      <div style="{block.background}">
        {#each block.components || [] as comp}
          <Components {comp}/><!-- <h2>{comp.type}</h2> --><!--  lang={block.lang} -->
        {/each}
      </div>
    {/each}
  {/if}
  {#if $state.post.subposts}
    <nav>
      <h2>{$state.post.title}</h2>
      <ul>
        {#each $state.post.subposts as sub}
        <li class:active={$state.post.subpage.id == sub.id}><SubPage {sub}/></li>
        {/each}
      </ul>
    </nav>
  {/if}
</main>

<style></style>
<script context="module">
  export const hydrate = false

  import { state, sitelang } from '$lib/stores'
  import Components from '$lib/Components.svelte'
  //import { amp, browser, dev, prerendering } from '$app/env'

</script>
<script>
  export let lang, post
  $: post = $state.post
  $: lang = $sitelang
</script>

<svelte:head>
  {#if post.subpage}
    <title>{post.subpage.title}</title>
    <meta name="description" content="{post.subpage.description}">
    <meta name="keywords" content="{post.subpage.keywords}">
    {#if post.subpage.meta}
      {#each post.subpage.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {:else}
    <title>{post.title}</title>
    <meta name="description" content="{post.description}">
    <meta name="keywords" content="{post.keywords}">
    {#if post.meta}
      {#each post.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {/if}
</svelte:head>

<main>
  {#if post.hero}
  <header style="{post.hero.background ? post.hero.background : ``}">
    <h1 hidden>{post.title}</h1>
    {#each post.hero.components || [] as comp}
    <Components {comp}/><h2>{comp.type}</h2><!--  lang={post.hero.lang} -->
    {/each}
  </header>
  {#if post.subposts}
    <nav>
      <ul>
        {#each post.subposts as sub}
        <!--<SubPage link="{sub.link}" noscroll=true/>--><li><a href="/{lang}/{sub.folder}/{sub.slug}">{sub.menutitle}</a></li>
        {/each}
      </ul>
    </nav>
  {/if}
{:else}
<nav>
  <header>
  <h1>{post.title}</h1>
  {#if post.subposts}
  <ul>
    {#each post.subposts as sub}
    <!--<SubPage link="{sub.link}" noscroll=true/>--><li><a href="/{lang}/{sub.folder}/{sub.slug}">{sub.menutitle}</a></li>
    {/each}
  </ul>
{/if}
</header>
</nav>
{/if}

  {#each post.blocks || [] as block}
  <div style="{block.background}">
    {#each block.components || [] as comp}
    <Components {comp}/><h2>{comp.type}</h2><!--  lang={block.lang} -->
    {/each}
  </div>
  {/each}
{#if post.subpage}
  {#each post.subpage.blocks || [] as block}
  <div style="{block.background}">
    {#each block.components || [] as comp}
    <Components {comp}/><h2>{comp.type}</h2><!--  lang={block.lang} -->
    {/each}
  </div>
  {/each}
{/if}
</main>

<style></style>
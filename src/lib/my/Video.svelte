<script>
  export let comp//, lang
	//import { moved } from '$lib/stores'
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subhead}<h3>{comp.subhead}</h3>{/if}
  {#if comp.cat}<h4>{comp.cat}</h4>{/if}
    <!--{#if $moved}-->
    {#if comp.source == 'youtube'}
    <div>
      <iframe title="{comp.title || comp.anchor || 'video'}" loading="lazy" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/{comp.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    {/if}
    {#if comp.source == 'embed'}
      {@html comp.code}
    {/if}
    {#if comp.source == 'local'}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video preload="none" title="{comp.title || comp.anchor || 'video'}" loading="lazy" poster={comp.poster || `/${comp.id}.png`} width="100%" controls controlsList="nodownload">
        <source src="/{comp.id}" type="video/mp4">
      </video>
    {/if}
    {#if comp.source == 'web'}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video preload="none" title="{comp.title || comp.anchor || 'video'}" loading="lazy" poster={comp.poster || `${comp.id}.png`} width="100%" controls controlsList="nodownload">
        <source src="{comp.id}" type="video/mp4">
      </video>
    {/if}
    <!--{/if}-->
  {#if comp.text}{@html comp.text}{/if}
</article>

<style>
  article {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-basis: 36ch;
    justify-content: space-between;
  }
  h2, h3 {
    padding-top: 0;
  }
  h4 {
    order: -1;
    padding-top: 1.5em;
  }

  div {
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
  }
  div::before {
    content: "";
    display: block;
    padding-bottom: 56.25%;
  }  
  div iframe {
    object-fit: cover;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    height: 100%;
  }
  video {
    object-fit: contain;
    max-height: calc(100vh - 5rem);
    display: block;
  }

</style>

<script>
  export let comp//, lang
	import { moved } from '$lib/stores'
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
    {#if $moved}
    {#if comp.source == 'youtube'}
    <div>
      <iframe title="{comp.title || comp.anchor || 'video'}" loading="lazy" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/{comp.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    {/if}
    {#if comp.source == 'local'}
    <video title="{comp.title || comp.anchor || 'video'}" loading="lazy"  poster="{comp.id}.png" width="100%" controls>
      <source src="{comp.id}" type="video/mp4">
    </video>
    {/if}
    {/if}
  {#if comp.text}{@html comp.text}{/if}
</article>

<style>
  article {
    text-align: center;
    padding: 0;
    /*min-height: 100vh;*/
  }
  div {
    position: relative;
    /*width: 75%;*/
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
    max-height: 100vh;
  }

</style>
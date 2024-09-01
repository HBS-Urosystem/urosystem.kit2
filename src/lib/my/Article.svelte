<script context="module">
  //import Article from '$lib/my/Article.svelte'
/*  import Images from '$lib/my/Images.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		//article: Article,
		images: Images,
		cta: Cta,
		video: Video,
	};*/
</script>
<script>
  export let comp
  //console.log(comp)
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
    {#if comp.title}<h2>{comp.title}</h2>{/if}
    <div>
      {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}
    {#if comp.text}{@html comp.text}{/if}
  </div>
  <!--{#if comp.sections?.length}
    <section class={comp.framed ? 'framed' : ''}>
      {#each comp.sections as c}
      <svelte:component this={options[c.type]} comp={c}/>
      {/each}
    </section>
  {/if}-->
</article>

<style>
  h3 {
    text-align: center;
  }
  /*.framed {
    background: white;
    padding: var(--halfgap);
    
    max-width: 56ch;
    margin-inline: auto;
    margin-block: 3rem;
  }
  .framed :global(figure) {
    margin-top: 2rem;
  }
  .framed :global(*) {
    color: black;
    text-shadow: none;
  }
  .framed :global(figcaption p) {
    hyphens: none;
  }*/
</style>
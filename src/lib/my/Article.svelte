<script context="module">
  //import Article from '$lib/my/Article.svelte'
  import Images from '$lib/my/Images.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		//article: Article,
		images: Images,
		cta: Cta,
		video: Video,
	};
</script>
<script>
  export let comp
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subhead}<div><h3>{comp.subhead}</h3></div>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  {#if comp.components?.length}
    <section class={comp.framed ? 'framed' : ''}>
      {#each comp.components as c}
      <!--c.lang = comp.lang-->
      <svelte:component this={options[c.type]} comp={c}/>
      {/each}
    </section>
  {/if}
</article>

<style>
  h3 {
    text-align: center;
  }
  .framed {
    border: 2px #fff solid;
    /*padding: var(--gap);*/
    
    max-width: 56ch;
    margin-inline: auto;
    margin-block: 3rem;
  }
  .framed :global(figure) {
    margin-top: 2rem;
  }
</style>
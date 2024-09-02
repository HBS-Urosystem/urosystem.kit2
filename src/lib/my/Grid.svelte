<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Images from '$lib/my/Images.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		article: Article,
		images: Images,
		cta: Cta,
		buy: BuyButton,
		video: Video,
	};
</script>
<script>
  export let comp//, lang
  const lang = comp.lang
/*console.log({comp})*/
</script>

<!--<section id="{comp.anchor}" style="{comp.background ? comp.background : ``}">-->
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
  
  {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}

  <div class="{comp.slide ? 'slides' : ''}" style="--cols: {comp.sections?.length || comp.ctas?.length};">
    {#each comp.sections || comp.ctas || [] as c}
      <svelte:component this={options[c._type]} comp={c}/>
    {/each}
  </div>
  {#if comp.caption}<h3>{comp.caption}</h3>{/if}
<!--</section>-->

<style>
  div.slides {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: space-around;
  }
  h3 {
    text-align: center;
  }
  /*.framed {
    border: 2px #fff solid;
    padding: var(--gap);
    margin: var(--gap2);
  }*/
</style>
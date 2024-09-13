<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Images from '$lib/my/Images.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		article: Article,
		images: Images,
		cta: Cta2,
		buy: BuyButton,
		video: Video,
	};
</script>
<script>
  export let comp//, lang
  const lang = comp.lang

//console.log({comp})

let carous = {}
$: console.log(carous.scrollLeft)
</script>

<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}

<!-- HORIZONTAL SCROLLER -->
<section class="car--ousel {comp.slide ? 'slide' : ''} grid grid-rows-4 grid-flow-col gap-8" style="--cols: {comp.sections?.length}; grid-template-rows: auto auto auto auto" bind:this={carous}>
    {#each comp.sections || [] as c}
      <svelte:component this={options[c._type]} comp={c}/>
    {/each}
  </section>

  {#if comp.caption}<h3>{comp.caption}</h3>{/if}
</aside>

<style>
  .slide {
    overflow-x: auto;
    padding-inline: var(--gap);
  }
  /*
  section::before {
    content: '◀︎'
  }
  section::after {
    content: '▶︎'
  }
*/
  /*h3 {
    text-align: center;
  }*/

</style>
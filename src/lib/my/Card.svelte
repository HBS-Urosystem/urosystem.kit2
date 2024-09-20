<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Slider from '$lib/my/Slider.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		article: Article,
		slider: Slider,
		cta: Cta2,
		buy: BuyButton,
		video: Video,
	};
</script>
<script>
  export let comp//, lang
  const lang = comp.lang

//console.log('Card', {comp})

</script>

<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}

  {#each comp.sections || [] as c}
    <svelte:component this={options[c._type]} comp={c}/>
  {/each}

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
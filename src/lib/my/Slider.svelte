<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		article: Article,
		cta: Cta2,
		buy: BuyButton,
		video: Video,
	};
</script>
<script>
  export let comp//, lang
  const lang = comp.lang
  let link

  //if (comp._key == 'abab22bb14aa') console.log('Slider', comp.sections)

  let carous = {}
  //$: console.log(carous.scrollLeft)
</script>

  <h4 class="text-center">{comp.title || ''}</h4>
  <h5 class="text-center">{comp.subtitle || ''}</h5>
  <section class="slide grid grid-rows-4 grid-flow-col gap-x-8" style="--cols: {comp.sections?.length}; grid-template-rows: auto auto auto auto; grid-template-columns: repeat(var(--cols), 1fr);" bind:this={carous}>
    {#each comp.sections || [] as c}
      <!--{#if c.page || c.link}-->
        <svelte:component this={options[c._type]} comp={c}/>
      <!--{/if}-->
    {/each}
  </section>
  <p class="text-center">{comp.caption|| ''}</p>

<style>
  .slide {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    margin-inline: 0;
    max-width: 100%;
  }
  /*.slide > a:first-of-type {
    scroll-snap-align: start;
  }
  .slide > a:last-of-type {
    scroll-snap-align: end;
  }*/
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
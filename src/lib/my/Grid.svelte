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
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}" class={comp.framed ? 'framed' : ''}>
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
  {#if comp.subhead}<h3 id="{comp.anchor}">{comp.subhead}</h3>{/if}
  <section class="{comp.slide ? 'slides' : ''}" style="--cols: {comp.components.length};">
    {#each comp.components || [] as c}
    <!--{#if c.lang = comp.lang}-->
    <svelte:component this={options[c.type]} comp={c}/>
    <!--{/if}-->
    {/each}
  </section>
</article>

<style>
  section.slides {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  h3 {
    text-align: center;
  }
  .framed {
    border: 2px #fff solid;
    padding: var(--gap);
    margin: var(--gap2);
  }
</style>
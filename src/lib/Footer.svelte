<script context="module">
	import { state, sitelang, variables } from '$lib/stores'
  const _site = variables.site
  import Article from '$lib/my/Article.svelte'
  import Slider from '$lib/my/Slider.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Details from '$lib/my/Details.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		textBlock: Article,
		slider: Slider,
		cta: Cta2,
		buy: BuyButton,
		video: Video,
    detailsItem: Details,
	};
</script>
<script>
  const comp = $state.config.footer
  const dir = $state.thislang.dir

  //console.log('Footer:',comp)

  //export let comp//, lang
  //const lang = comp.lang
</script>

<footer style="{comp.background ? comp.background : ``}">
  <!--{#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}-->

  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<h3>{comp.subtitle}</h3>{/if}

  {#each comp.sections || [] as c}
    <svelte:component this={options[c._type]} comp={c}/>
  {/each}

  <!--{#if comp.caption}<h3>{comp.caption}</h3>{/if}-->

  <div>
    <!--{#if $sitelang == 'hu' && _site == '_us'}
      <a href="/hu/company#ginop" aria-label="ginop"><img loading="lazy" src="/uploads/ginop.png" alt="GINOP pályázat" style="width:20ch;display:block;"/></a>
    {/if}-->
    <a href="/" aria-label="urosystem home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block; aspect-ratio: 100 / 90.861"/></a>
    <!--{#if $sitelang == 'hu' && _site == '_us'}
      <a href="/hu/company#nkfi" aria-label="nkfi"><img loading="lazy" src="/uploads/nkfi.png" alt="NKFI pályázat" style="width:20ch;display:block;"/></a>
    {/if}-->
  </div>
  <!-- <nav>
    <ul>
      {#each footer as nav}
      <li>
        <h5><span>{nav.title}</span></h5>
        {#each nav.sublinks || [] as sub}
          <SubNav {sub} dir='block'/>
        {/each}
      </li>
      {/each}
    </ul>
  </nav>-->
</footer>

<style>
  footer {
    max-width: 100%;
    overflow: hidden;
  }

/*
  nav {
    background-color: var(--dark);
    padding: var(--gap2) var(--sides) 0;
  }
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  li {
    padding: 2rem 0;
    white-space: nowrap;
  }
  li * {
    white-space: nowrap;
  }
  h5 {
    text-transform: uppercase;
    padding-right: 1rem;
    margin-top: 0;
  }
  a {
    text-decoration: none;
  }
*/
  div {
    /*background-color: var(--light);*/
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /*background-image:var(--grad-light);
    background-image:var(--grad-light);
    background-position:50% 50%;
    background-size:cover;*/
    padding-top: var(--gap2);
  }

  /*div {
    display: flex;
    flex-direction: column;
  }*/
  a, a:visited {
    color: inherit;
  }
</style>

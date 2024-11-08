<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Slider from '$lib/my/Slider.svelte'
  //import Card from '$lib/my/Card.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		textBlock: Article,
		slider: Slider,
		cta: Cta2,
		buy: BuyButton,
		video: Video,
	};
</script>
<script>
  export let comp
  //console.log('HERO:',comp)
</script>

{#if comp.title}<!-- && $state.title != '' -->
<h1>{comp.title}</h1>
{#if comp.subtitle}
  <h2>{comp.subtitle}</h2>
{/if}
{/if}

{#each comp.sections || [] as c}
  <svelte:component this={options[c._type]} comp={c}/>
{/each}

<!--{#if comp.ctas}
{@const comp = {sections: comp.ctas}}
<Slider {comp}/>
{/if}-->

<!--{#if subhero}
{#each subcomp.components || [] as comp}
  <Components {comp}/>
{/each}
{/if}-->

<!--{#if subs && !hidesubs}-->
<!--{#if $state.subpages && !$state.hidesubs}
<nav>
  <ul>
    {#each $state.subpages as sub}
      <li class:active={id == sub.id}><SubPage {sub} scrollto="#content"/></li>
    {/each}
  </ul>
</nav>
{/if}-->

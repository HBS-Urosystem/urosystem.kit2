<script context="module">
  import { onMount, afterUpdate } from 'svelte'
  import Article from '$lib/my/Article.svelte'
  import Cta2 from '$lib/my/Cta2.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  const options = {
		textBlock: Article,
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

  let carous, carostyle, divclass, snav, pad
  //$: console.log(carous.scrollLeft)
  //$: console.log(carous?.offsetWidth,carous?.scrollWidth)
  /*$: if (carous) {
    carostyle = getComputedStyle(carous)
    if (carostyle.scrollWidth > carostyle.offsetWidth) {
      divclass = 'slide'
    } else {
      divclass = 'fix'
    }
  }*/
  /*onMount(() => {
  })*/
  afterUpdate(() => {
    //carostyle = getComputedStyle(carous)
    pad = getComputedStyle(carous).paddingInline.replace ('px', '')
    console.log(carous.scrollWidth, snav)
    //console.log(carostyle.scrollWidth, carostyle.offsetWidth)
    if (carous.scrollWidth > snav) {
      divclass = 'slide'
    } else {
      divclass = 'fix'
    }
  })
  
  const swipe = (e) => {
    //console.log(carostyle.gridTemplateColumns)
    if (e.offsetX > snav - pad) {
      carous.scrollLeft += 240;
      //alert ('right')
    }
    if (e.offsetX < pad) {
      carous.scrollLeft -= 240;
      //alert ('left')
    }
  }
</script>

  <h4 class="text-center">{comp.title || ''}</h4>
  <h5 class="text-center">{comp.subtitle || ''}</h5>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class={divclass} on:click={swipe}>
  <section class="grid grid-rows-4 grid-flow-col gap-x-8" style="padding-inline: var(--gap); --cols: {comp.sections?.length}; grid-template-rows: auto auto auto auto; grid-template-columns: repeat(var(--cols), 1fr);" bind:this={carous} bind:clientWidth={snav}>
    {#each comp.sections || [] as c}
      <svelte:component this={options[c._type]} comp={c}/>
    {/each}
  </section>
  </div>
  <p class="text-center">{comp.caption|| ''}</p>

<style>
  div {
    margin-block: var(--halfgap);
    padding-block: var(--halfgap);
  }

  .slide {
    position: relative;
  }
  .slide > section {
    max-width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    margin-inline: 0;
    scroll-behavior: smooth;
  }
  .slide:before, .slide:after {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--light-blue);
    border-radius: 50%;
    /*padding-top: 1.4rem;*/
    line-height: 2.8rem;
    font-size: 1.5rem;
    cursor: pointer;
    bottom: 50%;
    z-index: 1;
  }
  .slide:after {
    right: 1rem;
    content: '▶︎';
  }
  .slide:before {
    content: '◀︎';
    left: 1rem;
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
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
  //console.log('slider:', {comp})
  const lang = comp.lang
  let link

  //if (comp._key == 'abab22bb14aa') console.log('Slider', comp.sections)

  let carous, carostyle, divclass = 'slide', snav, pad
  afterUpdate(() => {
    //carostyle = getComputedStyle(carous)
    pad = getComputedStyle(carous).paddingInline.replace ('px', '')
    //console.log(carous.scrollWidth, snav)
    //console.log(carostyle.scrollWidth, carostyle.offsetWidth)
    if (carous.scrollWidth > snav) {
      divclass = 'slide'
    } else {
      divclass = 'fix'
    }
  })
  let width = 320;
  $: if(comp.sections.find(s => s._type == 'video')) {
    width = 560;
  } else {
    width = 320;
  }
  $: () => {
    //carostyle = getComputedStyle(carous)
    pad = getComputedStyle(carous).paddingInline.replace ('px', '')
    //console.log(carous.scrollWidth, snav)
    //console.log(carostyle.scrollWidth, carostyle.offsetWidth)
    if (carous.scrollWidth > snav) {
      divclass = 'slide'
    } else {
      divclass = 'fix'
    }
  }
  
  const swipe = (e) => {
    //console.log(carostyle.gridTemplateColumns)
    if (e.offsetX > snav - pad) {
      carous.scrollLeft += width;
      //alert ('right')
    }
    if (e.offsetX < pad) {
      carous.scrollLeft -= width;
      //alert ('left')
    }
    console.log(carous.scrollLeft)
  }
</script>

<!--<aside>-->
  <h2 class="text-center">{comp.title || ''}</h2>
  <h3 class="text-center">{comp.subtitle || ''}</h3>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class={divclass} on:click={swipe}>
    <section class={`grid grid-rows-${comp.sections?.length} grid-flow-col gap-x-8`} style="--cols: {comp.sections?.length};" bind:this={carous} bind:clientWidth={snav}>
      {#each comp.sections || [] as c}
        <svelte:component this={options[c._type]} comp={c}/>
      {/each}
    </section>
  </div>
  <p class="text-center">{comp.caption|| ''}</p>
<!--</aside>-->

<style>
  aside {
    margin-block: var(--gap2);
    padding-inline: 0;
  }

  div {
    position: relative;
    /*margin-block: var(--halfgap);
    padding-block: var(--halfgap);*/
  }
  
  .slide > section {
    max-width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
    margin-inline: 0;
    padding-inline: var(--gap2);
    scroll-behavior: smooth;
    grid-template-rows: auto auto auto auto;
    /*grid-template-columns: repeat(var(--cols), 1fr);*/
    grid-template-columns: repeat(var(--cols), minmax(auto, 1fr));
    /*grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;*/
  }
  .slide:before, .slide:after {
    position: absolute;
    width: var(--gap);
    height: var(--gap);
    background: var(--light-blue);
    border-radius: 50%;
    /*padding-top: 1.4rem;*/
    line-height: var(--gap);
    font-size: var(--halfgap);
    cursor: pointer;
    bottom: 50%;
    text-align: center;
    z-index: 1;
  }
  .slide:after {
    right: var(--halfgap);
    content: '▶︎';
  }
  .slide:before {
    content: '◀︎';
    left: var(--halfgap);
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
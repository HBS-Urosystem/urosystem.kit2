<script>
  export let comp//, lang
  //let video
	//import { moved } from '$lib/stores'
  //console.log('VIDEO:',{comp})
</script>

  <h3 class={comp.title}>{comp.title || ''}</h3><!--{#if comp.title}{/if}-->
  <h4>{comp.subtitle || ''}</h4><!--{#if comp.subtitle}{/if}-->
  <!--{#if comp.cat}<h4>{comp.cat}</h4>{/if}-->
    <!--{#if $moved}-->
  {#if comp.file}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video preload="metadata" title="{comp.title || comp.anchor || 'video'}" poster={comp.poster} width="100%" controls c={comp.controls} controlsList="nodownload" autoplay={comp.autoplay}>
      <source src="{comp.file}" type={`video/${comp.ext}`}>
    </video>
  {/if}

  {#if comp.code}
    {#if comp.code.startsWith('<')}
      <!-- embed code -->
    {:else}
      <!-- YT ID -->
      <iframe loading="lazy" title="{comp.title || comp.anchor || 'video'}" width="100%" height="315" src="https://www.youtube-nocookie.com/embed/{comp.code}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    {/if}
  {/if}

  {#if comp.link}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video preload="metadata" title="{comp.title || comp.anchor || 'video'}" poster={comp.poster} width="100%" controls c={comp.controls} controlsList="nodownload" autoplay={comp.autoplay}>
      <source src="{comp.link}" type={`video/${comp.ext}`}>
    </video>
  {/if}

  <!--{/if}-->
  <p>{comp.caption || ''}</p><!--{#if comp.text}{@html comp.text}{/if}-->

<style>
  h2, h3, h4, h5 {
    text-align: center;
  }
  video, iframe {
    cursor: pointer;
    min-width: 50ch;
  }
  video {
    object-fit: contain;
    max-height: calc(100vh - 5rem);
    display: block;
  }
  /*article {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-basis: 36ch;
    justify-content: space-between;
  }*/
  /*h4 {
    order: -1;
    padding-top: 1.5em;
  }*/

  /*div {
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
  }
  div::before {
    content: "";
    display: block;
    padding-bottom: 56.25%;
  }  
  div iframe {
    object-fit: cover;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    height: 100%;
  }*/

</style>

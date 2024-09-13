<script>
  import { snapto, sitelang } from '$lib/stores'
  //console.log({sitelang})
  export let comp//, lang
  let rel, target, link, scrollto = false
  //console.log(comp.lang, $sitelang)
  $: {
    //console.log('1',/*scrollto,*/ comp.link)
    if (comp.page) {
      link = '/' + $sitelang + '/' + comp.page
    } else if (comp.link && comp.link.startsWith('/')) {
      link = '/' + $sitelang + (comp.link == '/index' ? '' : comp.link)
      //scrollto = false
    } else if (comp.link && comp.link.startsWith('http')) {
      rel = 'noopener'
      target = '_blank'
      link = comp.link
    } else if (comp.link && comp.link.startsWith('#')) {
      link = scrollto = comp.link
    } else {
      if (comp.link == '/' || !comp.link) {
        comp.link = ''
      } else {
        comp.link = '/' + comp.link
      }
      link = '/' + $sitelang + comp.link //+ (scrollto || '')
    }
    //if (comp.page) console.log('CTA',comp) 
  }
</script>

<!--<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">-->
  <!--<div class="p-8">-->
    <h4>{comp.title || ''}</h4>
    <h5>{comp.subtitle || ''}</h5>
  <!--{#if comp.label}-->
    <a class="carousel---item text-center" on:click|stopPropagation={() => $snapto = `${scrollto}`} on:keypress={() => $snapto = `${scrollto}`} href={link} rel={rel} target={target}>
      <button tabindex="-1">
        {#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}
        {comp.label || ''}
      </button>
    </a>
    <!--<a on:click|stopPropagation href={link} rel={rel} target={target}><button tabindex="-1">{#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}{comp.button}</button></a>-->
  <!--{/if}-->
  <p>{comp.caption|| ''}</p>
  <!--</div>-->
<!--</aside>-->

<style>
  * {
    margin: 0;
  }
  /*button {
    margin-block: 0;
  }*/
  div {
    text-align: center;
    /*margin-bottom: 3.75em;
    margin-top: 2.5rem;*/
  }
  a {
    text-decoration: none;
    display: block;
    margin-inline: auto;
  }

  /*.carousel-item {
    scroll-snap-align: center;
  }
  .carousel-item:first-of-type {
    scroll-snap-align: start;
  }
  .carousel-item:last-of-type {
    scroll-snap-align: end;
  }*/
</style>
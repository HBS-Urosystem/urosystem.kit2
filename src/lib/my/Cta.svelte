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
  <div class="p-8">
  {#if comp.title}<h4>{comp.title}</h4>{/if}
  {#if comp.subtitle}<h5>{comp.subtitle}</h5>{/if}
  {#if comp.label}
    <a on:click|stopPropagation={() => $snapto = `${scrollto}`} on:keypress={() => $snapto = `${scrollto}`} href={link} rel={rel} target={target}>
      <button tabindex="-1">
        {#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}
        {comp.label}
      </button>
    </a>
    <!--<a on:click|stopPropagation href={link} rel={rel} target={target}><button tabindex="-1">{#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}{comp.button}</button></a>-->
  {/if}
  {#if comp.caption}<p>{comp.caption}</p>{/if}
  </div>
<!--</aside>-->

<style>
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
    /*display: block;*/
  }

</style>
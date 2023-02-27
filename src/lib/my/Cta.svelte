<script>
  import { snapto } from '$lib/stores'
  export let comp//, lang
  let rel = '', target = '', link
  $: {
    //console.log(comp)
    if (comp.link && comp.link.startsWith('/')) comp.link = comp.link.substring(1)
    if (comp.link && comp.link.startsWith('http')) {
      rel = 'noopener'
      target = '_blank'
      link = comp.link
    } else {
      //console.log(comp.link)
      //if (comp.link == 'index') comp.link = ''
      link = '/' + comp.lang + (comp.link && comp.link == 'index' ? '' : '/' + comp.link)
    }
  }
</script>

<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  {#if comp.button}
  <div>
    <a on:click|stopPropagation={() => $snapto = false} href="{link}" rel="{rel}" target="{target}"><button tabindex="-1">{#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}{comp.button}</button></a>
    {#if comp.below}<p>{comp.below}</p>{/if}
  </div>
  {/if}
</aside>

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
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    display: block;
  }
  p {
    text-align: center;
    margin-top: -1.5rem;
  }
  
</style>
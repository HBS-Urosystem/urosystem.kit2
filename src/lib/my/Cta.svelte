<script>
  export let comp//, lang
  let rel = '', target = '', link
  $: {
    //console.log(comp)
    if (comp.link.startsWith('/')) comp.link = comp.link.substring(1)
    if (comp.link.startsWith('http')) {
      rel = 'noopener'
      target = '_blank'
      link = comp.link
    } else {
      //console.log(comp.link)
      //if (comp.link == 'index') comp.link = ''
      link = '/' + comp.lang + (comp.link == 'index' ? '' : '/' + comp.link)
    }
  }
</script>

<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  {#if comp.button}<div><a tabindex="0" href="{link}" rel="{rel}" target="{target}"><button tabindex="-1">{#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}{comp.button}</button></a></div>{/if}
</aside>

<style>
  div {
    text-align: center;
  }
  a {
    text-decoration: none;
  }
  
</style>
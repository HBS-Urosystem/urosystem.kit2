<script context="module">
  import { gateway } from '$lib/stores'
  //import { enhance } from '$app/forms'
</script>
<script>
export let comp
function _submit(e) {
  //console.log(comp.name)
  //if (comp.cookie) 

  if (!comp.always) $gateway[comp.name] = true ///

  //const myform = document.getElementsByName(name)
  //console.log(myform[0])
  //myform[0].submit()
  if (!comp.action) return false
}
//$: console.log($state.post.path, $state.post.subpage?.path)
</script>

<!--{#if !$gateway[comp.name]}-->
<article hidden={$gateway[comp.name]} id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if !!comp.title}<h2>{comp.title}</h2>{/if}
  {#if !!comp.subhead}<h3>{comp.subhead}</h3>{/if}
  <div>
    <form id={comp.anchor} name="{comp.name}" method={!!comp.action ? "POST" : ''} action={(!!comp.action ? '/' + comp.lang + comp.action : '')} neon-submit="{_submit}" data-netlify={comp.netlify}>
      <input type="hidden" name="form-name" value="{comp.name}">
      {#if !!comp.text}{@html comp.text}{/if}
      {#if !!comp.action}
        <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{comp.name}</a>
      {/if}
    </form>
  </div>
</article>
<!--{/if}-->

<style>
  h3 {
    text-align: center;
  }
  a[hidden] { display:none; }
  
  form :global(fieldset) { 
    padding: 0;
    border: none;
  }
  form :global(section > label), form :global(div > label) {
    flex: 1 0 20ch;
    padding-top: 1em;
    /*margin: 0 var(--rem) 1em;*/
    margin: 0 0 1em;
  }
  form :global(fieldset > label) {
    flex: 1 0 20ch;
    padding-top: 1em;
    /*margin: 0 var(--rem) 1em 0;*/
    margin: 0 0 1em;
    border-bottom: 2px solid var(--white);
    display: flex;
    flex-direction: column;
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
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    display: block;
  }
  
</style>

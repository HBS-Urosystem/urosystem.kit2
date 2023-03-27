<script context="module">
  import { gateway } from '$lib/stores'
</script>
<script>
export let comp
function _submit(e) {
  //console.log(comp.name)
  //if (comp.cookie) 
  $gateway[comp.name] = true
  //const myform = document.getElementsByName(name)
  //console.log(myform[0])
  //myform[0].submit()
}
//$: console.log($state.post.path, $state.post.subpage?.path)
</script>

<!--{#if !$gateway[comp.name]}-->
<article hidden={!!$gateway[comp.name]} id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if !!comp.title}<h2>{comp.title}</h2>{/if}
  {#if !!comp.subhead}<h3>{comp.subhead}</h3>{/if}
  <div>
    <form name="{comp.name}" method={!!comp.action ? "POST" : ''} action={(!!comp.action ? '/' + comp.lang + comp.action : '') + '#content'} on:submit="{_submit}">
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
</style>

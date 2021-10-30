<script context="module">
  import { gateway } from '$lib/stores'
</script>
<script>
export let comp
function _submit(e) {
  //console.log(comp.name)
  if (comp.cookie) $gateway[comp.name] = true
  //const myform = document.getElementsByName(name)
  //console.log(myform[0])
  //myform[0].submit()
}
//$: console.log($gateway)
</script>

<!--{#if !$gateway[comp.name]}-->
<article hidden={!!$gateway[comp.name]} id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subhead}<h3 id="{comp.anchor}">{comp.subhead}</h3>{/if}
  <div>
    <!--<a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{!!comp.netlify} {comp.name}</a>-->
    <form name="{comp.name}" method="POST" action="/{comp.lang}{comp.action}" on:submit|capture="{_submit}">
      <input type="hidden" name="form-name" value="{comp.name}">
      {#if comp.text}{@html comp.text}{/if}
      <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{comp.name}</a>
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

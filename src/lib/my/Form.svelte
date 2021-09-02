<script context="module">
  import { gateway } from '$lib/stores'
</script>
<script>
export let comp
</script>

{#if !$gateway[comp.name]}
<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subhead}<div><h3>{comp.subhead}</h3></div>{/if}
  <div>
    <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{!!comp.netlify} {comp.name}</a>
    <form name="{comp.name}" method="POST" action="/{comp.lang}{comp.action}" on:submit="{$gateway[comp.name] = true}">
      <input type="hidden" name="form-name" value="{comp.name}">
      {#if comp.text}{@html comp.text}{/if}
      <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{comp.name}</a>
    </form>
  </div>
</article>
{/if}

<style>
  h3 {
    text-align: center;
  }
  a[hidden] { display:none; }
</style>

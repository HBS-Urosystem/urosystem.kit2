<script context="module">

</script>
<script>
  export let comp
  //console.log('ARTICLE:', comp)
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  <h2>{comp.title || ''}</h2><!--{#if comp.title}{/if}-->
  <h3>{comp.subtitle || ''}</h3><!--{#if comp.subtitle}{/if}-->
  <div>
    {#if comp.text}{@html comp.text}{/if}
  </div>
  <h5>{comp.caption || ''}</h5><!--{#if comp.caption}{/if}-->
</article>

<style>
  h3 {
    text-align: center;
  }
</style>
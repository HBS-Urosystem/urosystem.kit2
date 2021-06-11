<script>
  export let comp
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<div><h3>{comp.subtitle}</h3></div>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
</article>

<style>
  h3 {
    text-align: center;
  }
</style>
<script>
  export let comp
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h1>{comp.title}</h1>{/if}
  {#if comp.subtitle}<div><h3>{comp.subtitle}</h3></div>{/if}
  <div>
    {#if comp.fixed}
      {#each comp.items || [] as item}
        <h2 id="{item.anchor}">{item.q}</h2>
        {@html item.text}
      {/each}
    {:else}
      {#each comp.items || [] as item}
        <details>
          <summary><h3 id="{item.anchor}">{item.q}</h3></summary>
          {@html item.text}
        </details>
      {/each}
    {/if}
  </div>
</article>

<style>
  details {
    margin: 4em 2rem;
    margin-inline-start: 2rem;
  }
  /*[open] summary {
    list-style: none;
  }*/
  :not([open]) summary h3 {
    display: inline;
    /*color: var(--pale-blue);*/
  }
  /*h3 {
    display: inline;
  }*/
</style>
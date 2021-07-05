<script>
export let comp
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subtitle}<div><h3>{comp.subtitle}</h3></div>{/if}
  <div>
    <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{!!comp.netlify} {comp.name}</a>
    <form name="{comp.name}" method="POST" action="/{comp.lang}{comp.action}" netlify="{!!comp.netlify}">
      <!--<input type="hidden" name="form-name" value="{comp.name}">-->
      {#if comp.text}{@html comp.text}{/if}
      <a href="/{comp.lang}{comp.action}" hidden aria-hidden="true">{comp.name}</a>
    </form>
  </div>
</article>

<style>
  h3 {
    text-align: center;
  }
  a[hidden] { display:none; }
</style>

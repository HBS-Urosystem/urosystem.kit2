<script context="module">
  import { goto } from '$app/navigation';
  //import { error } from '@sveltejs/kit';
  import { gateway } from '$lib/stores'
  //import { enhance } from '$app/forms'
</script>
<script>
export let comp
function _submit(event) {
  //console.log(comp);
  if (comp.always !== true) $gateway[comp.name] = true ///
  if (!comp.action) return;

  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch('https://urosystem.netlify.app/' + comp.lang + comp.action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => goto('/' + comp.lang + comp.action))
    .catch((error) => alert(error));
  //if (!comp.action) return false
}
//$: console.log($state.post.path, $state.post.subpage?.path)
</script>

<!--{#if !$gateway[comp.name]}-->
<article hidden={$gateway[comp.name]} id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if !!comp.title}<h2>{comp.title}</h2>{/if}
  {#if !!comp.subhead}<h3>{comp.subhead}</h3>{/if}
  <div>
    <form data-sveltekit-reload id={comp.anchor} name="{comp.name}" method={!!comp.action || !!comp.netlify ? "POST" : ''} action={(!!comp.action ? '/' + comp.lang + comp.action : '')} on:submit="{_submit}">
      <input type="hidden" name="form-name" value={comp.name}>
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

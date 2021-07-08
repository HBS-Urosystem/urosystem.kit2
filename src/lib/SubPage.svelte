<script context="module">
  import { sitelang } from '$lib/stores'
  //import _findPost from '$lib/utils'
  //import { onMount } from 'svelte';
  //import { cubicInOut } from "svelte/easing"
  import * as scrollto from "svelte-scrollto"
</script>

<script>
	//const { /*preloading, */page/*, session */} = stores();
  export let sub, noscroll = false, screlem = 'body'
  //let subpage = _findPost($page.params.lang, link) || []
    //console.log(active)
  
</script>

<!--<li class:active={$page.params.slug == sub.slug || !$page.params.slug && sub.slug == '.'}><a href="{$page.params.lang}/{sub.folder}/{sub.slug}" sapper:noscroll={false} on:click={() => scrollto.scrollTo({element: noscroll ? 'main' : 'body', y: 0})}>{sub.menutitle || sub.title}</a></li>-->
<!--<li class:active={active}>--><a href="/{$sitelang}/{sub.folder}/{sub.slug}" on:click={() => scrollto.scrollTo({element: screlem, offset: 0})} sveltekit:noscroll>{sub.menutitle || sub.title}</a><!--</li>--><!--  use:scrollto={noscroll ? 'main' : 'body'} -->
<!-- on:click={() => scrollto.scrollTo({element: noscroll ? 'main' : 'body', y: 0})}-->

<style>
  /*li {
    width: max-content;
    margin: .5rem 0;
  }*/
  /*li */a {
    padding: .25rem 1rem 0;
    display: block;
  }
  a {
    text-decoration: none;
    border: 2px transparent solid;
    border-radius: 1.5rem;
  }
  :global(.active) a {
    border-color: var(--pale-blue);
  }
  /*.active a::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: .25rem;
    width: 1rem;
    height: 1rem;
    filter:invert();
    background-image: var(--marker);
    background-repeat: no-repeat;
    background-size: cover;
  }*/

</style>
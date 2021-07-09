<script context="module">
  import { sitelang } from '$lib/stores'
  //import _findPost from '$lib/utils'
  //import { onMount } from 'svelte';
  //import { cubicInOut } from "svelte/easing"
  import * as scrollto from "svelte-scrollto"
</script>

<script>
	//const { /*preloading, */page/*, session */} = stores();
  export let sub, /*noscroll = false,*/ totop = 'body'
  //let subpage = _findPost($page.params.lang, link) || []
    //console.log(active)
  
</script>

<a href="/{$sitelang}/{sub.folder}/{sub.slug}{totop}">{sub.menutitle || sub.title}</a><!-- on:click={() => scrollto.scrollTo({element: totop, offset: 0})} -->

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
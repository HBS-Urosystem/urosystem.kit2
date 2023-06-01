<script context="module">
  import { sitelang, snapto } from '$lib/stores'
  //import _findPost from '$lib/utils'
  //import { onMount } from 'svelte';
  //import { cubicInOut } from "svelte/easing"
  //import * as scrollto from "svelte-scrollto"
</script>

<script>
	//const { /*preloading, */page/*, session */} = stores();
  export let sub, /*noscroll = false,*/ scrollto = false
  //let subpage = _findPost($page.params.lang, link) || []
  //console.log(sub)
  
</script>

<a href="/{$sitelang}/{sub.folder}/{sub.slug}" on:click={() => $snapto = scrollto}>{sub.menutitle || sub.title}</a><!-- -->

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
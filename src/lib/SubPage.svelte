<script context="module">
  import {findPost} from '$lib/config'
  //import { onMount } from 'svelte';
</script>

<script>
  import * as scrollto from "svelte-scrollto"
	//import { stores } from '@sapper/app';
	const { /*preloading, */page/*, session */} = stores();
	//import { lang } from '$lib/stores'
  export let link, noscroll
  let subpage
  $: {
    subpage = findPost($page.params.lang, link) || []
    //console.log(subpage)
  }
</script>

<li class:active={$page.params.slug == subpage.slug || !$page.params.slug && subpage.slug == '.'}><a href="{$page.params.lang}/{subpage.folder}/{subpage.slug}" sapper:noscroll={false} on:click={() => scrollto.scrollTo({element: noscroll ? 'main' : 'body', y: 0})}>{subpage.menutitle || subpage.title}</a></li>

<style>
  li {
    width: max-content;
    margin: .5rem 0;
  }
  li a {
    padding: .25rem 1rem 0;
    display: block;
  }
  a {
    text-decoration: none;
    border: 2px transparent solid;
    border-radius: 1.5rem;
  }
  .active a {
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
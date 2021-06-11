<script context="module">
  import { config, sitelang } from '$lib/stores'
  import {findPost} from '$lib/config'
</script>

<script>
	//import { stores } from '@sapper/app';
	const { /*preloading, */page/*, session */} = stores();
  //console.log($page)
	import { lang } from '$lib/stores'
  export let post, sub
  $: post = $config.post
  
  let sublink
  //console.log('subnav',sub)
  $: subpage = findPost($page.params.lang || $lang, sub.link) || {}
  $: if (sub.link && sub.link.startsWith('#')) {
    sublink = $page.path + sub.link
  } else if (sub.link && sub.link.startsWith('http')) {
    sublink = sub.link
  } else {
    sublink = $page.params.lang + '/' + sub.link
    //console.log(sub.link)
  }
  //$: sublink = sub.link.startsWith('#') ? sub.link : `${$page.params.lang}/${sub.link}`
  //$: console.log('titles:', titles)
</script>

{#if sub.ext}
{#if sub.titles && sub.titles[$page.params.lang]}
<a class="block" href="{sublink}" rel="noopener" target="_blank">{sub.titles[$page.params.lang]}</a>
{:else if sub.logo}
<a href="{sublink}" rel="noopener" target="_blank"><img src="{sub.logo}" alt="{sub.alt}"/></a>
{:else if subpage}
<a class="block" href="{sublink}" rel="noopener" target="_blank">{subpage.menutitle || subpage.title}</a>
{/if}
{:else}
{#if sub.titles && sub.titles[$page.params.lang]}
<a class="block" href="{sublink}">{sub.titles[$page.params.lang]}</a>
{:else if sub.logo}
<a href="{sublink}"><img src="{sub.logo}" alt="{sub.alt}"/></a>
{:else if subpage && (subpage.menutitle || subpage.title)}
<a class="block" href="{sublink}">{subpage.menutitle || subpage.title}</a>
{/if}
{/if}

<style>
/*  li {
    background-color: var(--light-blue);
    width: max-content;
    margin: .5rem 0;
    border-radius: 1.5rem;
    border: 2px transparent;
  }
  li */
  a {
    text-decoration: none;
    white-space: nowrap;
    padding-inline-end: .25rem;
  }
  a.block {
    padding: .5rem 1rem .25rem;
    display: block;
  }
  img {
    filter: invert();
    /*width: 1.5rem;*/
    height: 1.5rem;
  }

</style>
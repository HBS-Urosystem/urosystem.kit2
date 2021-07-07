<script context="module">
  import { state, sitelang } from '$lib/stores'
  //import { _getPost } from '$lib/utils'
</script>

<script>
	//import { stores } from '@sapper/app';
	//const { /*preloading, */page/*, session */} = stores();
  //console.log($page)
	//import { lang } from '$lib/stores'
  //const lang = $sitelang
  export let /*post, */sub
  //console.log(sub)
  //$: post = $state.post

  let sublink
  //console.log('subnav',sub)
  //const subpage = _getPost($sitelang, sub.link) || {}
  $: if (sub.link && sub.link.startsWith('#')) {
    sublink = '/' + $sitelang + ($state.post.path ? '/' + $state.post.path : '') + sub.link
    //console.log(sublink)
  } else if (sub.link && sub.link.startsWith('http')) {
    sublink = sub.link
  } else {
    sublink = '/' + $sitelang + '/' + sub.link
    //console.log(sub.link)
    //sublink = sub.link
  }
  //$: sublink = sub.link.startsWith('#') ? sub.link : `${$sitelang}/${sub.link}`
  //$: console.log('titles:', titles)
</script>

{#if sub.ext}
  {#if sub.logo}
    <a href="{sublink}" rel="noopener" target="_blank"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    <a class="block" href="{sublink}" rel="noopener" target="_blank">{sub.title}</a>
  <!--{:else if subpage}
    <a class="block" href="{sublink}" rel="noopener" target="_blank">{subpage.menutitle || subpage.title}</a>-->
  {/if}
{:else}
  {#if sub.logo}
    <a sveltekit:prefetch href="{sublink}"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    <a sveltekit:prefetch class="block" href="{sublink}">{sub.title}</a>
  <!--{:else if subpage && (subpage.menutitle || subpage.title)}
    <a class="block" href="{sublink}">{subpage.menutitle || subpage.title}</a>-->
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
    padding-inline-end: .5rem;
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
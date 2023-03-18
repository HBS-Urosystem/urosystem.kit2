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
  export let /*post, */sub, dir, mobil = false
  //console.log(sub)
  //$: post = $state.post

  let sublink
  //console.log('subnav',sub)
  //const subpage = _getPost($sitelang, sub.link) || {}
  $: if (sub.link?.startsWith('#')) {
    sublink = '/' + $sitelang + ($state.post.path ? '/' + $state.post.path : '') + sub.link
    //console.log(sublink)
  } else if (sub.link?.startsWith('http')) {
    sublink = sub.link// + '#vhollo'
    sub.ext = true
  } else if (sub.link?.startsWith('/')) {
    sublink = sub.link// + '#vhollo'
    //sub.ext = true
  } else {
    sublink = '/' + $sitelang + '/' + sub.link
    //console.log(sub.link)
    //sublink = sub.link
  }
  //$: sublink = sub.link.startsWith('#') ? sub.link : `${$sitelang}/${sub.link}`
  //$: console.log('SubNav:', sub)
</script>

{#if sub.ext}
  {#if sub.logo}
    <a href="{sublink}" rel="noopener noreferrer" target="_blank"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    <a class="{dir}" href="{sublink}" rel="noopener noreferrer" target="_blank">{sub.title}
      {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
    </a>
  <!--{:else if subpage}
    <a class="{dir}" href="{sublink}" rel="noopener noreferrer" target="_blank">{subpage.menutitle || subpage.title}</a>-->
  {/if}
{:else}
  {#if sub.logo}
    <a sveltekit:prefetch href="{sublink}"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    {#if sub.link && !mobil}
      <a sveltekit:prefetch class="{dir}" href="{sublink}">{sub.title}
        {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
      </a>
    {:else}
      <span>{sub.title}
        {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
      </span>
    {/if}
        <!--<a sveltekit:prefetch class="{dir}" href="{sublink}">{sub.title}
      {#if sub.sublinks} <img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
    </a>-->
    <!--{:else if subpage && (subpage.menutitle || subpage.title)}
    <a class="{dir}" href="{sublink}">{subpage.menutitle || subpage.title}</a>-->
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
    /*padding: .5rem 1rem .25rem;*/
    display: block;
    /*padding: .25rem 1rem 0;*/
    padding: .25rem 1rem .5rem;
  }
  a:has(img:not([aria-hidden="true"])):first-of-type {
    padding-inline-start: .75rem;
  }
  img {
    filter: invert();
    /*width: 1.5rem;*/
    height: 1.25rem;
    margin: -0.25rem 0.25rem;
  }
  img[aria-hidden="true"] {
    position: absolute;
  }

</style>
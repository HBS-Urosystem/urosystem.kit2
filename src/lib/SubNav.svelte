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
  export let /*post, */sub, dir, mobile = false
  //console.log(sub)
  //$: post = $state.post

  let sublink
  //console.log('subnav',sub)
  //const subpage = _getPost($sitelang, sub.link) || {}
  //$: 
  if (sub.link?.startsWith('#')) {
    sublink = '/' + $sitelang + ($state.post.path ? '/' + $state.post.path : '') + sub.link
  } else if (sub.link?.startsWith('http')) {
    sublink = sub.link// + '#vhollo'
    sub.rel = 'external noopener noreferrer'
  } else if (sub.link?.startsWith('/')) {
    sublink = sub.link// + '#vhollo'
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
    <a href="{sublink}" rel="external noopener noreferrer" target="_blank"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    <a class="{dir}" href="{sublink}" rel="external noopener noreferrer" target="_blank">{sub.title}
      {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
    </a>
  <!--{:else if subpage}
    <a class="{dir}" href="{sublink}" rel="noopener noreferrer" target="_blank">{subpage.menutitle || subpage.title}</a>-->
  {/if}
{:else}
  {#if sub.logo}
    <a rel={sub.rel || ''} class="{dir}" href="{sublink}"><img src="{sub.logo}" alt="{sub.alt}"/></a>
  {:else if sub.title}
    {#if sub.link && (!mobile || !sub.sublinks)}
      <a rel={sub.rel || ''} class="{dir}" href="{sublink}">{sub.title}
        {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
      </a>
    {:else}
      <span class="{dir}" tabindex="0">{sub.title}
        {#if sub.sublinks}<img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
      </span>
    {/if}
        <!--<a class="{dir}" href="{sublink}">{sub.title}
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
  a, span {
    text-decoration: none;
    white-space: nowrap;
    /*padding-block-start: .5rem;*/
    padding-inline: .5rem;
  }
  span {
    /*cursor:default;*/
    cursor:default;
  }

  img {
    filter: invert();
    /*width: 1.5rem;*/
    height: 1.25rem;
  }
  img[aria-hidden="true"] {
    position: absolute;
    margin: -0.125rem 0.25rem;
  }

  a:has(img:not([aria-hidden="true"])):first-of-type {
    padding-inline-start: 0;
  }

</style>
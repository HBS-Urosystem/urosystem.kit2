<script context="module">
	import { state, sitelang, variables } from '$lib/stores'
  import { onMount, afterUpdate } from 'svelte'
  //import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/env'
  //import { langs } from '$lib/config';
  //import { topnav } from '$lib/config'
  //import { _findPost } from '$lib/utils'
  //import { _findPosts } from '$lib/utils'
  //import { _getBlock } from '$lib/utils'
  import Components from '$lib/Components.svelte'
	//import Modal from '$lib/my/Modal.svelte'
  import SubNav from '$lib/SubNav.svelte'
  import * as scrollnav from "svelte-scrollto"
  /*scrollnav.setGlobalOptions({
    container: 'nav',
    //offset: 200,
    scrollX: true,
    //scrollY: false,
    onStart: (element, offset) => {
      if(element) {
        console.log("Start scrolling to element:", element);
      } 
      if(offset) {
        console.log(`Start scrolling to offset: ${offset.x}, ${offset.y}`);
      }
    }
  })*/
  const _site = variables.site
  const sitelogo = `sitelogo${_site}.svg`
  const logoclass = `sitelogo${_site}`
</script>
<script>
  import { createEventDispatcher } from "svelte";
  import validate from "./_validation";
  let duration = "450ms";
  let offset = 0;
  let tolerance = 8;
  let headerClass = "pin";
  let lastHeaderClass = "pin";
  let y = 0;
  let lastY = 0;
  const dispatch = createEventDispatcher();
  function deriveClass(y = 0, scrolled = 0) {
    if (y < offset) return "pin";
    if (!scrolled || Math.abs(scrolled) < tolerance) return headerClass;
    const dir = scrolled < 0 ? "down" : "up";
    if (dir === "up") return "pin";
    if (dir === "down") return "unpin";
    return headerClass;
  }
  function updateClass(y = 0) {
    const scrolledPxs = lastY - y;
    const result = deriveClass(y, scrolledPxs);
    lastY = y;
    return result;
  }
  function action(node) {
    node.style.transitionDuration = duration;
  }
  $: {
    validate({ duration, offset, tolerance });
    headerClass = updateClass(y);
    if (headerClass !== lastHeaderClass) {
      //$moved = true
      dispatch(headerClass);
    }
    lastHeaderClass = headerClass
    //console.log(headerClass)
  }

  import { snapto } from '$lib/stores'
  $: {
    if (!!$snapto) {
      scrollnav.scrollTo({element: $snapto, offset: -50, onDone: _snap})
      //scrollnav.scrollTo({element: $snapto, offset: 0})
      function _snap() {
        scrollnav.scrollTo({element: $snapto, offset: 0, onDone: () => {$snapto = false} })
      }
    }
  }

	//const { page } = stores()
  //export let $state
  let /*navbar, navul,*/ nwidth, wnav, wul, hamburger = false//, modal
  //$: hamburger = navbar && (navbar.clientWidth + navbar.scrollLeft < navbar.scrollWidth)
  //$: hamburger = !w || (w + navbar.scrollLeft < navbar.scrollWidth)
  /*$: {
    if (!!w && !!navbar && hamburger === false) {
      console.log('$: (', w, navbar.scrollWidth, hamburger, ') -> ?')
      //hamburger = false
      hamburger = w < navbar.scrollWidth
    } else {
      //hamburger = false /// 20 goto 10
      //console.log('$: -> ', hamburger, '')
    }
  }*/
  onMount(() => {
    if (!!wul && !hamburger && !nwidth) {
      /*if (!hamburger) {
        nwidth = nwidth || wul // nwidth is fixed once set
        console.log(nwidth, wnav)
      }*/
      nwidth = wul
      //console.log('before: , nwidth, wnav, hamburger)')
      hamburger = (nwidth > wnav)
      //console.log(`onmount: ${hamburger} = (${nwidth} > ${wnav})`)
    }
  })
  afterUpdate(() => {
    //if (!!nwidth && !!wnav) {
      hamburger = (nwidth > wnav)
      //console.log(`update: ${hamburger} = (${nwidth} > ${wnav})`)
    //}
  })
  /*//afterUpdate(() => {
  $: {
    if (!!nwidth && !!wnav && !hamburger) {
      console.log('after: (', nwidth, wnav, hamburger, ') -> ?')
      hamburger = (nwidth > wnav)
    }
	}//)*/
  let langchng = $sitelang
  //const path = $pagepath.split('/')
  //console.log(`${langchng}/${$pagepath}`)
  /*let subpath
  $: {
    //console.log('nav_$pagepath',$pagepath)
    subpath = $pagepath && $pagepath.split('/') || []
    subpath.shift()
    subpath.shift()
  }*/
  //console.log($page)
	/*async */function newlang() {
    //path[1] = langchng
    //console.log(path)
    //await goto(path.join('/'))
    //window.location.href = path.join('/')
    window.location.href = `/${langchng}/${$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}`
    //console.log(`${langchng}/${$state.post.path}`)
  }
  let slct

  //$: console.log('$state.subpage', $state.post.subpage)
  //const dir = $state.thislang.dir
</script>

<!--<svelte:head>
  {#each $state.langs as lang}
    <link rel="alternate" href="https://www.urosystem.com/{lang.id}/{$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}" hreflang="{lang.id}" />
  {/each}
</svelte:head>-->

<svelte:window bind:scrollY={y} />
  <!--{#each $state.langs as lang}
    <a hidden aria-hidden="true" href="/{lang.id}/{$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}">/{lang.id}/{$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}</a>
  {/each}-->

  <nav
    use:action class={headerClass}
    class:moved={y>32}
    bind:clientWidth={wnav}>
    <div>
      <!-- svelte-ignore a11y-no-onchange -->
      <select on:focus={() => slct = true} on:blur={() => slct = false} bind:value={langchng} on:change={newlang}>
        {#each $state.langs as lang}
        <option value={lang.id}>{lang.id} {#if slct}· {lang.title}{/if}</option>
        {/each}
      </select>
      <ul>
        <li><a href="https://www.facebook.com/UroDapter-101721465255769" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-facebook.svg" alt="facebook"/></a></li>
        <li><a href="https://www.instagram.com/urodapter/" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-instagram.svg" alt="instagram"/></a></li>
        <li><a href="https://www.youtube.com/channel/UCuS_Y21yqaUrj5u8h8NYiZg" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-youtube.svg" alt="youtube"/></a></li>
        <li><a href="https://www.linkedin.com/company/urosystem-inc" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-linkedin.svg" alt="linkedin"/></a></li>
        <!--<li><a href="https://twitter.com/UroSystem_Inc" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-twitter.svg" alt="twitter"/></a></li>
        <li><a href="https://vk.com/urodapter" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-vk.svg" alt="vk"></a></li>
        <li><a href="https://ok.ru/urodapter" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-ok-ru.svg" alt="ok"></a></li>-->
      </ul>
    </div>
    <!--<ul bind:this={navul} mobil={navbar && (navbar.clientWidth + navbar.scrollLeft < navbar.scrollWidth)}>-->
    <ul 
      bind:clientWidth={wul}
      mobil={!!hamburger}>
      <li>
        <a sveltekit:prefetch href="/{$sitelang}" aria-label="home">
          <img loading="lazy" class={logoclass} src="/uploads/{sitelogo}" alt="UroSystem – Revolutionizing bladder pain treatment">
        </a>
      </li>
      <!--{@debug topnav}-->
      {#each $state.topnav as nav}<!--{@debug nav}-->
        {#if nav.title}
          <li aria-current={nav.link == $state.post.path || $state.post.folder == nav.link ? 'page' : undefined}>
            {#if nav.link}
              <!--<a sveltekit:prefetch href="/{$sitelang}/{nav.link}">{nav.title} 
                {#if nav.sublinks} <img loading="lazy" src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
              </a>-->
              <SubNav sub={nav}/>
            {:else}
              <span>{nav.title}
                {#if nav.sublinks} <img loading="lazy" src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
              </span>
            {/if}
            {#if nav.modal}
              {#each nav.modal.components || [] as comp}
                <Components {comp}/>
              {/each}        
            {/if}

            {#if nav.sublinks}
              <ul>
                {#each nav.sublinks as sub}
                  {#if sub.title}<li><SubNav {sub} dir='block' /></li>{/if}
                  {#if sub.modal}
                    {#each sub.modal.components || [] as comp}
                      <Components {comp}/>
                    {/each}
                  {/if}
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
      {/each}
      <!--{#if navbar && (navbar.clientWidth < navbar.scrollWidth)}-->
      {#if hamburger}
        <!--{#if navbar && (navbar.clientWidth + navbar.scrollLeft < navbar.scrollWidth)}
          <li id="over" on:click={() => scrollnav.scrollTo({container: 'nav', element: navul, scrollX: true, scrollY: false, offset: navbar.scrollLeft+( dir=='ltr' ? 200 : -200 )})}>
            <button aria-label="Scroll the nav"></button>
          </li>
        {:else}
          <li id="over" on:click={() => scrollnav.scrollTo({container: 'nav', element: navul, scrollX: true, scrollY: false, offset: navbar.scrollLeft+( dir=='ltr' ? -200 : 200 )})}>
            <button aria-label="Scroll the nav"></button>
          </li>
        {/if}-->
        <li id="over">
          <button aria-label="menu"></button>
        </li>
      {/if}
      <!--<li><a href="/">Company</a></li>
      <li><a href="/">Downloads</a></li>
      <li><a href="/">Events</a></li>-->
    </ul>
  </nav>
<!--</div>-->
  

<style>
  /*main {
    position: absolute;
    top: 0;
    z-index: -1;
  }*/
  
  /*div.sticky {
    position: sticky;
    top: -3rem;
  }*/
  /*.over {
    background-color:red;
  }*/
  .pin {
    transform: translateY(0%);
  }
  :not(:hover).unpin {
    transform: translateY(-100%);
  }
  nav {
    position: fixed;
    width: 100%;
    top: 0;
    transition: transform 500ms linear, top linear, background-color linear;
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 1;
    /*background-color: transparent;*/
    /*background-color: var(--dark-75);*/
    /*background-image: var(--grad-light-25);*/
  }
  nav:hover, nav:focus, nav:focus-within {
    /*background-color: var(--dark-75);*/
    background-color: var(--dark);
    overflow-x: auto;
  }
  nav.moved {
    top: -3rem;
    /*border-bottom: 2px var(--light-75) solid;*/
    background-color: var(--dark);
  }
  li#over {
    /*position: sticky;*/
    right: 0;
    inset-inline-end: 0;
    padding: 0;
    display: block;
    position: fixed;
    opacity: 1;
    /*z-index: 999;*/
  }
  nav:focus-within li#over, ul:focus-within li#over {
    /*display: none;*/
    opacity: 0;
    outline: none;
  }
  li#over button {
    background-color: var(--light);
    background-image: url(/menu.svg);
    border-radius: 50% 0 0 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
    margin: 0 0 -.75rem;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.75rem;
    outline: none;
  }
  nav:not(.moved) li li {
    border: solid var(--light-75);
    color: var(--pale);
    background: none;
  }
  li#over button:focus {
    box-shadow: white 0 0 0 2px;
  }
  /*nav > ul, nav > div {
  }*/
  nav > div {
    display: flex;
    flex-wrap: nowrap;
    padding: 1rem 1rem 0 1rem;
    margin: 0;
    height: 2.5rem;
    position: sticky;
    /*left: 0;*/
    inset-inline-start: 0;
    /*justify-content: space-between;*/
    justify-content: center;
  }
  nav > div > ul {
    list-style: none;
  }
  nav > div li {
    display: inline;
  }
  nav > div a {
    display: inline-block;
    padding-inline: 0.25rem;
  }
  nav > div li img{
    filter: invert();
    width: 1.5rem;
    height: 1.5rem;
  }
  nav > ul {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: 1rem;
    /*margin: 1rem max(var(--sides), 0px) 0;*/
    margin-top: 1rem;
    margin-bottom: 0;
    /*margin-inline-start: var(--sides);*/
    /*margin-inline-end: var(--sides);*/
    width: max-content;
    /*overflow-y: hidden;*/ /* just for sticky over */
    z-index: 1;
  }
  nav > ul[mobil='true'] {
    flex-direction: column;
    /*width: revert;*/
  }
  nav > ul:not([mobil='true']) {
    /*align-self: center;
    margin-inline: auto;*/
    /*margin-inline-start: var(--sides);
    margin-inline-end: var(--sides);*/
    margin-inline: auto;
  }
  nav > ul[mobil='true'] > li:not(:first-child) {
    display: none;
    opacity: 0;
  }
  nav > ul[mobil='true']:active > li/*, nav > ul[mobil='true']:focus > li*/, nav > ul[mobil='true']:focus-within > li {
    display: list-item;
    opacity: 1;
  }

  li {
    white-space: nowrap;
    transition: opacity, .25s; /*fast out*/
  }
  /*li[aria-current] {
    border: 2px dotted white;
    border-radius: 50%;
  }*/
  li img {
    aspect-ratio: 100 / 100;
  }
  nav > ul > li {
    padding-inline-end: 1.75rem;
    align-self: baseline;
    text-transform: uppercase;
    /*position: relative;*/
    /*overflow-y: visible;*/
    flex-shrink: 0;
  }
  /*nav > ul > li > a {
    text-shadow: 1px 1px 2px var(--dark-75);
  }*/
  nav > ul > li > span {
    cursor: default;
    /*text-shadow: 1px 1px 2px var(--dark-75);*/
  }
  nav > ul > li:first-of-type a {
    display: block;
    height: 3.5rem;
    margin-bottom: 1rem;
  }
  nav > ul > li:first-of-type img {
    padding-inline-end: 1rem;
  }
  img.sitelogo, img.sitelogo_ud {
    margin-bottom: -1.4rem;
    height: 3.5rem;
    aspect-ratio: 300 / 119;
  }
  img.sitelogo_us {
    /*margin-bottom: -0.9rem;
    aspect-ratio: 407 / 100;*/
    margin-bottom: -1.05rem;
    height: 3.226rem;
    aspect-ratio: 300 / 95;
  }
  nav > ul > li:not(:first-of-type) {
    min-height: 1.25rem;
    padding-bottom: 1rem;
  }
  nav > ul > li:not(:first-of-type) img {
    height: 1.25rem;
    filter: invert();
  }
  /*nav > ul ul {
    margin-inline-start: -50%;
  }*/
  ul ul {
    /*display: none;*/
    display: grid;
    visibility:hidden;
    height: 0;
    opacity: 0;
    transition: opacity .25s; /*fast in */
    width: 0;
    max-width: 0;
    overflow-x: visible;
    margin-inline-start: -1rem;
    text-transform: initial;
    /*padding-bottom: 1rem;*/
  }
  ul li:hover ul, ul li:focus-within ul {
    visibility:visible;
    height: auto;
    opacity: 1;
  }
  /*li :global(li) {
    width: max-content;
    margin: .5rem 0;
    background-color: var(--light);
    border-radius: 1.5rem;
    border: 2px var(--mid-75) solid;
  }*/
  li li {
    /*justify-self: center;*/
    /*background-color: var(--pale);
    color: black;
    */
    border: solid var(--light-75);
    color: var(--pale);
    background: none;

    width: max-content;
    margin: .5rem 0 0;
    border-radius: 1.5rem;
    /*border: 2px transparent solid;*/
    /*padding: 2px;*/
    /*width: auto;*/
  }
  li li a {
    padding: .25rem 1rem 0;
    display: block;
  }
  a {
    text-decoration: none;
  }
  
  /*ul select, ul option {
    font-size: inherit;
    line-height: inherit;
    text-transform: uppercase;
  }
  ul option, ul select::before, ul option::before, ul select::after, ul option::after {
    width: 0!important;
    overflow-x: hidden;
    display: inline;
  }*/
  select, option {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: inherit;
    padding: 0;
    border-width: 0;
    background-color: transparent;
    border: none;
    /*color: white;*/
    cursor: pointer;
    font-size: 1rem;
  }
  select {
    /*display: flex;*/
    display: none;
    padding: 0.65em 1.75em 0 2em;
    padding-inline-start: 2em;
    padding-inline-end: 1.75em;
    /*height: 1.5em;*/
    background: url("/uploads/bx-world.svg") no-repeat left, url("/uploads/open-down.svg") no-repeat right;
    background-size: 1.5em;
    filter: invert();
    text-transform: uppercase;
  }  
  </style>
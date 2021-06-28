<script context="module">
	import { state, cookies, moved, sitelang, pagepath } from '$lib/stores'
  import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/env'
  //import { langs } from '$lib/config';
  //import { topnav } from '$lib/config'
  //import { _findPost } from '$lib/utils'
  //import { _findPosts } from '$lib/utils'
  //import { _getBlock } from '$lib/utils'
  import Components from '$lib/Components.svelte'
	//import Modal from '$lib/my/Modal.svelte'
  import SubNav from '$lib/SubNav.svelte'
  import * as scrollnav from "svelte-scrollto"
  import { createEventDispatcher } from "svelte";
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
</script>
<script>
  const dir = $state.thislang.dir
  import validate from "./_validation";
  let duration = "450ms";
  let offset = 0;
  let tolerance = 4;
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
      $moved = true
      dispatch(headerClass);
    }
    lastHeaderClass = headerClass;
    //console.log(headerClass)
  }

	//const { page } = stores()
  //export let segment
  let navbar, navul, modal

  let langchng = $sitelang
  //const path = $pagepath.split('/')
  //console.log(`${langchng}/${$pagepath}`)
  let subpath
  $: {
  //console.log('nav_$pagepath',$pagepath)
  subpath = $pagepath && $pagepath.split('/') || []
    subpath.shift()
    subpath.shift()
  }
  //console.log($page)
	/*async */function newlang() {
    //path[1] = langchng
    //console.log(path)
    //await goto(path.join('/'))
    //window.location.href = path.join('/')
    window.location.href = `/${langchng}/${$pagepath}`
    //console.log(`${langchng}/${$pagepath}`)
  }
  let slct
</script>

<svelte:head>
  {#each $state.langs as lang}
    <link rel="alternate external" href="https://www.urosystem.com/{lang.id}/{$pagepath}" hreflang="{lang.id}" />
  {/each}

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180221975-1"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-180221975-1');
  </script>

	{#if $cookies == true && !dev }
    <script>
      gtag('config', 'AW-433475160')
    </script>
  
    <!--{#if $moved}-->
      <!-- Hotjar Tracking Code for https://www.urosystem.com/ -->
      <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2464168,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      </script>
      
      <!-- Facebook Pixel Code -->
      <script>
        !function (f, b, e, v, n, t, s) {
          if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          };
          if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
          n.queue = []; t = b.createElement(e); t.async = !0;
          t.src = v; s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
          'https://connect.facebook.net/en_US/fbevents.js');
      </script>
      <script>
        /* if (fbq.instance && fbq.instance.configsLoaded['451129772954138']) {
          delete window.fbq.instance.pixelsByID['451129772954138']
        } */
        fbq('init', '699963074016051');
        fbq('track', '699963074016051', 'PageView');
      </script>
      <noscript><img loading="lazy" height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=699963074016051&ev=PageView&noscript=1" alt="fb-pixel" /></noscript>
      <!-- End Facebook Pixel Code -->
    <!--{/if}-->
	{/if}
</svelte:head>

<svelte:window bind:scrollY={y} />
<!--<div class="sticky">-->
  <nav
    use:action class={headerClass}
    class:moved={y>32}
    bind:this={navbar}>
    <div>
      <!-- svelte-ignore a11y-no-onchange -->
      <select on:focus={() => slct = true} on:blur={() => slct = false} bind:value={langchng} on:change={newlang}>
        {#each $state.langs as lang}
        <option value={lang.id}>{lang.id} {#if slct}· {lang.title}{/if}</option>
        {/each}
      </select>
      <ul>
        <li><a href="https://www.facebook.com/UroDapter-101721465255769" rel="noopener" target="_blank"><img src="/uploads/bxl-facebook.svg" alt="facebook"/></a></li>
        <li><a href="https://www.instagram.com/urodapter/" rel="noopener" target="_blank"><img src="/uploads/bxl-instagram.svg" alt="instagram"/></a></li>
        <li><a href="https://www.youtube.com/channel/UCuS_Y21yqaUrj5u8h8NYiZg" rel="noopener" target="_blank"><img src="/uploads/bxl-youtube.svg" alt="youtube"/></a></li>
        <li><a href="https://www.linkedin.com/company/urosystem-inc" rel="noopener" target="_blank"><img src="/uploads/bxl-linkedin.svg" alt="linkedin"/></a></li>
        <li><a href="https://twitter.com/UroSystem_Inc" rel="noopener" target="_blank"><img src="/uploads/bxl-twitter.svg" alt="twitter"/></a></li>
        <li><a href="https://vk.com/urodapter" rel="noopener" target="_blank"><img src="/uploads/bxl-vk.svg" alt="vk"></a></li>
        <li><a href="https://ok.ru/urodapter" rel="noopener" target="_blank"><img src="/uploads/bxl-ok-ru.svg" alt="ok"></a></li>
      </ul>
    </div>
    <ul bind:this={navul}>
      <li>
        <a tabindex="0" sveltekit:prefetch href="/{$sitelang}" aria-label="home">
          <img src="/uploads/logo-03-web.svg" alt="UroDapter® – Revolutionizing bladder pain treatment">
        </a>
      </li>
      <!--{@debug topnav}-->
      {#each $state.topnav as nav}<!--{@debug nav}-->
        {#if nav.title}
          <li>
            {#if nav.link}
              <a sveltekit:prefetch tabindex="0" href="/{$sitelang}/{nav.link}">{nav.title} 
                {#if nav.sublinks} <img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
              </a>
            {:else}
              <span tabindex="0">{nav.title}
                {#if nav.sublinks} <img src="/uploads/open-down.svg" alt="" aria-hidden="true">{/if}
              </span>
            {/if}
            {#if nav.modal} <!-- = _getBlock('index/'+nav.link.substring(1), 'en')}-->
              {#each nav.modal.components || [] as comp}
                <Components {comp}/>
              {/each}        
            {/if}

            {#if nav.sublinks}
              <ul>
                {#each nav.sublinks as sub}
                  <li><SubNav {sub}/></li>
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
      {#if navbar && (navbar.clientWidth + navbar.scrollLeft < navbar.scrollWidth)}
        <li id="over" on:click={() => scrollnav.scrollTo({container: 'nav', element: navul, scrollX: true, scrollY: false, offset: navbar.scrollLeft+( dir=='ltr' ? 200 : -200 )})}><!--  -->
          <button aria-label="Scroll the nav"></button>
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
  .unpin {
    transform: translateY(-100%);
  }
  nav {
    position: fixed;
    width: 100%;
    top: 0;
    transition: transform linear, top linear, background-color linear;
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 1;
    /*background-color: transparent;*/
    /*background-color: var(--dark-blue-75);*/
    /*background-image: var(--grad-light-blue-25);*/
  }
  nav:hover, nav:focus, nav:focus-within {
    background-color: var(--dark-blue-75);
    overflow-x: auto;
  }
  nav.moved {
    top: -3rem;
    /*border-bottom: 2px var(--light-blue-75) solid;*/
    background-color: var(--dark-blue);
  }
  li#over {
    position: sticky;
    /*right: 0;*/
    inset-inline-end: 0;
    padding: 0;
  }
  li#over button {
    background-color: var(--light-blue);
    background-image: url(/uploads/open-right.svg);
    border-radius: 50% 0 0 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
    margin: 0 0 -.75rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.75rem;
    outline: none;
  }
  nav:not(.moved) li li {
    border-color: var(--light-blue-75);
  }
  li#over button:focus {
    box-shadow: white 0 0 0 2px;
  }
  /*nav > ul, nav > div {
  }*/
  nav > div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 1rem 1rem 0 1rem;
    margin: 0;
    height: 3rem;
    position: sticky;
    /*left: 0;*/
    inset-inline-start: 0;
  }
  nav > div > ul {
    list-style: none;
  }
  nav > div li {
    display: inline;
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
    margin-inline-start: max(var(--sides), 0px);
    margin-inline-end: max(var(--sides), 0px);
    width: max-content;
    /*overflow-y: hidden;*/ /* just for sticky over */
    z-index: 1;
  }
  li {
    white-space: nowrap;
  }
  li img {
    aspect-ratio: 100 / 100;
  }
  nav > ul > li {
    padding-inline-end: 2rem;
    align-self: baseline;
    text-transform: uppercase;
    /*position: relative;*/
    /*overflow-y: visible;*/
    flex-shrink: 0;
  }
  /*nav > ul > li > a, nav > ul > li > span {
    display: block;
  }*/
  nav > ul > li:first-of-type a {
    display: block;
    height: 4rem;
    margin-bottom: 1rem;
  }
  nav > ul > li:first-of-type img {
    padding-inline-end: 1rem;
    margin-bottom: -1.6rem;
    height: 4rem;
    aspect-ratio: 100 / 39.56;
  }
  nav > ul > li:not(:first-of-type) {
    min-height: 1.25rem;
  }
  nav > ul > li:not(:first-of-type) img {
    height: 1.25rem;
    filter: invert();
  }
  ul ul {
    /*display: none;*/
    visibility:hidden;
    height: 0;
    opacity: 0;
    transition: opacity 1.25s;
    width: 0;
    max-width: 0;
    overflow-x: visible;
    margin-inline-start: -1rem;
    text-transform: initial;
  }
  ul li:hover ul, ul li:focus-within ul {
    visibility:visible;
    height: auto;
    opacity: 1;
  }
  /*li :global(li) {
    width: max-content;
    margin: .5rem 0;
    background-color: var(--light-blue);
    border-radius: 1.5rem;
    border: 2px var(--mid-blue-75) solid;
  }*/
  li li {
    background-color: var(--pale-blue);
    color: black;
    width: max-content;
    margin: .5rem 0;
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
    display: flex;
    padding: 0.65em 1.75em 0 2em;
    padding-inline-start: 2em;
    padding-inline-end: 1.75em;
    height: 1.5em;
    background: url("/uploads/bx-world.svg") no-repeat left, url("/uploads/open-down.svg") no-repeat right;
    filter: invert();
    text-transform: uppercase;
  }  
  </style>
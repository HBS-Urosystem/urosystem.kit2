<script context="module">
	import { state, sitelang, variables } from '$lib/stores'
  import { onMount, afterUpdate } from 'svelte'
  import Components from '$lib/Components.svelte'
	//import Modal from '$lib/my/Modal.svelte'
  import SubNav from '$lib/SubNav.svelte'
  import * as scrollnav from "svelte-scrollto"

  const _site = variables.site
  const sitelogo = `sitelogo${_site}.svg`
  const logoclass = `sitelogo${_site}`
</script>
<script>
  import { createEventDispatcher } from "svelte";
  import validate from "./_validation";
  let duration = "250ms";
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
      //$moved = true
      dispatch(headerClass);
    }
    lastHeaderClass = headerClass
    //console.log(headerClass)
  }

  import { snapto } from '$lib/stores'
  $: {
    if (!!$snapto) {
      scrollnav.scrollTo({element: $snapto, duration: 500, offset: -75, onDone: _snap})
      //scrollnav.scrollTo({element: $snapto, offset: 0})
      function _snap() {
        scrollnav.scrollTo({element: $snapto, offset: 0, onDone: () => {$snapto = false} })
      }
    }
  }

  let /*navbar, navul,*/ nwidth, wnav, wul, hamburger = false//, modal
  onMount(() => {
    if (!!wul && !hamburger && !nwidth) {
      nwidth = wul
      hamburger = (nwidth > wnav)
    }
  })
  afterUpdate(() => {
    hamburger = (nwidth > wnav)
  })
  let langchng = $sitelang
	/*async */function newlang() {
    window.location.href = `/${langchng}/${$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}`
    //console.log(`${langchng}/${$state.post.path}`)
  }
  let slct
</script>

<svelte:window bind:scrollY={y} />
  <nav
    use:action class={headerClass}
    class:moved={y>48}
    bind:clientWidth={wnav}>
    <div>
      <!-- svelte-ignore a11y-no-onchange -->
      <select on:focus={() => slct = true} on:blur={() => slct = false} bind:value={langchng} on:change={newlang}>
        {#each $state.langs as lang}
        <option value={lang.id}>{lang.id} {#if slct}· {lang.title}{/if}</option>
        {/each}
      </select>
      <ul>
        <li><a href="https://www.facebook.com/UroDapter-101721465255769" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-facebook.svg" alt="facebook"/></a></li>
        <li><a href="https://www.instagram.com/urodapter/" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-instagram.svg" alt="instagram"/></a></li>
        <li><a href="https://www.youtube.com/channel/UCuS_Y21yqaUrj5u8h8NYiZg" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-youtube.svg" alt="youtube"/></a></li>
        <li><a href="https://www.linkedin.com/company/urosystem-inc" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-linkedin.svg" alt="linkedin"/></a></li>
        <li><a href="https://twitter.com/UroSystem_Inc" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-twitter.svg" alt="twitter"/></a></li>
        <li><a href="https://vk.com/urodapter" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-vk.svg" alt="vk"></a></li>
        <li><a href="https://ok.ru/urodapter" rel="noopener noreferrer" target="_blank"><img src="/uploads/bxl-ok-ru.svg" alt="ok"></a></li>
        <li><a href="https://linktr.ee/urodapter" rel="noopener noreferrer" target="_blank"><img src="/uploads/linktree.svg" alt="linktree"></a></li>
      </ul>
    </div>
    <ul 
      bind:clientWidth={wul}
      data-mobile={!!hamburger}>
      <li>
        <a href="/{$sitelang}" aria-label="home">
          <img class="sitelogo {logoclass}" src="/uploads/{sitelogo}" alt="UroSystem – Revolutionizing bladder pain treatment">
        </a>
      </li>
      <!--{@debug topnav}-->
      {#each $state.topnav as nav}
        {#if nav.title}
          <li aria-current={nav.link == $state.post.path || $state.post.folder == nav.link ? 'page' : undefined}>
            <SubNav mobile={!!hamburger} sub={nav}/>
            <!--{#if nav.modal}
              {#each nav.modal.components || [] as comp}
                <Components {comp}/>
              {/each}        
            {/if}-->

            {#if nav.sublinks}
              <ul>
                {#each nav.sublinks as sub}
                  {#if sub.title}<li><SubNav {sub} dir='block' /></li>{/if}
                  <!--{#if sub.modal}
                    {#each sub.modal.components || [] as comp}
                      <Components {comp}/>
                    {/each}
                  {/if}-->
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
      {/each}
      {#if hamburger}
        <li id="over" tabindex="-1">
          <button aria-label="menu"></button>
        </li>
      {/if}
    </ul>
  </nav>

<style>
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
    /*background-color: var(--dark-blue-75);*/
    /*background-image: var(--grad-light-blue-25);*/
  }
  nav:hover, nav:focus, nav:focus-within {
    /*background-color: var(--dark-blue-75);*/
    background-color: var(--dark-blue);
    overflow-x: auto;
  }
  nav.moved {
    top: -4rem;
    background-color: var(--dark-blue);
    border-bottom: 2px var(--light-blue-75) solid;
  }
  li#over {
    /*position: sticky;*/
    right: 0;
    inset-inline-end: 0;
    padding: 0;
    display: block;
    position: fixed;
    top: 4.75rem;
    opacity: 1;
    /*z-index: 999;*/
  }
  li#over button {
    background-color: var(--light-blue);
    background-image: url(/menu.svg);
    border-radius: 50% 0 0 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
    margin: 0 0 -.5rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    outline: none;
  }
  ul:focus-within li#over button/*, ul:focus-within li#over button*/ {
    /*outline: none;*/
    box-shadow: none;
    background-color: transparent;
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    /*visibility: hidden;*/
  }
  /*nav:focus-within li#over, ul:focus-within li#over {
    background-image: url(/uploads/open-up.svg);
    background-position: 0% 90%;
  }*/
  /*nav:not(.moved) li li {
    border: solid var(--light-blue-75);
    color: var(--pale-blue);
    background: none;
  }*/
  li#over button:focus {
    box-shadow: white 0 0 0 2px;
  }
  /*nav > ul, nav > div {
  }*/
  nav > div {
    display: flex;
    flex-wrap: nowrap;
    padding: 1rem var(--sides) 0;
    margin: 0;
    height: 2.5rem;
    position: sticky;
    /*left: 0;*/
    inset-inline-start: 0;
    justify-content: space-between;
    /*justify-content: center;*/
  }
  nav > div li {
    display: inline;
  }
  nav > div a {
    display: inline-block;
    padding-inline: 0.25rem;
  }
  nav > div li img {
    filter: invert();
    width: 1.5rem;
    height: 1.5rem;
  }
  nav ul {
    list-style: none;
  }
  nav > ul {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: max-content;
    /*padding-inline-start: 1rem;*/
    /*overflow-y: hidden;*/ /* just for sticky over */
    z-index: 1;
  }
  nav > ul[data-mobile='true'] {
    flex-direction: column;
    margin-inline: 1rem;
    /*width: revert;*/
  }
  nav > ul:not([data-mobile='true']) {
    margin-inline: auto;
  }
  nav > ul[data-mobile='true'] > li:not(:first-child) {
    display: none;
    opacity: 0;
  }

  /* :active is for Safari */
  nav > ul[data-mobile='true']:active > li, nav > ul[data-mobile='true']:focus-within > li {
    display: list-item;
    opacity: 1;
  }

  li {
    white-space: nowrap;
    transition: opacity, .25s; /*fast out*/
  }
  li img {
    aspect-ratio: 100 / 100;
  }
  nav > ul > li {
    padding-inline-end: 1.25rem;
    align-self: baseline;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  nav > ul > li:not(:first-of-type):has(img) {
    padding-inline-end: 2.5rem;/*1.25+1.25rem;*/
  }
  nav > ul > li:not(:first-of-type) {
    min-height: 1.25rem;
    /*padding-block: 1.2rem;*/
  }
  nav > ul[data-mobile='true'] > li:not(:first-of-type) { /*  */
    /*padding-bottom: .5rem;*/
    padding-top: 1.5rem;
  }
  nav > ul > li:last-of-type {
    padding-inline-end: 0;
  }

  nav > ul > li:not(:first-of-type) img {
    height: 1.25rem;
    filter: invert();
    position: absolute;
    margin: -0.25rem 0.25rem;
    /*display: contents;*/
  }

  /*a:has(img) {
    display: inline-block;
  }*/

  a:has(.sitelogo_ud) {
    padding-bottom: .5rem;
    padding-top: 0;
    padding-inline-start: 1rem;
    /*margin-bottom: 1rem;*/
  }

  img.sitelogo_us {
    /*padding-inline-end: 1rem;
    padding-inline-start: 1rem;*/
    margin-bottom: -1.05rem;
    height: 3.226rem;
    aspect-ratio: 300 / 95;
  }
  img.sitelogo_ud {
    /*padding-inline-end: 1rem;*/
    margin-bottom: -1.4rem;
    height: 3.5rem;
    aspect-ratio: 300 / 119;
  }
  /*[data-mobile='true'] img.sitelogo {
    margin-bottom: 0;
  }*/
  ul ul {
    display: grid;
    visibility:hidden;
    height: 0;
    opacity: 0;
    transition: opacity .25s; /*fast in */
    width: 0;
    max-width: 0;
    overflow-x: visible;
    text-transform: initial;
    padding-block: 0;
    margin-inline-start: 0;
  }
  ul[data-mobile='true'] ul {
    margin-inline-start: 0;
  }

  /* hover csak ha nem mobil */
  ul/*:not([data-mobile='true'])*/ li:hover ul/*, ul li:active ul*/, ul li:focus-within ul {
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
  [data-mobile='true'] li li:first-of-type {
    margin-block-start: 1rem;
  }
  li li {
    /*justify-self: center;*/
    /*background-color: var(--pale-blue);
    color: black;
    */
    /*border: solid var(--light-blue-75);*/
    color: var(--pale-blue);
    background: none;

    width: max-content;
    border-radius: 1.5rem;
    /*border: 2px transparent solid;*/
    /*padding: 2px;*/
    /*width: auto;*/
  }
  [data-mobile='true'] li li {
    margin-inline-start: 1rem;
  }

  /*li li a {
    padding: .5rem 1rem;
    display: block;
  }*/
  /*a {
    text-decoration: none;
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
    /*padding: 0.65em 1.75em 0 2em;*/
    padding: 0.4em 1.75em 0 2em;
    background: url("/uploads/bx-world.svg") no-repeat left, url("/uploads/open-down.svg") no-repeat right;
    background-size: 1.5em, 1.25em;
    filter: invert();
    text-transform: uppercase;
  }  
  </style>
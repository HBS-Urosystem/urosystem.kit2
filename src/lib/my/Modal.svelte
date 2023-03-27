<script context="module">
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition'
  import { state, sitelang } from '$lib/stores'
  import Portal from "svelte-portal/src/Portal.svelte"
</script>
<script>
	//import { cookies, moved } from '@/stores'
  export let comp
  let rel = '', target = '', link, showModal;
  //$: console.log(comp)
  $: {
    //console.log(comp)
    if (comp.link.startsWith('/')) comp.link = comp.link.substring(1)
    if (comp.link.startsWith('http')) {
      rel = 'noopener'
      target = '_blank'
      link = comp.link
    } else {
      //console.log(comp.link)
      //if (comp.link == 'index') comp.link = ''
      link = '/' + $sitelang + (comp.link == 'index' ? '' : '/' + comp.link)
    }
  }

	/*const dispatch = createEventDispatcher()
	const close = () => dispatch('close')*/
	const close = () => {
    showModal = false
    async () => await goto(`/${$sitelang}/${$state.post.path || ''}`, true)
    history.replaceState(null, null, `/${$sitelang}/${$state.post.path || ''}`)
  }
  onMount(() => {
    window.addEventListener('hashchange', function() {
      showModal = document.location.hash == '#'+comp.anchor
      console.log('hashchange',document.location.hash)
    })
    showModal = document.location.hash == '#'+comp.anchor
    //console.log('onMount','#'+comp.anchor)//comp.anchor,document.location.hash)
  })
  //$: console.log(document.location.hash, '#'+comp.anchor)
  
	let modal
	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}
		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);
			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;
			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;
			tabbable[index].focus();
			e.preventDefault();
		}
	}
	const previously_focused = typeof document !== 'undefined' && document.activeElement;
	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown}/>

{#if showModal}
<Portal target="body">
<div class="modal-background" on:click={close} on:keypress={close} id="{comp.anchor}" transition:fade>

<aside role="dialog" aria-modal="true" bind:this={modal}>
  <!-- svelte-ignore a11y-autofocus -->
  <nav><button autofocus on:click={close} tabindex="-1"></button></nav>
  <div style="{comp.background ? comp.background : ``}">
    {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
    {#if comp.text}{@html comp.text}{/if}
    {#if comp.button}<a href="{link}" rel="{rel}" target="{target}"><button tabindex="-1">{#if comp.icon}<img src="{comp.icon}" aria-hidden="true" alt=""/>{/if}{comp.button}</button></a>{/if}
  </div>
</aside>
</div>
</Portal>
{/if}

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--dark-blue-75);
    z-index: 1;
	}

	aside {
		/*position: absolute;*/
		position: fixed;
		left: 50%;
		top: 50%;/*calc(50% + var(--gap));*/
		width: calc(98vw - var(--sides));
		max-width: 40em;
		/*max-height: calc(100vh - var(--gap));*/
		max-height: 100vh;
		overflow: auto;
		transform: translate(-50%,-50%);
		/*text-shadow: 1px 1px 2px var(--dark);*/
		/*padding: var(--sides);*/
    padding: var(--rem) 0;
    text-align: center;
    z-index: 1;
  }
  aside div {
    border: solid var(--pale-blue);
		border-width: 2px;
    /*border-radius: 4px;*/
    border-radius: min(calc(4 * var(--sides)), 3.5rem);
		font-weight: bolder;
		max-width: 100%;
	}
  /*hr {
    border-color: var(--mid-blue);
  }*/
  /*h2 {
    margin: 0;
  }*/
  a {
    text-decoration: none;
  }
  nav {
    position: absolute;
    top: var(--rem);
    inset-inline-end: 0;
    background-color: var(--light-blue);
    background-image: url(/uploads/bx-x.svg);
    border-radius: 50% ;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 75%;
    margin: 0 0 -.75rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.75rem;
    outline: none;
  }
  /*button img {
    margin: 0;
  }*/
</style>

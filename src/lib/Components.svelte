<script context="module">
  import { variables } from '$lib/stores'
  import Article from '$lib/my/Article.svelte'
  import Images from '$lib/my/Images.svelte'
  import Grid from '$lib/my/Grid.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  import Links from '$lib/my/Links.svelte'
  import Refs from '$lib/my/Refs.svelte'
  import Buttons from '$lib/my/Buttons.svelte'
  import Qas from '$lib/my/Qas.svelte'
  import Form from '$lib/my/Form.svelte'
  //import B2Bmail from '$lib/my/B2Bmail.svelte'
  import ACmail from '$lib/my/ACmail.svelte'
	//import Modal from '$lib/my/Modal.svelte'

  const options = {
		article: Article,
		textBlock: Article,
		form: Form,
		//b2bmail: B2Bmail,
		acmail: ACmail,
		images: Images,
		grid: Grid,
		ctaBlock: Grid,
		cta: Cta,
		//modal: Modal,
		buy: BuyButton,
		video: Video,
    links: Links,
    refs: Refs,
    buttons: Buttons,
    qas: Qas
	}

  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'

</script>
<script>
	//import { stores } from '@sapper/app';
  //let { /*preloading, */page/*, session */} = stores();
  export let comp = {}//, lang
  
  //console.log({comp})
  $: comp.text = comp.text?.replaceAll('https://www.urosystem.com', _siteurl) || null
  $: comp.link = comp.link || false
  //$: comp.lang = comp.lang == 'undefined' || !comp.lang ? '' : comp.lang
  //console.log(typeof(comp.text.replace))
  //$: {
    //l = $page.params.lang
    //comp.lang = lang
    //comp = comp
  //}
  //export let page
  //console.log($page.params)
  //import { lang } from '$lib/stores'
  //let lang
  $: console.log({comp})
</script>

{#if comp._type == 'ctaBlock'}
  <aside id="{comp.anchor}">
    <svelte:component this={options[comp._type]} {comp}/>
  </aside>
{:else if comp._type == 'textBlock'}
  <!--<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">-->
    <svelte:component this={options[comp._type]} {comp}/>
  <!--</article>-->
{:else if comp._type}
  <section id="{comp.anchor}">
    <svelte:component this={options[comp._type]} {comp}/>
  </section>
{/if}

<!--{#key comp.link}-->
<!--{#if comp.link}-->
  <!--<style>-->
    <!--/*:has(:target) > header {
      display: none!important;
    }*/
    /*:has(:target) > :target {
      padding-top: var(--gap4)
    }*/-->
  <!--</style>-->
<!--{/if}-->
<!--{/key}-->

<style>
</style>
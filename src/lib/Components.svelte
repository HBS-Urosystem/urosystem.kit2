<script context="module">
  import { variables } from '$lib/stores'
  import Article from '$lib/my/Article.svelte'
  import Hero from '$lib/my/Hero.svelte'
  //import Grid from '$lib/my/Grid.svelte'
  import Card from '$lib/my/Card.svelte'
  import Slider from '$lib/my/Slider.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  import Links from '$lib/my/Links.svelte'
  import Refs from '$lib/my/Refs.svelte'
  import Buttons from '$lib/my/Buttons.svelte'
  import Qas from '$lib/my/Qas.svelte'
  import Details from '$lib/my/Details.svelte'
  import Form from '$lib/my/Form.svelte'
  //import B2Bmail from '$lib/my/B2Bmail.svelte'
  import ACmail from '$lib/my/ACmail.svelte'
	//import Modal from '$lib/my/Modal.svelte'

  const options = {
		textBlock: Article,
		form: Form,
		//b2bmail: B2Bmail,
		//acmail: ACmail,
		//images: Images,
		//imageCarousel: Images,
		//grid: Grid,
		cardBlock: Card,
		heroBlock: Hero,
		ctaBlock: Slider,
		cta: Cta,
		slider: Slider,
		video: Video,
		//modal: Modal,
		buy: BuyButton,
		video: Video,
    links: Links,
    refs: Refs,
    buttons: Buttons,
    qas: Qas,
    detailsItem: Details,
	}

  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'

</script>
<script>
	//import { stores } from '@sapper/app';
  //let { /*preloading, */page/*, session */} = stores();
  export let comp = {}//, lang
  $: comp.text = comp.text?.replaceAll('https://www.urosystem.com', _siteurl) || null
  //$: comp.link = comp.link || false
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
  //$: console.log('COMPS:',{comp})
</script>

{#if comp._type == 'video'}
  <article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
    <svelte:component this={options[comp._type]} {comp}/>
  </article>
{:else}
  <svelte:component this={options[comp._type]} {comp}/>
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
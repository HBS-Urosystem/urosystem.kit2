<script context="module">
  import Article from '$lib/my/Article.svelte'
  import Images from '$lib/my/Images.svelte'
  import Grid from '$lib/my/Grid.svelte'
  import Cta from '$lib/my/Cta.svelte'
  import BuyButton from '$lib/my/BuyButton.svelte'
  import Video from '$lib/my/Video.svelte'
  import Links from '$lib/my/Links.svelte'
  import Refs from '$lib/my/Refs.svelte'
  import Qas from '$lib/my/Qas.svelte'
  import Form from '$lib/my/Form.svelte'
	import Modal from '$lib/my/Modal.svelte';

  const options = {
		article: Article,
		form: Form,
		images: Images,
		grid: Grid,
		cta: Cta,
		modal: Modal,
		buy: BuyButton,
		video: Video,
    links: Links,
    refs: Refs,
    qas: Qas
	};
</script>
<script>
	//import { stores } from '@sapper/app';
  //let { /*preloading, */page/*, session */} = stores();
  export let comp//, lang
  //$: {
    //l = $page.params.lang
    //comp.lang = lang
    //comp = comp
  //}
  //export let page
  //console.log($page.params)
  //import { lang } from '$lib/stores'
  //let lang
</script>

<svelte:component this={options[comp.type]} {comp}/>
<script context="module">
  import "./b2b.postcss"
  import { state, sitelang, snapto, gateway, variables } from '$lib/stores'

  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
</script>

<script>
  export let data
  data.post.id = 'b2b'
  data.post.slug = 'b2b'
  data.post.canonical = '/b2b'
  data.post.menutitle = 'B2B'
  $: $state = data
  $: $sitelang = 'en'
</script>

<svelte:head>
  <title>UroSystem – B2B</title>
  <meta name="description" content="Urosystem is dedicated to lower urinary tract conditions, especially IC\u002FBPS. Get to know its diverse portfolio, from diagnosis to medication, including the UroDapter.">
  <meta name="keywords" content="Urosystem, UroDapter, IC/BPS, bladder disease, cystitis, urological">
  <link rel="canonical" href="{_siteurl}/b2b"/>
</svelte:head>

<slot></slot>
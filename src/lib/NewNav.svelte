<script context="module">
  //import {topnav} from '$lib/config'
  //import SubNav from '$lib/SubNav.svelte'
  //import {langs} from '../routes/[lang]/[...path]/cms.json'
  import { state, sitelang } from '$lib/stores'
</script>
<script>
  export let nav, lang//, langs
  nav = $state.nav
  lang = $sitelang
  //const alllangs = async (langs) => { return await langs }
  //console.log('langs',langs)
</script>

{nav}{lang}
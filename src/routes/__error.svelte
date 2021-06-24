<script context="module">
  import { onMount } from 'svelte'
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
	import { sitelang, pagepath } from '$lib/stores'

</script>

<script>
    console.log('goto/ ' + $sitelang)
  onMount(() => {
    goto(`/${$sitelang}`, { replaceState: true });
	})
export let message
</script>

<h1>404</h1>
<p>{message}</p>
<script context="module">
  import { onMount } from 'svelte'
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
	import { sitelang/*, pagepath*/ } from '$lib/stores'

</script>

<script>
  export let message
  console.log('goto / ' + $sitelang, message)
  onMount(() => {
    goto(`/${$sitelang}`, { replaceState: true });
	})
</script>

<h1>404</h1>
<p>{message}</p>
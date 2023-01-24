<script context="module">
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  goto(`https://b2b.urosystem.com`, { replaceState: true });

</script>

<slot></slot>
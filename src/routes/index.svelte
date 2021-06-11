<script>
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
  export const load = async ({ page/*, fetch*/ }) => {
    console.log('page.params',page.params)
    if (!page.params.lang) await goto('/en')
  }
</script>

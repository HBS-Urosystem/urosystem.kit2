<script context=module>
  import { onMount } from 'svelte'
</script>

<script>
  let hbspt
  onMount(async () => {
    try {
      await addScript('https://urosystem.activehosted.com/f/embed.php?id=7');
      // do something after it was loaded
      //hbspt = true
    } catch (e) {
      console.log(e);
    }
	})
  function addScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.setAttribute('src', src);
      s.addEventListener('load', resolve);
      s.addEventListener('error', reject);
      document.getElementById('subscribe').appendChild(s)
    });
  }
</script>

<!--<aside class="pb-8 w-full">
  <div class="card mx-auto shadow-xl image-full">-->
    <div id="subscribe" class="-card-body">
      <!--<svelte:component this={hubspotForm}/>-->
      <!--<a href="https://www.urosystem.com/en/privacy-policy" rel="external" target="_blank">Privacy Policy</a>-->
    </div>
  <!--</div>
</aside>-->

<style>
  fieldset {
    @apply flex flex-wrap gap-4;
  }
</style>

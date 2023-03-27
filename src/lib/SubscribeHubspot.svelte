<script context=module>
  import { onMount } from 'svelte'
</script>

<script>
  let hbspt
  onMount(async () => {
    try {
      await addScript('//js-eu1.hsforms.net/forms/v2.js');
      // do something after it was loaded
      hbspt = true
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

<aside class="pb-8 w-full">
  <div class="card mx-auto shadow-xl image-full">
    <div id="subscribe" class="card-body">
      {#if hbspt}
      <script>
        hbspt.forms.create({
          region: "eu1",
          portalId: "25100362",
          formId: "2a52da7c-0376-49d5-892f-78dfe29ca48c"
        });
      </script>
      {/if}
      <!--<svelte:component this={hubspotForm}/>-->
      <a href="https://www.urosystem.com/en/privacy-policy" rel="external" target="_blank">Privacy Policy</a>
    </div>

  </div>
</aside>

<style>
  fieldset {
    @apply flex flex-wrap gap-4;
  }
</style>

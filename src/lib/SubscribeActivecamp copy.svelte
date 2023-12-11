<script context="module">
  //import { onMount } from 'svelte'
	import { cookies/*, sitelang*/ } from '$lib/stores'
</script>

<!--<aside class="pb---16 px-0">-->
  <div class="card mx-auto w-fit image-full bg-base-300">
    <div class="card-body" name="Blog_subscribe" method="POST" netlify>
      <div class="_form_9"></div><script src="https://urosystem.activehosted.com/f/embed.php?id=9" charset="utf-8"></script>
      {#if !$cookies}
        <a href="https://www.urosystem.com/en/privacy-policy" rel="noreferrer" 
      target="_blank">See our Privacy Policy</a>
      {/if}
    </div>
  </div>
<!--</aside>-->

<style>
  .card-title {
    justify-content: center;
  }
  fieldset {
    display: block;
    padding: 0;
    margin: 0;
    border: 0;
  }
  label {
    display: inline;
    padding: 0;
    margin: 0;
    border: 0;
  }
  input[type='checkbox'] {
    --tw-border-opacity: 1;
    margin-bottom: -2px;
  }
  button {
    border-radius: 1.75rem;
  }
  form a, aside a {
    -webkit-text-decoration: dotted underline;
    text-decoration: dotted underline;
  }
</style>
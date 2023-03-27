<script>
  //import { onMount } from 'svelte'
	import { cookies, sitelang } from '$lib/stores'
	//export let cookie
  /*onMount(() => {*/
    //$: $cookies = $cookies
	/*})*/
	function consent() {
		//alert('consent')
		$cookies = true
	}
	function unconsent() {
		//alert('unconsent')
		$cookies = false
	}
</script>

<aside class:consent={$cookies}>
	{#if $sitelang == 'en' || $sitelang == 'fr' || $sitelang == 'es' || $sitelang == 'it' || $sitelang == 'ja' || $sitelang == 'he' || $sitelang == 'ar' || $sitelang == 'ko' || $sitelang == 'pt' || $sitelang == 'zh' || $sitelang == 'tr'}
		<p>The UroSystem website uses cookies in compliance with GDPR and CCPA. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Accept</button>{:else}<button on:click={unconsent}>Revoke</button>{/if}
	{/if}
	{#if $sitelang == 'hu'}
		<p>Az UroSystem weboldal cookie-kat használ, amelyek megfelelnek a GDPR-nek és a CCPA-nak. <!--<a href="/cookie">Cookie-tájékoztató</a> – --><a href="/{$sitelang}/privacy-policy">Adatkezelési tájékoztató</a></p>
		{#if !$cookies}<button on:click={consent}>Elfogadom</button>{:else}<button on:click={unconsent}>Visszavonom</button>{/if}
	{/if}
	{#if $sitelang == 'de'}
		<p>Die UroSystem-Website verwendet Cookies mit DSGVO- und CCPA-Konformität. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Akzeptieren</button>{:else}<button on:click={unconsent}>Widerrufen</button>{/if}
	{/if}
	{#if $sitelang == 'ru'}
		<p>Веб-сайт UroSystem использует файлы cookie в соответствии с GDPR и CCPA. – <!--<a href="/cookie-fr">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy">Политика конфиденциальности</a></p>
	{#if !$cookies}<button on:click={consent}>Принять</button>{:else}<button on:click={unconsent}>Отозвать</button>{/if}
	{/if}
</aside>

<style>
	aside {
    background-color: var(--dark-blue);
		bottom: 0;
    /*border-top-width: thin;*/ /* /// */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		/*z-index: 1;*/
		padding-block: 0;
		/*padding-inline-start: 1rem;*/
	}
	aside:not(.consent) {
		position: sticky;
		border-top: solid var(--pale-blue-75);
	}

  p {
    font-size: smaller;
    max-height: 5em;
    overflow-y: auto;
		margin: 0;
		font-variant: small-caps;
  }
	p a {
		font-variant:initial;
		white-space: nowrap;
  }
	button {
		/*flex-shrink: 0;
    width: min-content;*/
    margin: .5rem;
    line-height: 1.5rem;
  }
</style>
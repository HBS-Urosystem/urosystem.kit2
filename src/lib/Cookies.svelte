<script context="module">
	import { cookies, sitelang } from '$lib/stores'
</script>

<script>
	function consent() {
		$cookies = true
	}
	function unconsent() {
		$cookies = false
	}
</script>

<aside data-sticky={!$cookies}>
	{#if $sitelang == 'en' || $sitelang == 'fr' || $sitelang == 'es' || $sitelang == 'it' || $sitelang == 'ja' || $sitelang == 'he' || $sitelang == 'ar' || $sitelang == 'ko' || $sitelang == 'pt' || $sitelang == 'zh' || $sitelang == 'tr'}
		<p>The webpage of UroSystem uses cookies in order to operate the page, make its use more convenient and track the actions of the users to display relevant offers for them. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy" target="_blank">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Accept</button>{:else}<button on:click={unconsent}>Revoke</button>{/if}
	{/if}
	{#if $sitelang == 'hu'}
		<p>A UroSystem weboldala sütiket használ a weboldal működtetése, használatának megkönnyítése, a weboldalon végzett tevékenység
		nyomon követése és releváns ajánlatok megjelenítése érdekében. – <!--<a href="/cookie">Cookie-tájékoztató</a> – --><a href="/{$sitelang}/privacy-policy" target="_blank">Adatkezelési tájékoztató</a></p>
		{#if !$cookies}<button on:click={consent}>Elfogadom</button>{:else}<button on:click={unconsent}>Visszavonom</button>{/if}
	{/if}
	{#if $sitelang == 'de'}
		<p>Wir verwenden Cookies und ähnliche Technologien, um Dienste und Funktionen auf unserer Website zu aktivieren und Ihre Interaktion mit unserem Dienst zu verstehen. Wenn Sie auf Akzeptieren klicken, stimmen Sie der Verwendung solcher Technologien für Marketing und Analyse zu. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy" target="_blank">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Akzeptieren</button>{:else}<button on:click={unconsent}>Widerrufen</button>{/if}
	{/if}
	{#if $sitelang == 'ru'}
		<p>Мы используем файлы cookie и аналогичные технологии, чтобы предоставлять услуги и функции на нашем сайте, а также понимать ваше взаимодействие с нашим сервисом. Нажимая «Принять», вы соглашаетесь на использование таких технологий для маркетинга и аналитики. – <!--<a href="/cookie-fr">Cookie Policy</a> – --><a href="/{$sitelang}/privacy-policy" target="_blank">Политика конфиденциальности</a></p>
	{#if !$cookies}<button on:click={consent}>Принять</button>{:else}<button on:click={unconsent}>Отозвать</button>{/if}
	{/if}
    </aside>

<style>
	aside[data-sticky=true] {
		position: sticky;
	}
	aside {
    background-color: var(--dark-blue);
		bottom: 0;
		display: flex;
		align-items: center;
		/*z-index: 1;*/
		padding-block: 0;
		padding-inline-start: 1rem;
	}
  p {
    font-size: smaller;
    max-height: 5em;
    overflow-y: auto;
		margin: 0;
  }
	button {
		/*flex-shrink: 0;
    width: min-content;*/
    margin: 1.5rem
  }
</style>
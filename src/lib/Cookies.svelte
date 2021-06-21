<script context="module">
	import { cookies, lang } from '$lib/stores'
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
	{#if $lang == 'en' || $lang == 'fr' || $lang == 'es' || $lang == 'it' || $lang == 'ja' || $lang == 'he' || $lang == 'ar' || $lang == 'ko' || $lang == 'pt' || $lang == 'zh' || $lang == 'tr'}
		<p>The webpage of UroSystem uses cookies in order to operate the page, make its use more convenient and track the actions of the users to display relevant offers for them. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="{$lang}/privacy-policy" target="_blank">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Accept</button>{:else}<button on:click={unconsent}>Revoke</button>{/if}
	{/if}
	{#if $lang == 'hu'}
		<p>A UroSystem weboldala sütiket használ a weboldal működtetése, használatának megkönnyítése, a weboldalon végzett tevékenység
		nyomon követése és releváns ajánlatok megjelenítése érdekében. – <!--<a href="/cookie">Cookie-tájékoztató</a> – --><a href="{$lang}/privacy-policy" target="_blank">Adatkezelési tájékoztató</a></p>
		{#if !$cookies}<button on:click={consent}>Elfogadom</button>{:else}<button on:click={unconsent}>Visszavonom</button>{/if}
	{/if}
	{#if $lang == 'de'}
		<p>Wir verwenden Cookies und ähnliche Technologien, um Dienste und Funktionen auf unserer Website zu aktivieren und Ihre Interaktion mit unserem Dienst zu verstehen. Wenn Sie auf Akzeptieren klicken, stimmen Sie der Verwendung solcher Technologien für Marketing und Analyse zu. – <!--<a href="/cookie-en">Cookie Policy</a> – --><a href="{$lang}/privacy-policy" target="_blank">Privacy Policy</a></p>
		{#if !$cookies}<button on:click={consent}>Akzeptieren</button>{:else}<button on:click={unconsent}>Widerrufen</button>{/if}
	{/if}
	{#if $lang == 'ru'}
		<p>Мы используем файлы cookie и аналогичные технологии, чтобы предоставлять услуги и функции на нашем сайте, а также понимать ваше взаимодействие с нашим сервисом. Нажимая «Принять», вы соглашаетесь на использование таких технологий для маркетинга и аналитики. – <!--<a href="/cookie-fr">Cookie Policy</a> – --><a href="{$lang}/privacy-policy" target="_blank">Политика конфиденциальности</a></p>
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
	}
  p {
    font-size: smaller;
    max-height: 5em;
    overflow-y: auto;
  }
	button {
		/*flex-shrink: 0;
    width: min-content;*/
    margin: 1em 0
  }
</style>
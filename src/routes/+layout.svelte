<script context="module">
  import "/src/app.postcss"
  import { onMount } from 'svelte'
  //import { get } from 'svelte/store'
  /*export function load({ cookies }) {
    //const consent = cookies.get('cookies')
    const consent = writable(cookies.get('consent'))
    consent.subscribe((value) => cookies.set(`consent`, value))

    //cookies.set('consent', 'true');

    return {
      cookies: consent
    };
  }*/

  import { state, sitelang, cookies, variables } from '$lib/stores'
  import { dev/*, browser, amp, prerendering*/ } from '$app/environment'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
  //console.log('variables.site',_site)
</script>

<script>
  export let data
  //if (!data || !data.thislang) console.log({data})
  //$: $cookies = data.cookies
  $: $state = data
  $: $sitelang = data.thislang.id
	onMount(() => {
    document.querySelector('html').lang = $state.thislang.id
    document.querySelector('html').dir = $state.thislang.dir
    //console.log($state.post.id.indexOf('index'))
	});

</script>

<svelte:head>
  {#if $state.post.subpage}
    <title>{$state.post.subpage.title}</title>
    <meta name="description" content="{$state.post.subpage.description}">
    <meta name="keywords" content="{$state.post.subpage.keywords}">
    {#if $state.post.subpage.meta}
      {#each $state.post.subpage.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {:else}
    <title>{$state.post.title}</title>
    <meta name="description" content="{$state.post.description}">
    <meta name="keywords" content="{$state.post.keywords}">
    {#if $state.post.meta}
      {#each $state.post.meta as meta}
        <meta name={meta.name} content={meta.content}>
      {/each}
    {/if}
  {/if}
  <!--
  {#if $state.post.canonical && $state.post.canonical != _site}
    <link class="{_site} {$state.post.canonical} {$state.post.canonlang}" rel="canonical" href="{variables.siteurl[$state.post.canonical]}/{($state.post.canonlang || $sitelang)}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}"/>
  {:else if !!$state.post.canonlang && $state.post.canonlang != $sitelang}
    <link class="{$sitelang} {$state.post.canonical} {$state.post.canonlang}" rel="canonical" href="{_siteurl}/{$state.post.canonlang}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}"/>
  {/if}
-->
  <link rel="canonical" href="/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}"/>

  {#if !dev}
    <script>
      // Define dataLayer and the gtag function.
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    </script>
    
    <!-- Google tag (gtag.js) --> 
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-433475160"></script>
    {#if _site == '_us'}
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-433475160');
        gtag('config', 'GTM-T4KTKF5');
        gtag('config', 'G-KREFNHDNH0');
      </script>
    {/if}
    {#if _site == '_ud'}
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-433475160');
        gtag('config', 'GTM-T4KTKF5');
        gtag('config', 'G-1SZ43L7KWV');
      </script>
    {/if}
  
      
    {#if !!$cookies}
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      </script>

      {#if $state.post.id.indexOf('index') == 0}
        <!-- Event snippet for Oldalmegtekintés conversion page --> 
        <script> gtag('event', 'conversion', {'send_to': 'AW-433475160/DN5ECOK9rvwCENic2c4B'}); </script>
      {/if}
    {:else}
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      </script>
    {/if}

    {#if !!$cookies}
        <!-- Hotjar Tracking Code for https://www.urosystem.com/ -->
      <!--<script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2464168,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      </script>-->
    
      <!--{#if $moved}-->
      <!-- Facebook Pixel Code -->
      <!--<script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '699963074016051');
        fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=551710929579793&ev=PageView&noscript=1" alt="fb-pixel"/></noscript>-->
      <!-- End Facebook Pixel Code -->
      <!--{/if}--> <!-- $moved -->
      
      <!-- Active Campaign -->
      <!--<script>
        (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
        vgo('setAccount', '477728237');
        vgo('setTrackByDefault', true);
        vgo('process');
      </script>-->
      
    {/if}
  {/if}
  
  {#if _site == '_ud' || _site == '_na'}
    <style>
      body {
        --pale: var(--pale-green);
        --light: var(--light-green);
        --mid: var(--mid-green);
        --dark: var(--dark-green);
        --pale-75: var(--pale-green-75);
        --light-75: var(--light-green-75);
        --mid-75: var(--mid-green-75);
        --dark-75: var(--dark-green-75);

        --grad-pale: var(--grad-pale-green);
        --grad-light: var(--grad-light-green);
        --grad-dark: var(--grad-dark-green);
        --grad-light-75: var(--grad-light-green-75);
        --grad-dark-75: var(--grad-dark-green-75);
      }
      main {
        background-color: var(--mid);
        background-position: 50% 50%;
        background-size: cover;
      }
    </style>
  {/if}
</svelte:head>

<Nav/>

<slot/>

<Footer/>
<Cookies/>

{#each $state.langs || [] as lang}
  {#if !!lang.active}
    <link rel="alternate" href="{_siteurl}/{lang.id}/{!!$state.post.subpage && $state.post.slug !== '.' ? $state.post.path : ($state.post.path || '')}" hreflang="{lang.id}" />
    
    <a rel="alternate" href="/{lang.id}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}" hidden aria-hidden="true">
    </a>
  {/if}
{/each}

<!--{#if !dev && !!$cookies}
<script>
  _linkedin_partner_id = "6306329";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  </script><script>
  (function(l) {
  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
  window.lintrk.q=[]}
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
  <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=6306329&fmt=gif" />
</noscript>
{/if}-->
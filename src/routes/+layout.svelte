<script context="module">
  import "/src/app.postcss"
  import { onMount } from 'svelte'
  //import { get } from 'svelte/store'
  import { state, sitelang, cookies, variables } from '$lib/stores'
  import { dev, /*amp, browser,*/ /*prerendering*/ } from '$app/environment'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  const _site = variables.site
  const _siteurl = variables.siteurl[_site] || 'https://www.urosystem.com'
  //console.log('variables.site',variables.site)
</script>

<script>
  export let data
  //if (!data || !data.thislang) console.log({data})
  $: $state = data
  $: $sitelang = data.thislang.id
	onMount(() => {
    document.querySelector('html').lang = $state.thislang.id
    document.querySelector('html').dir = $state.thislang.dir
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
  
  {#if $state.post.canonical && $state.post.canonical != _site}<!--  || !!$state.post.canonlang && $state.post.canonlang != $sitelang -->
    <link class="{_site} {$state.post.canonical} {$state.post.canonlang}" rel="canonical" href="{variables.siteurl[$state.post.canonical]}/{($state.post.canonlang || $sitelang)}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}"/>
  {:else if !!$state.post.canonlang && $state.post.canonlang != $sitelang}<!-- $state.post.canonical && $state.post.canonical != _site ||  -->
    <link class="{$sitelang} {$state.post.canonical} {$state.post.canonlang}" rel="canonical" href="{_siteurl}/{$state.post.canonlang}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}"/>
  {/if}

  {#if !dev}
    <!-- OLD UA --- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180221975-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-180221975-1');
    </script>
  {/if}

  {#if !dev && _site == '_us'}
    <!-- GA4 --- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KREFNHDNH0"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-KREFNHDNH0');
    </script>
  {/if}
  
  {#if !dev && _site == '_ud'}
    <!-- Ga4 --- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1SZ43L7KWV"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1SZ43L7KWV');
    </script>
  {/if}

  {#if !!$cookies && !dev }
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-T4KTKF5');
      gtag('config', 'AW-433475160')
    </script>
      <!-- End Google Tag Manager -->
    
    <!-- Hotjar Tracking Code for https://www.urosystem.com/ -->
    <script>
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2464168,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
  
    <!--{#if $moved}-->
    <!-- Facebook Pixel Code -->
    <script>
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
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=551710929579793&ev=PageView&noscript=1" alt="fb-pixel"
    /></noscript>
    <!-- End Facebook Pixel Code -->
    <!--{/if}--> <!-- $moved -->
    
    <!-- Active Campaign -->
    <script>
      (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
      vgo('setAccount', '477728237');
      vgo('setTrackByDefault', true);
      vgo('process');
    </script>
	{/if}
  
  {#if _site == '_ud' || _site == '_na'}
    <style>
      main {
        background-image: var(--grad-light-blue);
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

<!--{#each $state.langs || [] as lang}
{#if !!lang.active}
<a hidden aria-hidden="true" rel="alternate" href="/{lang.id}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}">
  {lang.id}
</a>
{/if}
{/each}-->

<script context="module">
  import { onMount } from 'svelte'
  import { sitelang, cookies } from '$lib/stores'
  import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/environment'
  import { goto/*, invalidate, prefetch, prefetchRoutes*/ } from '$app/navigation'
</script>
<script>
  onMount(() => {
    //console.log('MOUNT', `/${$sitelang || '/en'}`)
    goto(`/${$sitelang || '/en'}`, { replaceState: true });
	})
</script>

<svelte:head>
  <!--<link rel="canonical" href="https://urosystem.com/en"/>-->
  <meta name='robots' content='follow, noindex' />
  <title>UroDapter® – Replacing Catheter in the Field of Bladder Instillation</title>
  <meta name="description" content="The UroDapter® urological adapter replaces catheter. It enables painless and complication-free bladder treatment for several lower urinary tract diseases.">
  <meta name="keywords" content="instillation, urological adapter, bladder treatment, urethra treatment, pain-free, catheter replacement, cystitis, painless, complication-free, bladder">

  {#if !dev }
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180221975-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-180221975-1');
    </script>

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
  {/if}
  
  {#if !!$cookies && !dev }
    <script>
      gtag('config', 'AW-433475160')
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
	{/if} <!-- $cookies -->
</svelte:head>

<main>
  <header class="full">
    <a href="/" aria-label="home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block;margin:0 auto; aspect-ratio: 100 / 90.861"/></a>
    <p>Welcome! The website is loading…</p>
    <noscript><p><a href="/en">NO JAVASCRIPT… Click here to load the website</a></p></noscript>
  </header>
</main>

<style>
  header {
    padding-top: 12rem;
    padding-bottom: 1rem;
  }
  header.full {
    padding-top: 9rem;
    padding-bottom: 6rem;
    min-height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  main {
    text-align: center;
    /*padding-top: 9rem;*/
  }
</style>
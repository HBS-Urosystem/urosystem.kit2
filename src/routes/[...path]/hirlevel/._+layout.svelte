<script context="module">
  //import { onMount } from 'svelte'
  import { state, sitelang, cookies, variables } from '$lib/stores'
  import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/env'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  export const load = async ({ params, fetch, page }) => {
		let res = await fetch('/hu/cms.json')
		if (res.ok) {
      const result = await res.json()
			return {
				props: {
          result: await result
        }
			}
		}
    //throw error(404, 'Not found')
    return {
			status: res.status,
			error: new Error(`Could not load`)
		};
  }
</script>
<script>
  import "/src/tailwind.css";
  export let result
  result.post.id = 'hirlevel'
  result.post.slug = 'hirlevel'
  result.post.canonical = 'hirlevel'
  result.post.menutitle = 'Hírlevelek'
  //console.log({result})
  $: $state = result
  $: $sitelang = result.thislang.id
</script>

<svelte:head>
  <!--<style global>
    @import "/src/tailwind.css";
  </style>-->
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
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-T4KTKF5');
    </script>
    <!-- End Google Tag Manager -->
    <script>
      (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
      vgo('setAccount', '477728237');
      vgo('setTrackByDefault', true);
      vgo('process');
    </script>
    {/if} <!-- $cookies -->
</svelte:head>

<Nav/>
<slot></slot>
<Footer/>
<Cookies cookie={$cookies}/>

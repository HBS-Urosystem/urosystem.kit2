<script context="module">
  //export const hydrate = false
  //export const prerender = true
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { state, sitelang, cookies, variables } from '$lib/stores'
  import { /*amp, browser,*/ dev/*, prerendering*/ } from '$app/env'
  import Nav from '$lib/NavNew.svelte'
  import Footer from '$lib/Footer.svelte'
  import Cookies from '$lib/Cookies.svelte'

  const _site = variables.site

  export const load = async ({ page, fetch }) => {
    let { lang, path } = {...page.params}
    let u = []
		if (!!path) {
      u.push(lang)
      u.push(path)
    } else {
      //u.push(get(sitelang) || 'en')
      u.push(lang || get(sitelang) || 'en')
    }
    u.push('cms.json')
		const url = '/'+u.join('/')

    //console.log('1.fetch(url)', url)
		let res = await fetch(url)

		if (res.ok) {
      const result = await res.json()
      //console.log('result_l',result.post)

			if (result.thislang) return {
				props: {
          result: await result/*,
          lang: result.thislang.id*/
        }
			}
		}
    return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
  }
</script>
<script>

  export let result//, lang, path
  $: $state = result
  //$: console.log(result)
  $: $sitelang = result.thislang.id
  //$: console.log('_layout $state:',result.post.path)
  //$: console.log('__layout $state:',$state.post.id)
  //let thislang = {dir: 'ltr'}
	onMount(() => {
    document.querySelector('html').lang = $state.thislang.id
    //thislang = $state.thislang
    document.querySelector('html').dir = $state.thislang.dir
    //console.log(thislang)
	});
</script>

<svelte:head>
  {#each $state.langs || [] as lang}
    <link rel="alternate" href="https://www.urosystem.com/{lang.id}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}" hreflang="{lang.id}" />
  {/each}


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
      })(window,document,'script','dataLayer','GTM-T4KTKF5');</script>
      <!-- End Google Tag Manager -->
	{/if} <!-- $cookies -->
  {#if _site == '_ud'}
  <style>
    :root {
      --mid-blue: #005c5b;
      --light-blue: #02979d;
      --pale-blue: #e2f3f3;
      /*--dark-blue-75: #005c5bc0;*/
      --mid-blue-75: #005c5bc0;
      --light-blue-75: #02979dc0;
      --pale-blue-75: #e2f3f3c0;
    }
    main {
      background-image: var(--grad-light-blue);
      background-position: 50% 50%;
      background-size: cover;
    }
  </style>
  {/if}
</svelte:head>

<Nav/><!--  state={result} -->
<slot></slot>
<Footer/>
<Cookies cookie={$cookies}/>

{#each $state.langs || [] as lang}
<a hidden aria-hidden="true" rel="alternate" href="/{lang.id}/{!!$state.post.subpage && $state.post.subpage.slug !== '.' ? $state.post.subpage.path : ($state.post.path || '')}">
  {lang.id}
</a>
{/each}

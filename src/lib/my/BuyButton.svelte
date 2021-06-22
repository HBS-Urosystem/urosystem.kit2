<script context="module">
  import { onMount } from 'svelte'
  import { state } from '$lib/stores'
</script>
<script>
  export let comp
  const langs = $state.langs
  //$: console.log('$state_BB',comp.lang)
  let mounted = false
  onMount(() => {
    mounted = []
    console.log('mounted',mounted)
  });
  $: if (mounted && !mounted.includes(comp.lang)) {
    (function () {
    mounted.push(comp.lang)
    let scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
         if (window.ShopifyBuy.UI) {
         ShopifyBuyInit();
         } else {
         loadScript();
         }
    } else {
         loadScript();
    }
    function loadScript() {
      console.log('loadScript')
         var script = document.createElement('script');
         script.async = true;
         script.src = scriptURL;
         (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
         script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
         var client = ShopifyBuy.buildClient({
         domain: comp.domain || 'shop.urosystem.com',
         storefrontAccessToken: 'c1a2152628eaac39db753d008b8e24a2',
         });
         ShopifyBuy.UI.onReady(client).then(function (ui) {
         ui.createComponent('product', {
         id: comp.product || '5983114002592',
         node: document.getElementById(`product-component-1616169000007-${comp.lang}`),
         moneyFormat: '%24%7B%7Bamount%7D%7D',
         options: {
    "product": {
         "styles": {
         "product": {
         "@media (min-width: 601px)": {
              "max-width": "calc(25% - 20px)",
              "margin-left": "20px",
              "margin-bottom": "50px"
         }
         },
         "button": {
         "font-family": "Gill Sans, sans-serif",
         "font-size": "18px",
         "padding-top": "16px",
         "padding-bottom": "16px",
         ":hover": {
              "background-color": "#4aa0c1"
         },
         "background-color": "#52b2d6",
         ":focus": {
              "background-color": "#4aa0c1"
         },
         "border-radius": "40px",
         "padding-left": "80px",
         "padding-right": "80px"
         },
         "quantityInput": {
         "font-size": "1em",
         "padding-top": "16px",
         "padding-bottom": "16px"
         }
         },
         "buttonDestination": "checkout",
         "contents": {
         "img": false,
         "title": false,
         "price": false
         },
         "text": {
         "button": comp.button || "Shop now"
         }
    },
    "productSet": {
         "styles": {
         "products": {
         "@media (min-width: 601px)": {
              "margin-left": "-20px"
         }
         }
         }
    },
    "modalProduct": {
         "contents": {
         "img": false,
         "imgWithCarousel": true,
         "button": false,
         "buttonWithQuantity": true
         },
         "styles": {
         "product": {
         "@media (min-width: 601px)": {
              "max-width": "100%",
              "margin-left": "0px",
              "margin-bottom": "0px"
         }
         },
         "button": {
         "font-family": "Gill Sans, sans-serif",
         "font-size": "18px",
         "padding-top": "16px",
         "padding-bottom": "16px",
         ":hover": {
              "background-color": "#4aa0c1"
         },
         "background-color": "#52b2d6",
         ":focus": {
              "background-color": "#4aa0c1"
         },
         "border-radius": "40px",
         "padding-left": "80px",
         "padding-right": "80px"
         },
         "quantityInput": {
         "font-size": "18px",
         "padding-top": "16px",
         "padding-bottom": "16px"
         }
         },
         "text": {
         "button": "Add to cart"
         }
    },
    "option": {},
    "cart": {
         "styles": {
         "button": {
         "font-family": "Gill Sans, sans-serif",
         "font-size": "18px",
         "padding-top": "16px",
         "padding-bottom": "16px",
         ":hover": {
              "background-color": "#4aa0c1"
         },
         "background-color": "#52b2d6",
         ":focus": {
              "background-color": "#4aa0c1"
         },
         "border-radius": "40px"
         }
         },
         "text": {
         "total": "Subtotal",
         "button": "Checkout"
         }
    },
    "toggle": {
         "styles": {
         "toggle": {
         "font-family": "Gill Sans, sans-serif",
         "background-color": "#52b2d6",
         ":hover": {
              "background-color": "#4aa0c1"
         },
         ":focus": {
              "background-color": "#4aa0c1"
         }
         },
         "count": {
         "font-size": "18px"
         }
         }
    }
    },
         });
         });
    }
    })();
  }
</script>

<aside id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  {#if comp.button && langs}
  {#each langs as lang}
  <div tabindex="0" lang='{lang.id}' id='product-component-1616169000007-{lang.id}' hidden={comp.lang !== lang.id} aria-hidden={comp.lang !== lang.id}></div>
  {/each}
  {/if}
</aside>

<style>
  [hidden] {display: none}
  div {
    text-align: center;
    margin-bottom: 1em;
  }
</style>
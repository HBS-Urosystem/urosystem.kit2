<script context="module">
  import { onMount } from "svelte";
  import { state } from "$lib/stores";
</script>

<script>
  export let comp;
  const langs = $state.langs;
  //$: console.log('$state_BB',comp)
  let mounted = false;
  onMount(() => {
    mounted = [];
    //console.log('mounted',mounted)
  });
  $: if (mounted && !mounted.includes(comp.lang)) {
    (function () {
      mounted.push(comp.lang);
      let scriptURL =
        "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
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
        //console.log("loadScript");
        var script = document.createElement("script");
        script.async = true;
        script.src = scriptURL;
        (
          document.getElementsByTagName("head")[0] ||
          document.getElementsByTagName("body")[0]
        ).appendChild(script);
        script.onload = ShopifyBuyInit;
      }
      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain:
            comp.domain || "shop.urosystem.com",
          storefrontAccessToken: "c1a2152628eaac39db753d008b8e24a2",
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          ui.createComponent("product", {
            id: comp.product || "5983114002592",
            node: document.getElementById(
              `product-component-1616169000007-${comp.lang}`
            ),
            moneyFormat: "%24%7B%7Bamount%7D%7D",
            options: {
              product: {
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "calc(25% - 20px)",
                      "margin-left": "20px",
                      "margin-bottom": "50px",
                    },
                  },
                  button: {
                    "font-family": "Gill Sans, sans-serif",
                    "font-size": "18px",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                    ":hover": {
                      "background-color": "#52b2d6",
                    },
                    /*"background-color": "#52b2d6",*/
                    ":focus": {
                      "background-color": "#52b2d6",
                    },
                    "background-color": "#c7e1f0",
                    color: "black",
                    "border-radius": "40px",
                    "padding-left": "80px",
                    "padding-right": "80px",
                    "line-height": "1rem",
                  },
                  quantityInput: {
                    "font-size": "1em",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                  },
                },
                buttonDestination: "checkout",
                contents: {
                  img: false,
                  title: false,
                  price: false,
                },
                text: {
                  button: (comp.button || "Shop now") + " ✔︎",
                },
                width: "360px"
              },
              productSet: {
                styles: {
                  products: {
                    "@media (min-width: 601px)": {
                      "margin-left": "-20px",
                    },
                  },
                },
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true,
                },
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px",
                    },
                  },
                  button: {
                    "font-family": "Gill Sans, sans-serif",
                    "font-size": "1em",
                    "padding-top": "1rem",
                    "padding-bottom": "1rem",
                    color: "revert",
                    ":hover": {
                      "background-color": "#52b2d6",
                    },
                    "background-color": "#var(--pale-blue)",
                    ":focus": {
                      "background-color": "#4aa0c1",
                    },
                    "border-radius": "40px",
                    "padding-left": "80px",
                    "padding-right": "80px",
                  },
                  quantityInput: {
                    "font-size": "18px",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                  },
                },
                text: {
                  button: "Add to cart",
                },
              },
              option: {},
              cart: {
                styles: {
                  button: {
                    "font-family": "Gill Sans, sans-serif",
                    "font-size": "18px",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                    ":hover": {
                      "background-color": "#4aa0c1",
                    },
                    "background-color": "#52b2d6",
                    ":focus": {
                      "background-color": "#4aa0c1",
                    },
                    "border-radius": "40px",
                  },
                },
                text: {
                  total: "Subtotal",
                  button: "Checkout",
                },
                events: {
                  beforeInit: function (cart) {
                    var actualOpen = cart.checkout.open;
                    //console.log('beforeInit',actualOpen)
                    /*cart.checkout.open = function (url) {
                      var newUrl = new URL(url);
                      newUrl.searchParams.set("locale", comp.lang);
                      actualOpen.call(this, newUrl.toString());
                    };*/
                    //console.log('beforeInit',cart)
                  },
                  afterInit: (cart) => {
                    /*cart.onCheckout = () => {
                      const checkoutUrl = cart.model.webUrl + '&locale=' + comp.lang;
                      // we dynamically change the checkout function.
                      cart.checkout.open(checkoutUrl);
                    };*/
                    //console.log('afterInit',cart)
                  },
                }
              },
              toggle: {
                styles: {
                  toggle: {
                    "font-family": "Gill Sans, sans-serif",
                    "background-color": "#52b2d6",
                    ":hover": {
                      "background-color": "#4aa0c1",
                    },
                    ":focus": {
                      "background-color": "#4aa0c1",
                    },
                  },
                  count: {
                    "font-size": "18px",
                  },
                },
              },
            },
          });
        });
      }
    })();
  }
</script>

<aside id={comp.anchor} style={comp.background ? comp.background : ``}>
  {#if comp.title}<h2 id={comp.anchor}>{comp.title}</h2>{/if}
  {#if comp.subhead}<h3 id="{comp.anchor}">{comp.subhead}</h3>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  {#if comp.button && langs}
    {#each langs as lang}
      {#if lang.id == 'ru'}
        <div
          id="product-component-1616169000007-{lang.id}"
          lang={lang.id}
          hidden={comp.lang !== lang.id}
          aria-hidden={comp.lang !== lang.id}
        />
        <p 
          lang={lang.id}
          hidden={comp.lang !== lang.id}
          aria-hidden={comp.lang !== lang.id}
          align="center"
          >Оплата банковской картой защищена PayPal
        </p>
      {:else}
        <div
          id="product-component-1616169000007-{lang.id}"
          lang={lang.id}
          hidden={comp.lang !== lang.id}
          aria-hidden={comp.lang !== lang.id}
        />
        <p 
          lang={lang.id}
          hidden={comp.lang !== lang.id}
          aria-hidden={comp.lang !== lang.id}
          align="center"
          >Bank Card payment is Secured by Stripe
        </p>
      {/if}
    {/each}
  {/if}
  <!-- PayPal Logo -->
  <!--<a href="#content" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/us/digital-wallet/how-paypal-works','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700');"><img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/9_bdg_secured_by_pp_2line.png" border="0" alt="Secured by PayPal" width="148" height="48"></a>--><!-- PayPal Logo -->

</aside>

<style>
  [hidden] {
    display: none;
  }
  div {
    text-align: center;
    margin-bottom: 1em;
  }
  /*table {
    margin-top: 2rem;
    margin-inline: auto;
  }*/
  h3 {
    text-align: center;
  }
</style>

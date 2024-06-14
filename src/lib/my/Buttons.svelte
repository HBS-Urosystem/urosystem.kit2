<script>
  import { snapto/*, sitelang*/ } from '$lib/stores'

  export let comp/*, lang/*, l*/
  let link /*lang, getLink*/
  //lang = comp.lang
/*  $: {
    l = comp.lang
  }
*/
function getLink(item) {
  let { url, title } = item
  if (title?.startsWith('\\')) title = title.substring(1)
  url = url || title
  //console.log('REFS',{ url, title })

  let rel = '', target = '', link
  if (url?.startsWith('/')) url = url.substring(1)
  if (url?.startsWith('http')) {
    rel = 'noopener'
    target = '_blank'
    link = url
  } else if (url?.startsWith('images')) {
    //rel = 'noopener'
    target = '_blank'
    link = '/' + url
  } else {
    //link = '/' + comp.lang + '/' + url
    link = '/' + url
  }
  return {url:link, rel, target, title}
}
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  <div>
    {#if comp.title}<h3>{comp.title}</h3>{/if}
    {#if comp.subhead}<div><h3>{comp.subhead}</h3></div>{/if}
    <section>
      {#each comp.items || [] as item}
        {#if link = getLink(item)}
          <!--<li id="ref-{ix+1}" style="{item.src ? `--marker:url(${item.src})` : ''}">-->
          <!--<a href={item.url.startsWith('http') ? `${item.url}` : `/${lang}${item.url}`} rel="noopener noreferrer" target="{item.url.startsWith('http') ? `_blank` : ``}">-->
          {#if link.rel}
            <a href={link.url} rel="{link.rel}" target="{link.target}">
              {link.title || item.url}
            </a>
          {:else if link.target}
            <a href={link.url} target="{link.target}">
              {link.title || item.url}
            </a>
          {:else}
            <a on:click={() => $snapto = '#content'} on:keypress={() => $snapto = '#content'} href=/{comp.lang}{link.url} class="btn">
              {link.title || item.url}
              {#if item.src}
                <img src={item.src} alt={link.title}/>
              {/if}
            </a>
            <!--<Cta {comp}/>-->
          {/if}
        {/if}
      {/each}
    </section>
  </div>
</article>

<style>
  h3 {
    text-align: center;
  }
  section {
    /*display: grid;*/
    /*grid-template-columns: repeat(2, minmax(0, 1fr));*/
    /*justify-items: center;*/
    @apply grid grid-cols-2 place-items-stretch;
    grid-template-columns: 10rem 10rem;
  }
  a {
    white-space: normal;
    line-height: 1.5rem;
    align-content: flex-end;
    flex: 0 0 10rem!important;
    word-break: break-word;
    width: 10rem;
    height: 10rem;
    padding: 1rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  a img {
    display: block;
  }
</style>
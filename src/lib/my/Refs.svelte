<script>
	//import { stores } from '@sapper/app';
  //let { /*preloading, */page/*, session */} = stores();

  export let comp/*, lang/*, l*/
  let link /*lang, getLink*/
  //lang = comp.lang
/*  $: {
    l = comp.lang
  }
  $: console.log(comp.lang)
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
    {#if comp.title}<p class="h3">{comp.title}</p>{/if}
    {#if comp.subhead}<div><h3>{comp.subhead}</h3></div>{/if}
    <ul style="{comp.marker ? `--marker:url(${comp.marker})` : ''}">
    {#each comp.items || [] as item, ix}
    {#if link = getLink(item)}
      <li id="ref-{ix+1}" style="{item.src ? `--marker:url(${item.src})` : ''}">
        <!--<a href={item.url.startsWith('http') ? `${item.url}` : `/${lang}${item.url}`} rel="noopener noreferrer" target="{item.url.startsWith('http') ? `_blank` : ``}">-->
        {#if link.rel}
        <a href={link.url} rel="{link.rel}" target="{link.target}">
          {!link.title?.startsWith('[') ? `[${ix+1}] ` : ``}{link.title || item.url}
        </a>
        {:else if link.target}
        <a href={link.url} target="{link.target}">
          {!link.title?.startsWith('[') ? `[${ix+1}] ` : ``}{link.title || item.url}
        </a>
        {:else}
        <a href={comp.lang}{link.url}>
          {!link.title?.startsWith('[') ? `[${ix+1}] ` : ``}{link.title || item.url}
        </a>
        {/if}
      </li>
    {/if}
    {/each}
    </ul>
  </div>
</article>

<style>
  ul {
    list-style: none;
    margin-inline-start: 0;
    padding-inline-start: 0;
    font-size: smaller;
  }
  li a::after {
    width: 1.25rem;
    height: 1.25rem;
    /*margin-left: -2rem;*/
    /*top: 0;*/
  }
</style>
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
function getLink(url) {
  let rel = '', target = '', link
  if (url.startsWith('/')) url = url.substring(1)
  if (url.startsWith('http')) {
    rel = 'noopener'
    target = '_blank'
    link = url
  } else if (url.startsWith('uploads')) {
    //rel = 'noopener'
    target = '_blank'
    link = '/' + url
  } else {
    //link = '/' + comp.lang + '/' + url
    link = '/' + url
  }
  return {url:link, rel, target}
}
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2>{comp.title}</h2>{/if}
  {#if comp.subhead}<div><h3>{comp.subhead}</h3></div>{/if}
  <div>
    <ul style="{comp.marker ? `--marker:url(${comp.marker})` : ''}">
    {#each comp.items || [] as item}
    {#if link = getLink(item.url)}
      <li style="{item.src ? `--marker:url(${item.src})` : ''}">
        <!--<a href={item.url.startsWith('http') ? `${item.url}` : `/${lang}${item.url}`} rel="noopener noreferrer" target="{item.url.startsWith('http') ? `_blank` : ``}">-->
        {#if link.rel}
        <a href={link.url} rel="{link.rel}" target="{link.target}">
          {item.title}
        </a>
        {:else if link.target}
        <a href={link.url} target="{link.target}">
          {item.title}
        </a>
        {:else}
        <a href={comp.lang}{link.url}>
          {item.title}
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
  }
  li a::after {
    width: 1.5rem;
    height: 1.5rem;
    /*margin-left: -2rem;*/
    /*top: 0;*/
  }
</style>
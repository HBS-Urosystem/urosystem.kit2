<script context="module">
	import { state, sitelang, variables } from '$lib/stores'
  const _site = variables.site
  //import {footnav} from '$lib/config'
  //import {findPost} from '$lib/config'
  //import {findPosts} from '$lib/config'
  import SubNav from '$lib/SubNav.svelte'
</script>
<script>
  //$: langs = $state.langs
  $: footnav = $state.footnav
  const dir = $state.thislang.dir
	//import { stores } from '@sapper/app';
	//const { page } = stores()
	//import { lang } from '$lib/stores'
  let post, sublinks
</script>

<footer>
  <div>
    {#if $sitelang == 'hu' && _site == '_us'}
      <a href="/hu/company#ginop" aria-label="ginop"><img loading="lazy" src="/uploads/ginop.png" alt="GINOP pályázat" style="width:20ch;display:block;"/></a>
    {/if}
    <a href="/contact" aria-label="urosystem home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block; aspect-ratio: 100 / 90.861"/></a>
    {#if $sitelang == 'hu' && _site == '_us'}
      <a href="/hu/company#nkfi" aria-label="nkfi"><img loading="lazy" src="/uploads/nkfi.png" alt="NKFI pályázat" style="width:20ch;display:block;"/></a>
    {/if}
  </div>
 <!-- <nav>
    <ul>
      {#each footnav as nav}
      <li>
        <h5><span>{nav.title}</span></h5>
        {#each nav.sublinks || [] as sub}
          <SubNav {sub} dir='block'/>
        {/each}
      </li>
      {/each}
    </ul>
  </nav>-->
  </footer>

<style>
  footer {
    border-top: var(--sides2) var(--white) solid;
  }
  nav {
    background-color: var(--dark);
    padding: var(--gap2) var(--sides) 0;
  }
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  /*ul + ul {
    justify-content: center;
  }*/
  li {
    padding: 2rem 0;
    white-space: nowrap;
  }
  li * {
    white-space: nowrap;
  }
  h5 {
    text-transform: uppercase;
    /*padding: .25rem 1rem 0 0;*/
    padding-right: 1rem;
    margin-top: 0;
  }
  a {
    text-decoration: none;
  }
  /*h5 + a:has(img) {
    padding-inline-start: .75rem;
  }*/
  div {
    /*background-color: var(--light);*/
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /*background-image:var(--grad-light);
    background-image:var(--grad-light);
    background-position:50% 50%;
    background-size:cover;*/
    padding-top: var(--gap2);
  }

  /*div {
    display: flex;
    flex-direction: column;
  }*/
  a, a:visited {
    color: inherit;
  }
</style>

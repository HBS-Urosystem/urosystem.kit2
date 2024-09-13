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
  <!--<aside style="">--><h2>Learn more…</h2> <h3>about the new therapy of lower urinary tract conditions</h3> <section class="car--ousel slide grid grid-rows-4 grid-flow-col gap-8" style="--cols: 4; grid-template-rows: auto auto auto auto;"><h4>UroDapter®</h4> <h5>Urological syringe adapter that completely replaces the catheter</h5> <a class="carousel---item text-center" href="/en/index"><button tabindex="-1"> Introduction</button></a> <p></p><!--<Cta2>--><h4>Indications</h4> <h5>The UroDapter ® is applicable in a wide range of conditions requiring intravesical instillation</h5> <a class="carousel---item" href="/en/indications"><button tabindex="-1"> Indications</button></a> <p></p><!--<Cta2>--><h4>Resources</h4> <h5></h5> <a class="carousel---item" href="/en/resource"><button tabindex="-1"> Resources</button></a> <p></p><!--<Cta2>--><h4>Fun Fact</h4> <h5></h5> <a class="carousel---item" href="https://chatgpt.com/share/4c337c1e-6585-4f55-9553-127bdd4c8888" rel="noopener" target="_blank"><button tabindex="-1"> Fun Fact</button></a> <p></p><!--<Cta2>--></section> <h3>← scroll →</h3><!--</aside>-->
  <div>
    {#if $sitelang == 'hu' && _site == '_us'}
      <a href="/hu/company#ginop" aria-label="ginop"><img loading="lazy" src="/uploads/ginop.png" alt="GINOP pályázat" style="width:20ch;display:block;"/></a>
    {/if}
    <a href="/" aria-label="urosystem home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block; aspect-ratio: 100 / 90.861"/></a>
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
  section * {
    margin: 0;
  }

  footer {
    /*border-top: var(--sides) var(--white) solid;*/
  }
  .slide {
    overflow-x: auto;
    padding-inline: var(--gap);
  }

/*
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
  li {
    padding: 2rem 0;
    white-space: nowrap;
  }
  li * {
    white-space: nowrap;
  }
  h5 {
    text-transform: uppercase;
    padding-right: 1rem;
    margin-top: 0;
  }
  a {
    text-decoration: none;
  }
*/
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

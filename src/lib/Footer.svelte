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
    {#if $sitelang == 'hu' && _site != '_ud'}
      <a href="/hu/company#ginop" aria-label="ginop"><img loading="lazy" src="/uploads/ginop.png" alt="GINOP pályázat" style="width:20ch;display:block;"/></a>
    {/if}
    <a href="https://www.urosystem.com" aria-label="urosystem home"><img loading="lazy" src="/uploads/urosystem_logo_02_web.svg" alt="" style="filter:invert();width:20ch;display:block; aspect-ratio: 100 / 90.861"/></a>
    {#if $sitelang == 'hu' && _site != '_ud'}
      <a href="/hu/company#nkfi" aria-label="nkfi"><img loading="lazy" src="/uploads/nkfi.png" alt="NKFI pályázat" style="width:20ch;display:block;"/></a>
    {/if}
  </div>
  <nav>
    <ul>
      {#each footnav as nav}
      <li>
        <h5><span>{nav.title}</span></h5>
        {#if sublinks = nav.sublinks}
          {#each sublinks as sub}
            <SubNav {sub} dir='block'/>
          {/each}
          <!--{:else if post = findPost($sitelang, nav.link)}
          <h4>{nav[$sitelang] || nav['en']}</h4>
          {#if post.subpages}
          {#each post.subpages as sub}
          <SubNav {sub}/>
          {/each}
        {/if}
        {:else if sublinks = findPosts($sitelang, nav.link)}
          <h4><span>{nav[$sitelang] || nav['en']}</span></h4>
          {#each sublinks as sub}
          <SubNav {sub}/>
          {/each}-->
        {/if}
      </li>
      {/each}
      <!--<li>
        <h4>FOLLOW US</h4>
        <a href="https://www.facebook.com/UroDapter-101721465255769" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-facebook.svg" alt="facebook"/></a>
        <a href="https://www.instagram.com/urodapter/" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-instagram.svg" alt="instagram"/></a>
        <a href="https://www.youtube.com/channel/UCuS_Y21yqaUrj5u8h8NYiZg" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-youtube.svg" alt="youtube"/></a>
        <a href="https://www.linkedin.com/company/urosystem-inc" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-linkedin.svg" alt="linkedin"/></a>
        <a href="https://twitter.com/UroSystem_Inc" rel="noopener noreferrer" target="_blank"><img loading="lazy" src="/uploads/bxl-twitter.svg" alt="twitter"/></a>
      </li>-->
      <!--<li>
        <h4>ACCEPTED PAYMENTS</h4>
        <img loading="lazy" src="/uploads/visa-mastercard.png" alt="visa mastercard amex paypal"/>
      </li>-->
    </ul>
  </nav>
  </footer>

<style>
  /*footer {
    margin-top: var(--gap);
  }*/
  nav {
    background-color: var(--dark-blue);
    padding: 0 var(--sides);
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
    /*background-color: var(--light-blue);*/
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /*background-image:var(--grad-light-blue);
    background-image:var(--grad-light-blue);
    background-position:50% 50%;
    background-size:cover;*/
    padding-top: var(--gap);
  }

  /*div {
    display: flex;
    flex-direction: column;
  }*/
  a, a:visited {
    color: inherit;
  }
</style>

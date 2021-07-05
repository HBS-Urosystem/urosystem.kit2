<script context="module">
	import { state, /*cookies, moved, */sitelang/*, pagepath*/ } from '$lib/stores'
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
    {#if $sitelang == 'hu'}
    <a href="hu/company#ginop" aria-label="ginop"><img src="/uploads/ginop.png" alt="GINOP pályázat" style="width:20ch;display:block;"/></a>
    {/if}
    <a href="/" aria-label="home"><img src="/uploads/urosystem_logo_02_web.svg" alt="Urosystem logo" style="filter:invert();width:20ch;display:block; aspect-ratio: 100 / 90.861"/></a>
    {#if $sitelang == 'hu'}
    <a href="hu/company#nkfi" aria-label="nkfi"><img src="/uploads/nkfi.png" alt="Urosystem logo" style="width:20ch;display:block;"/></a>
    {/if}
  </div>
  <nav>
    <ul>
      {#each footnav as nav}
      <li>
        <h4><span tabindex="0">{nav.title}</span></h4>
        {#if sublinks = nav.sublinks}
          {#each sublinks as sub}
            <SubNav {sub}/>
          {/each}
          <!--{:else if post = findPost($sitelang, nav.link)}
          <h4>{nav[$sitelang] || nav['en']}</h4>
          {#if post.subpages}
          {#each post.subpages as sub}
          <SubNav {sub}/>
          {/each}
        {/if}
        {:else if sublinks = findPosts($sitelang, nav.link)}
          <h4><span tabindex="0">{nav[$sitelang] || nav['en']}</span></h4>
          {#each sublinks as sub}
          <SubNav {sub}/>
          {/each}-->
        {/if}
      </li>
      {/each}
      <!--<li>
        <h4>FOLLOW US</h4>
        <a href="https://www.facebook.com/UroDapter-101721465255769" rel="noopener" target="_blank"><img src="uploads/bxl-facebook.svg" alt="facebook"/></a>
        <a href="https://www.instagram.com/urodapter/" rel="noopener" target="_blank"><img src="uploads/bxl-instagram.svg" alt="instagram"/></a>
        <a href="https://www.youtube.com/channel/UCuS_Y21yqaUrj5u8h8NYiZg" rel="noopener" target="_blank"><img src="uploads/bxl-youtube.svg" alt="youtube"/></a>
        <a href="https://www.linkedin.com/company/urosystem-inc" rel="noopener" target="_blank"><img src="uploads/bxl-linkedin.svg" alt="linkedin"/></a>
        <a href="https://twitter.com/UroSystem_Inc" rel="noopener" target="_blank"><img src="uploads/bxl-twitter.svg" alt="twitter"/></a>
      </li>-->
      <!--<li>
        <h4>ACCEPTED PAYMENTS</h4>
        <img src="uploads/visa-mastercard.png" alt="visa mastercard amex paypal"/>
      </li>-->
    </ul>
  </nav>
  </footer>

<style>
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
    padding: 1rem 0;
    white-space: nowrap;
  }
  li * {
    white-space: nowrap;
  }
  h4 {
    text-transform: uppercase;
    padding: .25rem 1rem 0;
    margin-top: 0;
  }
  a {
    text-decoration: none;
  }
  h4 + :global(a:first-of-type)/*, h4 + img*/ {
    padding-inline-start: 1rem;
  }
  div {
    background-color: var(--light-blue);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /*background-image:var(--grad-light-blue);
    background-image:var(--grad-light-blue);
    background-position:50% 50%;
    background-size:cover;*/
  }

  /*div {
    display: flex;
    flex-direction: column;
  }*/
</style>

<script>
  export let comp/*, lang*/
  function _sm(src) {
    let s = src.split('.')
    let ext = s.pop()
    s.push('sm', ext)
    return s.join('.')
  }
</script>

<article id="{comp.anchor}" style="{comp.background ? comp.background : ``}">
  {#if comp.title}<h2 id="{comp.anchor}">{comp.title}</h2>{/if}
  {#if comp.subhead}<h3>{comp.subhead}</h3>{/if}
  <!-- shape: default/squre/cicrcle -->
  <!-- slide: true/false -->
  <section class="{/*comp.slide && */comp.images.length > 1 ? 'slides' : 'flow'}" style="--img-width: {56 / comp.images.length}ch">
    {#each comp.images || [] as img}
    <figure>
      <div class="{comp.shape}" class:ratio={comp.ratio} style="--ratio: {comp.ratio};--ratiopct: {comp.ratio}%">
        {#if img.link}
          <a href={img.link} target={img.ext ? '_blank' : ''} rel={img.ext ? 'noopener' : ''}>
            <img loading="lazy" src="{_sm(img.src)}" srcset="{img.src} 2x, {_sm(img.src)} 1x" alt="{img.alt}" style="object-position: {img.posx || 50}% {img.posy || 50}%; transform: scale({img.scale >=0 ? img.scale : 1})"/>
          </a>
        {:else}
          <img loading="lazy" src="{_sm(img.src)}" srcset="{img.src} 2x, {_sm(img.src)} 1x" alt="{img.alt}" style="object-position: {img.posx || 50}% {img.posy || 50}%; transform: scale({img.scale >=0 ? img.scale : 1})"/>
        {/if}
      </div>
      {#if img.text}<figcaption>{@html img.text}</figcaption>{/if}
    </figure>
    {/each}
  </section>
</article>

<style>
  section {
    /*display: flex;*/
    /*align-items: center;
    align-content: center;*/
    /*align-items: baseline;
    justify-content: center;*/
    /*flex-direction: column;*/
    display: block;
  }
  section.slides {
    align-items: baseline;
    align-content: center;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
  /*section.flow {
    display: block;
  }*/
  h3 {
    text-align: center;
  }
  figure {
    flex: 1 1 var(--img-width, 56ch);
    /*max-width: var(--img-width, 56ch);*/
    /*margin: 0 auto var(--gap);*/
    margin: 5rem 2.5vw 0;
  }
  @media (min-width: 112ch) {
    section.slides {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: baseline;
    }
    /*figure {
      margin: 0 2.5vw var(--gap);
    }*/
  }
  div {
    position: relative;
    /*width: var(--img-width, 56ch);*/
    margin: 0 auto;
    overflow: hidden;
    /*max-width: 100%;*/
    max-width: var(--img-width, 56ch);
    /*width: min-content;*/
    text-align: center;
  }
  .rounded {
    border-radius: 50%;
  }
  .ratio::before {
    content: "";
    display: block;
    padding-bottom: var(--ratiopct, 100%);
  }  
  .ratio img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    aspect-ratio: 100 / var(--ratio, 100);
  }
  figcaption {
    text-align: center;
    margin-top: 1em;
  }
  figcaption :global(*) {
    color: white;
  }
</style>
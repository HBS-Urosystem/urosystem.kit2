<script context="module">
  import minireset from 'minireset.css/minireset.min.css'
</script>

<style global>

:global(article li) {
  display: flex;
}
:global(article li > a) {
  text-decoration: none;
  display: block;
  flex-basis: 100%;
  border-bottom: 2px solid;
  margin-bottom: var(--gap);
  position: relative;
}
:global(article li > a):after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(1.25 * var(--rem));
  height: calc(1.25 * var(--rem));
  filter:invert();
  background-image: url(/uploads/open-right.svg);
  background-repeat: no-repeat;
  background-size: cover;
}


:global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
  margin: 1em 0 1.5rem 0;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: 0;
}
:global(h1:last-child), :global(h2:last-child), :global(h3:last-child), :global(h4:last-child), :global(h5:last-child), :global(h6:last-child) {
  margin-bottom: 0;
}
:global(p), :global(ul), :global(ol), :global(dl) {
  margin: 0 0 1.5rem 0;
  vertical-align: baseline;
}

:global(a), :global(a:visited) {
  color: inherit;
}

:global(img) {
  max-width: 100%;
}


:global(h1) {
  font-size: 3.2rem;
}

:global(h2) {
  font-size: 2.2rem;
}

:global(h3) {
  font-size: 1.25rem;
}

:global(h4) {
  font-size: 1.15rem;
}

:global(hr) {
  display: block;
  height: 1px;
  width: 55%;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
  padding: 0;
}

:global(button) {
  cursor: pointer;
  vertical-align: baseline;
  font-family: inherit;
  font-size: inherit;
  border: inherit;
}

/*:global(header), :global(main) {
  color: white;
}*/
:global(header), :global(article), :global(aside), :global(main > div) {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 25%;
}
/*:global(main header) {
  padding: var(--gap4) var(--sides) var(--gap);
}*/
:global(article), :global(aside) {
  padding: var(--gap) var(--sides) var(--gap);
}
:global(article + aside) {
  padding-top: 0;
}
/*:global(main header), :global(section), :global(aside) {
  
}*/
:global(article > div), :global(aside > div) {
  max-width: 56ch;
  margin: 0 auto;
  padding: 0 var(--rem);
}

:global(h1), :global(h2) {
  text-align: center;
}

</style>
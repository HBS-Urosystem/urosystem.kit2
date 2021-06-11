<script>
  export let posts
</script>

<article>
  <ul>
  {#each posts || [] as post}
    <li>
      <a href={`/${post.lang}/${post.folder}/${post.slug}`}>
        <h4>{post.title}</h4>
        <!--<p>{post.folder}</p>-->
      </a>
    </li>
  {/each}
  </ul>
</article>

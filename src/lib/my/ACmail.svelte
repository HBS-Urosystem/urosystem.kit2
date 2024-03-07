<script>
  //import "/src/app.postcss"

  let account, account_url, firstname, lastname, email, linkedin, msg, vat
  export let comp
</script>

<article id="b2b">
  {#if !!comp.title}<h2>{comp.title}</h2>{/if}
  {#if !!comp.subhead}<h3>{comp.subhead}</h3>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  <div>
    <!--<form class="grid grid-center mx-auto" action="/en/thankyou">-->
    <form method="POST" action="https://urosystem.activehosted.com/proc.php" id="_form_13_">
      <input type="hidden" name="u" value="13" />
      <input type="hidden" name="f" value="13" />
      <input type="hidden" name="s" />
      <input type="hidden" name="c" value="0" />
      <input type="hidden" name="m" value="0" />
      <input type="hidden" name="act" value="sub" />
      <input type="hidden" name="v" value="2" />
      <input type="hidden" name="or" value="6c3bb69a7fbf3e7d26e1eb835244af71" />
    
      <fieldset>
        <label class="mx-auto w-min">Company <input type="text" bind:value={account} name="customer_account" required placeholder="*"/></label>
        <label>EU VAT <input type="text" bind:value={vat} name="ca[14][v]"/></label>
      </fieldset>

      <fieldset>
        <label class="mx-auto w-min">First Name <input type="text" bind:value={firstname} name="firstname" required placeholder="*"/></label>
        <label class="mx-auto w-min">Last Name <input type="text" bind:value={lastname} name="lastname" required placeholder="*"/></label>
      </fieldset>

      <fieldset>
        <label>Email <input type="email" bind:value={email} name="email" autocomplete="email" required placeholder="*"/></label>
      </fieldset>

      <fieldset>
        <label class="mx-auto w-min">Company website<input type="url" pattern="https://.*" bind:value={account_url} name="account_url" placeholder="https://"/></label>
        <label>LinkedIn profile <input type="text" bind:value={linkedin} name="ca[13][t]"/></label>
      </fieldset>

      <!--<fieldset>
        <label>Message <textarea bind:value={msg} name="message" rows="4" required></textarea></label>
      </fieldset>-->

      <section>
        <!--<a href="/thankyou">-->
          <button type="submit">Send</button>
        <!--</a>-->
      </section>
    </form>
  </div>
</article>


<style>
  h3 {
    text-align: center;
  }
  a[hidden] { display:none; }
  
  form :global(fieldset) { 
    padding: 0;
    border: none;
  }
  form :global(section > label), form :global(div > label) {
    flex: 1 0 20ch;
    padding-top: 1em;
    /*margin: 0 var(--rem) 1em;*/
    margin: 0 0 1em;
  }
  form :global(fieldset > label) {
    flex: 1 0 20ch;
    padding-top: 1em;
    /*margin: 0 var(--rem) 1em 0;*/
    margin: 0 0 1em;
    border-bottom: 2px solid var(--white);
    display: flex;
    flex-direction: column;
  }

  /*button {
    margin-block: 0;
  }*/
  div {
    text-align: center;
    /*margin-bottom: 3.75em;
    margin-top: 2.5rem;*/
  }
  a {
    text-decoration: none;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    display: block;
  }
  p {
    text-align: center;
    margin-top: -1.5rem;
  }
  
</style>

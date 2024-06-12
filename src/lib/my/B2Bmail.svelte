<script>
  //import "/src/app.postcss"

  let account, name, msg, vat
  export let comp
</script>

<article>
  {#if !!comp.title}<h2>{comp.title}</h2>{/if}
  {#if !!comp.subhead}<h3>{comp.subhead}</h3>{/if}
  {#if comp.text}<div>{@html comp.text}</div>{/if}
  <div>
    <form class="grid grid-center mx-auto" action="/en/thankyou">
      <fieldset>
        <label class="mx-auto w-min">Name <input type="text" bind:value={name} name="name" required placeholder="*"/></label>
        <!--<label>Email <input type="email" bind:value={email} name="email" autocomplete="email" required placeholder="*"/></label>-->
      </fieldset>

      <fieldset>
        <label class="mx-auto w-min">Company <input type="text" bind:value={account} name="account"/></label>
        <label>EU VAT <input type="text" bind:value={vat} name="vat"/></label>
      </fieldset>

      <fieldset>
        <label>Message <textarea bind:value={msg} name="message" rows="4" required></textarea></label>
      </fieldset>

      <section>
        <a href="mailto:subscribe-f7b584ca6bf3382121b7bb72dc035bba@subscription-serv.com?subject=Question To UroSystem&body=FULL_NAME:{name};%0D%0AACCT_NAME:{account};%0D%0AVAT:{vat};%0D%0ANote:{msg}">
          <button type="button">Send an Email</button>
        </a>
      </section>
      <fieldset>
      </fieldset>
      <fieldset>

      </fieldset>
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

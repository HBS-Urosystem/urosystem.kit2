<script>
  import Identity from '$lib/Identity.svelte'

  //const url = new URL(Astro.request.url);
  //const user = url.searchParams.get('email');
  let user
  $: console.log({user})
</script>

<main>

  <header>
    <!--<div class="hero-overlay bg-opacity-60"></div>-->
    
    <h1>CUSTOMER PROFILE</h1>

    <Identity bind={false} redirect="/" bind:user/>
    <!--{@debug user}-->

    <div class="card w-auto shadow-xl image--full mx-4">
      <legend class="card-title p-8">The survey will take approximately 4 minutes to complete and helps Urosystem to collect all necessary information to serve its customers better</legend>
      <form class="card-body gap-8" name="B2B Onboarding Form" method="POST" action="/b2b">
        <input type="hidden" name="form-name" value="B2B Onboarding Form">
        <fieldset class="flex flex-wrap gap-8">
          <label for="company" class="min-w-fit">Full Legal Name of Customer<br>
            <input id="company" name="company" type="text" required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
          <label for="address" class="min-w-fit">Full Address (Country, State, Zip, Street, Number)<br>
            <input id="address" name="address" type="text" required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
        </fieldset>
        <fieldset class="flex flex-wrap gap-8">
          <label for="business" class="min-w-fit">Customer business (short description)<br>
            <input id="business" name="business" type="text" required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
          <label for="website" class="min-w-fit">Customer's website<br>
            <input id="website" name="website" type="text" required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
        </fieldset>
        <fieldset class="flex flex-wrap gap-8">
          <label for="name" class="min-w-fit">Contact name<br>
            <input id="name" name="name" type="text" value={user?.user_metadata.full_name} required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
          <label for="title" class="min-w-fit">Contact's title or role<br>
            <input id="title" name="title" type="text" required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
        </fieldset>
        <fieldset class="flex flex-wrap gap-8">
          <label for="email" class="min-w-fit">Contact's Email<br>
            <input id="email" name="email" type="email" value={user?.email} required placeholder="* required" class="input input-bordered input-md min-w-fit w-full">
          </label>
          <label for="phone" class="min-w-fit">Contact's phone number (intl. format)<br>
            <input id="phone" name="phone" type="tel" title="+00 1 123 4567890" nonpattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required placeholder="* required (+00 1 123 4567890)" class="input input-bordered input-md min-w-fit w-full">
          </label>
        </fieldset>
        <fieldset class="flex flex-wrap gap-8">
          <label for="billing" class="min-w-fit">Full billing address (if different)<br>
            <input id="billing" name="billing" type="text" placeholder="" class="input input-bordered input-md min-w-fit w-full">
          </label>
          <label for="shipping" class="min-w-fit">Full shipping address (if different)<br>
            <input id="shipping" name="shipping" type="text" placeholder="" class="input input-bordered input-md min-w-fit w-full">
          </label>
        </fieldset>
        <fieldset class="flex flex-wrap gap-8">
          <label for="volume" class="label">Estimated Full Year (12 months) Purchase Volume of UroDapter® (in pieces)
            <select id="volume" name="volume" class="input input-bordered input-md min-w-fit">
              <option value="<500">Under 500</option>
              <option value="500-2000">500-2000</option>
              <option value="2000-5000">2000-5000</option>
              <option value="5000-10000">5000-10000</option>
              <option value="10000-50000">10000-50000</option>
            </select>
          </label>
          
        </fieldset>

        <fieldset class="my-4">
          <label for="message" class="label w-full">Any other important comment?
            <textarea id="message" name="message" class="textarea textarea-primary w-full" placeholder="Your message"></textarea>
          </label>
        </fieldset>

        <fieldset class="flex gap-8">
          <label for="consent"><input id="consent" name="consent" type="checkbox" required class="checkbox checkbox-xs" /> I accept the 
          <a href="https://www.urosystem.com/en/privacy-policy" rel="noreferrer" target="_blank">Privacy Policy</a></label>
          <button type="submit" tabindex="0" class="btn btn-primary flex-none ml-auto">Send</button>
        </fieldset>
      </form>
    </div>
  </header>
  <aside class="flex justify-center my-10">
    <a href="/b2b" tabindex="0" class="btn btn-ghost">◀︎ Back</a>
  </aside>

</main>


<style>
  header {
    padding-top: 12rem;
    padding-bottom: 1rem;
  }
  form fieldset { 
    padding: 0;
    border: none;
  }
  form :global(section > label), form :global(div > label) {
    flex: 1 0 20ch;
    padding-top: 1em;
    margin: 0 var(--rem) 1em;
  }
  form fieldset > label {
    flex: 1 0 20ch;
    padding-top: 1em;
    margin: 0 var(--rem) 1em 0;
    border-bottom: 2px solid var(--white);
    /*display: flex;
    flex-direction: column;*/
  }
  .input-bordered, textarea { 
    @apply placeholder-gray-300;
  }

</style>

<!--<style>
input, textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /*letter-spacing: .04em;*/
  -webkit-hyphens:auto;-ms-hyphens:auto;hyphens: auto;
  text-shadow: 0 0 0.75em var(--dark-blue);
}
</style>-->
<!--
<script is:inline>
  const u = new URL(window.location.href); 
  const email = u.searchParams.get('email')
  if (email) {
    const el = document.getElementById("email");
    //console.log(el);
    el.value = email;
  }
</script>
-->
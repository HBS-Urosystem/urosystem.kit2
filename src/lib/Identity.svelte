<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import netlifyIdentity from 'netlify-identity-widget'
  export let bind, redirect, user
  //console.log('env.MODE:',import.meta.env.MODE)
  let visitor, consent
  
  onMount(() => {
    //if (bind) {
      netlifyIdentity.init({
        //showHeaders: false, /// TODO
        /*container: '#netlify-modal', // defaults to document.body
        locale: 'en' // defaults to 'en'*/
      })
    //}
    // Open the modal
    //netlifyIdentity.open()

    // Get the current user:
    // Available after on('init') is invoked
    user = netlifyIdentity.currentUser()
    if(window && !!redirect && !user) window.location = redirect

    // Bind to events
    netlifyIdentity.on('init', user => console.log('init', user))
    netlifyIdentity.on('login', user => {
      netlifyIdentity.close()
      visitor = user
      netlifyIdentity.refresh()//.then((jwt)=>console.log(jwt))
      console.log('login', user)
      cookies.set('session', user)
      //update(user)
    })
    netlifyIdentity.on('logout', () => {
      netlifyIdentity.close()
      user = null
      visitor = null
      console.log('logout', user)
    })
    netlifyIdentity.on('error', err => console.error('Error', err))
    //netlifyIdentity.on('open', () => console.log('Widget opened'))
    netlifyIdentity.on('close', () => {
      //console.log('Widget closed')
      /*user
      .update({ role: 'business' })
      .then((user) => console.log('Updated user %s', user))
      .catch((error) => {
        console.log('Failed to update user: %o', error)
        throw error
      })*/
    })

    // Unbind from events
    //netlifyIdentity.off('login') // to unbind all registered handlers
    //netlifyIdentity.off('login', handler) // to unbind a single handler

    // Close the modal
    //netlifyIdentity.close()

    // Log out the user
    //netlifyIdentity.logout()

    // Refresh the user's JWT
    // Call in on('login') handler to ensure token refreshed after it expires (1hr)  
    // Note: this method returns a promise.
    //netlifyIdentity.refresh().then((jwt)=>console.log(jwt))

    // Change language
    //netlifyIdentity.setLocale('en')

  })

  const _update = async(u) => {//return
    //const u = get(user)
    console.log('UPDATE',{u})
    await fetch(`/b2b/api`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${u.access_token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(u)
    })
    .then((res) => { 
      // use data in response to make the notes in DOM
      console.log('RES', res)
    })
  }


  const update = () => _update(user)
  const signup = () => netlifyIdentity.open('signup')
  const login = () => netlifyIdentity.open('login')
  const logout = () => {
    netlifyIdentity.logout()
    consent = false //if another user happens to sign up, new consent needed
  }
  $: visitor = user
  //$: console.log({visitor})
</script>

{#if !!bind}
  <div class="card mx-auto w-fit">
    <div class="card-body">
      {#if !visitor}
        <fieldset class="flex justify-center gap-8 my-4">
          <legend>Sign up or Login as a Business</legend>
          <button disabled={!consent} on:click={signup} tabindex="0" class="btn btn-primary flex-none">Sign up</button>
          <button on:click={login} tabindex="0" class="btn btn-primary flex-none">Log in</button>
          <slot name="notuser"/>
        </fieldset>
        <fieldset class="flex justify-center gap-4 my-4">
          <input id="consent" bind:checked={consent} name="consent" type="checkbox" required class="checkbox checkbox-xs" />
          <label for="consent">I accept the </label><a href="/privacy-policy" rel="noreferrer" target="_blank">Privacy Policy</a>
        </fieldset>
      {/if}

      {#if visitor}
        <!--<p class="text-center">Logged in as {visitor?.email}</p>-->
        <h3 class="text-center">Please set up your Profile before placing your first order.</h3>
        <fieldset class="flex justify-center gap-8 my-4">
          <legend>Logged in as {visitor?.email}</legend>
          <a href="b2b/profile" data-email="{visitor.email}" tabindex="0" class="btn btn-primary flex-none">Profile</a>
          <a href="b2b/order" data-email="{visitor.email}" tabindex="0" class="btn btn-primary flex-none">Order</a>
          <!--<a href="b2b/history" class="btn  btn-primary flex-none">History</a>-->
          <button on:click={update} tabindex="0" class="btn btn-primary flex-none">Update</button>
        </fieldset>
        <fieldset class="flex justify-center gap-4 my-4 flex-col mx-auto">
          <label for="logout" class="">or</label>
          <button id="logout" on:click={logout} tabindex="0" class="btn btn-ghost flex-none">Log out</button>
        </fieldset>
      {/if}
    </div>
  </div>
{/if}
<!--
<h3>User: {user?.email}</h3>
<h3>Visitor: {visitor?.email}</h3>
-->
<style>
  fieldset { 
    padding: 0;
    border: none;
  }
  section > label, div > label {
    flex: 1 0 20ch;
    padding-top: 1em;
    margin: 0 var(--rem) 1em;
  }
  /*fieldset > label {
    flex: 1 0 20ch;
    padding-top: 1em;
    margin: 0 var(--rem) 1em 0;
    border-bottom: 2px solid var(--white);
    display: flex;
    flex-direction: column;
  }*/
  /*.card {
    background-image: url('/uploads/urodapter-removebg.png');
    background-position:80% 72%;
    background-size:20%;
    background-repeat: no-repeat;
  }*/
</style>
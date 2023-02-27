<aside class="pb-16">
  <div class="card mx-auto w-fit shadow-xl image-full bg-base-300">
    <form class="card-body" name="Blog_subscribe" method="POST" netlify>
      <h2 class="card-title">Subscribe to the UroSystem Newsletter</h2>
      <fieldset>
        <input id="email" name="email" type="email" required placeholder="Your Email" class="input input-bordered input-md flex-auto">
        <button type="submit" class="btn btn-primary flex-none">Subscribe</button>
      </fieldset>
      <fieldset>
        <input id="consent" name="consent" type="checkbox" required class="toggle toggle-sm" />
        <label for="consent">I agree to receive other communications from UroSystem.</label>
        <a href="https://www.urosystem.com/en/privacy-policy" rel="external" target="_blank">See our Privacy Policy</a>
      </fieldset>
    </form>

  </div>
</aside>

<style>
  .card-title {
    justify-content: center;
  }
  fieldset {
    display: block;
    padding: 0;
    margin: 0;
    border: 0;
  }
  label {
    display: inline;
    padding: 0;
    margin: 0;
    border: 0;
  }
  input[type='checkbox'] {
    --tw-border-opacity: 1;
    margin-bottom: -2px;
  }
  button {
    border-radius: 1.75rem;
  }
  form a, aside a {
    -webkit-text-decoration: dotted underline;
    text-decoration: dotted underline;
  }
</style>
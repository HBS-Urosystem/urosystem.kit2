---
id: gateway
folder: edu
fallback: ""
components:
  - type: form
    netlify: true
    cookie: true
    title: Exclusive medical content
    subhead: To access the discussion of the inventor about UroDapter®, please fill in the form. 
    name: ProfessionalsGateway
    text: >-
      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Profession <input type="text" name="profession" required /></label>
      </fieldset>
      <fieldset>
        <label>Institute <input type="text" name="institute" required /></label>
      </fieldset>

      <div>
        <label><input type="checkbox" name="newsletter" /> I want to subscribe to the newsletter</label>
      </div>

      <div>
        <label><input type="checkbox" name="privacy" required /> I've read and accepted the <a href="/privacy-policy" target="_blank">privacy policy</a>.</label>
      </div>

      <section>
        <button type="submit">Submit</button>
      </section>
---

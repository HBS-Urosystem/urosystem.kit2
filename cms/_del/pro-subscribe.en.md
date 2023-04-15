---
id: pro-subscribe
folder: edu
fallback: ""
components:
  - type: form
    netlify: false
    action: /pro
    title: Subscription
    subhead: for professional medical material
    name: ProfessionalsGateway
    text: >-
      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Profession <input type="text" name="profession" required /></label>
      </fieldset> <fieldset>
        <label>Institude <input type="text" name="institute" required /></label>
      </fieldset>

      <div>
        <label><input type="checkbox" name="newsletter" /> I want to subscribe to the newsletter</label><br>
        <label><input type="checkbox" name="privacy" required /> I've read and accept the <a href="/privacy-policy" target="_blank">privacy policy</a>.</label><br><br>
      </div>

      <section>
        <button type="submit">Submit</button>
      </section>
todo: isProfessional => true
---

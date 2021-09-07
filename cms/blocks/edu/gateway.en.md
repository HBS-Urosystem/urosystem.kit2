---
id: gateway
folder: edu
fallback: ""
components:
  - type: form
    netlify: false
    action: "#content"
    title: Medical content
    name: ProfessionalsGateway
    text: >-
      <fieldset>
        <label>Name <input type="text" name="name" req-uired /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" req-uired /></label>
      </fieldset>

      <fieldset>
        <label>Profession <input type="text" name="profession" req-uired /></label>
      </fieldset>
      <fieldset>
        <label>Institute <input type="text" name="institute" req-uired /></label>
      </fieldset>

      <div>
        <label><input type="checkbox" name="newsletter" /> I want to subscribe to the newsletter</label>
      </div>

      <div>
        <label><input type="checkbox" name="privacy" req-uired /> I've read and accepted the <a href="/privacy-policy" target="_blank">privacy policy</a>.</label>
      </div>

      <section>
        <button type="submit">Submit</button>
      </section>
---

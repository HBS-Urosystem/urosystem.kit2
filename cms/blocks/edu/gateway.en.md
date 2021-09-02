---
id: gateway
folder: edu
fallback: ""
components:
  - type: form
    netlify: false
    action: /edu/pro
    title: Professionals Gateway
    subhead: For medical content
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
        <label><input type="checkbox" name="privacy" required /> I've read and accepted the <a href="/privacy-policy" target="_blank">privacy policy</a>.</label><br><br>
      </div>

      <section>
        <button type="submit">Submit</button>
      </section>
      <a href="/edu/pro">Shortcut submit</a>
todo: "isProfessional => true"
---

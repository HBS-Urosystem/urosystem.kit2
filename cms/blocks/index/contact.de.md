---
id: contact
folder: index
fallback: en
components:
  - type: form
    title: Kontaktiere uns
    anchor: contact
    text: >-
      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Gegenstand <input type="text" name="subject" required /></label>
      </fieldset>

      <fieldset>
        <label>Nachricht <textarea name="message" rows="4" required></textarea></label>
      </fieldset>

      <div>
        <!--label><input type="checkbox" name="newsletter" /> Ich möchte den Newsletter abonnieren</label><br><br-->
        <label><input type="checkbox" name="privacy" required /> Ich habe die <a href="en/legal/privacy-policy" target="_blank">Datenschutzbestimmungen</a> gelesen und akzeptiert.</label><br><br>
      </div>

      <section>
        <button type="submit">Absenden</button>
      </section>
    name: contact
    netlify: true
    action: /thankyou
---
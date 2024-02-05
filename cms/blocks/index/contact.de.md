---
id: contact
folder: index
fallback: en
components:
  - type: form
    title: Kontaktiere uns
    anchor: contact
    text: >-
      Should you have questions, remarks or need further information on any conditions or products, please, use the form below.
      
      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Company <input type="text" name="account" /></label>   
        <label>EU VAT <input type="text" name="vat" /></label>
      </fieldset>

      <fieldset>
        <label>Gegenstand <input type="text" name="subject" required /></label>
      </fieldset>

      <fieldset>
        <label>Nachricht <textarea name="message" rows="4" required></textarea></label>
      </fieldset>

      <div>
        <!--label><input type="checkbox" name="newsletter" /> Ich möchte den Newsletter abonnieren</label><br><br-->
        <label><input type="checkbox" name="privacy" required /> Ich habe die <a href="/privacy-policy" target="_blank">Datenschutzbestimmungen</a> gelesen und akzeptiert.</label><br><br>
      </div>

      <section>
        <button type="submit">Absenden</button>
      </section>
    name: Contact
    netlify: true
    action: /thankyou
---

---
id: contact
folder: index
fallback: en
components:
  - type: form
    text: >-
      Ha kérdése, észrevétele van, vagy további információra van szüksége,
      kérjük, használja az alábbi űrlapot.

      <fieldset>
        <label>Név <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Cégnév <input type="text" name="account" /></label>   
        <label>Adószám <input type="text" name="vat" /></label>
      </fieldset>

      <fieldset>
        <label>Tárgy <input type="text" name="subject" required /></label>
      </fieldset>

      <fieldset>
        <label>Üzenet <textarea name="message" rows="4" required></textarea></label>
      </fieldset>

      <div>
        <!--label><input type="checkbox" name="newsletter" /> Feliratkozom a hírlevelükre</label><br><br-->
        <label><input type="checkbox" name="privacy" required /> Elolvastam és elfogadom az <a href="/privacy-policy" target="_blank">adatkezelési tájékoztatót</a>.</label><br><br>
      </div>

      <section>
        <button type="submit">Küldés</button>
      </section>
    title: Kapcsolat
    anchor: contact
    action: /thankyou
    netlify: true
    name: contact
---

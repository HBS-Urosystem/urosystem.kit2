---
id: contact
folder: index
background:
  - type: image
    posx: 50
    posy: 50
    src: /uploads/medical-physician-doctor-man_web.jpg
  - type: gradient
    name: radial-light
components:
  - type: form
    title: Contact us
    anchor: contact
    text: >-
      Should you have questions, remarks or need further information on any
      conditions or products, please, use the form below.


      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
      </fieldset>

      <fieldset>
        <label>Company <input type="text" name="account" /></label>   
        <label>EU VAT <input type="text" name="vat" /></label>
      </fieldset>

      <fieldset>
        <label>Subject <input type="text" name="subject" required /></label>
      </fieldset>

      <fieldset>
        <label>Message <textarea name="message" rows="4" required></textarea></label>
      </fieldset>

      <div>
        <!--label><input type="checkbox" name="newsletter" /> I want to subscribe to the newsletter</label><br><br-->
        <label><input type="checkbox" class="checkbox checkbox-primary" name="privacy" required /> I've read and accept the <a href="/privacy-policy" target="_blank">privacy policy</a>.</label><br><br>
      </div>

      <section>
        <button type="submit">Send</button>
      </section>
    name: Contact
    netlify: true
    action: /thankyou
    always: true
---

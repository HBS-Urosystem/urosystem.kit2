---
id: signup
folder: b2b
fallback: ""
background:
  - type: image
    posx: 50
    posy: 50
    src: /uploads/medical-physician-doctor-man_web.jpg
  - type: gradient
    name: dark-blue
components:
  - subhead: The survey will take approximately 4 minutes to complete and helps
      Urosystem to collect all information to serve its customers
      better.
    name: Singn up
  - type: form
    title: Contact us
    anchor: contact
    text: >-
      Should you have questions, remarks or need further information on any
      conditions or products, please, use the form below.
      ```
                <fieldset class="triplet">
                  <label>Title 
                    <select id="ca[12][v]" name="ca[12][v]" required>
                      <option selected>
                      </option>
                      <option value="Ms." >
                        Ms.
                      </option>
                      <option value="Mrs." >
                        Mrs.
                      </option>
                      <option value="Mr." >
                        Mr.
                      </option>
                      <option value="Other" >
                        Other
                      </option>
                    </select>
                  </label>   
                  <label>First name  <input type="text" id="firstname" name="firstname" placeholder="Type your first name" required/></label>
                  <label>Last name <input type="text" id="lastname" name="lastname" placeholder="Type your last name" required/></label>
                </fieldset>
                
                <fieldset class="triplet">
                  <label>Email <input type="email" name="email" autocomplete="email" required /></label>
                  <label>Company URL  <input type="text" id="url" name="url" placeholder="https://" required/></label>
                  <label>LinkedIn <input type="text" id="LinkedIn" name="linkedin" placeholder="https://"   /></label>
                </fieldset>

      ```


      <fieldset>
        <label>Name <input type="text" name="name" required /></label>   
        <label>Email <input type="email" name="email" autocomplete="email" required /></label>
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
    netlify: false
    anchor: _form_13
    action: https://urosystem.activehosted.com/proc.php
    title: Sign up as a Business partner
    type: form
    cokie: false
---

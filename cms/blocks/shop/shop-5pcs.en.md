---
id: shop-5pcs
folder: shop
fallback: ""
background:
  - type: image
    posx: 50
    posy: 30
    src: /uploads/shop_bg_group.png
    scale: 115
  - type: gradient
    name: dark-blue-75
components:
  - type: buy
    title: Buy from our webshop
    subhead: 5 pcs for €75 / 10 pcs for €150
    text: Choose the desired quantity and buy!
    button: Shop now
    product: "5983114002592"
  - type: grid
    slide: false
    components:
      - type: article
        text: |-
          #### SHIPPING COST

          * European countries, Russia, Ukraine: €9.50
          * Other countries: €10.00

          Sent out by registered priority mail
        subhead: ""
        background:
          - type: image
            posx: 80
            posy: 72
            scale: 20
            src: /uploads/urodapter-removebg.png
    background: []
  - type: article
    text: >-
      #### THE ESTIMATED DELIVERY TIME, ACCORDING TO THE CUSTOMER'S COUNTRY AS
      FOLLOWS:


      * European countries: 12 days

      * Armenia, Azerbaijan, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Russia, Tajikistan, Turkmenistan, Ukraine, Uzbekistan: 19 days

      * Other countries: 15 days


      For informational purposes only, may differ in certain cases.
    subhead: ""
  - type: cta
    title: Exciting Offer for First-Time Users, Patients, and Doctors!
    button: Contact us
    anchor: contact
    text: Welcome to our webshop, where innovation meets care through our
      state-of-the-art UroDapter®. Understanding the importance of firsthand
      experience with new medical technologies, we are delighted to offer an
      exclusive opportunity for our first-time users, patients, and healthcare
      professionals. Contact us today to obtain samples of our groundbreaking
      UroDapter® at a 50% discount. This exclusive offer is designed to ensure
      that you can experience the advanced benefits of the UroDapter® at a cost
      that remains as accessible as today’s market rates.
    link: /company
    background:
      - type: gradient
        name: radial-dark
  #- type: qaas
  #  fixed: false
  #  title: ""
  #  items:
  #    - q: A Special Invitation to Our B2B Partners
  #      text: >-
  #        We understand the power of partnership in bringing transformative
  #        healthcare solutions to a wider audience. We invite our B2B partners
  #        to reach out and explore collaborative opportunities. Whether you're
  #        looking to introduce the UroDapter® into your product line or seeking
  #        a partnership for distribution, we are open to discussions. Together,
  #        we can make a significant impact on urological care and patient
  #        wellbeing.


  #        Don't miss out on these opportunities to be at the forefront of urological healthcare innovation. Contact us today to learn more about our offers and how we can work together towards a healthier tomorrow.


  #        <form class="grid grid-center mx-auto" action="/en/thankyou">
  #          <fieldset>
  #            <label class="mx-auto w-min">Name <input type="text" bind:value={name} name="name" required placeholder="*"/></label>
  #            <label>Email <input type="email" bind:value={email} name="email" autocomplete="email" required placeholder="*"/></label>
  #          </fieldset>

  #          <fieldset>
  #            <label class="mx-auto w-min">Company <input type="text" bind:value={account} name="account"/></label>
  #            <label>EU VAT <input type="text" bind:value={vat} name="vat"/></label>
  #          </fieldset>

  #          <section>
  #            <a href="mailto:subscribe-f7b584ca6bf3382121b7bb72dc035bba@subscription-serv.com?subject=Question To UroSystem&body=Name:{name};Email:{email};Account:{account};VAT:{vat}">
  #              <button type="button">Send an Email</button>
  #            </a>
  #          </section>
  #          <fieldset>
  #          </fieldset>
  #          <fieldset>

  #          </fieldset>
  #        </form>
---

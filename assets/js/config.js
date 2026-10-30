/* Coffee.House — site configuration (edit here, no rebuild needed).
   PAYMENTS: paste a PayPal donate link, Stripe Payment Link, Buy Me a Coffee or Ko-fi URL to switch the
   Support page from "pledge" mode to instant checkout. Leave blank to keep pledge mode.
   AD SLOTS: Auto ads run from the AdSense script in every page <head>. To add fixed in-content units, create
   display/in-article units in AdSense and paste their numeric slot IDs below. Blank = container stays hidden. */
window.SITE = {
  name: "Coffee.House",
  domain: "coffee.house",
  ownerContactUrl: "https://web.works/contact",
  adsenseClient: "ca-pub-6620975821265271",
  adSlots: {
    inArticle: "",   // e.g. "1234567890"
    display: ""      // e.g. "0987654321"
  },
  payments: {
    paypal: "",       // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    stripe: "",       // e.g. https://buy.stripe.com/XXXX
    buymeacoffee: "", // e.g. https://www.buymeacoffee.com/yourname
    kofi: ""          // e.g. https://ko-fi.com/yourname
  },
  /* Form relay key (encoded). Keep it encoded — never paste a plain address anywhere on the site. */
  _k: ["MWFza3Jvd2Jldw==", "bW9jLmxpYW1n"]
};

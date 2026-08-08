export const site = {
  name: "Everest Super Chemical Udhyog",
  shortName: "ESCU",
  tagline:
    "We make and supply water treatment chemicals, pool and cleaning products, cooking fuel, and other supplies like machine oils and test kits, for hotels, resorts, hospitals, and businesses across Nepal.",
  url: "https://www.everestsuperchemical.com.np",

  // Trading and registration are two different dates here, and conflating
  // them is what produced the original mess.
  //
  // ESCU began trading around 1991 and was formally registered in 2055 BS.
  // Bikram Sambat runs roughly 56 years and 8 months ahead of the Gregorian
  // calendar, so 2055 BS spans mid-April 1998 to mid-April 1999 — seven years
  // after the business actually started.
  //
  // schema.org foundingDate means when the organisation was founded, not when
  // its paperwork cleared, so it tracks `founded`. It must also be a Gregorian
  // ISO 8601 date: emitting a BS year there would read as a date decades in
  // the future and invalidate the LocalBusiness node.
  //
  // `founded.ad` is approximate, back-derived from the 35-years-in-trade
  // figure the business uses. `registered` is the precisely known fact.
  // Replace 1991 if an exact start year ever surfaces.
  founded: { ad: 1991 },
  registered: { bs: 2055, ad: 1998 },

  // Derived, never hardcoded. A literal here was what let the JSON-LD
  // (foundingDate 2001) and the page copy ("35+ years") contradict each
  // other. Recomputed at build time, so it cannot go stale either.
  get yearsInOperation() {
    return new Date().getFullYear() - this.founded.ad;
  },
  phone: "01-4543654",
  whatsapp: "+9779768380800",
  whatsappDisplay: "+977 9768380800",
  // Routed by Cloudflare Email Routing to everestchem.np@gmail.com. Proven
  // working — Google's Business Profile verification code arrived this way.
  email: "info@everestsuperchemical.com.np",
  address: "Banshidhar Marg, Kathmandu 44600, Nepal",
  // Exact pin from the Google Maps listing — used for the embed and for
  // the LocalBusiness geo coordinates, so the map never mis-geocodes.
  geo: { lat: 27.7158594, lng: 85.3370884 },
  hours: "Sunday–Friday, 10am–5pm",
  trustSignals: [
    "Quality Assured Products",
    "Wholesale Pricing",
    "Nationwide Delivery",
    "Technical Support",
    "Long-Term Supply Agreements",
  ],
  whyChooseUs: [
    "Quality assured products",
    "Competitive wholesale pricing",
    "Bulk supply available",
    "Reliable delivery across Nepal",
    "Technical support available",
    "Trusted by hotels, resorts & engineering projects",
    "Custom supply plans",
    "Long-term supply deals available",
  ],
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

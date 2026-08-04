export const site = {
  name: "Everest Super Chemical Udhyog",
  shortName: "ESCU",
  tagline:
    "Manufacturer and supplier of water treatment chemicals, pool and housekeeping products, catering fuel, and allied supplies from machine oils to test kits, serving hotels, resorts, hospitals, and industries across Nepal.",
  url: "https://www.everestsuperchemical.com.np",
  yearsInOperation: 35,
  phone: "01-4543654",
  whatsapp: "+9779768380800",
  whatsappDisplay: "+977 9768380800",
  email: "everestchem.np@gmail.com",
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
    "Customized supply solutions",
    "Long-term supply agreements available",
  ],
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

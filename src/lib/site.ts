export const site = {
  name: "Everest Super Chemical Udhyog",
  shortName: "ESCU",
  tagline:
    "Trusted supplier of water treatment chemicals, pool and housekeeping products, catering fuel, and allied supplies from machine oils to test kits, serving hotels, resorts, hospitals, and industries across Nepal.",
  url: "https://www.everestsuperchemical.com.np",
  yearsInOperation: 35,
  phone: "01-4543654",
  whatsapp: "+9779768380800",
  whatsappDisplay: "+977 9768380800",
  email: "everestchem.np@gmail.com",
  address: "Gokarneshor-06, Kathmandu, Nepal",
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

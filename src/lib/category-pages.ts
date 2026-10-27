import type { Category, Industry } from "./products";

export type CategoryLandingPage = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  buyerSummary: string;
  selectionNotes: string[];
  guideSlugs: string[];
  industries: Industry[];
  questions: { question: string; answer: string }[];
};

export const categoryLandingPages: CategoryLandingPage[] = [
  {
    slug: "water-treatment-chemicals-nepal",
    category: "Water Treatment Chemicals",
    title: "Water Treatment Chemicals Supplier in Nepal",
    description: "Source PAC, alum, chlorine, caustic soda, antiscalant and other water-treatment chemicals from ESCU in Kathmandu, with wholesale supply across Nepal.",
    eyebrow: "Water treatment supply",
    intro: "ESCU supplies treatment plants, hotels, hospitals and industrial sites with chemicals for clarification, disinfection, pH control, membrane protection and effluent treatment.",
    buyerSummary: "Tell us the application, required quantity and delivery location. For dosing chemicals, share the water analysis or operating target when available so the product can be confirmed before ordering.",
    selectionNotes: ["Identify the treatment task first: clarification, disinfection, pH adjustment or membrane protection require different products.", "For a replacement product, include the existing label or specification and let your operator review the proposed supply.", "Compare the supplied grade, packaging and delivery terms alongside price. A catalogue name alone does not confirm suitability for your process."],
    guideSlugs: ["pac-vs-alum", "pac-powder-buying-checklist", "bleaching-powder-buying-storage"],
    industries: ["Water Treatment Plants", "Hotels & Resorts", "Hospitals", "Industrial Plants", "Engineering Projects"],
    questions: [
      { question: "Which water-treatment chemicals does ESCU supply?", answer: "The range includes PAC, alum, bleaching powder, liquid chlorine, industrial salt, caustic soda, sodium hydroxide, antiscalant and polyelectrolyte, subject to current availability." },
      { question: "Can you supply treatment chemicals outside Kathmandu?", answer: "Yes. ESCU handles wholesale and bulk enquiries for delivery across Nepal. Delivery timing and freight depend on the product, quantity and destination." },
      { question: "How can I get water-treatment chemical prices in Nepal?", answer: "Ask ESCU for a quotation for bleaching powder, PAC, alum, liquid chlorine or your other required product. Include the grade or concentration, quantity and delivery town so the team can confirm current pricing and availability. For a treatment application, include your required specification or available water analysis." },
      { question: "Can I review an SDS and specification before confirming the order?", answer: "Yes. Send an enquiry identifying the product and application. ESCU provides SDS and related product documents after the enquiry so your operator or purchasing team can review the proposed supply before confirming the order." },
      { question: "Can I use the same dose when switching products?", answer: "Do not assume products can be exchanged at the same dose. The supplied specification, source-water conditions and treatment process matter. Ask the responsible operator to approve the product and its operating instructions; this catalogue does not provide a universal dosing schedule." },
    ],
  },
  {
    slug: "swimming-pool-chemicals-nepal",
    category: "Swimming Pool Chemicals",
    title: "Swimming Pool Chemicals Supplier in Nepal",
    description: "Buy TCCA, liquid chlorine, copper sulphate, soda ash and other swimming-pool chemicals from ESCU in Kathmandu, with wholesale delivery across Nepal.",
    eyebrow: "Pool water care",
    intro: "ESCU supplies hotels, resorts, clubs and commercial pools with chemicals used for pool disinfection, pH adjustment, algae control and routine water maintenance.",
    buyerSummary: "Share the pool volume, current water-test readings and the product or treatment problem. Pool dosing depends on the actual water condition, so confirm the specification and dose before use.",
    selectionNotes: ["Start with an operator-approved product list and recent water readings rather than choosing chlorine by container price.", "Confirm the product form and compatibility with your feeder or dosing equipment before accepting a replacement.", "Tell us your ordering frequency and delivery location. Available packaging, current pricing and delivery are confirmed for each enquiry."],
    guideSlugs: ["tcca-vs-liquid-chlorine", "swimming-pool-chemical-ordering-checklist"],
    industries: ["Swimming Pools", "Hotels & Resorts", "Hospitals", "Commercial Buildings"],
    questions: [
      { question: "Which pool chemicals are available in Nepal?", answer: "ESCU lists TCCA, liquid chlorine, copper sulphate, soda ash and sodium bicarbonate among its pool-care range, subject to current stock and specification." },
      { question: "Do you supply hotels and commercial swimming pools?", answer: "Yes. ESCU accepts repeat, wholesale and bulk enquiries from hotels, resorts, clubs and commercial pool operators across Nepal." },
      { question: "How do I get swimming-pool chlorine prices in Nepal?", answer: "Specify whether you need liquid chlorine or TCCA, then send the required specification, quantity and delivery location. ESCU confirms current availability and a quotation for the requested product. If you are unsure which product fits your pool, share the pool volume and recent water-test readings before ordering." },
      { question: "Are TCCA and liquid chlorine interchangeable?", answer: "They are different products and should not be exchanged by equal weight or volume. Your operator should review the supplied specification, water condition and dosing equipment before changing the treatment product. Use the product label and operating instructions rather than a generic internet dose." },
      { question: "When will I receive the product documents?", answer: "ESCU provides SDS and related documents after you send an enquiry. Include the products you need and your pool application so the documentation can be reviewed alongside the quotation before an order is confirmed." },
    ],
  },
  {
    slug: "housekeeping-cleaning-chemicals-nepal",
    category: "Housekeeping & Cleaning Chemicals",
    title: "Housekeeping and Cleaning Chemicals in Nepal",
    description: "Source liquid soap, handwash, floor cleaner and housekeeping chemicals from ESCU in Kathmandu for hotels, restaurants and commercial facilities across Nepal.",
    eyebrow: "Cleaning and hygiene",
    intro: "ESCU supplies cleaning and hygiene products for hotels, restaurants, hospitals, offices and shared commercial spaces, with wholesale quantities available from Kathmandu.",
    buyerSummary: "Send the product, pack size or drum requirement, quantity and delivery location. If you are matching an existing cleaning process, include the surface, dilution method and any required fragrance or specification.",
    selectionNotes: ["Match the product to the task: utensils and laundry, hand hygiene, floors and other surfaces have different requirements.", "Include the surface material, finish and cleaning method when requesting a recommendation or matching an existing product.", "Confirm the supplied instructions and available packaging. Fragrance, colour or a familiar name does not establish a disinfection claim or suitability for every surface."],
    guideSlugs: ["choosing-housekeeping-cleaning-products"],
    industries: ["Hotels & Resorts", "Hospitals", "Restaurants & Cafes", "Commercial Buildings", "Industrial Plants"],
    questions: [
      { question: "Which housekeeping products does ESCU supply?", answer: "The catalogue includes products for hand hygiene, utensils, laundry, floors, surfaces and general housekeeping. Availability and pack sizes can be confirmed with the team." },
      { question: "Can businesses order cleaning chemicals in bulk?", answer: "Yes. ESCU accepts wholesale and repeat-supply enquiries for hotels, hospitals, restaurants, offices and other facilities across Nepal." },
      { question: "How do I get floor-cleaner and cleaning-chemical prices in Kathmandu?", answer: "Send the product name, intended cleaning task, pack-size preference, quantity and delivery location. ESCU can quote for floor cleaner, liquid soap, handwash and other available cleaning products. For customer visits, find the team at Banshidhar Marg, Kathmandu; contact us to confirm the required product before travelling." },
      { question: "Is Founder Liquid Soap the same as Handwash Shampoo?", answer: "No. Founder Liquid Soap is for utensils, clothes and general cleaning. Handwash Shampoo is the separate product for cleaning hands, not hair. Tell the team your intended use so the correct product and instructions can be confirmed." },
      { question: "How can our housekeeping team obtain SDS and instructions?", answer: "Request the relevant products through an enquiry. ESCU supplies SDS and related documents following the enquiry. Pass those documents and the supplied instructions to the people receiving and using the products, and confirm suitability for the actual surface or task." },
    ],
  },
];

export function getCategoryLandingPage(slug: string) {
  return categoryLandingPages.find((page) => page.slug === slug);
}

export function getCategoryUrl(category: Category) {
  return `/chemicals/${categoryLandingPages.find((page) => page.category === category)!.slug}`;
}

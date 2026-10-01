import type { Category, Industry } from "./products";

export type CategoryLandingPage = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  buyerSummary: string;
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
    industries: ["Water Treatment Plants", "Hotels & Resorts", "Hospitals", "Industrial Plants", "Engineering Projects"],
    questions: [
      { question: "Which water-treatment chemicals does ESCU supply?", answer: "The range includes PAC, alum, bleaching powder, liquid chlorine, industrial salt, caustic soda, sodium hydroxide, antiscalant and polyelectrolyte, subject to current availability." },
      { question: "Can you supply treatment chemicals outside Kathmandu?", answer: "Yes. ESCU handles wholesale and bulk enquiries for delivery across Nepal. Delivery timing and freight depend on the product, quantity and destination." },
      { question: "How do I request the correct grade or concentration?", answer: "Send the chemical name, intended application, required concentration or specification, quantity and any available water analysis. The team will confirm availability and specifications before quotation." },
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
    industries: ["Swimming Pools", "Hotels & Resorts", "Hospitals", "Commercial Buildings"],
    questions: [
      { question: "Which pool chemicals are available in Nepal?", answer: "ESCU lists TCCA, liquid chlorine, copper sulphate, soda ash and sodium bicarbonate among its pool-care range, subject to current stock and specification." },
      { question: "Do you supply hotels and commercial swimming pools?", answer: "Yes. ESCU accepts repeat, wholesale and bulk enquiries from hotels, resorts, clubs and commercial pool operators across Nepal." },
      { question: "What information is needed for a pool-chemical quotation?", answer: "Send the product name, required quantity, delivery location and any preferred specification. For treatment advice, include pool volume and recent pH and chlorine readings." },
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
    industries: ["Hotels & Resorts", "Hospitals", "Restaurants & Cafes", "Commercial Buildings", "Industrial Plants"],
    questions: [
      { question: "Which housekeeping products does ESCU supply?", answer: "The catalogue includes products for hand hygiene, utensils, laundry, floors, surfaces and general housekeeping. Availability and pack sizes can be confirmed with the team." },
      { question: "Can businesses order cleaning chemicals in bulk?", answer: "Yes. ESCU accepts wholesale and repeat-supply enquiries for hotels, hospitals, restaurants, offices and other facilities across Nepal." },
      { question: "How can I compare products before ordering?", answer: "Send the intended use, surface or cleaning task, required quantity and current product details if you are replacing one. ESCU can confirm the closest available option and provide a quotation." },
    ],
  },
];

export function getCategoryLandingPage(slug: string) {
  return categoryLandingPages.find((page) => page.slug === slug);
}

export function getCategoryUrl(category: Category) {
  return `/chemicals/${categoryLandingPages.find((page) => page.category === category)!.slug}`;
}

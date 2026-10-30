import { getProductBySlug } from "./products";
import { getProductEditorial } from "./product-editorial";
import { getProductPackaging } from "./product-packaging";

export interface ProductBuyingContent {
  title: string;
  description: string;
  nepaliName?: string;
  questions: { question: string; answer: string }[];
}

// Focused buying information for products with relevant search demand.
// Specifications and prices must be confirmed by the team, not inferred here.
const productBuyingContent: Partial<Record<string, ProductBuyingContent>> = {
  "bleaching-powder": {
    title: "Bleaching Powder Price & Supply in Nepal",
    description:
      `Bleaching powder in ${getProductPackaging("bleaching-powder").label} for water-disinfection enquiries. Request pricing from ESCU in Kathmandu, Nepal; confirm grade and suitability.`,
    nepaliName: "ब्लिचिङ पाउडर",
    questions: [
      {
        question: "What is the price of bleaching powder in Nepal?",
        answer:
          "ESCU quotes bleaching powder on request; a fixed price is not published here. Send the quantity, required grade and delivery location to receive a quotation for your order.",
      },
      {
        question: "What should I confirm before buying bleaching powder for water treatment?",
        answer:
          "Tell the team whether the powder is for a water supply, storage tank or another treatment application. Confirm the product grade, available chlorine specification and suitability for that use, and request the specification sheet before ordering.",
      },
    ],
  },
  "floor-cleaner": {
    title: "Floor Cleaner Supplier in Kathmandu, Nepal",
    description:
      `Floor cleaner in ${getProductPackaging("floor-cleaner").label} for commercial housekeeping. Request pricing from ESCU in Kathmandu, Nepal; smaller quantities on request.`,
    questions: [
      {
        question: "Can I order floor cleaner in bulk for a hotel or commercial building?",
        answer:
          "Request a quotation with the quantity you need and your delivery location. The team can confirm the available pack sizes and current floor cleaner price for your housekeeping order.",
      },
      {
        question: "How do I choose floor cleaner for tile, marble or vinyl?",
        answer:
          "Share the floor material, finish and cleaning method, including whether you use a mop or machine. This catalogue lists a multi-surface floor cleaner; confirm suitability and product instructions for your specific flooring before ordering.",
      },
    ],
  },
  "hcl-acid": {
    title: "Hydrochloric Acid (HCL) Price & Supply in Nepal",
    description:
      `HCL acid in ${getProductPackaging("hcl-acid").label} for descaling and pH-control enquiries. Request pricing from ESCU in Kathmandu, Nepal; confirm concentration and suitability.`,
    questions: [
      {
        question: "How can I get a hydrochloric acid price in Nepal?",
        answer:
          "Ask ESCU for an HCL acid quotation with your required quantity, concentration and delivery location. Prices are quoted for the order; this page does not publish a fixed rate.",
      },
      {
        question: "What details are needed when ordering HCL acid for descaling?",
        answer:
          "Describe the equipment, its materials and the maintenance task. For pH reduction or resin regeneration, name the treatment process instead. Confirm the concentration, grade and application suitability with the team and request the specification sheet.",
      },
    ],
  },
  "caustic-soda-flakes": {
    title: "Caustic Soda Flakes Price & Supply in Nepal",
    description:
      `Caustic soda flakes in ${getProductPackaging("caustic-soda-flakes").label} for treatment and industrial-cleaning enquiries. Request pricing from ESCU in Kathmandu, Nepal; confirm the required grade.`,
    questions: [
      {
        question: "What is the price of caustic soda flakes in Nepal?",
        answer:
          "Request a quotation for sodium hydroxide flakes with the quantity, required grade and delivery location. The team will confirm current pricing and available packaging; no fixed price is published here.",
      },
      {
        question: "Are caustic soda flakes the form I need for my process?",
        answer:
          "This product is sodium hydroxide in flake form. State whether you need it for pH adjustment, effluent neutralisation or industrial cleaning, and confirm the required grade and specification for your process before ordering.",
      },
    ],
  },
  "liquid-chlorine-water": {
    title: "Liquid Chlorine for Water Treatment in Nepal",
    description:
      `Liquid chlorine in ${getProductPackaging("liquid-chlorine-water").label} for water and tank disinfection enquiries. Request pricing from ESCU in Kathmandu, Nepal; confirm concentration and suitability.`,
    questions: [
      {
        question: "How do I request a price for liquid chlorine for water treatment?",
        answer:
          "Send the quantity required, delivery location and whether the order is for a water supply or storage tank. ESCU quotes on request and will confirm available pack sizes and the supplied concentration.",
      },
      {
        question: "Is this liquid chlorine suitable for my water treatment system?",
        answer:
          "This listing is sodium hypochlorite solution for water and tank disinfection. Describe your system and intended use so the team can confirm the grade, concentration and product specification. For swimming pool orders, use the separate pool liquid chlorine listing.",
      },
    ],
  },
  "liquid-chlorine-pool": {
    title: "Liquid Chlorine for Swimming Pools in Nepal",
    description:
      `Liquid pool chlorine in ${getProductPackaging("liquid-chlorine-pool").label} for swimming-pool treatment enquiries. Request pricing from ESCU in Kathmandu, Nepal; confirm concentration and suitability.`,
    questions: [
      {
        question: "Can I get a quotation for regular pool chlorine supply?",
        answer:
          "Share your required quantity, ordering frequency and delivery location to request a liquid pool chlorine quotation. The team can confirm current pricing, available packaging and supply arrangements.",
      },
      {
        question: "What should I check before buying liquid chlorine for a swimming pool?",
        answer:
          "Confirm the sodium hypochlorite concentration and product specification against your pool's treatment requirements. Tell the team about your pool and dosing equipment before ordering. Water supply and tank orders have a separate liquid chlorine listing.",
      },
    ],
  },
  antiscalant: {
    title: "RO Antiscalant Supplier in Kathmandu, Nepal",
    description:
      `RO antiscalant in ${getProductPackaging("antiscalant").label} from ESCU in Kathmandu, Nepal. Share your feed-water report and system details to request pricing and check compatibility.`,
    questions: [
      {
        question: "What information is needed for an RO antiscalant quotation?",
        answer:
          "Send your required quantity and delivery location together with the RO system details and feed water analysis. The team can confirm the appropriate product and current price; this page does not publish a fixed antiscalant rate.",
      },
      {
        question: "How do I confirm which antiscalant suits my RO system?",
        answer:
          "Antiscalant selection depends on the feed water and system recovery rate. Share the water report, recovery rate and membrane requirements with the team to confirm product compatibility and obtain the specification sheet before ordering.",
      },
    ],
  },
};

export function getProductBuyingContent(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  const editorial = getProductEditorial(slug);
  const packaging = getProductPackaging(slug);
  const existing = productBuyingContent[slug];
  const seenQuestions = new Set<string>();
  const targetedMetadata: Record<string, { title: string; description: string }> = {
    "pac-powder": {
      title: "PAC Powder Supplier in Nepal | Poly Aluminium Chloride",
      description: `PAC powder (Poly Aluminium Chloride) in ${packaging.label} for water clarification. Request pricing from ESCU in Kathmandu, Nepal; confirm the required grade.`,
    },
    "tcca-90": {
      title: "TCCA Supplier & Price Quotation in Nepal",
      description: `TCCA pool chlorine in ${packaging.label} from ESCU in Kathmandu, Nepal. Request a quotation and confirm product form, specification and delivery for your pool.`,
    },
  };
  return {
    title: targetedMetadata[slug]?.title ?? existing?.title ?? `${product.name} Supplier in Kathmandu, Nepal`,
    description: targetedMetadata[slug]?.description ?? existing?.description ?? `${product.name} for ${product.useCase.toLowerCase()}. Packs: ${packaging.label}. Request wholesale pricing and delivery details from ESCU in Kathmandu, Nepal.`,
    nepaliName: existing?.nepaliName,
    questions: [
      {
        question: `How can I order ${product.name} from ESCU?`,
        answer: `Pack sizes: ${packaging.label}.${packaging.smallerQuantities ? " Smaller quantities are available on request." : ""} Send the product name, intended application, required quantity and delivery town. Include any purchasing specification or existing product label. ESCU confirms the offered product, current quotation and delivery arrangements before the order is agreed; this page does not guarantee live stock.`,
      },
      {
        question: `When will I receive the SDS and documents for ${product.name}?`,
        answer: `Send an enquiry identifying the required product and application. ESCU provides the relevant SDS and related product documents after enquiry so your purchasing or operating team can review them. Tell us which documents your procedure requires; no unverified certification or product-specific numerical dose is implied by this catalogue page.`,
      },
      ...(existing?.questions ?? []),
      ...editorial.questions,
    ].filter(({ question }) => {
      const key = question.trim().replace(/\s+/g, " ").toLocaleLowerCase();
      if (seenQuestions.has(key)) return false;
      seenQuestions.add(key);
      return true;
    }).slice(0, 6),
  } satisfies ProductBuyingContent;
}

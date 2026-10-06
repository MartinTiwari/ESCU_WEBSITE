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
      "Buy bleaching powder for water disinfection from ESCU in Kathmandu, Nepal. Request a price quote and confirm the grade, pack size and delivery for your site.",
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
      "Buy floor cleaner for hotels, restaurants and commercial buildings from ESCU in Kathmandu, Nepal. Ask for bulk pricing and confirm suitability for your flooring.",
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
      "Source hydrochloric acid (HCL) for descaling and pH reduction from ESCU in Kathmandu, Nepal. Request a price quote and confirm concentration and intended use.",
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
      "Source caustic soda flakes (sodium hydroxide) from ESCU in Kathmandu, Nepal. Ask for a price quote and confirm grade and pack sizes for your treatment process.",
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
      "Buy liquid chlorine (sodium hypochlorite) for water and tank disinfection from ESCU in Kathmandu, Nepal. Confirm concentration and request a supply quotation.",
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
      "Source liquid pool chlorine (sodium hypochlorite) from ESCU in Kathmandu, Nepal. Request bulk pricing and confirm concentration and pack sizes for your pool.",
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
      "Source RO antiscalant from ESCU in Kathmandu, Nepal. Share your feed water report and system details to confirm the suitable product and request a price quote.",
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
  return productBuyingContent[slug];
}

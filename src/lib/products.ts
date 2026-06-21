export type Category =
  | "Housekeeping & Cleaning Chemicals"
  | "Hospitality & Catering Supplies"
  | "Swimming Pool Chemicals"
  | "Water Treatment Chemicals";

export type Industry =
  | "Hotels & Resorts"
  | "Restaurants & Cafes"
  | "Swimming Pools"
  | "Hospitals"
  | "Industrial Plants"
  | "Commercial Buildings"
  | "Water Treatment Plants"
  | "Engineering Projects";

export interface Product {
  slug: string;
  name: string;
  useCase: string;
  category: Category;
  industries: Industry[];
  description: string;
  sdsAvailable: boolean;
}

const hospitality: Industry[] = ["Hotels & Resorts", "Restaurants & Cafes", "Commercial Buildings"];
const pool: Industry[] = ["Swimming Pools", "Hotels & Resorts"];
const waterTreatment: Industry[] = ["Water Treatment Plants", "Industrial Plants", "Engineering Projects", "Hospitals"];

export const products: Product[] = [
  // Housekeeping & Cleaning Chemicals
  { slug: "liquid-soap", name: "Liquid Soap", useCase: "Hand & Surface Cleaning", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Gentle, effective liquid soap formulated for frequent hand and surface washing in high-traffic commercial settings.", sdsAvailable: false },
  { slug: "hand-wash", name: "Hand Wash", useCase: "Personal Hygiene Solution", category: "Housekeeping & Cleaning Chemicals", industries: [...hospitality, "Hospitals"], description: "Hygienic hand wash solution suited for hotels, hospitals, and commercial washrooms.", sdsAvailable: false },
  { slug: "bathroom-cleaner", name: "Bathroom Cleaner", useCase: "Scale & Stain Removal", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Removes hard water scale and stains from bathroom fixtures and tiles.", sdsAvailable: false },
  { slug: "herbal-lemon-phenyl", name: "Herbal Lemon Phenyl", useCase: "Floor Disinfectant", category: "Housekeeping & Cleaning Chemicals", industries: [...hospitality, "Hospitals"], description: "Disinfects and freshens floors with a long-lasting lemon fragrance.", sdsAvailable: false },
  { slug: "glass-cleaner", name: "Glass Cleaner", useCase: "Streak-Free Shine", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Fast-drying, streak-free formula for glass and mirrored surfaces.", sdsAvailable: false },
  { slug: "floor-cleaner", name: "Floor Cleaner", useCase: "Multi-Surface Cleaning", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Multi-surface floor cleaner suitable for tile, marble, and vinyl flooring.", sdsAvailable: false },
  { slug: "cleaning-powder", name: "Cleaning Powder", useCase: "Heavy Duty Cleaning", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Heavy-duty abrasive cleaning powder for tough stains and grime.", sdsAvailable: false },
  { slug: "multi-cleaner-liquid", name: "Multi Cleaner Liquid", useCase: "All-Purpose Cleaner", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "All-purpose liquid cleaner for everyday housekeeping needs.", sdsAvailable: false },
  { slug: "ceramic-cleaner", name: "Ceramic Cleaner", useCase: "Tile & Ceramic Care", category: "Housekeeping & Cleaning Chemicals", industries: hospitality, description: "Specialized formula for cleaning and maintaining tile and ceramic surfaces.", sdsAvailable: false },

  // Hospitality & Catering Supplies
  { slug: "wax-fuel", name: "Wax Fuel", useCase: "Buffet Food Warmer Fuel", category: "Hospitality & Catering Supplies", industries: hospitality, description: "Clean-burning wax fuel for buffet food warmers and catering setups.", sdsAvailable: false },

  // Swimming Pool Chemicals
  { slug: "tcca-90", name: "TCCA 90%", useCase: "Pool Sanitizer", category: "Swimming Pool Chemicals", industries: pool, description: "High-strength chlorine sanitizer (90% TCCA) for swimming pool disinfection.", sdsAvailable: false },
  { slug: "liquid-chlorine-pool", name: "Liquid Chlorine", useCase: "Pool Water Disinfection (Sodium Hypochlorite)", category: "Swimming Pool Chemicals", industries: pool, description: "Sodium hypochlorite solution for fast-acting pool water disinfection.", sdsAvailable: false },
  { slug: "copper-sulphate", name: "Copper Sulphate", useCase: "Algae Prevention & Control", category: "Swimming Pool Chemicals", industries: pool, description: "Controls and prevents algae growth in pool and reservoir water.", sdsAvailable: false },
  { slug: "soda-ash-powder", name: "Soda Ash Powder", useCase: "pH Increaser", category: "Swimming Pool Chemicals", industries: pool, description: "Raises pH levels to maintain balanced, comfortable pool water.", sdsAvailable: false },
  { slug: "sodium-bicarbonate", name: "Sodium Bicarbonate", useCase: "Total Alkalinity Booster", category: "Swimming Pool Chemicals", industries: pool, description: "Boosts total alkalinity to stabilize pool water chemistry.", sdsAvailable: false },

  // Water Treatment Chemicals
  { slug: "bleaching-powder", name: "Bleaching Powder", useCase: "Water Disinfection", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Calcium hypochlorite powder used for large-scale water disinfection.", sdsAvailable: false },
  { slug: "pac-powder", name: "PAC Powder", useCase: "Water Clarification Coagulant", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Poly Aluminium Chloride coagulant for turbidity removal and water clarification.", sdsAvailable: false },
  { slug: "crystal-alum", name: "Crystal Alum", useCase: "Water Clarification Agent", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Traditional alum crystal used for clarifying raw water.", sdsAvailable: false },
  { slug: "non-ferric-alum", name: "Non-Ferric Alum", useCase: "Water Treatment Coagulant", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Low-iron coagulant suited for treating water where ferric residue must be minimized.", sdsAvailable: false },
  { slug: "alum-powder", name: "Alum Powder", useCase: "Sedimentation Aid", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Powdered alum used to aid sedimentation in water treatment processes.", sdsAvailable: false },
  { slug: "industrial-salt", name: "Industrial Salt", useCase: "Water Softener Regeneration", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Bulk industrial-grade salt for regenerating water softener resin beds.", sdsAvailable: false },
  { slug: "caustic-soda-flakes", name: "Caustic Soda Flakes", useCase: "pH Adjustment Chemical", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Sodium hydroxide flakes used for pH adjustment in industrial processes.", sdsAvailable: false },
  { slug: "sodium-hydroxide", name: "Sodium Hydroxide", useCase: "Alkalinity & pH Control", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Strong alkali used for alkalinity and pH control in treatment systems.", sdsAvailable: false },
  { slug: "hcl-acid", name: "HCL Acid", useCase: "Descaling & pH Reduction", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Hydrochloric acid for descaling equipment and lowering water pH.", sdsAvailable: false },
  { slug: "liquid-chlorine-water", name: "Liquid Chlorine", useCase: "Water & Tank Disinfection (Sodium Hypochlorite)", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Sodium hypochlorite solution for disinfecting water supplies and storage tanks.", sdsAvailable: false },
  { slug: "antiscalant", name: "Antiscalant", useCase: "RO Membrane Protection", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Prevents scale formation to protect RO membranes and extend system life.", sdsAvailable: false },
  { slug: "polyelectrolyte", name: "Polyelectrolyte", useCase: "Flocculation Agent", category: "Water Treatment Chemicals", industries: waterTreatment, description: "Flocculation aid that improves settling of suspended solids in water treatment.", sdsAvailable: false },
];

export const categories: Category[] = [
  "Water Treatment Chemicals",
  "Swimming Pool Chemicals",
  "Housekeeping & Cleaning Chemicals",
  "Hospitality & Catering Supplies",
];

export const industries: Industry[] = [
  "Water Treatment Plants",
  "Hotels & Resorts",
  "Swimming Pools",
  "Hospitals",
  "Industrial Plants",
  "Restaurants & Cafes",
  "Commercial Buildings",
  "Engineering Projects",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

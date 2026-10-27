export type Category =
  | "Housekeeping & Cleaning Chemicals"
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

  // Product-specific catalogue information. Lack of indexing has multiple
  // possible causes; do not infer a Google quality decision from word count.
  // Confirm grade, concentration, dosage and packaging from actual documents.
  overview: string;
  applications: string[];
  // Chemical and trade synonyms buyers actually search for. Accurate names
  // only — these feed both the on-page copy and the metadata keywords.
  alsoKnownAs: string[];
  // Generic, grade-independent handling guidance. Safety facts only.
  handling: string;

  // These fields describe a public download only. ESCU provides the SDS and
  // related product documents after a customer sends an enquiry.
  sdsAvailable: boolean;
  sdsUrl?: string;
}

const hospitality: Industry[] = ["Hotels & Resorts", "Restaurants & Cafes", "Commercial Buildings"];
const pool: Industry[] = ["Swimming Pools", "Hotels & Resorts"];
const waterTreatment: Industry[] = ["Water Treatment Plants", "Industrial Plants", "Engineering Projects", "Hospitals"];

export const products: Product[] = [
  // Housekeeping & Cleaning Chemicals
  {
    slug: "liquid-soap",
    name: "Liquid Soap",
    useCase: "Utensil & Laundry Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description:
      "Founder Liquid Soap for washing utensils, clothes and general cleaning in homes and commercial settings.",
    overview:
      "Founder Liquid Soap is used for cleaning utensils, clothes and other general cleaning tasks. Hotels, restaurants and commercial facilities can enquire about bulk supply from ESCU in Kathmandu. Tell us what you plan to clean and the quantity required so the team can confirm the appropriate product and usage instructions before ordering. For cleaning hands, choose the separate Handwash Shampoo product.",
    applications: [
      "Washing kitchen utensils",
      "Washing clothes and laundry",
      "General cleaning where the product is suitable",
      "Housekeeping trolleys and cleaning stations",
    ],
    alsoKnownAs: ["Founder Liquid Soap", "Bulk liquid soap", "Liquid cleaning soap"],
    handling:
      "Follow the product label and the team's usage instructions. Keep containers closed, avoid eye contact and keep out of reach of children. Do not mix with other cleaning chemicals. Confirm dilution and fabric or surface suitability before use.",
    sdsAvailable: false,
  },
  {
    slug: "hand-wash",
    name: "Handwash Shampoo",
    useCase: "Personal Hygiene Solution",
    category: "Housekeeping & Cleaning Chemicals",
    industries: [...hospitality, "Hospitals"],
    description: "Handwash Shampoo for cleaning hands in hotels, workplaces and commercial washrooms. This product is for handwashing, not hair washing.",
    overview:
      "Handwash Shampoo is a hand-cleaning product, not a hair shampoo. ESCU supplies it for washroom dispensers and handwashing stations in hotels, restaurants, workplaces and shared facilities. Send the quantity and intended use to confirm current availability, packaging and usage instructions. Follow your facility's hygiene requirements when choosing a product; no medical or sanitising performance is claimed here.",
    applications: [
      "Guest and public washroom dispensers",
      "Hospital and clinic handwashing points",
      "Staff and back-of-house washrooms",
      "Handwashing stations in shared facilities",
    ],
    alsoKnownAs: ["Liquid handwash", "Hand wash refill", "Bulk hand wash"],
    handling:
      "Store in a cool, dry place away from direct sunlight. Keep containers closed between refills to avoid contamination.",
    sdsAvailable: false,
  },
  {
    slug: "bathroom-cleaner",
    name: "Bathroom Cleaner",
    useCase: "Scale & Stain Removal",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Bathroom-cleaning product for enquiries about scale and stains on suitable fixtures and tiles.",
    overview: "Bathroom Cleaner is listed for washroom-cleaning requirements in hotels, restaurants and commercial facilities. Mineral deposits, general soil and finish damage are different problems, so describe what you are trying to remove and the surface involved. ESCU can confirm the offered product and its instructions after enquiry. A bathroom location alone does not establish that a cleaner suits every fixture in the room.",
    applications: [
      "Toilets, urinals and sanitaryware",
      "Shower screens, tiles and grout",
      "Taps, fittings and chrome fixtures",
      "Removing hard water and limescale marks",
    ],
    alsoKnownAs: ["Toilet cleaner", "Washroom cleaner", "Descaling bathroom cleaner"],
    handling: "Follow the supplied label and SDS for protective equipment, ventilation, dilution and rinsing. Never mix with bleach, chlorine products or other cleaning chemicals. Confirm surface compatibility before use, particularly around stone, plated fixtures and delicate finishes.",
    sdsAvailable: false,
  },
  {
    slug: "herbal-lemon-phenyl",
    name: "Herbal Lemon Phenyl",
    useCase: "Floor Cleaning & Freshening",
    category: "Housekeeping & Cleaning Chemicals",
    industries: [...hospitality, "Hospitals"],
    description: "Lemon-variant phenyl for routine floor-cleaning enquiries in homes and commercial facilities.",
    overview: "Herbal Lemon Phenyl is offered for routine floor-cleaning requirements in guest areas, corridors and shared facilities. Tell ESCU about the flooring, cleaning method and the quantity used by your team. The product name is not a verified ingredient list or an antimicrobial-performance claim. Where a workplace procedure requires disinfection or a particular fragrance specification, include that requirement in the enquiry for review.",
    applications: [
      "Daily corridor, lobby and staircase mopping",
      "Hospital ward and clinic floors",
      "Guest room and bathroom floors",
      "Back-of-house and service areas",
    ],
    alsoKnownAs: ["Lemon phenyl","Floor phenyl","Lemon phenyle","Herbal phenyl"],
    handling: "Use the supplied product instructions for dilution and suitable surfaces. Keep containers labelled and closed, and store as directed on the label and SDS. Do not mix with other cleaners. Confirm any required disinfection performance before specifying it for that purpose.",
    sdsAvailable: false,
  },
  {
    slug: "glass-cleaner",
    name: "Glass Cleaner",
    useCase: "Glass & Mirror Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Glass-cleaning liquid for window, mirror and glazed-surface supply enquiries.",
    overview: "Glass Cleaner is offered for window, mirror, partition and display-glass cleaning requirements. Hotels, restaurants and commercial buildings can enquire about a regular supply for housekeeping teams. Include the surface and any coating or film, the wiping method and the quantity required. This helps the team confirm the offered formulation instead of assuming a general glass-cleaner name guarantees a result on every type of glazing.",
    applications: [
      "Windows, glazed frontages and partitions",
      "Bathroom and guest room mirrors",
      "Display cabinets and glass tabletops",
      "Lift and lobby glass panels",
    ],
    alsoKnownAs: ["Window cleaner", "Mirror cleaner", "Glass cleaning liquid"],
    handling: "Follow the supplied label and SDS for storage, application and protective equipment. Check compatibility with coatings, films, frames and specialist screens. Avoid spraying onto electrical equipment, and do not mix with another cleaning product.",
    sdsAvailable: false,
  },
  {
    slug: "floor-cleaner",
    name: "Floor Cleaner",
    useCase: "Multi-Surface Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Floor-cleaning product for commercial housekeeping enquiries; confirm compatibility with the particular floor and finish.",
    overview: "Floor Cleaner is listed for routine housekeeping requirements in hotels, restaurants and commercial buildings. A site may combine tile, stone, vinyl and other finishes, each with its own maintenance restrictions. Tell ESCU which surfaces you clean and whether the method involves a mop or equipment. The offered formulation, its pH and its compatibility must be confirmed; this page does not promise one neutral cleaner for every floor.",
    applications: [
      "Daily mopping of tiled and vitrified floors",
      "Polished marble and natural stone",
      "Vinyl and laminate flooring",
      "Scrubber-drier machines in large areas",
    ],
    alsoKnownAs: ["Tile cleaner", "Marble floor cleaner", "Multi surface floor cleaner"],
    handling: "Follow the supplied label and SDS, including any dilution and rinsing instructions. Confirm the cleaner against the floor finish and equipment requirements before use. Keep containers closed and clearly labelled; never mix different cleaning products.",
    sdsAvailable: false,
  },
  {
    slug: "cleaning-powder",
    name: "Cleaning Powder",
    useCase: "Heavy Duty Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Heavy-duty abrasive cleaning powder for tough stains and grime.",
    overview:
      "An abrasive scouring powder for the jobs liquid cleaners cannot shift — baked-on grease in commercial kitchens, stained sinks, and heavily soiled utensils. The abrasive action does the work mechanically rather than chemically, which makes it effective on burnt residue but unsuitable for anything you do not want scratched.",
    applications: [
      "Commercial kitchen sinks and steel surfaces",
      "Burnt-on grease from pots, pans and utensils",
      "Stained washroom fixtures",
      "Heavy soil on hard, scratch-tolerant surfaces",
    ],
    alsoKnownAs: ["Scouring powder", "Scrubbing powder", "Abrasive cleaning powder"],
    handling:
      "Keep dry — powder cakes if it takes on moisture. Avoid on polished, coated or soft surfaces where the abrasive will leave scratch marks.",
    sdsAvailable: false,
  },
  {
    slug: "multi-cleaner-liquid",
    name: "Multi Cleaner Liquid",
    useCase: "All-Purpose Cleaner",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "All-purpose liquid cleaner for everyday housekeeping needs.",
    overview: "Multi Cleaner Liquid is offered for routine surface-cleaning enquiries from housekeeping teams. Describe the worktops, furniture, fittings or other surfaces involved and the soil that needs removing. General-purpose cleaning is different from a specialist scale-removal, glass-care or hygiene requirement. ESCU can confirm the offered formulation and appropriate product information after receiving your enquiry, so a broad product name does not replace a compatibility check.",
    applications: [
      "Worktops, desks and general surfaces",
      "Doors, handles and painted woodwork",
      "Furniture and fittings in guest areas",
      "General-purpose spot cleaning",
    ],
    alsoKnownAs: ["All purpose cleaner", "General purpose cleaner", "Multipurpose cleaning liquid"],
    handling: "Follow the supplied instructions for dilution, surface compatibility, rinsing and storage. Keep working containers labelled and do not mix with other products. Do not assume suitability for every painted, coated or food-contact surface.",
    sdsAvailable: false,
  },
  {
    slug: "ceramic-cleaner",
    name: "Ceramic Cleaner",
    useCase: "Tile & Ceramic Care",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Specialized formula for cleaning and maintaining tile and ceramic surfaces.",
    overview: "Ceramic Cleaner is listed for tile and ceramic-care requirements in hotels, restaurants and commercial washrooms. Tell the team whether the problem is routine soil, mineral film, staining or another maintenance task, and identify the tile and grout. Nearby stone, metal and decorative finishes may have different restrictions. Confirm the offered product and instructions for the installation rather than assuming every tiled surface needs the same cleaner.",
    applications: [
      "Ceramic and vitrified wall and floor tiles",
      "Grout lines and tile joints",
      "Ceramic sanitaryware and basins",
      "Restoring dulled or filmed tiled surfaces",
    ],
    alsoKnownAs: ["Tile cleaner", "Ceramic tile cleaning liquid", "Grout cleaner"],
    handling: "Use the supplied label and SDS to plan protective equipment, ventilation, dilution and storage. Confirm compatibility with tile finishes, grout and adjacent materials. Never mix with chlorine products or other cleaning chemicals.",
    sdsAvailable: false,
  },
  {
    slug: "wax-fuel",
    name: "Wax Fuel",
    useCase: "Buffet Food Warmer Fuel",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Fuel for compatible buffet food warmers and catering equipment; confirm the supplied container and instructions.",
    overview: "Wax Fuel is offered for compatible food-warmer and chafing-dish equipment used at buffets and catered events. Tell ESCU the equipment requirements, number of warmers and service schedule when requesting supply. The offered product, container format and handling instructions must be confirmed before use. No burn duration, smoke performance, heat output or equipment approval is assumed from the catalogue name.",
    applications: [
      "Chafing dishes on breakfast and banquet buffets",
      "Outdoor catering and event service",
      "Keeping food at temperature during long service",
      "Wedding and conference catering setups",
    ],
    alsoKnownAs: ["Chafing fuel", "Buffet fuel", "Chafing dish fuel", "Food warmer fuel"],
    handling:
      "Flammable. Store away from heat and ignition sources. Allow canisters to cool fully before handling, and never refill or move a lit canister.",
    sdsAvailable: false,
  },

  // Swimming Pool Chemicals
  {
    slug: "tcca-90",
    name: "TCCA 90%",
    useCase: "Pool Sanitizer",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "TCCA pool-treatment product listed as TCCA 90%; confirm the supplied form and available-chlorine specification after enquiry.",
    overview: "TCCA is a chlorinated pool-treatment chemical, also known as trichlor or trichloroisocyanuric acid. ESCU accepts enquiries from pool operators, hotels and resorts for the product specified by their maintenance procedure. Confirm the supplied form, grade and what the percentage on its label represents before ordering. This listing does not establish tablet dimensions, available stock, a product-specific dose or suitability for every pool feeder.",
    applications: [
      "Hotel and resort pool-treatment enquiries against an approved operating procedure",
      "Feeder-supply enquiries requiring confirmation of product form and equipment compatibility",
      "Outdoor-pool maintenance enquiries with the operator's required grade and monitoring plan",
      "Repeat supply for an established, approved pool-treatment specification",
    ],
    alsoKnownAs: ["Trichloroisocyanuric acid", "Trichlor", "Chlorine tablets", "Pool chlorine tablets"],
    handling: "Use the supplied label and SDS and the pool operator's approved procedure. Do not mix TCCA with another pool chemical, acid, ammonia or a different chlorine product. Confirm handling, dosing-equipment and storage requirements for the actual supplied form; no preparation instruction or numerical dose is published here.",
    sdsAvailable: false,
  },
  {
    slug: "liquid-chlorine-pool",
    name: "Liquid Chlorine (Pool)",
    useCase: "Pool Water Disinfection (Sodium Hypochlorite)",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Sodium hypochlorite solution for fast-acting pool water disinfection.",
    overview: "Liquid Chlorine for pool enquiries is sodium hypochlorite solution. Hotels, resorts and other pool operators should identify the concentration and grade required by their operating procedure, together with the quantity and delivery location. A change from another chlorine product must be reviewed against the pool equipment and current water conditions. The team provides the relevant product information after enquiry; concentration and treatment dose are not assumed from this listing.",
    applications: [
      "Shock dosing after heavy use or contamination",
      "Rapid correction of low chlorine readings",
      "Clearing algae blooms alongside an algaecide",
      "Indoor pools, where sunlight degradation is not a factor",
    ],
    alsoKnownAs: ["Sodium hypochlorite", "Hypo", "Pool bleach", "Liquid pool chlorine"],
    handling:
      "Corrosive. Never mix with acid — the combination releases chlorine gas. Store upright, sealed, cool and out of sunlight, and use reasonably fresh stock, since strength declines with age and heat. Wear gloves and eye protection when decanting.",
    sdsAvailable: false,
  },
  {
    slug: "copper-sulphate",
    name: "Copper Sulphate",
    useCase: "Algae Prevention & Control",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Copper sulphate for application-specific algae-control enquiries; suitability and operating requirements must be confirmed.",
    overview: "Copper Sulphate is listed for algae-control supply enquiries where the responsible operator has established an appropriate treatment procedure. Tell ESCU the water system, its intended use and the required specification. The listing does not authorise use in any pool, reservoir or drinking-water supply without review. Request the product documents after enquiry and have the relevant technical person assess suitability, monitoring and disposal requirements.",
    applications: [
      "Pool algae-control enquiries requiring an approved grade and operator treatment plan",
      "Reservoir or tank enquiries subject to confirmation of intended water use and application approval",
      "Procurement against an established algae-control specification and monitoring procedure",
      "Product-selection enquiries where the technical team must review suitability and disposal requirements",
    ],
    alsoKnownAs: ["Copper sulfate", "Blue vitriol", "Bluestone", "Cupric sulphate"],
    handling: "Follow the supplied label and SDS and the site-approved procedure. Avoid exposure and uncontrolled discharge; copper compounds can harm aquatic life. Storage, protective equipment and treatment restrictions must be checked for the supplied product. No general-purpose dose is published here.",
    sdsAvailable: false,
  },
  {
    slug: "soda-ash-powder",
    name: "Soda Ash Powder",
    useCase: "pH Increaser",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Sodium carbonate for pool pH-adjustment supply enquiries.",
    overview: "Soda Ash Powder is sodium carbonate, listed for pool pH-adjustment enquiries. It is distinct from sodium bicarbonate and sodium hydroxide, even though all may appear in water-treatment purchasing lists. Send the required specification and details of the maintenance process so the correct product can be quoted. The pool operator must establish the treatment quantity from the actual readings and supplied product instructions.",
    applications: [
      "Raising pool pH into the correct operating range",
      "Correcting acidic water that risks corroding fittings",
      "Rebalancing after heavy acid or chlorine dosing",
      "Routine water chemistry maintenance",
    ],
    alsoKnownAs: ["Sodium carbonate", "Washing soda", "Soda ash light", "pH plus"],
    handling:
      "Follow the supplied label and SDS for protective equipment, dust control, handling and storage. Use the pool operator's approved treatment procedure for the actual water condition and supplied product. This catalogue does not provide application steps, mixing instructions or a numerical dose.",
    sdsAvailable: false,
  },
  {
    slug: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    useCase: "Total Alkalinity Booster",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Sodium bicarbonate for pool alkalinity-management supply enquiries.",
    overview: "Sodium Bicarbonate is listed for pool alkalinity-management requirements. Send the required grade, quantity and the relevant operating specification when enquiring. It is a separate chemical from soda ash, and an industrial or pool-care listing should not be treated as proof of food grade. The product and treatment procedure must be confirmed for the actual pool and the supplied material.",
    applications: [
      "Raising total alkalinity in pools and spas",
      "Stabilising water that swings pH unpredictably",
      "Buffering before adjusting pH with other chemicals",
      "Routine rebalancing after refills or heavy rain",
    ],
    alsoKnownAs: ["Baking soda", "Bicarb", "Sodium hydrogen carbonate", "Alkalinity increaser"],
    handling: "Follow the supplied label and SDS for storage, handling and use. Keep the product clearly identified and protected from unsuitable storage conditions. Use the pool operator's treatment procedure rather than a fixed dose from a general catalogue.",
    sdsAvailable: false,
  },

  // Water Treatment Chemicals
  {
    slug: "bleaching-powder",
    name: "Bleaching Powder",
    useCase: "Water Disinfection",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Bleaching powder for water-disinfection supply enquiries; confirm chemical identification, grade and available chlorine.",
    overview: "Bleaching Powder is a trade-name listing for water-disinfection enquiries. Products sold under familiar chlorine-powder names can have different specifications, so confirm chemical identification and available chlorine from the actual supplied label and documents. ESCU accepts enquiries for water-supply and tank-treatment requirements, with suitability assessed against the responsible operator's process. No drinking-water approval, emergency-treatment instruction or universal dose is implied by this page.",
    applications: [
      "Water-supply enquiries requiring confirmation of an approved product grade and operator treatment plan",
      "Tank, well or reservoir requirements assessed against the intended water use and site procedure",
      "Pipeline-maintenance supply enquiries against the responsible operator's approved specification",
      "Emergency-response procurement only where the responsible authority specifies the product and treatment plan",
    ],
    alsoKnownAs: ["Chlorine powder","Chlorinated lime","Bleaching powder for water treatment"],
    handling: "Follow the supplied label and SDS for the actual product. Do not mix with acids, ammonia, fuels or other chemicals. The operator must confirm storage separation, protective equipment and the approved treatment procedure before use; do not infer preparation instructions from a trade name.",
    sdsAvailable: false,
  },
  {
    slug: "pac-powder",
    name: "PAC Powder",
    useCase: "Water Clarification Coagulant",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Poly Aluminium Chloride coagulant for turbidity removal and water clarification.",
    overview: "Poly Aluminium Chloride, usually abbreviated PAC, is offered for water-clarification and coagulant-supply enquiries. Plants should compare the offered product against their water quality, treatment targets, preparation equipment and trial results. Performance relative to alum depends on those conditions and the products compared; no universal cost, sludge or cold-water advantage is promised here. Send your existing specification or plant requirement so ESCU can identify a suitable product for review.",
    applications: [
      "Turbidity removal in drinking water treatment plants",
      "Clarifying raw river and monsoon-season source water",
      "Industrial process and effluent treatment",
      "Replacing alum where sludge volume or cold performance is a problem",
    ],
    alsoKnownAs: ["Poly Aluminium Chloride","PAC","Polyaluminium chloride"],
    handling:
      "Acidic in solution — wear gloves and eye protection when mixing. Store dry and sealed, as the powder is hygroscopic and will cake. Correct dosing is determined by jar testing against the actual source water, since it varies with turbidity and season.",
    sdsAvailable: false,
  },
  {
    slug: "crystal-alum",
    name: "Crystal Alum",
    useCase: "Water Clarification Agent",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Traditional alum crystal used for clarifying raw water.",
    overview: "Crystal Alum is a catalogue listing for clarification-product enquiries in crystal form. Ask the team to confirm chemical identification and the required grade: the common word alum is not a complete specification. Explain the water-treatment process and preparation equipment, especially when changing from another alum form. The responsible operator should review the offered product and determine treatment conditions against the actual water.",
    applications: [
      "Clarifying raw water in tanks and small systems",
      "Settling suspended solids in stored or supply water",
      "Community and household-scale water treatment",
      "Pre-treatment before filtration or disinfection",
    ],
    alsoKnownAs: ["Alum crystals","Water treatment alum","Phitkari"],
    handling: "Use the supplied label and SDS for storage, handling and preparation. Confirm the product identity and physical form before use. The treatment operator should establish preparation and dosing requirements for the actual product and water, rather than use a fixed general-purpose rate.",
    sdsAvailable: false,
  },
  {
    slug: "non-ferric-alum",
    name: "Non-Ferric Alum",
    useCase: "Water Treatment Coagulant",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Non-ferric alum for coagulant enquiries with a defined low-iron purchasing requirement.",
    overview: "Non-Ferric Alum is offered for treatment and process-water enquiries where a purchasing specification calls for this product. State the required chemical identification, iron limit and physical form rather than relying on the name alone. ESCU can provide the offered product information after enquiry for your team to review. This page does not establish a numerical purity, iron content or blanket drinking-water suitability.",
    applications: [
      "Drinking water treatment where staining must be avoided",
      "Paper and textile process water",
      "Treatment for laundries and dye operations",
      "Any application where ferric residue discolours the product",
    ],
    alsoKnownAs: ["Non ferric aluminium sulphate", "Low iron alum", "NF alum"],
    handling:
      "Store dry and sealed away from moisture. Wear gloves and avoid dust when handling. As with all alum, it consumes alkalinity in use, so check whether the source water needs correction.",
    sdsAvailable: false,
  },
  {
    slug: "alum-powder",
    name: "Alum Powder",
    useCase: "Sedimentation Aid",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Powdered alum used to aid sedimentation in water treatment processes.",
    overview: "Alum Powder is offered for clarification and sedimentation-process supply enquiries. The powder form and its specification should match the plant's receiving, preparation and dosing arrangements. Send the existing purchasing requirement or product label when seeking a replacement. The offered material must be reviewed for the actual process; the word alum alone does not establish chemical equivalence with every crystal or non-ferric listing.",
    applications: [
      "Continuous dosing in water treatment plants",
      "Sedimentation and clarification stages",
      "Industrial effluent and process water treatment",
      "Monsoon-season treatment of high-turbidity source water",
    ],
    alsoKnownAs: ["Aluminium sulphate powder", "Alum sulphate", "Powdered alum"],
    handling:
      "Keep dry and sealed — the powder is hygroscopic and cakes readily. Avoid raising dust; wear gloves and eye protection. Determine dosing by jar test rather than a fixed rate, as requirements change with turbidity.",
    sdsAvailable: false,
  },
  {
    slug: "industrial-salt",
    name: "Industrial Salt",
    useCase: "Water Softener Regeneration",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Bulk industrial-grade salt for regenerating water softener resin beds.",
    overview: "Industrial Salt is offered for water-softener and other industrial-process enquiries. Specify the sodium-chloride grade and physical form required by your equipment, including any limits on insoluble matter or other procurement criteria. The team can confirm the offered material after enquiry. This listing does not establish food grade, compatibility with every resin system or the amount needed for an individual regeneration cycle.",
    applications: [
      "Regenerating water softener resin beds",
      "Boiler feed water softening systems",
      "Hotel and laundry softening plant",
      "Brine preparation for industrial processes",
    ],
    alsoKnownAs: ["Sodium chloride", "Softener salt", "Water softening salt", "Bulk salt"],
    handling: "Follow the supplied label, SDS and equipment instructions. Keep storage and receiving arrangements appropriate for the supplied packaging, and use suitable manual-handling methods. Confirm requirements for the brine system rather than assuming all industrial salt is interchangeable.",
    sdsAvailable: false,
  },
  {
    slug: "caustic-soda-flakes",
    name: "Caustic Soda Flakes",
    useCase: "pH Adjustment Chemical",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Sodium hydroxide flakes used for pH adjustment in industrial processes.",
    overview: "Caustic Soda Flakes is sodium hydroxide in flake form, offered for approved pH-control, neutralisation and industrial-cleaning requirements. Send the required grade and process specification, especially if you are replacing another product or using a particular preparation system. ESCU provides product documents after enquiry so the responsible team can review the offered material. This listing is not a mixing instruction or an approval for any particular cleaning application.",
    applications: [
      "Raising pH in water and effluent treatment",
      "Neutralising acidic effluent before discharge",
      "Clean-in-place cycles in food and beverage plants",
      "Preparing caustic solutions for industrial cleaning",
    ],
    alsoKnownAs: ["Sodium hydroxide flakes", "Caustic soda", "Lye", "NaOH flakes"],
    handling: "Caustic soda is corrosive. Use the supplied label and SDS, trained personnel and the site-approved preparation procedure. Confirm protective equipment, compatible containers and storage separation. Do not mix with other chemicals or improvise a preparation method from this catalogue.",
    sdsAvailable: false,
  },
  {
    slug: "sodium-hydroxide",
    name: "Sodium Hydroxide",
    useCase: "Alkalinity & pH Control",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Strong alkali used for alkalinity and pH control in treatment systems.",
    overview: "Sodium Hydroxide is offered for process enquiries involving pH control or neutralisation. Specify the form, concentration and grade required rather than ordering by chemical name alone. For flake requirements, the catalogue has a separate Caustic Soda Flakes listing. Review the supplied product against the site's equipment and operating procedure before changing material, as a similar chemical name does not establish an equivalent supply format.",
    applications: [
      "Continuous pH correction in treatment plants",
      "Restoring alkalinity consumed by coagulant dosing",
      "Effluent neutralisation before discharge",
      "Industrial process pH control",
    ],
    alsoKnownAs: ["Caustic soda", "NaOH", "Lye", "Sodium hydrate"],
    handling: "Sodium hydroxide is corrosive. Follow the supplied label and SDS and the approved site procedure for the actual form and concentration. Use trained personnel and suitable protective equipment; keep incompatible materials separated and do not improvise mixing instructions.",
    sdsAvailable: false,
  },
  {
    slug: "hcl-acid",
    name: "HCL Acid",
    useCase: "Descaling & pH Reduction",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Hydrochloric acid for descaling equipment and lowering water pH.",
    overview: "HCL Acid is hydrochloric acid, offered for descaling and pH-reduction supply enquiries. State the required concentration, grade and process. Equipment materials, seals and the deposit being treated affect whether an acid-cleaning procedure is suitable, so the maintenance team must review the proposed product before use. ESCU can provide the related product documents after enquiry; this page does not establish universal equipment compatibility.",
    applications: [
      "Descaling boilers, heat exchangers and pipework",
      "Lowering pH in water treatment and pool systems",
      "Regenerating cation exchange resin in DM plant",
      "Industrial cleaning of mineral and scale deposits",
    ],
    alsoKnownAs: ["Hydrochloric acid", "Muriatic acid", "HCl", "Spirit of salt"],
    handling: "Hydrochloric acid is corrosive. Follow the supplied label and SDS and use trained personnel, appropriate protective equipment and ventilation. Never mix it with bleach or other chlorine products. Confirm the site's preparation and storage procedure for the actual concentration.",
    sdsAvailable: false,
  },
  {
    slug: "liquid-chlorine-water",
    name: "Liquid Chlorine (Water Treatment)",
    useCase: "Water & Tank Disinfection (Sodium Hypochlorite)",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Sodium hypochlorite solution for disinfecting water supplies and storage tanks.",
    overview: "Liquid Chlorine for water-treatment enquiries is sodium hypochlorite solution. Water-supply and tank-treatment buyers should state the required grade, concentration and operating specification, including equipment requirements where relevant. The offered product must be reviewed by the responsible operator for the actual water use and monitoring procedure. ESCU provides related documents after enquiry; no universal water-treatment approval or volume-only dosing rule is published here.",
    applications: [
      "Continuous disinfection of piped water supplies",
      "Storage tank and reservoir sanitisation",
      "Disinfecting mains and pipework after repair",
      "Maintaining chlorine residual across a distribution network",
    ],
    alsoKnownAs: ["Sodium hypochlorite", "Hypo solution", "Liquid bleach", "NaOCl"],
    handling:
      "Corrosive. Never mix with acid or ammonia — releases toxic gas. Strength declines with time, heat and light, so store cool, sealed and out of sunlight and rotate stock rather than holding it indefinitely. Wear gloves and eye protection when decanting or priming dosing pumps.",
    sdsAvailable: false,
  },
  {
    slug: "antiscalant",
    name: "Antiscalant",
    useCase: "RO Membrane Protection",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "RO antiscalant for membrane-system enquiries; select against the water analysis and equipment requirements.",
    overview: "Antiscalant is listed for RO membrane-system supply enquiries. The appropriate formulation depends on the feed-water analysis, operating conditions and membrane requirements, so send this information when requesting a new product or reviewing a substitute. ESCU can identify the offered formulation and provide related documents after enquiry. This listing does not guarantee a particular membrane-life improvement, performance outcome or universal treatment dose.",
    applications: [
      "Protecting RO membranes in water purification plants",
      "Extending membrane life and cleaning intervals",
      "Bottling, beverage and pharmaceutical water systems",
      "Hotel and hospital RO installations",
    ],
    alsoKnownAs: ["Scale inhibitor", "RO antiscalant", "Membrane antiscalant", "Scale dispersant"],
    handling:
      "Store sealed and protect from freezing. The correct product and dose depend on the specific feed water analysis and system recovery rate — send us your water report and we will advise rather than guess.",
    sdsAvailable: false,
  },
  {
    slug: "polyelectrolyte",
    name: "Polyelectrolyte",
    useCase: "Flocculation Agent",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Flocculation aid that improves settling of suspended solids in water treatment.",
    overview: "Polyelectrolyte is offered for clarification, solids-separation and sludge-dewatering supply enquiries. Polymer selection should match the process, preparation equipment and trial results; the general product family name is not enough to establish the correct grade. Include an existing specification or product reference for repeat requirements. ESCU can confirm the offered material and related documents after enquiry, while the operator establishes application and preparation requirements.",
    applications: [
      "Improving floc formation and settling in clarifiers",
      "Sludge dewatering on belt presses and centrifuges",
      "Effluent treatment plant solids separation",
      "Boosting clarifier performance during high-turbidity periods",
    ],
    alsoKnownAs: ["Polymer flocculant", "Flocculant", "Polyacrylamide", "Poly electrolyte"],
    handling:
      "Prepare and age solutions properly — polymer needs time to hydrate before it works, and under-mixed solution performs poorly. Spilled polymer becomes extremely slippery when wet; clean up dry where possible. Tell us the application and we will confirm whether you need an anionic, cationic or non-ionic grade.",
    sdsAvailable: false,
  },
];

export const categories: Category[] = [
  "Water Treatment Chemicals",
  "Swimming Pool Chemicals",
  "Housekeeping & Cleaning Chemicals",
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

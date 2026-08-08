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

  // Longer-form page copy. Search Console had 23 of 33 URLs sitting at
  // "Discovered - currently not indexed" because every product page carried
  // only ~35 unique words against a shared template — Google sampled a few,
  // read them as near-duplicates, and stopped crawling the rest.
  //
  // Deliberately free of purity, concentration, dosage and packaging figures:
  // those aren't digitised anywhere, and inventing them for pool or drinking
  // water chemicals would be dangerous, not just wrong. Everything here is
  // either general chemistry that holds regardless of grade, or a fact about
  // how ESCU sells. Add real figures when the spec sheets are digitised.
  overview: string;
  applications: string[];
  // Chemical and trade synonyms buyers actually search for. Accurate names
  // only — these feed both the on-page copy and the metadata keywords.
  alsoKnownAs: string[];
  // Generic, grade-independent handling guidance. Safety facts only.
  handling: string;

  sdsAvailable: boolean;
  // Only set this alongside sdsAvailable: true. The product page checks
  // both before rendering a real download link — sdsAvailable with no
  // sdsUrl falls back to "on request" instead of claiming a file exists
  // that nothing actually links to.
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
    useCase: "Hand & Surface Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description:
      "Gentle, effective liquid soap formulated for frequent hand and surface washing in high-traffic commercial settings.",
    overview:
      "A general-purpose liquid soap supplied in bulk to hotels, restaurants and commercial buildings across Nepal. It is intended for the kind of repeated, all-day washing that hospitality operations generate, where a harsh formulation would leave staff with dry or irritated skin. Because it is supplied in bulk rather than retail packaging, it works out considerably cheaper per wash than refilling from consumer bottles.",
    applications: [
      "Refilling washroom and guest-room soap dispensers",
      "Back-of-house and kitchen handwashing stations",
      "General surface and equipment washing",
      "Housekeeping trolleys and cleaning stations",
    ],
    alsoKnownAs: ["Hand soap liquid", "Bulk liquid soap", "Commercial liquid soap"],
    handling:
      "Store in a cool, dry place with containers closed and out of direct sunlight. No special protective equipment is needed for normal use beyond avoiding prolonged eye contact.",
    sdsAvailable: false,
  },
  {
    slug: "hand-wash",
    name: "Hand Wash",
    useCase: "Personal Hygiene Solution",
    category: "Housekeeping & Cleaning Chemicals",
    industries: [...hospitality, "Hospitals"],
    description: "Hygienic hand wash solution suited for hotels, hospitals, and commercial washrooms.",
    overview:
      "A hand wash intended for guest-facing and clinical washrooms, where hygiene expectations are higher and usage volumes are heavy. Hospitals and hotels typically order it on a standing schedule rather than ad hoc, and we supply it in bulk containers sized for dispenser refilling rather than individual sale.",
    applications: [
      "Guest and public washroom dispensers",
      "Hospital and clinic handwashing points",
      "Staff and back-of-house washrooms",
      "Reception and lobby sanitising stations",
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
    description: "Removes hard water scale and stains from bathroom fixtures and tiles.",
    overview:
      "Formulated for the specific problem most Nepali properties face in bathrooms: hard water leaving mineral scale and staining on fixtures, tiles and glass. Ordinary all-purpose cleaners struggle with mineral deposits because they are not acidic enough to dissolve them. This is the product housekeeping teams reach for on sanitaryware, shower screens and tiled surfaces.",
    applications: [
      "Toilets, urinals and sanitaryware",
      "Shower screens, tiles and grout",
      "Taps, fittings and chrome fixtures",
      "Removing hard water and limescale marks",
    ],
    alsoKnownAs: ["Toilet cleaner", "Washroom cleaner", "Descaling bathroom cleaner"],
    handling:
      "Acidic cleaner — wear gloves and ensure ventilation. Never mix with bleach or any chlorine product: the combination releases toxic chlorine gas. Test on a small area first, as acids can etch natural marble and some stone.",
    sdsAvailable: false,
  },
  {
    slug: "herbal-lemon-phenyl",
    name: "Herbal Lemon Phenyl",
    useCase: "Floor Disinfectant",
    category: "Housekeeping & Cleaning Chemicals",
    industries: [...hospitality, "Hospitals"],
    description: "Disinfects and freshens floors with a long-lasting lemon fragrance.",
    overview:
      "Phenyl is the standard floor disinfectant across South Asian hospitality and healthcare, used for routine mopping of corridors, lobbies and wards. This lemon variant leaves a fresher, less clinical smell than white phenyl, which matters in guest-facing areas where the scent of a corridor is part of the impression. Supplied in bulk to properties that mop large floor areas daily.",
    applications: [
      "Daily corridor, lobby and staircase mopping",
      "Hospital ward and clinic floors",
      "Guest room and bathroom floors",
      "Back-of-house and service areas",
    ],
    alsoKnownAs: ["Lemon phenyl", "Floor phenyl", "Phenyle disinfectant", "Herbal phenyl"],
    handling:
      "Dilute with water before use — undiluted phenyl is wasteful and can leave residue. Store away from direct sunlight and keep out of reach of children.",
    sdsAvailable: false,
  },
  {
    slug: "glass-cleaner",
    name: "Glass Cleaner",
    useCase: "Streak-Free Shine",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Fast-drying, streak-free formula for glass and mirrored surfaces.",
    overview:
      "A fast-evaporating cleaner for glass and mirrors, where the difficulty is not removing dirt but avoiding the streaks and drying marks left behind. Commercial buildings with large glazed frontages and hotels with floor-to-ceiling windows go through this in volume, which is why it is worth buying by the drum rather than the bottle.",
    applications: [
      "Windows, glazed frontages and partitions",
      "Bathroom and guest room mirrors",
      "Display cabinets and glass tabletops",
      "Lift and lobby glass panels",
    ],
    alsoKnownAs: ["Window cleaner", "Mirror cleaner", "Glass cleaning liquid"],
    handling:
      "Store in a cool place away from direct sunlight and open flame. Apply to the cloth rather than the surface when cleaning near electrical fittings or screens.",
    sdsAvailable: false,
  },
  {
    slug: "floor-cleaner",
    name: "Floor Cleaner",
    useCase: "Multi-Surface Cleaning",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Multi-surface floor cleaner suitable for tile, marble, and vinyl flooring.",
    overview:
      "A neutral daily floor cleaner for properties running a mix of flooring types, where using a single product across tile, marble and vinyl is simpler than stocking three. Neutral pH matters here: acidic cleaners will dull and etch polished marble over time, which is an expensive mistake in a hotel lobby.",
    applications: [
      "Daily mopping of tiled and vitrified floors",
      "Polished marble and natural stone",
      "Vinyl and laminate flooring",
      "Scrubber-drier machines in large areas",
    ],
    alsoKnownAs: ["Tile cleaner", "Marble floor cleaner", "Multi surface floor cleaner"],
    handling:
      "Dilute per the intended surface and mop area. Store closed, in a cool dry place. Safe for routine use on sealed stone.",
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
    overview:
      "The general workhorse of a housekeeping trolley: one dilutable cleaner that handles most routine surfaces so teams are not juggling a separate product for every task. Properties typically pair it with a dedicated bathroom cleaner and glass cleaner, and use this for everything in between.",
    applications: [
      "Worktops, desks and general surfaces",
      "Doors, handles and painted woodwork",
      "Furniture and fittings in guest areas",
      "General-purpose spot cleaning",
    ],
    alsoKnownAs: ["All purpose cleaner", "General purpose cleaner", "Multipurpose cleaning liquid"],
    handling:
      "Dilute according to how heavily soiled the surface is. Store closed and away from direct sunlight.",
    sdsAvailable: false,
  },
  {
    slug: "ceramic-cleaner",
    name: "Ceramic Cleaner",
    useCase: "Tile & Ceramic Care",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description: "Specialized formula for cleaning and maintaining tile and ceramic surfaces.",
    overview:
      "Aimed at ceramic and tiled surfaces specifically, including the grout lines between them, which is usually where discolouration first shows. In properties with hard water, ceramic surfaces accumulate a dulling mineral film that ordinary detergents leave behind; this is intended to cut through that and restore the original finish.",
    applications: [
      "Ceramic and vitrified wall and floor tiles",
      "Grout lines and tile joints",
      "Ceramic sanitaryware and basins",
      "Restoring dulled or filmed tiled surfaces",
    ],
    alsoKnownAs: ["Tile cleaner", "Ceramic tile cleaning liquid", "Grout cleaner"],
    handling:
      "Wear gloves and ventilate the area. Do not mix with chlorine-based products. Test first on natural stone, which tolerates acidic cleaners poorly.",
    sdsAvailable: false,
  },
  {
    slug: "wax-fuel",
    name: "Wax Fuel",
    useCase: "Buffet Food Warmer Fuel",
    category: "Housekeeping & Cleaning Chemicals",
    industries: hospitality,
    description:
      "Clean-burning wax fuel for buffet food warmers and catering setups, popular in hotel and restaurant operations.",
    overview:
      "The fuel canisters that sit under chafing dishes at buffets and catered events. Wax fuel burns steadily with very little smoke or odour, which matters when it is burning a few feet from food and guests. Hotels and caterers in Kathmandu buy it by the case for banquet and breakfast service, and demand is heavily seasonal around the wedding and conference calendar.",
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
    description: "High-strength chlorine sanitizer (90% TCCA) for swimming pool disinfection.",
    overview:
      "TCCA is the standard sanitiser for most commercial pools, supplied as slow-dissolving tablets or granules. Its key property is that it is stabilised — it carries its own cyanuric acid, which shields the chlorine from being burned off by sunlight. That matters a great deal for outdoor pools, where unstabilised chlorine can be largely destroyed within hours of strong sun. Hotels and resorts generally run TCCA in a floating dispenser or feeder for continuous sanitising, topping up with a faster-acting product when a pool needs shocking.",
    applications: [
      "Routine daily sanitising of hotel and resort pools",
      "Continuous dosing via floaters and erosion feeders",
      "Outdoor pools where sunlight degrades unstabilised chlorine",
      "Maintaining residual chlorine between service visits",
    ],
    alsoKnownAs: ["Trichloroisocyanuric acid", "Trichlor", "Chlorine tablets", "Pool chlorine tablets"],
    handling:
      "Strong oxidiser. Never mix TCCA with any other pool chemical, and never with acid or ammonia — the reaction releases toxic chlorine gas and can ignite. Add product to water, never water to product. Store dry, sealed, and well away from acids. Cyanuric acid accumulates in the pool over time and eventually requires partial draining and refilling.",
    sdsAvailable: false,
  },
  {
    slug: "liquid-chlorine-pool",
    name: "Liquid Chlorine (Pool)",
    useCase: "Pool Water Disinfection (Sodium Hypochlorite)",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Sodium hypochlorite solution for fast-acting pool water disinfection.",
    overview:
      "Sodium hypochlorite in solution — the fast-acting counterpart to TCCA tablets. It disperses immediately and does not add cyanuric acid to the pool, which makes it the usual choice for shocking a pool after heavy bathing loads, algae outbreaks or a storm. The trade-off is that it is unstabilised, so direct sunlight depletes it quickly, and it loses strength in storage rather than keeping indefinitely.",
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
    description: "Controls and prevents algae growth in pool and reservoir water.",
    overview:
      "Distinctive blue crystals used as an algaecide in pools and open water storage. Copper is effective against the types of algae that chlorine alone struggles to clear, particularly in warm weather when growth outpaces routine sanitising. It is also used in reservoirs and tanks where algae would otherwise establish on the walls.",
    applications: [
      "Treating and preventing algae in swimming pools",
      "Algae control in reservoirs and open storage tanks",
      "Seasonal treatment during warm, high-growth months",
      "Supplementing chlorine where algae keeps recurring",
    ],
    alsoKnownAs: ["Copper sulfate", "Blue vitriol", "Bluestone", "Cupric sulphate"],
    handling:
      "Harmful if swallowed and toxic to fish and aquatic life — never allow treated water to drain into rivers, ponds or irrigation. Wear gloves and avoid dust inhalation. Overdosing can stain plaster and fittings, and can tint blonde hair green.",
    sdsAvailable: false,
  },
  {
    slug: "soda-ash-powder",
    name: "Soda Ash Powder",
    useCase: "pH Increaser",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Raises pH levels to maintain balanced, comfortable pool water.",
    overview:
      "Sodium carbonate, used to bring pool pH back up when it drifts low. This matters for more than comfort: below the correct range, water turns aggressive and begins corroding metal fittings, heaters and pool surfaces, and chlorine behaves unpredictably. Soda ash raises pH significantly with relatively little product, which is why pool operators keep it alongside sodium bicarbonate and reach for one or the other depending on whether it is pH or alkalinity that has dropped.",
    applications: [
      "Raising pool pH into the correct operating range",
      "Correcting acidic water that risks corroding fittings",
      "Rebalancing after heavy acid or chlorine dosing",
      "Routine water chemistry maintenance",
    ],
    alsoKnownAs: ["Sodium carbonate", "Washing soda", "Soda ash light", "pH plus"],
    handling:
      "Alkaline — wear gloves and eye protection and avoid raising dust. Add gradually with the pump running and retest before dosing again, as it is easy to overshoot. Store dry, since it cakes badly if it takes on moisture.",
    sdsAvailable: false,
  },
  {
    slug: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    useCase: "Total Alkalinity Booster",
    category: "Swimming Pool Chemicals",
    industries: pool,
    description: "Boosts total alkalinity to stabilize pool water chemistry.",
    overview:
      "Used to raise total alkalinity, which acts as a buffer holding pH steady. When alkalinity is too low, pH swings sharply on small chemical additions and becomes almost impossible to keep in range — the frustrating situation where a pool is dosed daily and still tests wrong. Sodium bicarbonate raises alkalinity while barely moving pH, which is precisely why it is stocked separately from soda ash rather than treated as interchangeable with it.",
    applications: [
      "Raising total alkalinity in pools and spas",
      "Stabilising water that swings pH unpredictably",
      "Buffering before adjusting pH with other chemicals",
      "Routine rebalancing after refills or heavy rain",
    ],
    alsoKnownAs: ["Baking soda", "Bicarb", "Sodium hydrogen carbonate", "Alkalinity increaser"],
    handling:
      "Mild and easy to handle compared with most pool chemicals. Store dry and sealed. Add with the circulation running and allow it to disperse fully before retesting.",
    sdsAvailable: false,
  },

  // Water Treatment Chemicals
  {
    slug: "bleaching-powder",
    name: "Bleaching Powder",
    useCase: "Water Disinfection",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Calcium hypochlorite powder used for large-scale water disinfection.",
    overview:
      "Calcium hypochlorite in powder form, one of the most widely used disinfectants for water supplies, tanks and wells in Nepal. It is favoured for bulk work because it stores far better than liquid chlorine and is straightforward to transport to sites without reliable cold storage. Municipal supplies, apartment blocks and construction projects all use it for routine disinfection and for shock-treating a tank or line after contamination.",
    applications: [
      "Disinfecting municipal and community water supplies",
      "Shock treatment of storage tanks, wells and reservoirs",
      "Sanitising pipelines after repair or construction",
      "Emergency disinfection following flooding or contamination",
    ],
    alsoKnownAs: ["Calcium hypochlorite", "Chlorinated lime", "Chlorine powder", "Hypochlorite powder"],
    handling:
      "Strong oxidiser. Never mix with acids, ammonia or other chlorine products — this releases toxic gas. Keep completely dry and sealed: contact with moisture or organic material can cause it to heat and ignite. Store separately from fuels, acids and reducing agents, and always add product to water rather than water to product.",
    sdsAvailable: false,
  },
  {
    slug: "pac-powder",
    name: "PAC Powder",
    useCase: "Water Clarification Coagulant",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Poly Aluminium Chloride coagulant for turbidity removal and water clarification.",
    overview:
      "Poly Aluminium Chloride is the modern replacement for traditional alum in most treatment plants. It works across a wider pH range, so it needs less alkalinity correction alongside it, and it produces noticeably less sludge for the same clarification result — which reduces disposal cost and handling. It also performs better in cold water, a genuine advantage during Nepali winters and for plants treating snowmelt-fed sources, where alum can become sluggish.",
    applications: [
      "Turbidity removal in drinking water treatment plants",
      "Clarifying raw river and monsoon-season source water",
      "Industrial process and effluent treatment",
      "Replacing alum where sludge volume or cold performance is a problem",
    ],
    alsoKnownAs: ["Poly Aluminium Chloride", "PAC", "Polyaluminium chloride", "PAC 30%"],
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
    overview:
      "Alum in traditional crystal form, still the most widely recognised water clarifier in Nepal and still in steady demand for tank and small-system treatment. Suspended particles that would otherwise stay in the water indefinitely clump together and settle out. It remains popular because it is inexpensive, familiar to operators, and does not require the dosing equipment a plant-scale coagulant would.",
    applications: [
      "Clarifying raw water in tanks and small systems",
      "Settling suspended solids in stored or supply water",
      "Community and household-scale water treatment",
      "Pre-treatment before filtration or disinfection",
    ],
    alsoKnownAs: ["Alum", "Aluminium sulphate", "Phitkari", "Potash alum"],
    handling:
      "Store dry and sealed, as crystals absorb moisture and clump. Dissolve fully before dosing and allow adequate settling time. Alum consumes alkalinity as it works, so very soft water may need alkalinity correction alongside it.",
    sdsAvailable: false,
  },
  {
    slug: "non-ferric-alum",
    name: "Non-Ferric Alum",
    useCase: "Water Treatment Coagulant",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Low-iron coagulant suited for treating water where ferric residue must be minimized.",
    overview:
      "A low-iron grade of aluminium sulphate, used where the iron content of ordinary alum would cause problems. Iron traces can leave yellow-brown staining on fixtures and fabrics and can discolour the product in paper and textile processing, so applications sensitive to that specify the non-ferric grade. It performs the same coagulation job as standard alum, with the iron contamination controlled.",
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
    overview:
      "The same coagulant chemistry as crystal alum, milled to a powder so it dissolves faster and doses more evenly. That makes it the practical choice wherever alum is fed continuously into a treatment train rather than added by hand — powder goes into solution quickly and can be metered accurately, where crystals need time to dissolve first.",
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
    overview:
      "Bulk sodium chloride for regenerating the resin in water softeners. Softener resin strips hardness minerals from water until it saturates and stops working; flushing it with brine recharges it. Any property running a softener consumes salt continuously, which is why hotels, laundries and boiler operations buy it by the sack rather than retail. Using clean industrial-grade salt rather than table or rock salt matters, because insoluble impurities foul the resin bed and shorten its life.",
    applications: [
      "Regenerating water softener resin beds",
      "Boiler feed water softening systems",
      "Hotel and laundry softening plant",
      "Brine preparation for industrial processes",
    ],
    alsoKnownAs: ["Sodium chloride", "Softener salt", "Water softening salt", "Bulk salt"],
    handling:
      "Store dry and off the floor — salt draws moisture and hardens into a solid mass, which then bridges in the brine tank and stops the softener regenerating. Handling requires no special precautions beyond the weight of the sacks.",
    sdsAvailable: false,
  },
  {
    slug: "caustic-soda-flakes",
    name: "Caustic Soda Flakes",
    useCase: "pH Adjustment Chemical",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Sodium hydroxide flakes used for pH adjustment in industrial processes.",
    overview:
      "Sodium hydroxide supplied in flake form, the practical format for sites that make up their own solutions on demand. Flakes store and transport far more easily than bulk liquid caustic and let an operator mix only what is needed. It is used to raise pH in treatment systems, neutralise acidic effluent before discharge, and as the alkaline stage in clean-in-place cycles.",
    applications: [
      "Raising pH in water and effluent treatment",
      "Neutralising acidic effluent before discharge",
      "Clean-in-place cycles in food and beverage plants",
      "Preparing caustic solutions for industrial cleaning",
    ],
    alsoKnownAs: ["Sodium hydroxide flakes", "Caustic soda", "Lye", "NaOH flakes"],
    handling:
      "Severely corrosive — causes serious burns to skin and permanent eye damage. Always wear gloves, goggles and protective clothing. Add flakes slowly to water, never water to flakes: dissolving generates considerable heat and can boil and spit violently. Store sealed and dry, well away from acids.",
    sdsAvailable: false,
  },
  {
    slug: "sodium-hydroxide",
    name: "Sodium Hydroxide",
    useCase: "Alkalinity & pH Control",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Strong alkali used for alkalinity and pH control in treatment systems.",
    overview:
      "The same chemistry as our caustic soda flakes, listed separately because plants that dose it continuously order it as a process chemical rather than a cleaning one. It is the standard reagent for holding treated water within its target pH band and for adding alkalinity where a coagulant has consumed it — alum and PAC both drive pH down as they work, and something has to bring it back.",
    applications: [
      "Continuous pH correction in treatment plants",
      "Restoring alkalinity consumed by coagulant dosing",
      "Effluent neutralisation before discharge",
      "Industrial process pH control",
    ],
    alsoKnownAs: ["Caustic soda", "NaOH", "Lye", "Sodium hydrate"],
    handling:
      "Severely corrosive to skin and eyes. Full protective equipment required. Always add to water rather than the reverse, as the dissolution reaction is strongly exothermic. Store separately from acids — accidental mixing reacts violently.",
    sdsAvailable: false,
  },
  {
    slug: "hcl-acid",
    name: "HCL Acid",
    useCase: "Descaling & pH Reduction",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Hydrochloric acid for descaling equipment and lowering water pH.",
    overview:
      "Hydrochloric acid, used across treatment and industrial maintenance wherever pH needs lowering or scale needs removing. Hard water leaves mineral scale inside heat exchangers, boilers and pipework, which quietly destroys thermal efficiency long before anything visibly fails; periodic acid descaling restores it. It is also the standard regenerant for cation exchange resin in demineralisation plant.",
    applications: [
      "Descaling boilers, heat exchangers and pipework",
      "Lowering pH in water treatment and pool systems",
      "Regenerating cation exchange resin in DM plant",
      "Industrial cleaning of mineral and scale deposits",
    ],
    alsoKnownAs: ["Hydrochloric acid", "Muriatic acid", "HCl", "Spirit of salt"],
    handling:
      "Severely corrosive and gives off irritating fumes — use only with ventilation and full protective equipment. Never mix with bleach, hypochlorite or any chlorine product: this releases toxic chlorine gas and has killed people in poorly ventilated plant rooms. Always add acid to water, never water to acid. Store sealed, away from alkalis and metals.",
    sdsAvailable: false,
  },
  {
    slug: "liquid-chlorine-water",
    name: "Liquid Chlorine (Water Treatment)",
    useCase: "Water & Tank Disinfection (Sodium Hypochlorite)",
    category: "Water Treatment Chemicals",
    industries: waterTreatment,
    description: "Sodium hypochlorite solution for disinfecting water supplies and storage tanks.",
    overview:
      "Sodium hypochlorite supplied for water supply work rather than pool duty. In liquid form it can be metered continuously by a dosing pump, which is what municipal supplies and larger buildings need for maintaining a consistent chlorine residual through a distribution network — something powder dosed by hand cannot do reliably. It is also the usual choice for disinfecting tanks and lines after cleaning or repair.",
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
    description: "Prevents scale formation to protect RO membranes and extend system life.",
    overview:
      "Dosed ahead of reverse osmosis membranes to stop dissolved minerals crystallising on the membrane surface. RO concentrates whatever it rejects, so salts that were comfortably in solution at the inlet become supersaturated at the membrane face and begin to scale. Antiscalant keeps them in solution instead. It is a small cost that protects a very large one: membrane replacement is the single most expensive item in running an RO plant, and scaling is the fastest way to destroy a set.",
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
    overview:
      "A polymer flocculant used after a coagulant to bind small particles into larger, faster-settling flocs. Coagulant alone often leaves fine material that settles too slowly for the clarifier to keep up with; polyelectrolyte gives it the weight and structure to drop out properly. It is equally important in sludge dewatering, where it determines how much water comes out on the belt press or centrifuge. Grades are anionic, cationic or non-ionic, and the right one depends entirely on the specific application.",
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

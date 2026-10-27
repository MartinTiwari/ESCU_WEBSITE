export interface ProductEditorial {
  buyingChecklist: string[];
  usageNote: string;
  packagingNote: string;
  deliveryNote: string;
  relatedSlugs: string[];
  questions: { question: string; answer: string }[];
}

type EditorialInput = Omit<ProductEditorial, "deliveryNote">;

// Buying guidance, not a substitute for the supplied label or SDS. No pack size,
// concentration or numerical dose is inferred from a catalogue product name.
const content: Record<string, EditorialInput> = {
  "liquid-soap": {
    buyingChecklist: ["Specify utensils, clothes or general cleaning as the intended task.", "Identify the fabric or surface and the cleaning method used by your team.", "Send the quantity and whether this is a first order or a repeat of an existing product."],
    usageNote: "Founder Liquid Soap is a cleaning product for utensils, clothes and suitable general cleaning tasks. Confirm dilution, rinsing and material compatibility for the supplied formulation. Do not substitute it for Handwash Shampoo at a handwashing station, or assume that a laundry method is also appropriate for food-contact utensils.",
    packagingNote: "Ask for the current container options and the quantity in each container. When ordering refills, describe your existing storage and dispensing arrangement so the team can confirm a practical supply format.",
    relatedSlugs: ["hand-wash", "cleaning-powder", "multi-cleaner-liquid", "floor-cleaner"],
    questions: [
      { question: "Is Founder Liquid Soap the same as handwash?", answer: "No. This listing is for utensils, clothes and general cleaning. Handwash Shampoo is listed separately for cleaning hands. Tell ESCU the task before ordering so the quotation identifies the correct product rather than relying on the word soap alone." },
      { question: "Can I use one dilution for laundry and utensils?", answer: "Do not assume the same method suits both tasks. Ask for the supplied product's instructions, including dilution, rinsing and fabric or utensil compatibility. Share whether cleaning is by hand or equipment when you send the enquiry." },
    ],
  },
  "hand-wash": {
    buyingChecklist: ["State that the requirement is for handwashing, not hair washing or utensil cleaning.", "Describe the dispenser or handwashing station to be refilled.", "Include the number of locations, expected consumption and ordering frequency."],
    usageNote: "Handwash Shampoo is for cleaning hands. Follow the product label and your workplace handwashing procedure. The name does not mean it is intended for hair, and this page makes no medical, antibacterial or sanitising claim. Healthcare buyers should check the product against their facility's own procurement requirements.",
    packagingNote: "Request available refill containers and confirm compatibility with your dispensers. Include any fragrance or formulation requirement in the enquiry rather than assuming the current product matches a previous supplier's refill.",
    relatedSlugs: ["liquid-soap", "bathroom-cleaner", "floor-cleaner", "glass-cleaner"],
    questions: [
      { question: "Is Handwash Shampoo a hair shampoo?", answer: "No. ESCU uses the name Handwash Shampoo for its hand-cleaning product. For a quotation, specify handwashing and your dispenser arrangement. It is distinct from Founder Liquid Soap, which is offered for utensils, clothes and general cleaning." },
      { question: "Can I order it for a hospital or clinic?", answer: "You can enquire for handwashing stations, but the purchasing team must confirm suitability against the facility's requirements. Request the relevant product information after enquiry; no clinical approval, antimicrobial performance or certification is claimed on this listing." },
    ],
  },
  "bathroom-cleaner": {
    buyingChecklist: ["Identify the fixture or tile material and the type of scale or staining.", "Mention natural stone, plated fittings or other delicate finishes in the area.", "Describe the routine cleaning procedure and other chemicals already used."],
    usageNote: "Choose bathroom cleaner by the surface and the deposit, not just by the room name. Confirm whether the supplied formulation suits each fixture, its dilution and any contact or rinsing instructions. Keep it separate from chlorine products and never combine cleaning chemicals. Protect adjacent finishes according to the label.",
    packagingNote: "Ask for current container sizes and a suitable dispensing arrangement for housekeeping staff. The quotation should identify the specific cleaner, quantity and any supporting product information needed for your cleaning procedure.",
    relatedSlugs: ["ceramic-cleaner", "glass-cleaner", "hand-wash", "multi-cleaner-liquid"],
    questions: [
      { question: "Does bathroom cleaner suit every bathroom surface?", answer: "No single compatibility claim should be assumed. Share whether you are cleaning ceramic, glass, stone, grout or plated metal, plus the deposit you want to remove. Ask ESCU to confirm the supplied formulation and any restrictions before ordering." },
      { question: "Can bathroom cleaner be combined with bleach?", answer: "No. Do not mix bathroom cleaner with bleach, chlorine products or other cleaners. Use the supplied label and SDS to plan safe storage and handling, and tell the team which products are already used in the same washroom." },
    ],
  },
  "herbal-lemon-phenyl": {
    buyingChecklist: ["Specify the floor material and whether the space is guest-facing or back-of-house.", "Explain whether you need routine cleaning, fragrance or a documented disinfection process.", "Include the area cleaned, current consumption and preferred ordering frequency."],
    usageNote: "Herbal Lemon Phenyl is offered for routine floor-cleaning enquiries. Confirm the dilution, suitable surfaces and rinsing instructions for the supplied product. The product name or fragrance is not proof of antimicrobial performance; if your procedure requires disinfection, state the required evidence when enquiring rather than assuming a medical-use claim.",
    packagingNote: "Request the available container options for your mopping and refill routine. Ask the quotation to identify the lemon variant so it is not confused with another phenyl formulation or fragrance.",
    relatedSlugs: ["floor-cleaner", "multi-cleaner-liquid", "bathroom-cleaner", "hand-wash"],
    questions: [
      { question: "Is lemon phenyl the same as a neutral floor cleaner?", answer: "Do not treat the names as interchangeable. Tell ESCU your floor material, finish and cleaning requirement so the supplied formulation can be checked. A fragrance description alone does not establish pH, compatibility or the correct dilution." },
      { question: "Can it be specified for a disinfection procedure?", answer: "State your required performance and documentation in the enquiry. The team can provide the relevant product information for review. This listing does not establish a particular kill claim, contact time, healthcare approval or certification." },
    ],
  },
  "glass-cleaner": {
    buyingChecklist: ["Identify windows, mirrors, partitions or display glass as the application.", "Mention coatings, films, frames or nearby electrical equipment.", "Describe the cleaning tools and any drying-mark problem you want to address."],
    usageNote: "A glass-cleaner enquiry should describe both the glass and its surrounding materials. Confirm suitability for any coating or film and follow the product's application and wiping instructions. Specialist screens and optical surfaces may have their own manufacturer restrictions; do not assume a window-cleaning product is suitable for them.",
    packagingNote: "Ask about the available bulk containers and whether your existing spray or wiping system suits the supplied product. Include the quantity needed for regular window or mirror cleaning rather than specifying an unconfirmed container size.",
    relatedSlugs: ["multi-cleaner-liquid", "bathroom-cleaner", "ceramic-cleaner", "floor-cleaner"],
    questions: [
      { question: "Can I use glass cleaner on coated windows or screens?", answer: "Confirm compatibility first. Describe the coating, film or equipment and check its manufacturer's cleaning instructions. A product listed for ordinary windows and mirrors should not automatically be used on electronic displays or specialist glazing." },
      { question: "What should I send when asking about streaks or drying marks?", answer: "Include the surface, current product, dilution if any, cloth or tool used and when the marks appear. This helps distinguish a product-selection enquiry from a wiping-method or surface-compatibility issue without promising a result from the name alone." },
    ],
  },
  "floor-cleaner": {
    buyingChecklist: ["Identify tile, stone, vinyl or another floor and its finish or sealer.", "Specify hand mopping or a cleaning machine and its product requirements.", "Describe routine soil, heavy deposits or any finish damage already present."],
    usageNote: "Floor compatibility depends on the supplied formulation and the floor finish. Ask for confirmation before using a cleaner on polished stone, sealed surfaces or equipment. Follow the label for dilution, rinsing and drying; do not infer neutral pH or machine suitability from the general product name.",
    packagingNote: "Request current bulk-pack options and the quantity for your cleaning schedule. For a machine application, include the equipment model or the manufacturer's detergent requirements so the supply enquiry is specific.",
    relatedSlugs: ["herbal-lemon-phenyl", "ceramic-cleaner", "multi-cleaner-liquid", "bathroom-cleaner"],
    questions: [
      { question: "Is the floor cleaner safe for marble and sealed stone?", answer: "Suitability must be confirmed for the particular formulation, stone and finish. Tell the team exactly what flooring you have and follow the floor manufacturer's guidance. This listing does not guarantee a neutral pH or universal stone compatibility." },
      { question: "Can I order floor cleaner for a scrubber-drier?", answer: "Yes, you can send a supply enquiry for that task. Include the machine requirements and floor type; ESCU must confirm whether the offered product suits the equipment. Do not assume a hand-mopping product is appropriate for every machine." },
    ],
  },
  "cleaning-powder": {
    buyingChecklist: ["Describe the stain or residue and the material beneath it.", "Identify polished, coated or scratch-sensitive surfaces that must be protected.", "State whether the cleaning is for utensils, sinks, fixtures or another area."],
    usageNote: "Cleaning Powder is a scouring-product enquiry, so surface resistance matters as much as the stain. Confirm that abrasive cleaning is appropriate before applying it to a finish. Use the supplied instructions for application and rinsing; do not transfer a method for metal utensils to coated fixtures without checking.",
    packagingNote: "Ask for available pack sizes and how the powder should be stored between uses. Include the quantity consumed by your cleaning team and any requirements for controlled dispensing or smaller working containers.",
    relatedSlugs: ["liquid-soap", "bathroom-cleaner", "ceramic-cleaner", "multi-cleaner-liquid"],
    questions: [
      { question: "When should I ask for cleaning powder instead of a liquid?", answer: "Describe the deposit and surface so the team can help identify the appropriate product. A scouring powder may be considered where abrasive cleaning is acceptable, but it should not be selected solely because a stain is difficult to remove." },
      { question: "Can cleaning powder scratch a surface?", answer: "Abrasive products can mark unsuitable finishes. Check the surface manufacturer's instructions, confirm product compatibility and follow the label's test-area guidance before wider use. Mention delicate coatings or polished finishes when requesting a quotation." },
    ],
  },
  "multi-cleaner-liquid": {
    buyingChecklist: ["List the routine surfaces and the kind of soil to be cleaned.", "Distinguish general housekeeping from scale removal, glass care or handwashing.", "State any fragrance, finish or equipment requirement in your purchasing brief."],
    usageNote: "Multi Cleaner Liquid is a general-housekeeping listing, not a guarantee that one formulation suits every surface. Explain the intended tasks so the team can confirm limitations and instructions. Dedicated glass, bathroom or floor products may be more appropriate for a particular material or deposit; avoid substituting by product name alone.",
    packagingNote: "Request the current refill or bulk-container options and confirm the quantity for each housekeeping location. If you already use a dispensing system, describe it so compatibility and supply format can be discussed.",
    relatedSlugs: ["glass-cleaner", "bathroom-cleaner", "floor-cleaner", "liquid-soap"],
    questions: [
      { question: "Does all-purpose mean it can clean every material?", answer: "No. Tell ESCU which materials, finishes and tasks are involved. Ask for the supplied formulation's limitations and instructions before use, especially around coated surfaces, natural stone, food-contact equipment or electrical fittings." },
      { question: "Can this replace bathroom cleaner and glass cleaner?", answer: "That depends on the cleaning task and product compatibility. Mineral scale and glass finishing are different requirements from routine surface cleaning. Send a short task list so the quotation can separate general housekeeping from any specialist cleaner needed." },
    ],
  },
  "ceramic-cleaner": {
    buyingChecklist: ["Identify the ceramic or tile finish and the condition of its grout.", "Describe mineral film, staining or general soil rather than just saying dirty tiles.", "Mention adjacent stone, metal or coated surfaces that the cleaner could contact."],
    usageNote: "Select ceramic cleaner against the tile finish, grout and deposit. Confirm the offered formulation before use on decorative tiles or installations combining several materials. Follow the label for application, dilution and rinsing, and do not assume a product for ceramic is suitable for surrounding natural stone or metal fittings.",
    packagingNote: "Ask about current pack sizes for your maintenance schedule. Include whether this is a routine housekeeping order or a particular restoration task so the product and quantity can be quoted clearly.",
    relatedSlugs: ["bathroom-cleaner", "floor-cleaner", "cleaning-powder", "glass-cleaner"],
    questions: [
      { question: "Is ceramic cleaner suitable for all tile and grout?", answer: "Confirm the tile coating, grout type and supplied formulation first. Tell ESCU about decorative finishes or mixed-material installations. A ceramic-cleaner listing does not establish suitability for every stone, sealer, metal trim or grout product." },
      { question: "What information helps when tiles look dull after cleaning?", answer: "Describe the tile, the previous cleaning products and whether the problem is loose soil, a deposit or possible finish damage. Photos can help explain the enquiry, but product selection should still be checked against the tile manufacturer's instructions." },
    ],
  },
  "wax-fuel": {
    buyingChecklist: ["Identify the chafing dish or food-warmer equipment and its fuel requirements.", "Send the number of warmers and the event or service schedule.", "Ask for the current container format and product-specific burning instructions."],
    usageNote: "Wax Fuel is offered for compatible buffet and catering warmers. Use only in equipment intended for the supplied fuel and follow its label and the warmer manufacturer's instructions. Do not assume a burn time, heat output or indoor-use approval from this listing. Keep fuel handling separate from food handling procedures.",
    packagingNote: "Confirm the individual container dimensions, format and available outer packs before ordering. Include the warmer details when changing suppliers so the physical fit and intended use can be checked before the event.",
    relatedSlugs: ["liquid-soap", "hand-wash", "multi-cleaner-liquid", "floor-cleaner"],
    questions: [
      { question: "How much wax fuel should I order for an event?", answer: "Send the number of warmers, service duration and the fuel specification required by the equipment. The quotation should confirm the supplied container and its instructions. This page does not publish an unverified burn time or event-consumption calculation." },
      { question: "Does any wax-fuel container fit a chafing dish?", answer: "Do not assume universal fit. Confirm the holder dimensions, fuel format and the warmer manufacturer's requirements. Check the supplied product's handling and extinguishing instructions before service; never improvise a refill or move a lit container." },
    ],
  },
  "tcca-90": {
    buyingChecklist: ["Specify the product form and grade required by your pool procedure or feeder.", "Include pool volume, recent water-test readings and the current treatment products.", "Confirm what the stated percentage refers to using the supplied label and specification."],
    usageNote: "TCCA selection must match the pool's treatment procedure and dosing equipment. The catalogue name is TCCA 90%; confirm the actual supplied specification, including available chlorine, before use. A dose cannot be established from pool size alone: current readings, treatment targets and the exact product instructions are also needed. Do not mix pool chemicals.",
    packagingNote: "Ask which product forms and packs are currently offered. Tablet dimensions, granule form and container quantity must be confirmed for the supplied stock; they are not inferred from the TCCA name or from a previous supplier's product.",
    relatedSlugs: ["liquid-chlorine-pool", "soda-ash-powder", "sodium-bicarbonate", "copper-sulphate"],
    questions: [
      { question: "What is the TCCA price in Nepal?", answer: "ESCU quotes for the required product form, specification, quantity and delivery location. Send those details with the enquiry. The team will confirm the offered product and current price; no fixed retail rate or stock guarantee is published here." },
      { question: "How much TCCA does my swimming pool need?", answer: "There is no safe universal dose to publish for every pool and product. Provide pool volume, recent test results, treatment target and dosing equipment details. Use the supplied product instructions and a competent pool operator's procedure rather than a general catalogue calculation." },
    ],
  },
  "liquid-chlorine-pool": {
    buyingChecklist: ["State that the order is for a swimming pool rather than a water-supply system.", "Provide current pool readings, pool volume and dosing-equipment details.", "Confirm concentration, quantity and the timing of the planned delivery."],
    usageNote: "This listing is sodium hypochlorite for pool-treatment enquiries. The required dose depends on the supplied concentration and the pool's measured condition. A pool operator should establish the treatment procedure and confirm equipment compatibility. Never combine chlorine with acids, other cleaners or another pool chemical in a container.",
    packagingNote: "Ask for current container options and delivery arrangements for the required quantity. Plan storage and consumption with the supplied label in mind; do not assume that an older container retains its original strength or that every pool system accepts the same format.",
    relatedSlugs: ["tcca-90", "soda-ash-powder", "sodium-bicarbonate", "liquid-chlorine-water"],
    questions: [
      { question: "Is pool liquid chlorine the same order as tank-treatment chlorine?", answer: "Both catalogue listings refer to sodium hypochlorite, but the intended application and required specification still need confirmation. Use this page for pool enquiries and describe the system; water-supply and storage-tank requirements have a separate listing." },
      { question: "Can I replace TCCA with liquid chlorine without changing my procedure?", answer: "Do not substitute products by volume or by name alone. The product form, concentration, equipment and water-management procedure differ. Ask the pool operator to review the supplied specification and current test readings before changing the treatment product." },
    ],
  },
  "copper-sulphate": {
    buyingChecklist: ["Explain the algae-control application and the type of water system involved.", "State the required grade and any restrictions in the operating procedure.", "Provide current treatment details and identify where treated water is discharged."],
    usageNote: "Copper Sulphate enquiries need an application-specific review. Do not add it to a pool, tank or other water body simply because algae is visible. Confirm whether the site procedure permits it, what specification is needed and how water disposal is controlled. This page does not provide a dose or authorise drinking-water use.",
    packagingNote: "Ask for current packaging and the specification of the supplied material. Include the quantity needed for the approved procedure; the blue appearance or a common trade name is not a substitute for checking the product identification.",
    relatedSlugs: ["liquid-chlorine-pool", "tcca-90", "soda-ash-powder", "sodium-bicarbonate"],
    questions: [
      { question: "Can I use copper sulphate in any water tank?", answer: "No universal tank-use claim is made here. Describe the water's purpose and operating requirements, and obtain application-specific approval before ordering. The catalogue listing does not establish drinking-water suitability or a dose for a particular tank." },
      { question: "What should a pool operator confirm before ordering copper sulphate?", answer: "Confirm that its use fits the pool's treatment procedure, the required specification and any monitoring or disposal restrictions. Send these requirements with the quantity and location; do not use an online general-purpose dose as a substitute for the site procedure." },
    ],
  },
  "soda-ash-powder": {
    buyingChecklist: ["Identify sodium carbonate as the required chemical rather than bicarbonate or caustic soda.", "Share the pool's pH readings and the relevant treatment procedure.", "Confirm the supplied grade and the quantity required for your maintenance order."],
    usageNote: "Soda Ash Powder is the sodium-carbonate listing for pool pH-adjustment enquiries. Confirm the exact product and application before use. Treatment quantities require measured water conditions and the supplied instructions; a general catalogue page cannot establish a dose for an individual pool. Keep pH adjustment separate from assumptions about total alkalinity.",
    packagingNote: "Request current pack sizes and confirm how the powder should be stored and handled at your site. Specify whether this is routine replenishment or a change from another pH-adjustment product so the order can be checked carefully.",
    relatedSlugs: ["sodium-bicarbonate", "tcca-90", "liquid-chlorine-pool", "caustic-soda-flakes"],
    questions: [
      { question: "Is soda ash the same as sodium bicarbonate?", answer: "No. Soda ash is sodium carbonate; sodium bicarbonate is a separate catalogue product. A purchasing request should use the exact chemical name and the site's treatment requirement so the products are not treated as interchangeable." },
      { question: "Can I choose a soda-ash dose from pool volume alone?", answer: "No. Include current readings, treatment targets and the supplied product specification in the operating procedure. Ask a competent operator to determine the treatment quantity using the product instructions rather than relying on a generic volume-only rule." },
    ],
  },
  "sodium-bicarbonate": {
    buyingChecklist: ["Specify sodium bicarbonate and the intended pool-maintenance application.", "Provide recent alkalinity and pH readings for the treatment enquiry.", "Confirm grade, current pack options and the required quantity."],
    usageNote: "Sodium Bicarbonate is listed for pool alkalinity-management enquiries. Product identity and water-test results should be checked before treatment. It is not a substitute for soda ash simply because both products appear in pool care. Follow the supplied instructions and the pool operator's procedure; this page makes no food-grade claim.",
    packagingNote: "Ask for available packs and the specification required by your pool procedure. Include the quantity and storage arrangements for regular maintenance orders, and keep the product clearly identified to avoid confusion with other white powders.",
    relatedSlugs: ["soda-ash-powder", "liquid-chlorine-pool", "tcca-90", "industrial-salt"],
    questions: [
      { question: "Can this sodium bicarbonate be bought for food use?", answer: "This catalogue listing is for pool-maintenance enquiries and does not establish a food grade. State any different intended application explicitly and obtain the required product specification and documentation before considering an order for that purpose." },
      { question: "Why should I include both alkalinity and pH readings?", answer: "They describe different aspects of pool water management. Providing both helps the operator review the treatment requirement and avoids ordering a chemical solely from a single reading. ESCU's quotation does not replace a site-specific treatment procedure." },
    ],
  },
  "bleaching-powder": {
    buyingChecklist: ["Identify whether the application is a water supply, tank or another approved treatment task.", "Specify the required grade and available-chlorine requirement from your procedure.", "Include quantity, delivery timing and any procurement-document requirements."],
    usageNote: "Bleaching-powder treatment must be based on the exact supplied specification and the site's operating procedure. Do not assume all powders sold under similar names have the same strength. For water-supply work, the responsible operator should confirm suitability, treatment targets and monitoring before use. No universal drinking-water or tank dose is published here.",
    packagingNote: "Ask for available pack sizes, product identification and storage instructions with your enquiry. Plan the quantity against actual consumption and site storage conditions, and keep incompatible products separated according to the supplied safety documentation.",
    relatedSlugs: ["liquid-chlorine-water", "pac-powder", "crystal-alum", "liquid-chlorine-pool"],
    questions: [
      { question: "What is bleaching powder called in Nepali?", answer: "It is commonly written as ब्लिचिङ पाउडर. When ordering, include the intended use and the required specification as well as the name, so a familiar trade term is not mistaken for confirmation of strength or application suitability." },
      { question: "Is bleaching powder interchangeable with liquid chlorine?", answer: "Do not substitute them by equal weight or volume. They have different forms and must be checked against the supplied specification and treatment equipment. Describe the process and required grade when asking ESCU to quote for either product." },
    ],
  },
  "pac-powder": {
    buyingChecklist: ["Specify Poly Aluminium Chloride and the water-treatment application.", "Include raw-water conditions, available analysis and any existing jar-test results.", "State the required grade, quantity, delivery town and procurement-document requirements."],
    usageNote: "PAC Powder is offered for clarification enquiries where a coagulant is part of the treatment process. Product selection should be based on the water and plant conditions, not a blanket claim that PAC is always better than alum. Confirm the offered specification and establish treatment conditions through the responsible operator's testing procedure.",
    packagingNote: "Ask for current pack options and the supplied product specification. No concentration, aluminium-oxide content or container weight is inferred from the PAC name. If you are matching an existing product, send its label or purchasing specification with the enquiry.",
    relatedSlugs: ["alum-powder", "crystal-alum", "non-ferric-alum", "polyelectrolyte"],
    questions: [
      { question: "How do I get a PAC supplier quotation in Nepal?", answer: "Send ESCU the required Poly Aluminium Chloride specification, quantity, intended treatment process and delivery location. Include your existing product label or plant requirement if available. The team will confirm the offered product and current quotation rather than assume a grade from the abbreviation PAC." },
      { question: "Should I choose PAC instead of alum?", answer: "Compare the products against your source water, treatment targets, equipment and trial results. There is no universal winner for every plant. Share water analysis and operating information, then have the responsible treatment operator assess the proposed product before changing the process." },
    ],
  },
  "crystal-alum": {
    buyingChecklist: ["Specify crystal alum and confirm the required chemical identification and grade.", "Describe the clarification process and how the plant prepares its coagulant solution.", "Include current operating requirements, order quantity and delivery location."],
    usageNote: "Crystal Alum is a clarification-product listing. Confirm the supplied material and whether its form suits the plant's preparation equipment. It should not be substituted for another alum grade simply because the name is similar. The operator should use the approved testing and dosing procedure for the actual water and product.",
    packagingNote: "Ask for current packaging and the supplied physical form before ordering. If your preparation system has size or handling requirements, include those details so the quotation identifies a product the plant can receive and use appropriately.",
    relatedSlugs: ["alum-powder", "non-ferric-alum", "pac-powder", "polyelectrolyte"],
    questions: [
      { question: "Is crystal alum the same order as alum powder?", answer: "They are separate listings and the physical form matters to purchasing and preparation. Confirm chemical identification, grade and form rather than treating the names as interchangeable. Send your existing plant specification when requesting a replacement product." },
      { question: "What helps ESCU quote for a treatment plant using crystal alum?", answer: "Include the required product specification, preparation method, typical order quantity and delivery town. Water-analysis or trial information can help explain the process requirement, but the supply quotation is not a substitute for an approved treatment dose." },
    ],
  },
  "non-ferric-alum": {
    buyingChecklist: ["Include the non-ferric requirement and any iron-limit specification from procurement.", "Describe the treatment process and intended water use.", "Confirm physical form, required quantity and delivery arrangements."],
    usageNote: "Non-Ferric Alum should be ordered against a clear purchasing specification. The catalogue name does not establish a numerical iron limit or purity. Ask for the offered product information after enquiry and have the responsible team review it against the plant's requirement before treating it as a substitute for another coagulant.",
    packagingNote: "Request current pack options and the physical form available. When replacing an existing material, provide the purchasing specification or label so the non-ferric requirement and handling format can be checked together.",
    relatedSlugs: ["crystal-alum", "alum-powder", "pac-powder", "polyelectrolyte"],
    questions: [
      { question: "Does non-ferric alum mean a guaranteed iron percentage?", answer: "No numerical limit is published on this page. State the iron specification your process requires and request the offered product documentation after enquiry. The name alone should not be used as a substitute for a verified purchasing specification." },
      { question: "Can non-ferric alum replace the alum my plant currently uses?", answer: "Confirm chemical identification, physical form and the plant's quality requirements before substitution. The treatment operator should review any proposed change with the actual water and process conditions; an online catalogue name does not establish equivalent dosing or performance." },
    ],
  },
  "alum-powder": {
    buyingChecklist: ["Specify aluminium sulphate powder and the required process grade.", "Describe solution-preparation equipment and clarification requirements.", "Send available water analysis or trial results with the order quantity."],
    usageNote: "Alum Powder is offered for clarification and settling-process enquiries. Confirm that the supplied powder matches the plant's chemical and handling specification. Coagulant treatment is water-dependent, so use the responsible operator's trial and dosing procedure rather than a fixed general-purpose rate. Mention any planned switch from PAC or another alum form.",
    packagingNote: "Ask for the available pack sizes and handling instructions for the supplied powder. Include any constraints on receiving, storage or solution preparation so the quotation can be reviewed before the material arrives at the plant.",
    relatedSlugs: ["crystal-alum", "non-ferric-alum", "pac-powder", "polyelectrolyte"],
    questions: [
      { question: "What is the difference between alum powder and crystal alum for ordering?", answer: "The catalogue separates their physical forms. Confirm the required chemical identity, grade and preparation method as well as form. Your plant may have particular receiving or mixing requirements, so send the existing specification rather than order from appearance alone." },
      { question: "Can ESCU quote for a trial before a repeat alum supply order?", answer: "Explain the planned trial, required quantity and delivery location in your enquiry. The team can discuss current supply options and documents. Trial design and the acceptance criteria should be set by the treatment operator for the actual water and process." },
    ],
  },
  "industrial-salt": {
    buyingChecklist: ["Identify the softener or industrial process and its required salt specification.", "Provide equipment guidance on purity, insolubles or physical form where available.", "State regular consumption, ordering frequency and delivery location."],
    usageNote: "Industrial Salt is listed for water-softener and industrial-process enquiries. Confirm compatibility with the equipment's requirements before changing supply. The industrial listing does not establish food grade or suitability for every softener. Follow the equipment instructions for regeneration and brine preparation rather than a generic online quantity.",
    packagingNote: "Ask for the current pack options and physical form, and describe your receiving and storage arrangement. Include any requirements for handling at the brine tank so the team can quote a practical supply format without assuming a sack weight.",
    relatedSlugs: ["antiscalant", "sodium-hydroxide", "hcl-acid", "pac-powder"],
    questions: [
      { question: "Is industrial salt suitable for food preparation?", answer: "This catalogue page does not make a food-grade claim. It is intended for industrial and softener enquiries. State the actual application and required standard explicitly; a white appearance or the name sodium chloride does not establish food suitability." },
      { question: "What information is needed for a softener-salt order?", answer: "Send the softener's salt requirements, any physical-form restrictions, your typical consumption and delivery location. When changing suppliers, include the existing specification so the quotation can be reviewed against the equipment requirements before a repeat supply arrangement is agreed." },
    ],
  },
  "caustic-soda-flakes": {
    buyingChecklist: ["Specify sodium hydroxide in flake form and the required process grade.", "Describe whether the material is for pH control, neutralisation or an approved cleaning process.", "Include your site's handling requirements, quantity and delivery location."],
    usageNote: "Caustic Soda Flakes must be matched to the site's approved chemical-use procedure. Confirm the offered grade and preparation requirements before use; this page does not provide mixing or dosing instructions. Personnel should use the supplied label and SDS for handling, protective equipment and storage separation, with trained supervision for preparation.",
    packagingNote: "Ask for current flake packaging and container quantities. If you need a prepared liquid instead, state that explicitly: the flake listing should not be taken as confirmation of another form or concentration.",
    relatedSlugs: ["sodium-hydroxide", "hcl-acid", "pac-powder", "polyelectrolyte"],
    questions: [
      { question: "Are caustic soda flakes and sodium hydroxide different chemicals?", answer: "Caustic soda is a common name for sodium hydroxide; this listing specifies the flake form. The separate sodium-hydroxide page supports process enquiries. Confirm the required form and grade so a similar name is not mistaken for an equivalent supply specification." },
      { question: "Can the same flakes be used for any cleaning process?", answer: "No universal process approval is made here. State the equipment, materials and approved cleaning procedure, then check the offered grade and documentation. The supply listing does not establish compatibility with food-contact equipment, a particular surface or a given preparation method." },
    ],
  },
  "sodium-hydroxide": {
    buyingChecklist: ["Specify the required form and concentration rather than the chemical name alone.", "Describe pH control, alkalinity adjustment or the neutralisation process.", "Send the process specification, dosing-equipment details and required quantity."],
    usageNote: "Sodium Hydroxide enquiries should identify the exact supply form and the process requirement. Continuous dosing equipment and preparation arrangements can require different specifications. Confirm the offered material before ordering, and use the site's approved operating procedure and supplied safety information. A catalogue page is not a dosing instruction or compatibility approval.",
    packagingNote: "Ask which forms and containers are currently available for your requirement. Do not infer a liquid concentration from this listing. If you need flakes, use the separate caustic-soda-flakes page and state the grade required.",
    relatedSlugs: ["caustic-soda-flakes", "hcl-acid", "pac-powder", "alum-powder"],
    questions: [
      { question: "What concentration of sodium hydroxide does ESCU supply?", answer: "The concentration and form must be confirmed for the order; neither is specified on this general process listing. Include the requirement from your operating or purchasing specification, together with quantity and location, so the quotation describes the actual offered product." },
      { question: "How should I enquire about changing a pH-control chemical?", answer: "Describe the existing chemical, equipment and target process, and include the relevant specification. The responsible operator must review compatibility and operating changes. Do not replace a chemical based on matching names or a general online dosing assumption." },
    ],
  },
  "hcl-acid": {
    buyingChecklist: ["Specify hydrochloric acid, the required concentration and process grade.", "Identify the equipment materials and whether the task is descaling or pH reduction.", "Include the handling arrangements, quantity and delivery location."],
    usageNote: "HCL Acid selection must account for the actual equipment, process and supplied concentration. A general descaling listing does not establish compatibility with every metal, seal or coating. Use an approved maintenance procedure and the supplied label and SDS. Keep acid separate from chlorine products and do not mix chemicals.",
    packagingNote: "Request the current container options for the required specification and quantity. Explain receiving and handling constraints at your plant. The catalogue does not publish a standard concentration, drum capacity or universal transport arrangement.",
    relatedSlugs: ["caustic-soda-flakes", "sodium-hydroxide", "industrial-salt", "liquid-chlorine-water"],
    questions: [
      { question: "Can hydrochloric acid be used on any scale-covered equipment?", answer: "No. Identify the equipment materials, seals, deposits and approved maintenance procedure first. Confirm product suitability with the responsible technical person and review the supplied documentation. This page is a supply enquiry route, not an instruction to acid-clean any particular system." },
      { question: "Is HCL acid supplied at a fixed concentration?", answer: "No concentration is published on this listing. State the concentration and grade your process requires when requesting a quotation. ESCU will identify the offered product and provide related documentation after enquiry; do not assume another supplier's concentration is equivalent." },
    ],
  },
  "liquid-chlorine-water": {
    buyingChecklist: ["Identify the water-supply or tank-treatment application and required product grade.", "Include dosing equipment, water-analysis information and the operating specification.", "State the quantity, delivery timing and document requirements for procurement."],
    usageNote: "This sodium-hypochlorite listing is for water-treatment enquiries. The responsible operator should confirm application suitability, concentration and treatment monitoring for the supplied product. Water disinfection is not a fixed dose based only on tank volume; use the actual operating requirements and label instructions. Never mix hypochlorite with acids or other chemicals.",
    packagingNote: "Ask for current container options and plan the supply quantity against the site's consumption and storage conditions. For a dosing pump, include its material and supply-format requirements rather than assuming that every chlorine solution is interchangeable.",
    relatedSlugs: ["bleaching-powder", "liquid-chlorine-pool", "pac-powder", "industrial-salt"],
    questions: [
      { question: "Can I use a general chlorine product for drinking-water treatment?", answer: "Do not assume suitability from the name. Specify the intended water use and the grade required by the responsible operator. Confirm the supplied product documentation, dosing procedure and monitoring requirements before any treatment of water intended for consumption." },
      { question: "What should I include when ordering for a tank-cleaning contractor?", answer: "State the water's intended use, the contractor's product specification, required quantity, equipment and location. Product selection and treatment procedures remain the contractor's or operator's responsibility. ESCU can quote for the requested product and supply the related documents after enquiry." },
    ],
  },
  antiscalant: {
    buyingChecklist: ["Provide the RO feed-water analysis and the system's operating recovery information.", "Include membrane and equipment requirements plus the current antiscalant if replacing one.", "State the required quantity, consumption pattern and delivery location."],
    usageNote: "RO Antiscalant selection depends on water and operating conditions. Confirm the proposed formulation against membrane and equipment requirements before changing products. A generic scale-inhibitor name does not establish compatibility or a dose. Send the water report and system information with the enquiry so the selection can be reviewed against the actual process.",
    packagingNote: "Ask for the formulation identification, current container options and supplied instructions. When matching an existing chemical, provide its label or specification rather than ordering only by colour, container appearance or an assumed equivalent concentration.",
    relatedSlugs: ["industrial-salt", "hcl-acid", "sodium-hydroxide", "liquid-chlorine-water"],
    questions: [
      { question: "Can one antiscalant be used for every RO plant?", answer: "No universal compatibility claim is made here. The feed water, operating conditions and membrane requirements must be reviewed for the proposed formulation. Include the water analysis and current product information when asking ESCU for an RO antiscalant quotation." },
      { question: "Can I order antiscalant without a recent water report?", answer: "You can start an enquiry, but explain what information is available and whether the order repeats an already approved product. A new selection or process change should not be based on a guessed dose; the team will clarify what additional system information is needed." },
    ],
  },
  polyelectrolyte: {
    buyingChecklist: ["Describe clarification, solids separation or the sludge-dewatering process.", "Specify the required polymer type or provide the currently approved product information.", "Include trial results, preparation-equipment requirements and order quantity."],
    usageNote: "Polyelectrolyte is a family of treatment products, so the name alone is not a complete purchasing specification. The formulation and preparation method should match the application and site trials. Confirm the proposed grade and use the supplied instructions; this listing does not establish a universal polymer type, preparation time or dose.",
    packagingNote: "Ask for the available product form, grade identification and pack options. For a repeat order, include the exact existing product reference. If the process or sludge has changed, make that clear before requesting an equivalent supply.",
    relatedSlugs: ["pac-powder", "alum-powder", "crystal-alum", "non-ferric-alum"],
    questions: [
      { question: "Which polyelectrolyte grade should I order?", answer: "Use the grade established by your process specification or trials, and provide its identifying information. If a grade has not been selected, describe the process and available test information. A generic flocculant name does not establish whether a particular polymer suits the application." },
      { question: "Can I replace a polymer with another product at the same dose?", answer: "Do not assume equivalence. Formulations, preparation requirements and process responses can differ. Have the responsible operator review the proposed specification and trial it against the site's acceptance criteria before changing the product or operating procedure." },
    ],
  },
};

export function getProductEditorial(slug: string): ProductEditorial {
  const editorial = content[slug];
  if (!editorial) throw new Error(`Missing product editorial content for ${slug}`);
  return {
    ...editorial,
    deliveryNote: "ESCU handles supply enquiries from Kathmandu and across Nepal. Include your delivery town, required date and receiving arrangements. The team confirms availability, freight and timing for the order before you commit; a catalogue listing is not a live stock or delivery promise.",
  };
}

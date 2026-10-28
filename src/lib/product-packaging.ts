export interface ProductPackaging {
  label: string;
  smallerQuantities: boolean;
}

// Pack sizes supplied by ESCU. We intentionally don't infer a bag/drum for
// cleaning powder because the owner gave its weights without a package type.
const packaging: Record<string, ProductPackaging> = {
  "liquid-soap": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: false },
  "hand-wash": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "bathroom-cleaner": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "herbal-lemon-phenyl": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "glass-cleaner": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "floor-cleaner": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "cleaning-powder": { label: "25 kg and 50 kg", smallerQuantities: false },
  "multi-cleaner-liquid": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "ceramic-cleaner": { label: "20 kg, 35 kg and 50 kg drums", smallerQuantities: true },
  "wax-fuel": { label: "Tin (weight confirmed on enquiry)", smallerQuantities: false },
  "tcca-90": { label: "50 kg drums", smallerQuantities: false },
  "liquid-chlorine-pool": { label: "50 kg and 60 kg drums", smallerQuantities: false },
  "copper-sulphate": { label: "50 kg bags", smallerQuantities: false },
  "soda-ash-powder": { label: "25 kg and 50 kg bags", smallerQuantities: false },
  "sodium-bicarbonate": { label: "25 kg and 50 kg bags", smallerQuantities: false },
  "bleaching-powder": { label: "25 kg bags", smallerQuantities: false },
  "pac-powder": { label: "25 kg bags", smallerQuantities: false },
  "crystal-alum": { label: "50 kg bags", smallerQuantities: false },
  "non-ferric-alum": { label: "50 kg bags", smallerQuantities: false },
  "alum-powder": { label: "50 kg bags", smallerQuantities: false },
  "industrial-salt": { label: "50 kg bags", smallerQuantities: false },
  "caustic-soda-flakes": { label: "50 kg bags", smallerQuantities: false },
  "sodium-hydroxide": { label: "50 kg bags", smallerQuantities: false },
  "hcl-acid": { label: "50 kg and 60 kg drums", smallerQuantities: false },
  "liquid-chlorine-water": { label: "50 kg and 60 kg drums", smallerQuantities: false },
  antiscalant: { label: "25 kg drums", smallerQuantities: false },
  polyelectrolyte: { label: "25 kg bags", smallerQuantities: false },
};

export function getProductPackaging(slug: string): ProductPackaging {
  const productPackaging = packaging[slug];
  if (!productPackaging) throw new Error(`Missing confirmed packaging for product: ${slug}`);
  return productPackaging;
}

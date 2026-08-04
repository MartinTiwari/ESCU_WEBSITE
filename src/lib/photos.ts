import type { Industry } from "./products";

// Stock photography standing in for real ESCU photos (warehouse, delivery,
// staff, client sites). Sourced from Unsplash and Pexels (free licenses,
// no attribution required), picked to be neutral rather than tied to any
// one country. Swap each src for an actual company photo as it's shot —
// see ESCU-Website-Brief.md's Assets Checklist.
export const photos = {
  // Aerial shot over the Himalaya — ties directly to the "Everest" name and
  // Nepal location, and its deep blues match the brand palette.
  hero: "https://images.unsplash.com/photo-1725330393761-d1646c1c425a",
  // Dramatic rows of drums in a steel lattice — stands in for "stock ready
  // to move," used in the homepage About section and as a page-header backdrop.
  warehouse: "https://images.unsplash.com/photo-1593442050644-39db3bc1934d",
  drums: "https://images.unsplash.com/photo-1660174802978-16c7e2fa7e89",
  waterTreatment: "https://images.unsplash.com/photo-1636649389054-e5dcea139e64",
  pool: "https://images.unsplash.com/photo-1678960591129-ff8db00462e2",
  cleaning: "https://images.unsplash.com/photo-1626379481874-3dc5678fa8ca",
  labQuality: "https://images.pexels.com/photos/9243558/pexels-photo-9243558.jpeg",
  aboutHeaderBg: "https://images.pexels.com/photos/20379378/pexels-photo-20379378/free-photo-of-worker-in-warehouse-with-barrels.jpeg",
  warehouseDispatch: "https://images.pexels.com/photos/4483556/pexels-photo-4483556.jpeg",
};

export const categoryPhoto: Record<string, string> = {
  "Water Treatment Chemicals": photos.waterTreatment,
  "Swimming Pool Chemicals": photos.pool,
  "Housekeeping & Cleaning Chemicals": photos.cleaning,
};

export const industryPhoto: Record<Industry, string> = {
  "Water Treatment Plants": photos.waterTreatment,
  "Hotels & Resorts": "https://images.pexels.com/photos/14841129/pexels-photo-14841129.jpeg",
  "Swimming Pools": photos.pool,
  "Hospitals": "https://images.pexels.com/photos/37036967/pexels-photo-37036967/free-photo-of-bright-hospital-corridor-with-windows.jpeg",
  "Industrial Plants": "https://images.pexels.com/photos/7178310/pexels-photo-7178310.jpeg",
  "Restaurants & Cafes": "https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg",
  "Commercial Buildings": "https://images.pexels.com/photos/946310/pexels-photo-946310.jpeg",
  "Engineering Projects": "https://images.pexels.com/photos/3862384/pexels-photo-3862384.jpeg",
};

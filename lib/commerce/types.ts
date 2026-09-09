// Commerce domain types, intentionally independent of any payment provider.
// Stripe (or another processor) is an implementation detail behind
// lib/stripe — the store UI and product catalogue should never import
// Stripe types directly.

export type ProductCategory =
  | "digital-album"
  | "digital-single"
  | "beat-pack"
  | "instrumental"
  | "merch"
  | "exclusive";

export type ProductAvailability = "available" | "coming-soon" | "sold-out";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  description: string;
  priceGBP?: number; // in minor units (pence); undefined = price TBC
  availability: ProductAvailability;
  /** Populated once a Stripe Price is created for this product. */
  stripePriceId?: string;
  /** Set for downloadable digital goods delivered via Supabase Storage. */
  downloadAssetId?: string;
  relatedReleaseSlug?: string;
};

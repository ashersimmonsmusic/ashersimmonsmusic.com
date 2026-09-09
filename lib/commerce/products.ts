import type { Product } from "@/lib/commerce/types";
import { releases } from "@/lib/data/releases";

// Store catalogue for the MVP. No Stripe price IDs exist yet — availability
// is "coming-soon" until checkout is wired up. The shape stays stable when
// Stripe is introduced: only stripePriceId gets populated.
export const products: Product[] = releases.map((release) => ({
  id: release._id,
  slug: release.slug,
  title: release.title,
  category:
    release.releaseType === "album" || release.releaseType === "ep"
      ? "digital-album"
      : "digital-single",
  description: release.description || `${release.title} — digital release.`,
  priceGBP: undefined,
  availability: "coming-soon",
  relatedReleaseSlug: release.slug,
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(priceGBP?: number): string {
  if (priceGBP === undefined) return "TBC";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(priceGBP / 100);
}

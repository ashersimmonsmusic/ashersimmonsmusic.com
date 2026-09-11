import "server-only";
import type { PrintifyProduct } from "@/lib/printify/types";

type PrintifyVariant = {
  id: number;
  price: number;
  is_enabled: boolean;
};

type PrintifyImage = {
  src: string;
  is_default: boolean;
};

type PrintifyApiProduct = {
  id: string;
  title: string;
  visible: boolean;
  images: PrintifyImage[];
  variants: PrintifyVariant[];
};

const CURRENCY = process.env.PRINTIFY_CURRENCY || "GBP";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: CURRENCY }).format(
    cents / 100,
  );
}

function toPrintifyProduct(product: PrintifyApiProduct): PrintifyProduct {
  const image = product.images.find((img) => img.is_default) ?? product.images[0];
  const enabledPrices = product.variants
    .filter((variant) => variant.is_enabled)
    .map((variant) => variant.price);

  return {
    id: product.id,
    title: product.title,
    imageUrl: image?.src ?? "",
    price: enabledPrices.length > 0 ? formatPrice(Math.min(...enabledPrices)) : undefined,
  };
}

/**
 * Fetches a handful of visible products from the connected Printify shop for
 * the Store page preview widget. Falls back to an empty list (widget hides
 * itself) when PRINTIFY_API_TOKEN / PRINTIFY_SHOP_ID aren't set, or the API
 * call fails, so the Store page never shows broken or fabricated products.
 */
export async function getPrintifyProducts(limit = 4): Promise<PrintifyProduct[]> {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;
  if (!token || !shopId) return [];

  try {
    const res = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json?limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];

    const data = (await res.json()) as { data: PrintifyApiProduct[] };
    return data.data
      .filter((product) => product.visible && product.images.length > 0)
      .slice(0, limit)
      .map(toPrintifyProduct);
  } catch {
    return [];
  }
}

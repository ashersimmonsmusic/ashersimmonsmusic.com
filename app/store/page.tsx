import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { Badge } from "@/components/ui/badge";
import { products, formatPrice } from "@/lib/commerce/products";

export const metadata: Metadata = {
  title: "Store",
  description: "Digital music, beat packs and exclusive releases from Asher Simmons — coming soon.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Store</Eyebrow>
      <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
        Store
      </h1>
      <p className="mt-6 max-w-xl text-sea-mist">
        Digital albums, singles, beat packs and exclusive releases. Checkout
        is being finalised — enquire via{" "}
        <a href="/contact" className="underline hover:text-cobalt">
          contact
        </a>{" "}
        in the meantime.
      </p>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <article key={product.id}>
            <div className="relative">
              <ReleaseArtwork title={product.title} alt={product.title} />
              <Badge className="absolute top-3 left-3 bg-navy/80">
                {product.availability === "coming-soon" ? "Coming Soon" : product.availability}
              </Badge>
            </div>
            <h3 className="font-display mt-4 text-xl font-medium">{product.title}</h3>
            <p className="font-mono-label mt-1 text-sea-mist">{formatPrice(product.priceGBP)}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}

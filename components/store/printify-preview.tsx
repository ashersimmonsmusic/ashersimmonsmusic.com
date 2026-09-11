import Image from "next/image";
import type { PrintifyProduct } from "@/lib/printify/types";
import { siteConfig } from "@/lib/site-config";

export function PrintifyPreview({ products }: { products: PrintifyProduct[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <p className="font-mono-label text-paper-dim">From the store</p>
      <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <a
              href={siteConfig.printifyStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-ink-raised">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm text-paper group-hover:text-sun">{product.title}</p>
              {product.price && (
                <p className="font-mono-label mt-1 text-xs text-paper-dim">{product.price}</p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

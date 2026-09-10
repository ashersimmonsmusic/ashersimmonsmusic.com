import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Store",
  description: "Official Asher Simmons merch — shop the store on Printify.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Store</Eyebrow>
      <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
        Merch
      </h1>
      <p className="mt-6 max-w-xl text-paper-dim">
        Official Asher Simmons merchandise, printed to order and shipped
        direct. The full store lives on Printify — head over to browse and
        check out.
      </p>

      <a
        href={siteConfig.printifyStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono-label mt-10 inline-flex items-center gap-2 bg-sun px-6 py-3.5 text-sm font-bold text-sun-ink transition-opacity hover:opacity-90"
      >
        Shop the Store
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </Container>
  );
}

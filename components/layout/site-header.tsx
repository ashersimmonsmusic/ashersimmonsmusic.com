import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Monogram } from "@/components/brand/monogram";

export function SiteHeader() {
  return (
    <header className="hairline sticky top-0 z-40 border-b bg-navy/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" className="text-2xl" aria-label="Asher Simmons — home">
          <Monogram />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {mainNav.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono-label text-[11px] text-sea-mist transition-colors hover:text-cobalt"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="font-mono-label hidden text-[11px] text-sea-mist hover:text-cobalt md:block"
          >
            Contact
          </Link>
          <Link
            href="/music"
            className="font-mono-label hidden bg-gold px-5 py-2.5 text-[11px] font-bold text-navy transition-colors hover:bg-sunlight md:block"
          >
            Listen
            <VisuallyHidden> to Asher Simmons&apos; music</VisuallyHidden>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

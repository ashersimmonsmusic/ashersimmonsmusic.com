import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function SiteHeader() {
  return (
    <header className="hairline sticky top-0 z-40 border-b bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" className="font-display text-lg font-medium tracking-tight">
          Asher Simmons
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {mainNav.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono-label text-[11px] text-paper/80 transition-colors hover:text-sun"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="font-mono-label hidden text-[11px] text-paper/80 hover:text-sun md:block"
          >
            Contact
          </Link>
          <Link
            href="/music"
            className="font-mono-label hidden bg-sun px-5 py-2.5 text-[11px] font-bold text-sun-ink transition-opacity hover:opacity-90 md:block"
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

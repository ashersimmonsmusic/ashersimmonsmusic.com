import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { socialLinks } from "@/lib/data/social";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline border-t bg-ink pb-10">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono-label text-sun">Stay in the loop</p>
            <h2 className="font-display mt-3 max-w-md text-3xl leading-tight font-medium text-balance-pretty">
              New music, shows and studio updates — straight to your inbox.
            </h2>
            <NewsletterForm className="mt-6 max-w-md" />
          </div>

          <div>
            <p className="font-mono-label text-paper-dim">Navigate</p>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sun">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-paper-dim">Follow</p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sun"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 flex flex-col gap-4 border-t pt-6 text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.origin.birthplace} → {siteConfig.origin.base}</p>
        </div>
      </div>
    </footer>
  );
}

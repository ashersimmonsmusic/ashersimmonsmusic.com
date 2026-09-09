import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { socialLinks } from "@/lib/data/social";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Asher Simmons for bookings, production enquiries and press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] font-medium tracking-tight md:text-7xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-sm text-paper-dim">
            Bookings, production enquiries, press or just to say hello — the
            form reaches Asher&apos;s team directly.
          </p>

          <div className="mt-12">
            <p className="font-mono-label mb-4 text-paper-dim">Follow</p>
            <ul className="space-y-2">
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

        <ContactForm />
      </div>
    </Container>
  );
}

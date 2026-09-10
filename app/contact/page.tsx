import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialIcons } from "@/components/brand/social-icons";

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
            Bookings, production enquiries, press or just to say hello. The
            form reaches Asher&apos;s team directly.
          </p>

          <div className="mt-12">
            <p className="font-mono-label mb-4 text-paper-dim">Follow</p>
            <SocialIcons />
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}

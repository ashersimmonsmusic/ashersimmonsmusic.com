import { Container, Eyebrow } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/motion/reveal";

export function NewsletterSection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="text-center">Newsletter</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-6xl">
            Don&apos;t miss a drop.
          </h2>
          <p className="mt-4 text-paper-dim">
            New releases, studio sessions and show announcements — no spam, unsubscribe anytime.
          </p>
          <NewsletterForm className="mx-auto mt-8 max-w-md text-left" />
        </Reveal>
      </Container>
    </section>
  );
}

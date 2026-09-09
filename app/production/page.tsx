import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ServiceCard } from "@/components/production/service-card";
import { ContactForm } from "@/components/forms/contact-form";
import { getServices } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Production",
  description:
    "Production, beatmaking, sound engineering and creative direction from Asher Simmons — Caribbean producer and sound engineer based in Bristol.",
  alternates: { canonical: "/production" },
};

export default async function ProductionPage() {
  const services = await getServices();

  return (
    <>
      <Container className="py-16 md:py-24">
        <Eyebrow>Behind the Board</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
          Production &amp; Engineering
        </h1>
        <p className="mt-6 max-w-xl text-paper-dim">
          Asher builds records from the ground up — production, beatmaking,
          sound engineering and creative direction, all under one roof.
        </p>

        <div className="mt-16">
          {services.map((service, i) => (
            <ServiceCard key={service._id} service={service} index={i} />
          ))}
        </div>
      </Container>

      <section className="section-paper border-t border-line-on-paper py-16 md:py-24">
        <Container className="max-w-2xl">
          <Eyebrow>Work with Asher</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Start an enquiry
          </h2>
          <p className="mt-4 text-current/70">
            Tell us about your project — production, mixing, a beat license
            or something else entirely.
          </p>
          <div className="mt-10">
            <ContactForm defaultSubject="production" />
          </div>
        </Container>
      </section>
    </>
  );
}

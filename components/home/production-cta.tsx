import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function ProductionCta() {
  return (
    <section className="border-b border-line bg-navy py-20 md:py-28">
      <Container>
        <Reveal>
          <Link href="/production" className="group block">
            <p className="font-mono-label text-eyebrow text-gold">Behind the board</p>
            <h2 className="font-display mt-4 flex flex-wrap items-center gap-4 text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              Production. Beatmaking.
              <br />
              Sound Engineering.
              <ArrowUpRight
                className="size-10 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-2 group-hover:-translate-y-2 sm:size-14"
                aria-hidden
              />
            </h2>
            <p className="mt-6 max-w-xl text-sea-mist">
              Asher works behind the board as much as in front of the mic —
              available for production, beatmaking, mixing and creative
              direction.
            </p>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

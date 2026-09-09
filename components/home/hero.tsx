import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PlayReleaseButton } from "@/components/music/play-button";
import type { Release } from "@/lib/types";

export function Hero({ featuredRelease }: { featuredRelease: Release }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-14 pb-20 md:pt-24 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 64px, rgba(242,236,221,0.03) 64px, rgba(242,236,221,0.03) 65px)",
        }}
      />

      <Container className="relative">
        <p className="font-mono-label text-sun">Dundas Town, Abaco → Bristol, UK</p>

        <h1 className="font-display mt-6 text-[15vw] leading-[0.86] font-medium tracking-tight text-balance-pretty sm:text-[13vw] lg:text-[9.5vw]">
          Asher
          <br />
          <span className="italic">Simmons</span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-lg text-paper-dim md:text-xl">
            Caribbean rapper, producer &amp; sound engineer. Hip-Hop and Afrobeat,
            built without a genre ceiling — writing, producing, engineering and
            performing every record from the ground up.
          </p>

          <div className="flex items-center gap-4">
            <PlayReleaseButton release={featuredRelease} size="lg" />
            <div>
              <p className="font-mono-label text-paper-dim">Now playing</p>
              <p className="font-display text-lg">{featuredRelease.title}</p>
            </div>
          </div>
        </div>

        <Link
          href="/about"
          className="font-mono-label mt-16 inline-flex items-center gap-2 text-paper/70 hover:text-sun"
        >
          The story so far
          <ArrowDownRight className="size-4" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}

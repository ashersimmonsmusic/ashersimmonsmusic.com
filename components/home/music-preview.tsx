import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { ReleaseCard } from "@/components/releases/release-card";
import { Reveal } from "@/components/motion/reveal";
import type { Release } from "@/lib/types";

export function MusicPreview({ releases }: { releases: Release[] }) {
  return (
    <section className="section-paper border-b border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Discography</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">
              Selected releases
            </h2>
          </Reveal>
          <Link href="/music" className="font-mono-label border-b border-current pb-0.5 hover:text-sea">
            View all music
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {releases.map((release, i) => (
            <Reveal key={release._id} delay={i * 0.05}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

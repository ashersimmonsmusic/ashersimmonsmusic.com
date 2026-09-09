import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function ArtistStatement({ statement }: { statement: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Artist Statement</Eyebrow>
          <blockquote className="font-display mt-8 max-w-4xl text-3xl leading-[1.15] font-medium text-balance-pretty italic md:text-5xl">
            &ldquo;{statement}&rdquo;
          </blockquote>
          <Link
            href="/about"
            className="font-mono-label mt-10 inline-block border-b border-current pb-0.5 hover:text-sun"
          >
            Read the full story
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

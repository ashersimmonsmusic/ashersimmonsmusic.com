import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { ReleaseCard } from "@/components/releases/release-card";
import { getReleases } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Listen to releases from Asher Simmons — Caribbean rapper and producer moving between Hip-Hop and Afrobeat.",
  alternates: { canonical: "/music" },
};

export default async function MusicPage() {
  const releases = await getReleases();

  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Discography</Eyebrow>
      <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
        Music
      </h1>
      <p className="mt-6 max-w-xl text-paper-dim">
        Every release, from loosies to full projects — Hip-Hop and Afrobeat,
        produced, engineered and written by Asher.
      </p>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
        {releases.map((release) => (
          <ReleaseCard key={release._id} release={release} />
        ))}
      </div>
    </Container>
  );
}

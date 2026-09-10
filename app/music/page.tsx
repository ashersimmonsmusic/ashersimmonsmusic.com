import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { UntitledTrackEmbed } from "@/components/music/untitled-track-embed";
import { releaseMeta } from "@/lib/utils";
import { getReleases } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Listen to releases from Asher Simmons, Caribbean rapper and producer moving between Hip-Hop and Afrobeat.",
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
        Every release, from loosies to full projects: Hip-Hop and Afrobeat,
        produced, engineered and written by Asher. Streaming live below.
      </p>

      <ul className="hairline mt-16 divide-y divide-line border-t">
        {releases.map((release) => (
          <li key={release._id} className="py-10">
            <Link href={`/release/${release.slug}`} className="group inline-block">
              <h2 className="font-display text-3xl font-medium tracking-tight group-hover:text-sun md:text-4xl">
                {release.title}
              </h2>
            </Link>
            <p className="font-mono-label mt-1 text-paper-dim">{releaseMeta(release)}</p>

            {release.untitledEmbedId && (
              <div className="mt-6 max-w-xl">
                <UntitledTrackEmbed embedId={release.untitledEmbedId} title={release.title} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}

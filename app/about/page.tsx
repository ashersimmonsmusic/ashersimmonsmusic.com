import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { Portrait } from "@/components/about/portrait";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { getArtistProfile } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Asher Simmons — Caribbean rapper, producer and sound engineer, born in Dundas Town, Abaco, Bahamas, now based in Bristol, UK.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const artist = await getArtistProfile();
  const paragraphs = artist.bio.split("\n\n").filter(Boolean);

  return (
    <Container className="py-16 md:py-24">
      <PersonJsonLd bio={artist.bioShort} />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Eyebrow>About</Eyebrow>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] font-medium tracking-tight md:text-7xl">
            Bahamas
            <br />
            <span className="italic">to Bristol.</span>
          </h1>
          <div className="mt-10">
            <Portrait url={artist.portrait?.url} alt={artist.portrait?.alt ?? artist.name} />
          </div>
          <dl className="font-mono-label mt-8 space-y-4 text-paper-dim">
            <div className="flex justify-between border-t border-line pt-3">
              <dt>Born</dt>
              <dd className="text-right">{artist.birthplace}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt>Based</dt>
              <dd className="text-right">{artist.base}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt>Focus</dt>
              <dd className="text-right">Hip-Hop, Afrobeat</dd>
            </div>
            <div className="flex justify-between border-t border-line pb-3 pt-3">
              <dt>Roles</dt>
              <dd className="text-right">Rapper, Producer, Engineer</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-paper-dim">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "font-display text-2xl text-paper md:text-3xl" : undefined}>
              {paragraph}
            </p>
          ))}

          <div className="mt-14">
            <h2 className="font-mono-label mb-6 text-paper-dim">On stage</h2>
            <ul className="hairline grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-3">
              {artist.achievements.map((achievement) => (
                <li key={achievement._id}>
                  <p className="font-display text-lg text-paper">{achievement.label}</p>
                  {achievement.detail && (
                    <p className="font-mono-label text-paper-dim">{achievement.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

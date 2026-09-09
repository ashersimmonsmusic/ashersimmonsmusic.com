import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui/container";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { PlayReleaseButton } from "@/components/music/play-button";
import { Tracklist } from "@/components/releases/tracklist";
import { ExternalLinks } from "@/components/releases/external-links";
import { UntitledTrackEmbed } from "@/components/music/untitled-track-embed";
import { formatDate } from "@/lib/utils";
import { getReleaseBySlug, getReleases } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata(props: PageProps<"/release/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const release = await getReleaseBySlug(slug);
  if (!release) return {};

  return {
    title: release.title,
    description:
      release.description || `${release.title} — ${release.releaseType} by Asher Simmons.`,
    alternates: { canonical: `/release/${release.slug}` },
    openGraph: {
      title: release.title,
      description: release.description,
      images: release.artwork.url ? [{ url: release.artwork.url }] : undefined,
    },
  };
}

export default async function ReleasePage(props: PageProps<"/release/[slug]">) {
  const { slug } = await props.params;
  const release = await getReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <div>
          <ReleaseArtwork
            title={release.title}
            url={release.artwork.url}
            alt={release.artwork.alt}
            priority
            sizes="(min-width: 1024px) 420px, 100vw"
          />
          {release.untitledEmbedId ? (
            <UntitledTrackEmbed
              embedId={release.untitledEmbedId}
              title={release.title}
              className="mt-6"
            />
          ) : (
            <div className="mt-6 flex items-center gap-5">
              <PlayReleaseButton release={release} size="lg" />
              <ExternalLinks links={release.links} />
            </div>
          )}
          {release.untitledEmbedId && (
            <div className="mt-5">
              <ExternalLinks links={release.links} />
            </div>
          )}
        </div>

        <div>
          <Eyebrow>{release.releaseType}</Eyebrow>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] font-medium tracking-tight md:text-7xl">
            {release.title}
          </h1>
          <p className="font-mono-label mt-4 text-paper-dim">{formatDate(release.releaseDate)}</p>

          {release.description && (
            <p className="mt-8 max-w-xl text-lg text-paper-dim">{release.description}</p>
          )}

          <div className="mt-12">
            <h2 className="font-mono-label mb-4 text-paper-dim">Tracklist</h2>
            <Tracklist release={release} />
          </div>

          {release.credits && release.credits.length > 0 && (
            <div className="mt-12">
              <h2 className="font-mono-label mb-4 text-paper-dim">Credits</h2>
              <ul className="space-y-1 text-paper-dim">
                {release.credits.map((credit) => (
                  <li key={credit}>{credit}</li>
                ))}
              </ul>
            </div>
          )}

          {release.lyrics && (
            <div className="mt-12">
              <h2 className="font-mono-label mb-4 text-paper-dim">Lyrics</h2>
              <p className="max-w-xl whitespace-pre-line text-paper-dim">{release.lyrics}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

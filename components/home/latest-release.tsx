import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { PlayReleaseButton } from "@/components/music/play-button";
import { UntitledTrackEmbed } from "@/components/music/untitled-track-embed";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";
import type { Release } from "@/lib/types";

export function LatestRelease({ release }: { release: Release }) {
  // Skip the artwork placeholder when a real player already fills that
  // visual role — a "TBA" box next to a working embed looks unfinished.
  const showArtwork = Boolean(release.artwork.url) || !release.untitledEmbedId;

  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow>Latest Release</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            {showArtwork && (
              <ReleaseArtwork
                title={release.title}
                url={release.artwork.url}
                alt={release.artwork.alt}
                className="w-full max-w-xl"
                priority
              />
            )}
            {release.untitledEmbedId && (
              <UntitledTrackEmbed
                embedId={release.untitledEmbedId}
                title={release.title}
                className={showArtwork ? "mt-6 w-full max-w-xl" : "w-full max-w-xl"}
              />
            )}
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="font-mono-label text-paper-dim">
              {release.releaseType} · {formatDate(release.releaseDate)}
            </p>
            <h2 className="font-display mt-4 text-5xl leading-[0.95] font-medium tracking-tight md:text-6xl">
              {release.title}
            </h2>
            {release.description && (
              <p className="mt-6 max-w-md text-paper-dim">{release.description}</p>
            )}
            <div className="mt-8 flex items-center gap-5">
              {!release.untitledEmbedId && <PlayReleaseButton release={release} />}
              <Link
                href={`/release/${release.slug}`}
                className="font-mono-label border-b border-current pb-0.5 hover:text-sun"
              >
                View release
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

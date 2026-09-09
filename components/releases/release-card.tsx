import Link from "next/link";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { PlayReleaseButton } from "@/components/music/play-button";
import { formatDate } from "@/lib/utils";
import type { Release } from "@/lib/types";

export function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="group relative">
      <div className="relative">
        <Link href={`/release/${release.slug}`} className="block">
          <ReleaseArtwork title={release.title} url={release.artwork.url} alt={release.artwork.alt} />
        </Link>
        <div className="absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <PlayReleaseButton release={release} />
        </div>
      </div>
      <Link href={`/release/${release.slug}`} className="mt-4 block">
        <h3 className="font-display text-xl font-medium group-hover:text-cobalt">{release.title}</h3>
        <p className="font-mono-label mt-1 text-sea-mist">
          {release.releaseType} · {formatDate(release.releaseDate)}
        </p>
      </Link>
    </article>
  );
}

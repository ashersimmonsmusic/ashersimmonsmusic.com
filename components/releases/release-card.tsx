import Link from "next/link";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { releaseMeta } from "@/lib/utils";
import type { Release } from "@/lib/types";

export function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="group">
      <Link href={`/release/${release.slug}`} className="block">
        <ReleaseArtwork title={release.title} url={release.artwork.url} alt={release.artwork.alt} />
      </Link>
      <Link href={`/release/${release.slug}`} className="mt-4 block">
        <h3 className="font-display text-xl font-medium group-hover:text-sun">{release.title}</h3>
        <p className="font-mono-label mt-1 text-paper-dim">{releaseMeta(release)}</p>
      </Link>
    </article>
  );
}

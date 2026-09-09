import type { Release } from "@/lib/types";
import type { PlayerTrack } from "@/lib/music/types";

/** Builds a player queue from a release. Falls back to a single "track" representing the release itself when no tracklist has been entered yet. */
export function releaseToQueue(release: Release): PlayerTrack[] {
  if (release.tracklist.length === 0) {
    return [
      {
        id: release._id,
        title: release.title,
        releaseTitle: release.title,
        releaseSlug: release.slug,
        artworkUrl: release.artwork.url,
        previewAudioUrl: undefined,
      },
    ];
  }

  return release.tracklist
    .slice()
    .sort((a, b) => a.trackNumber - b.trackNumber)
    .map((track) => ({
      id: track._id,
      title: track.title,
      releaseTitle: release.title,
      releaseSlug: release.slug,
      artworkUrl: release.artwork.url,
      previewAudioUrl: track.previewAudioUrl,
      duration: track.duration,
    }));
}

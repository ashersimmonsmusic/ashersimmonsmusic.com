"use client";

import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/music/player-context";
import { releaseToQueue } from "@/lib/music/queue";
import type { Release } from "@/lib/types";

export function Tracklist({ release }: { release: Release }) {
  const { state, currentTrack, playQueue, togglePlay } = usePlayer();

  if (release.tracklist.length === 0) {
    return <p className="text-sea-mist">Tracklist to be announced.</p>;
  }

  return (
    <ol className="hairline divide-y divide-line border-t">
      {release.tracklist
        .slice()
        .sort((a, b) => a.trackNumber - b.trackNumber)
        .map((track, i) => {
          const isCurrent = currentTrack?.id === track._id;
          const isPlaying = isCurrent && state.isPlaying;
          const hasAudio = Boolean(track.previewAudioUrl);

          return (
            <li key={track._id} className="flex items-center gap-4 py-4">
              <button
                type="button"
                onClick={() =>
                  isCurrent ? togglePlay() : playQueue(releaseToQueue(release), i)
                }
                disabled={!hasAudio}
                aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                className="flex size-9 shrink-0 items-center justify-center border border-current/30 text-current disabled:opacity-30"
              >
                {isPlaying ? (
                  <Pause className="size-3.5" fill="currentColor" />
                ) : (
                  <Play className="ml-0.5 size-3.5" fill="currentColor" />
                )}
              </button>
              <span className="font-mono-label w-6 text-current/50">
                {String(track.trackNumber).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="font-medium">{track.title}</span>
                {track.featuredArtists && track.featuredArtists.length > 0 && (
                  <span className="text-current/60"> feat. {track.featuredArtists.join(", ")}</span>
                )}
              </span>
              <span className="font-mono-label text-current/50">
                {track.duration ?? "—:—"}
              </span>
            </li>
          );
        })}
    </ol>
  );
}

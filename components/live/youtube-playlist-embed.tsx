"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-load embed for a full YouTube playlist. No thumbnail image is
 * fetched (that would require calling YouTube's API), so this shows a
 * branded placeholder card until pressed, then swaps in the native
 * playlist player.
 */
export function YouTubePlaylistEmbed({
  playlistId,
  title,
  className,
}: {
  playlistId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = React.useState(false);

  if (playing) {
    return (
      <div className={cn("relative aspect-video overflow-hidden bg-ink-raised", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={cn(
        "group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-ink-raised",
        className,
      )}
      aria-label={`Play playlist: ${title}`}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 22px, rgba(242,236,221,0.05) 22px, rgba(242,236,221,0.05) 23px)",
        }}
      />
      <span className="relative flex flex-col items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-sun text-sun-ink transition-transform duration-200 ease-[var(--ease-editorial)] group-hover:scale-105">
          <Play className="ml-1 size-6" fill="currentColor" />
        </span>
        <span className="font-mono-label text-paper-dim">{title}</span>
      </span>
    </button>
  );
}

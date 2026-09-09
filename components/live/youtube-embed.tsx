"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeId, youtubeThumbnailUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";
import type { LiveVideo } from "@/lib/types";

/**
 * Lightweight YouTube embed: renders only a thumbnail + play button until
 * clicked, so a page with several videos doesn't load YouTube's iframe
 * (and its JS) for every one on first paint.
 */
export function YouTubeEmbed({ video, className }: { video: LiveVideo; className?: string }) {
  const [playing, setPlaying] = React.useState(false);
  const videoId = getYouTubeId(video.youtubeUrl);

  if (!videoId) return null;

  if (playing) {
    return (
      <div className={cn("relative aspect-video overflow-hidden bg-deep-water", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={video.title}
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
        "group relative aspect-video w-full overflow-hidden bg-deep-water text-left",
        className,
      )}
      aria-label={`Play video: ${video.title}`}
    >
      <Image
        src={youtubeThumbnailUrl(videoId)}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-navy/20 transition-colors group-hover:bg-navy/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-cobalt text-bone transition-colors duration-200 ease-[var(--ease-brand)] group-hover:bg-caribbean">
          <Play className="ml-1 size-6" fill="currentColor" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-4">
        <span className="font-medium text-bone">{video.title}</span>
        {(video.venue || video.date) && (
          <span className="font-mono-label mt-0.5 block text-sea-mist">
            {[video.venue, video.date].filter(Boolean).join(" · ")}
          </span>
        )}
      </span>
    </button>
  );
}

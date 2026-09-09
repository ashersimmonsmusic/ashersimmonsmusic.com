"use client";

import { Pause, Play } from "lucide-react";
import { usePlayer } from "@/components/music/player-context";
import type { Release } from "@/lib/types";
import { releaseToQueue } from "@/lib/music/queue";
import { cn } from "@/lib/utils";

export function PlayReleaseButton({
  release,
  className,
  size = "default",
}: {
  release: Release;
  className?: string;
  size?: "default" | "lg";
}) {
  const { state, currentTrack, playQueue, togglePlay } = usePlayer();
  const isCurrent = currentTrack?.releaseSlug === release.slug;
  const isPlaying = isCurrent && state.isPlaying;

  function handleClick() {
    if (isCurrent) {
      togglePlay();
      return;
    }
    playQueue(releaseToQueue(release));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPlaying ? `Pause ${release.title}` : `Play ${release.title}`}
      className={cn(
        "flex items-center justify-center rounded-full bg-cobalt text-bone transition-colors duration-200 ease-[var(--ease-brand)] hover:bg-caribbean",
        size === "lg" ? "size-16" : "size-11",
        className,
      )}
    >
      {isPlaying ? (
        <Pause className={size === "lg" ? "size-6" : "size-4"} fill="currentColor" />
      ) : (
        <Play className={cn("ml-0.5", size === "lg" ? "size-6" : "size-4")} fill="currentColor" />
      )}
    </button>
  );
}

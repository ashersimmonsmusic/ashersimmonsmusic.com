"use client";

import Link from "next/link";
import { Pause, Play, SkipBack, SkipForward, Volume1, VolumeX, X } from "lucide-react";
import { usePlayer } from "@/components/music/player-context";
import { ReleaseArtwork } from "@/components/releases/artwork";
import { formatTime } from "@/lib/utils";

export function GlobalPlayer() {
  const { state, currentTrack, togglePlay, next, previous, seek, setVolume, close } = usePlayer();

  if (!state.isOpen || !currentTrack) return null;

  const hasAudio = Boolean(currentTrack.previewAudioUrl);

  return (
    <div
      role="region"
      aria-label="Music player"
      className="hairline fixed inset-x-0 bottom-0 z-50 border-t bg-ink/95 backdrop-blur"
    >
      <div className="flex items-center gap-3 px-4 py-3 md:gap-6 md:px-8">
        <Link
          href={`/release/${currentTrack.releaseSlug}`}
          className="flex shrink-0 items-center gap-3 group"
        >
          <ReleaseArtwork
            title={currentTrack.releaseTitle}
            url={currentTrack.artworkUrl}
            alt={currentTrack.releaseTitle}
            className="h-12 w-12"
            sizes="48px"
          />
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm font-medium group-hover:text-sun">
              {currentTrack.title}
            </span>
            <span className="font-mono-label truncate text-[10px] text-paper-dim">
              {currentTrack.releaseTitle}
            </span>
          </span>
        </Link>

        <div className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous track"
              className="text-paper/70 hover:text-sun disabled:opacity-30"
              disabled={state.queue.length < 2}
            >
              <SkipBack className="size-4" fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={state.isPlaying ? "Pause" : hasAudio ? "Play" : "Preview unavailable"}
              disabled={!hasAudio}
              className="flex size-10 items-center justify-center rounded-full bg-sun text-sun-ink disabled:opacity-30"
            >
              {state.isPlaying ? (
                <Pause className="size-4" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 size-4" fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next track"
              className="text-paper/70 hover:text-sun disabled:opacity-30"
              disabled={state.queue.length < 2}
            >
              <SkipForward className="size-4" fill="currentColor" />
            </button>
          </div>

          <div className="hidden w-full max-w-lg items-center gap-2 md:flex">
            <span className="font-mono-label w-9 text-right text-[10px] text-paper-dim">
              {formatTime(state.currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={state.duration || 0}
              value={state.currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!hasAudio}
              aria-label="Seek"
              className="player-range h-1 flex-1 accent-sun disabled:opacity-30"
            />
            <span className="font-mono-label w-9 text-[10px] text-paper-dim">
              {hasAudio ? formatTime(state.duration) : "—:—"}
            </span>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {state.volume === 0 ? (
            <VolumeX className="size-4 text-paper-dim" />
          ) : (
            <Volume1 className="size-4 text-paper-dim" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={state.volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="player-range h-1 w-20 accent-sun"
          />
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close player"
          className="shrink-0 text-paper/50 hover:text-sun"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

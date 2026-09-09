"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { untitledStreamProfile } from "@/lib/data/streaming";

/**
 * Click-to-load embed for Asher's Untitled profile — the site's actual
 * listening surface on /music. Shows a branded placeholder card until
 * pressed (avoids loading a third-party iframe on first paint), then swaps
 * in the live player. The "Open on Untitled" link stays visible either way,
 * as a fallback if the embed itself doesn't render for a given visitor.
 */
export function UntitledStreamEmbed({ className }: { className?: string }) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {playing ? (
        <div className="relative h-[480px] w-full overflow-hidden bg-ink-raised md:h-[640px]">
          <iframe
            src={untitledStreamProfile.url}
            title="Asher Simmons on Untitled"
            allow="autoplay; encrypted-media; clipboard-write"
            loading="lazy"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-ink-raised md:h-[520px]"
          aria-label="Load the Untitled player"
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
            <span className="font-mono-label text-paper-dim">Load the player</span>
          </span>
        </button>
      )}

      <a
        href={untitledStreamProfile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono-label self-start border-b border-current pb-0.5 hover:text-sun"
      >
        Open on Untitled ↗
      </a>
    </div>
  );
}

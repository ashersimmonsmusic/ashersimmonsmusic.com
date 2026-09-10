import Image from "next/image";
import { cn } from "@/lib/utils";
import { RouteMotif } from "@/components/brand/route-motif";

function initials(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

/** Deterministic per-title variation so a grid of placeholders doesn't read as one repeated tile. */
function motifTransform(title: string) {
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rotations = [0, 90, 180, 270];
  const rotate = rotations[hash % rotations.length];
  const flip = hash % 2 === 0 ? -1 : 1;
  return `rotate(${rotate}deg) scaleX(${flip})`;
}

export function ReleaseArtwork({
  title,
  url,
  alt,
  className,
  priority,
  sizes,
}: {
  title: string;
  url?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (url) {
    return (
      <div className={cn("relative aspect-square overflow-hidden bg-ink-raised", className)}>
        <Image
          src={url}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden bg-ink-raised",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <RouteMotif
        className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-paper/[0.08]"
        style={{ transform: motifTransform(title) }}
      />
      <span className="font-display relative text-[18vw] leading-none font-black text-paper/15 select-none lg:text-[4.5vw]">
        {initials(title)}
      </span>
    </div>
  );
}

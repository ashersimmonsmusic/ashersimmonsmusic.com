import Image from "next/image";
import { cn } from "@/lib/utils";

function initials(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
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
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 22px, rgba(242,236,221,0.05) 22px, rgba(242,236,221,0.05) 23px)",
        }}
      />
      <span className="font-display relative text-[18vw] leading-none font-black text-paper/15 select-none lg:text-[4.5vw]">
        {initials(title)}
      </span>
      <span className="font-mono-label absolute bottom-3 left-3 text-[9px] text-paper/40">
        Artwork TBA
      </span>
    </div>
  );
}

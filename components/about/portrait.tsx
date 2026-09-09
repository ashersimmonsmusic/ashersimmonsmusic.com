import Image from "next/image";
import { cn } from "@/lib/utils";

export function Portrait({
  url,
  alt,
  className,
}: {
  url?: string;
  alt: string;
  className?: string;
}) {
  if (!url) {
    return (
      <div
        className={cn("relative aspect-[4/5] bg-deep-water", className)}
        role="img"
        aria-label={alt}
      >
        <span className="font-mono-label absolute bottom-3 left-3 text-[9px] text-bone/40">
          Portrait TBA
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden bg-deep-water", className)}>
      <Image
        src={url}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover object-top grayscale contrast-110"
      />
    </div>
  );
}

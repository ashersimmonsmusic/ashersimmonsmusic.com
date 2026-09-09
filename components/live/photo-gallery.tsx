import Image from "next/image";
import type { LivePhoto } from "@/lib/data/live-photos";

export function PhotoGallery({ photos }: { photos: LivePhoto[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {photos.map((photo) => (
        <li key={photo.id} className="relative aspect-[2/3] overflow-hidden bg-deep-water">
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover grayscale contrast-110 transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}

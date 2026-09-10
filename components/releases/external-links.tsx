import { ExternalLink } from "lucide-react";
import type { ExternalLinks as ExternalLinksType } from "@/lib/types";

const LABELS: Record<keyof ExternalLinksType, string> = {
  spotifyUrl: "Spotify",
  appleMusicUrl: "Apple Music",
  youtubeUrl: "YouTube",
  bandcampUrl: "Bandcamp",
  purchaseUrl: "Buy",
};

export function ExternalLinks({ links }: { links: ExternalLinksType }) {
  const entries = (Object.keys(LABELS) as (keyof ExternalLinksType)[]).filter(
    (key) => links[key],
  );

  if (entries.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {entries.map((key) => (
        <li key={key}>
          <a
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-label inline-flex items-center gap-1.5 border border-current/30 px-4 py-2.5 hover:border-sun hover:text-sun"
          >
            {LABELS[key]}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

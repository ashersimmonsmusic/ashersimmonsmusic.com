import { socialLinks } from "@/lib/data/social";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import type { SocialPlatform } from "@/lib/types";

const ABBR: Record<SocialPlatform, string> = {
  instagram: "IG",
  spotify: "SP",
  "apple-music": "AM",
  youtube: "YT",
  tiktok: "TT",
  bandcamp: "BC",
  twitter: "TW",
};

/**
 * Two-letter mono marks in 38px squares — no brand-coloured glyphs, per the
 * brand book's social icon spec. A tasteful, on-brand stand-in for platform
 * logos that still reads clearly as "follow us here."
 */
export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {socialLinks.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-label flex size-[38px] items-center justify-center border border-current/30 text-[11px] text-current transition-colors hover:border-cobalt hover:text-cobalt"
          >
            {ABBR[link.platform]}
            <VisuallyHidden>{link.label}</VisuallyHidden>
          </a>
        </li>
      ))}
    </ul>
  );
}

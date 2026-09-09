import type { SocialLink } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

export const socialLinks: SocialLink[] = [
  { platform: "instagram", url: siteConfig.social.instagram, label: "Instagram" },
  { platform: "spotify", url: siteConfig.social.spotify, label: "Spotify" },
  {
    platform: "apple-music",
    url: siteConfig.social.appleMusic,
    label: "Apple Music",
  },
  { platform: "youtube", url: siteConfig.social.youtube, label: "YouTube" },
  { platform: "tiktok", url: siteConfig.social.tiktok, label: "TikTok" },
  { platform: "bandcamp", url: siteConfig.social.bandcamp, label: "Bandcamp" },
];

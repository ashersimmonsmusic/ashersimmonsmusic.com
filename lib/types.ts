// Shared content types. These mirror the Sanity schemas in /sanity/schemas
// so the same shapes can be served from Sanity or from local placeholder
// data (see lib/data) while the CMS is being populated.

export type SanityImage = {
  /** Sanity asset reference or a static path under /public when placeholder. */
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ReleaseType =
  | "single"
  | "ep"
  | "album"
  | "mixtape"
  | "feature"
  | "loosie";

export type ExternalLinks = {
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
  purchaseUrl?: string;
};

export type Track = {
  _id: string;
  title: string;
  trackNumber: number;
  duration?: string; // e.g. "3:24" — placeholder until confirmed
  /** Short-form preview audio, later backed by Supabase Storage. Absent = no preview available yet. */
  previewAudioUrl?: string;
  lyrics?: string;
  credits?: string[];
  featuredArtists?: string[];
};

export type Release = {
  _id: string;
  slug: string;
  title: string;
  releaseType: ReleaseType;
  releaseDate?: string; // ISO date, undefined = unannounced
  artwork: SanityImage;
  description?: string;
  tracklist: Track[];
  credits?: string[];
  lyrics?: string;
  featured?: boolean;
  links: ExternalLinks;
};

export type EventStatus = "confirmed" | "postponed" | "cancelled" | "sold-out";

export type LiveEvent = {
  _id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  status: EventStatus;
};

export type LiveVideo = {
  _id: string;
  title: string;
  youtubeUrl: string;
  venue?: string;
  date?: string;
};

export type ServiceCategory =
  | "production"
  | "beatmaking"
  | "sound-engineering"
  | "creative-direction";

export type Service = {
  _id: string;
  category: ServiceCategory;
  title: string;
  summary: string;
  description: string;
};

export type Article = {
  _id: string;
  slug: string;
  title: string;
  publication?: string;
  date?: string;
  excerpt?: string;
  url?: string;
};

export type PressMention = {
  _id: string;
  outlet: string;
  quote?: string;
  url?: string;
  logo?: SanityImage;
};

export type SocialPlatform =
  | "instagram"
  | "spotify"
  | "apple-music"
  | "youtube"
  | "tiktok"
  | "bandcamp"
  | "twitter";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  label: string;
};

export type Achievement = {
  _id: string;
  label: string;
  detail?: string;
};

export type ArtistProfile = {
  name: string;
  tagline: string;
  bio: string;
  bioShort: string;
  /** Literal country of birth. */
  birthplace: string;
  /** Where the artist grew up / identifies as from — distinct from birthplace. */
  raisedIn: string;
  base: string;
  portrait?: SanityImage;
  achievements: Achievement[];
};

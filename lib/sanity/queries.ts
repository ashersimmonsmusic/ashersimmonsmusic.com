import { sanityClient, isSanityConfigured, urlForImage } from "@/lib/sanity/client";
import type {
  ArtistProfile,
  Article,
  LiveEvent,
  PressMention,
  Release,
  Service,
  SocialLink,
} from "@/lib/types";
import { releases as localReleases } from "@/lib/data/releases";
import { artistProfile as localArtistProfile } from "@/lib/data/artist";
import { events as localEvents } from "@/lib/data/events";
import { services as localServices } from "@/lib/data/services";
import { pressMentions as localPressMentions } from "@/lib/data/press";
import { socialLinks as localSocialLinks } from "@/lib/data/social";

// Each getter reads from Sanity when a project is connected, and otherwise
// falls back to the local placeholder content in lib/data. This keeps every
// page CMS-ready without requiring live credentials to build the MVP.

type SanityImageSource = { asset?: { _ref?: string }; alt?: string } | null | undefined;

function resolveImage(image: SanityImageSource, fallbackAlt: string) {
  const resolved = urlForImage(image);
  return {
    url: resolved ? resolved.url() : "",
    alt: image?.alt || fallbackAlt,
  };
}

export async function getReleases(): Promise<Release[]> {
  if (!isSanityConfigured || !sanityClient) return localReleases;
  const query = `*[_type == "release"] | order(releaseDate desc){
    _id, "slug": slug.current, title, releaseType, releaseDate, artwork,
    description, tracklist, credits, lyrics, featured, links
  }`;
  const docs = await sanityClient.fetch(query);
  return docs.map((doc: Record<string, unknown>) => ({
    ...doc,
    artwork: resolveImage(doc.artwork as SanityImageSource, `${doc.title} artwork`),
  })) as Release[];
}

export async function getReleaseBySlug(slug: string): Promise<Release | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return localReleases.find((release) => release.slug === slug);
  }
  const query = `*[_type == "release" && slug.current == $slug][0]{
    _id, "slug": slug.current, title, releaseType, releaseDate, artwork,
    description, tracklist, credits, lyrics, featured, links
  }`;
  const doc = await sanityClient.fetch(query, { slug });
  if (!doc) return undefined;
  return {
    ...doc,
    artwork: resolveImage(doc.artwork, `${doc.title} artwork`),
  } as Release;
}

export async function getArtistProfile(): Promise<ArtistProfile> {
  if (!isSanityConfigured || !sanityClient) return localArtistProfile;
  const query = `*[_type == "artist"][0]{
    name, tagline, bioShort, bio, birthplace, raisedIn, base, portrait, achievements
  }`;
  const doc = await sanityClient.fetch(query);
  if (!doc) return localArtistProfile;
  return {
    ...doc,
    portrait: resolveImage(doc.portrait, `Portrait of ${doc.name}`),
  } as ArtistProfile;
}

export async function getLiveEvents(): Promise<LiveEvent[]> {
  if (!isSanityConfigured || !sanityClient) return localEvents;
  const query = `*[_type == "event"] | order(date asc){
    _id, name, date, venue, city, ticketUrl, status
  }`;
  return sanityClient.fetch(query);
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured || !sanityClient) return localServices;
  const query = `*[_type == "service"]{ _id, category, title, summary, description }`;
  return sanityClient.fetch(query);
}

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured || !sanityClient) return [];
  const query = `*[_type == "article"] | order(date desc){
    _id, "slug": slug.current, title, publication, date, excerpt, url
  }`;
  return sanityClient.fetch(query);
}

export async function getPressMentions(): Promise<PressMention[]> {
  if (!isSanityConfigured || !sanityClient) return localPressMentions;
  const query = `*[_type == "pressMention"]{ _id, outlet, quote, url, logo }`;
  return sanityClient.fetch(query);
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!isSanityConfigured || !sanityClient) return localSocialLinks;
  const query = `*[_type == "socialLink"]{ platform, url, label }`;
  return sanityClient.fetch(query);
}

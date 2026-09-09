import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { LatestRelease } from "@/components/home/latest-release";
import { MusicPreview } from "@/components/home/music-preview";
import { ArtistStatement } from "@/components/home/artist-statement";
import { Achievements } from "@/components/home/achievements";
import { ProductionCta } from "@/components/home/production-cta";
import { LivePreview } from "@/components/home/live-preview";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ArtistJsonLd } from "@/components/seo/json-ld";
import { getReleases, getArtistProfile, getLiveEvents } from "@/lib/sanity/queries";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [releases, artist, events] = await Promise.all([
    getReleases(),
    getArtistProfile(),
    getLiveEvents(),
  ]);

  const featuredRelease = releases.find((release) => release.featured) ?? releases[0];
  const otherReleases = releases.filter((release) => release._id !== featuredRelease._id).slice(0, 4);

  return (
    <>
      <ArtistJsonLd />
      <Hero featuredRelease={featuredRelease} />
      <LatestRelease release={featuredRelease} />
      <MusicPreview releases={otherReleases.length > 0 ? otherReleases : releases.slice(0, 4)} />
      <ArtistStatement statement={artist.bioShort} />
      <Achievements achievements={artist.achievements} />
      <ProductionCta />
      <LivePreview events={events} />
      <NewsletterSection />
    </>
  );
}

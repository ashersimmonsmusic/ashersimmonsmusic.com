import { siteConfig } from "@/lib/site-config";

export function PersonJsonLd({ bio }: { bio: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    description: bio,
    jobTitle: ["Rapper", "Producer", "Sound Engineer", "Songwriter", "Beatmaker"],
    birthPlace: siteConfig.origin.birthplace,
    homeLocation: {
      "@type": "Place",
      name: siteConfig.origin.base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function ArtistJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: siteConfig.name,
    url: siteConfig.url,
    genre: ["Hip-Hop", "Afrobeat"],
    foundingLocation: {
      "@type": "Place",
      name: siteConfig.origin.birthplace,
    },
    location: {
      "@type": "Place",
      name: siteConfig.origin.base,
    },
    member: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: ["Rapper", "Producer", "Sound Engineer", "Songwriter", "Beatmaker"],
      birthPlace: siteConfig.origin.birthplace,
      homeLocation: siteConfig.origin.base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

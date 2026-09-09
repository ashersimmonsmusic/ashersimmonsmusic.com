import type { Release } from "@/lib/types";

// Placeholder content architecture. Release dates, credits, tracklists and
// external URLs have not been supplied — fields are intentionally left
// undefined/empty rather than invented. Once Sanity is populated, this file
// is superseded by lib/sanity/queries.ts.

export const releases: Release[] = [
  {
    _id: "open-letters-to-god",
    slug: "open-letters-to-god",
    title: "Open Letters to God",
    releaseType: "ep",
    releaseDate: undefined,
    artwork: {
      url: "/images/releases/open-letters-to-god.jpg",
      alt: "Open Letters to God cover art — graffiti-style lettering with a pigeon illustration against a cloudy sky",
    },
    description: "",
    tracklist: [],
    credits: [],
    featured: true,
    links: {},
    untitledEmbedId: "DF0QiRWoLtEl",
  },
  {
    _id: "brighter-days",
    slug: "brighter-days",
    title: "Brighter Days",
    releaseType: "single",
    releaseDate: undefined,
    artwork: {
      url: "/images/releases/brighter-days.jpg",
      alt: "Brighter Days cover art — hand-lettered title over a sky and island coastline",
    },
    description: "",
    tracklist: [],
    credits: [],
    featured: true,
    links: {},
    untitledEmbedId: "VRcL5NIrPJMa",
  },
  {
    _id: "thanks-and-praises",
    slug: "thanks-and-praises",
    title: "Thanks and Praises",
    releaseType: "album",
    releaseDate: "2025",
    artwork: { url: "", alt: "Thanks and Praises artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: false,
    links: {},
    untitledEmbedId: "XKGIa3c0saQ6",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((release) => release.slug === slug);
}

export function getFeaturedRelease(): Release {
  return releases.find((release) => release.featured) ?? releases[0];
}

export function getAllReleaseSlugs(): string[] {
  return releases.map((release) => release.slug);
}

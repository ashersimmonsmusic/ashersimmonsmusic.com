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
    releaseType: "album",
    releaseDate: undefined,
    artwork: { url: "", alt: "Open Letters to God artwork" },
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
    artwork: { url: "", alt: "Brighter Days artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: true,
    links: {},
    untitledEmbedId: "VRcL5NIrPJMa",
  },
  {
    _id: "head-in-the-clouds",
    slug: "head-in-the-clouds",
    title: "Head In The Clouds",
    releaseType: "single",
    releaseDate: undefined,
    artwork: { url: "", alt: "Head In The Clouds artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: false,
    links: {},
  },
  {
    _id: "all-in",
    slug: "all-in",
    title: "All In",
    releaseType: "feature",
    releaseDate: undefined,
    artwork: { url: "", alt: "All In artwork" },
    description: "",
    tracklist: [
      {
        _id: "all-in-track-1",
        title: "All In",
        trackNumber: 1,
        featuredArtists: ["Przy"],
      },
    ],
    credits: [],
    featured: false,
    links: {},
  },
  {
    _id: "jireh",
    slug: "jireh",
    title: "Jireh",
    releaseType: "single",
    releaseDate: undefined,
    artwork: { url: "", alt: "Jireh artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: false,
    links: {},
  },
  {
    _id: "changes",
    slug: "changes",
    title: "Changes",
    releaseType: "single",
    releaseDate: undefined,
    artwork: { url: "", alt: "Changes artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: false,
    links: {},
  },
  {
    _id: "fractal",
    slug: "fractal",
    title: "Fractal",
    releaseType: "single",
    releaseDate: undefined,
    artwork: { url: "", alt: "Fractal artwork" },
    description: "",
    tracklist: [],
    credits: [],
    featured: false,
    links: {},
  },
  {
    _id: "thanks-and-praises",
    slug: "thanks-and-praises",
    // TODO: confirm releaseType (currently guessed as "single") and releaseDate.
    title: "Thanks and Praises",
    releaseType: "single",
    releaseDate: undefined,
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

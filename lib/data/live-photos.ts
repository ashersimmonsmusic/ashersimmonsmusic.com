export type LivePhoto = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
};

// Live performance photography. Real supplied press shots — no stock or
// generated imagery. Update via Sanity once a proper media library exists.
export const heroLivePhoto: LivePhoto = {
  id: "bw-arms-raised",
  url: "/images/press/asher-simmons-live-bw-arms-raised.jpg",
  alt: "Asher Simmons on stage with arms raised under a spotlight, Next Level Bristol",
  width: 1600,
  height: 2400,
};

export const liveGalleryPhotos: LivePhoto[] = [
  {
    id: "crowd-wide-bw",
    url: "/images/press/asher-simmons-live-crowd-wide-bw-1.jpg",
    alt: "Asher Simmons performing on stage with the crowd in view",
    width: 2400,
    height: 1600,
  },
  {
    id: "bw-side-stage",
    url: "/images/press/asher-simmons-live-bw-side-stage.jpg",
    alt: "Asher Simmons performing on stage, wide shot of the venue",
    width: 1600,
    height: 2400,
  },
  {
    id: "blue-spotlight",
    url: "/images/press/asher-simmons-live-blue-spotlight.jpg",
    alt: "Asher Simmons singing under a blue spotlight with stage smoke",
    width: 1600,
    height: 2400,
  },
  {
    id: "green-closeup",
    url: "/images/press/asher-simmons-live-green-closeup.jpg",
    alt: "Close-up of Asher Simmons on stage under green stage lighting",
    width: 1600,
    height: 2400,
  },
  {
    id: "silhouette",
    url: "/images/press/asher-simmons-live-silhouette.jpg",
    alt: "Silhouette of Asher Simmons performing on stage",
    width: 1600,
    height: 2400,
  },
];

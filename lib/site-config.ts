export const siteConfig = {
  name: "Asher Simmons",
  title: "Asher Simmons — Caribbean Rapper, Producer & Sound Engineer",
  description:
    "Asher Simmons is a Caribbean rapper, producer, sound engineer, songwriter and beatmaker from Dundas Town, Abaco, Bahamas, now based in Bristol, UK. Hip-Hop and Afrobeat, genre-fluid production.",
  url: "https://ashersimmonsmusic.com",
  locale: "en_GB",
  keywords: [
    "Asher Simmons",
    "Caribbean rapper",
    "Bristol rapper",
    "Caribbean producer",
    "Bristol producer",
    "sound engineer",
    "Hip-Hop",
    "Afrobeat",
    "Bahamian artist",
    "Abaco Bahamas music",
  ],
  social: {
    instagram: "https://instagram.com/",
    spotify: "https://open.spotify.com/",
    appleMusic: "https://music.apple.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
    bandcamp: "https://bandcamp.com/",
  },
  origin: {
    birthplace: "Dundas Town, Abaco, Bahamas",
    base: "Bristol, UK",
  },
  contactEmail: "hello@ashersimmonsmusic.com",
} as const;

export type SiteConfig = typeof siteConfig;

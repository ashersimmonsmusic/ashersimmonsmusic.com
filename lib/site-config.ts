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
    instagram: "https://instagram.com/ashersimmonsmusic",
    spotify: "https://open.spotify.com/artist/22og2sDepSCdRuWx7LamgB",
    appleMusic: "https://music.apple.com/gb/artist/asher-simmons/1255170457",
    youtube: "https://youtube.com/ashersimmonsmusic",
    tiktok: "https://www.tiktok.com/@ashersimmons",
  },
  origin: {
    // Where Asher is from / grew up — the "roots" side of the Bahamas → Bristol
    // story. His literal birthplace is Bermuda; see birthCountry below.
    roots: "Dundas Town, Abaco, Bahamas",
    birthCountry: "Bermuda",
    base: "Bristol, UK",
  },
  contactEmail: "ashersimmonsmusic@gmail.com",
} as const;

export type SiteConfig = typeof siteConfig;

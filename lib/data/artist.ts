import type { ArtistProfile } from "@/lib/types";

export const artistProfile: ArtistProfile = {
  name: "Asher Simmons",
  tagline: "Caribbean artist, producer & sound engineer. Bahamas → Bristol.",
  bioShort:
    "Asher Simmons is a Caribbean rapper, producer, sound engineer, songwriter and beatmaker, raised in Dundas Town, Abaco, Bahamas and now based in Bristol, UK. His work moves between Hip-Hop and Afrobeat, with room to experiment beyond either.",
  bio: `Asher Simmons was born in Bermuda and raised in Dundas Town, Abaco, in the Bahamas, an upbringing that runs underneath everything he makes, even after the move to Bristol, UK, where he is now based and where his sound has taken on the city's underground, DIY character.

As a rapper, producer, sound engineer, songwriter and beatmaker, Asher works across the full process of a record: writing it, producing it, engineering it, and performing it. His music sits primarily in Hip-Hop and Afrobeat, but he treats genre as a starting point rather than a boundary, allowing production to move fluidly wherever a song needs to go.

That range has carried him onto some of the UK's biggest festival stages, including Glastonbury, Love Saves The Day, Boomtown, Forwards Festival and Bristol Beacon. He was selected as a Next Level artist in Bristol and has been featured on BBC News, recognition of an artist building a career on his own terms, from the studio to the stage.

Spiritual and personal themes surface in specific songs where they belong to the story being told, but they describe individual pieces of work, not a fixed identity; Asher's focus stays on the craft: the writing, the production, the engineering, and the live show.`,
  birthplace: "Bermuda",
  raisedIn: "Dundas Town, Abaco, Bahamas",
  base: "Bristol, UK",
  portrait: {
    url: "/images/press/asher-simmons-live-arch-window.jpg",
    alt: "Asher Simmons smiling on stage in front of an arched window",
  },
  achievements: [
    {
      _id: "glastonbury",
      label: "Glastonbury",
      detail: "Festival performance",
    },
    {
      _id: "love-saves-the-day",
      label: "Love Saves The Day",
      detail: "Festival performance",
    },
    { _id: "boomtown", label: "Boomtown", detail: "Festival performance" },
    {
      _id: "forwards-festival",
      label: "Forwards Festival",
      detail: "Festival performance",
    },
    {
      _id: "bristol-beacon",
      label: "Bristol Beacon",
      detail: "Live performance",
    },
    {
      _id: "next-level",
      label: "Next Level Artist",
      detail: "Selected, Bristol",
    },
    { _id: "bbc-news", label: "BBC News", detail: "Featured" },
  ],
};

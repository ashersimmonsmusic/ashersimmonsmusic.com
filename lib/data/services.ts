import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    _id: "production",
    category: "production",
    title: "Production",
    summary: "Full track production across Hip-Hop, Afrobeat and beyond.",
    description:
      "From a single loop to a finished arrangement, Asher builds records from the ground up — structuring drums, chords, melody and space around the song rather than a template.",
  },
  {
    _id: "beatmaking",
    category: "beatmaking",
    title: "Beatmaking",
    summary: "Custom instrumentals and beat licensing for artists.",
    description:
      "Original instrumentals made to order, drawing on Caribbean rhythm and Bristol's underground production lineage. Exclusive and non-exclusive licensing available on enquiry.",
  },
  {
    _id: "sound-engineering",
    category: "sound-engineering",
    title: "Sound Engineering",
    summary: "Recording, mixing and mastering for vocalists and bands.",
    description:
      "Technical craft in service of the song: tracking vocals, mixing for clarity and impact, and preparing masters that translate across systems.",
  },
  {
    _id: "creative-direction",
    category: "creative-direction",
    title: "Creative Direction",
    summary: "Guidance on sound, sequencing and artistic identity.",
    description:
      "Support shaping a project's overall direction — sequencing a body of work, developing a sonic identity, and making sure a release says what it means to say.",
  },
];

export function getServiceByCategory(category: Service["category"]) {
  return services.find((service) => service.category === category);
}

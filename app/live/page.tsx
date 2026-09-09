import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/container";
import { PhotoGallery } from "@/components/live/photo-gallery";
import { VideoGrid } from "@/components/live/video-grid";
import { formatDate } from "@/lib/utils";
import { getLiveEvents, getLiveVideos } from "@/lib/sanity/queries";
import { filterUpcoming } from "@/lib/data/events";
import { liveHeroBand, liveGalleryPhotos } from "@/lib/data/live-photos";
import type { EventStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Live",
  description: "Upcoming live dates for Asher Simmons.",
  alternates: { canonical: "/live" },
};

const STATUS_LABEL: Record<EventStatus, string> = {
  confirmed: "Confirmed",
  postponed: "Postponed",
  cancelled: "Cancelled",
  "sold-out": "Sold Out",
};

export default async function LivePage() {
  const [events, videos] = await Promise.all([getLiveEvents(), getLiveVideos()]);
  const upcoming = filterUpcoming(events);

  return (
    <>
      <Container className="py-16 md:py-24">
        <Eyebrow>Live</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
          On Stage
        </h1>
      </Container>

      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src={liveHeroBand.url}
          alt={liveHeroBand.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="py-16 md:py-24">
        {upcoming.length === 0 ? (
          <div className="max-w-xl border-t border-line pt-10">
            <p className="text-lg text-paper-dim">
              No shows are currently on the books. Asher has performed at
              Glastonbury, Love Saves The Day, Boomtown, Forwards Festival and
              Bristol Beacon — new dates will be announced here first.
            </p>
          </div>
        ) : (
          <ul className="hairline divide-y divide-line border-t">
            {upcoming.map((event) => (
              <li key={event._id} className="flex flex-wrap items-center justify-between gap-4 py-6">
                <div>
                  <p className="font-display text-2xl font-medium md:text-3xl">{event.name}</p>
                  <p className="font-mono-label mt-1 text-paper-dim">
                    {formatDate(event.date)} · {event.venue}, {event.city}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono-label text-paper-dim">{STATUS_LABEL[event.status]}</span>
                  {event.ticketUrl && event.status === "confirmed" && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-label bg-sun px-5 py-2.5 font-bold text-sun-ink"
                    >
                      Tickets
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20">
          <Eyebrow>Watch</Eyebrow>
          <p className="mt-4 max-w-xl text-paper-dim">Live performances, straight from the stage.</p>
          <div className="mt-8">
            <VideoGrid videos={videos} />
          </div>
        </div>

        <div className="mt-20">
          <Eyebrow>Selected Moments</Eyebrow>
          <p className="mt-4 max-w-xl text-paper-dim">
            On stage — Next Level, Bristol, and beyond.
          </p>
          <div className="mt-8">
            <PhotoGallery photos={liveGalleryPhotos} />
          </div>
        </div>
      </Container>
    </>
  );
}

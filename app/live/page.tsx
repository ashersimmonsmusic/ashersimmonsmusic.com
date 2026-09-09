import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/container";
import { formatDate } from "@/lib/utils";
import { getLiveEvents } from "@/lib/sanity/queries";
import { filterUpcoming } from "@/lib/data/events";
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
  const events = await getLiveEvents();
  const upcoming = filterUpcoming(events);

  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Live</Eyebrow>
      <h1 className="font-display mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
        On Stage
      </h1>

      {upcoming.length === 0 ? (
        <div className="mt-16 max-w-xl border-t border-line pt-10">
          <p className="text-lg text-paper-dim">
            No shows are currently on the books. Asher has performed at
            Glastonbury, Love Saves The Day, Boomtown, Forwards Festival and
            Bristol Beacon — new dates will be announced here first.
          </p>
        </div>
      ) : (
        <ul className="hairline mt-16 divide-y divide-line border-t">
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
    </Container>
  );
}

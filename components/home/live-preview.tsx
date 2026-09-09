import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";
import type { LiveEvent } from "@/lib/types";

export function LivePreview({ events }: { events: LiveEvent[] }) {
  return (
    <section className="section-paper border-b border-line-on-paper py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Live</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">
              On stage
            </h2>
          </Reveal>
          <Link href="/live" className="font-mono-label border-b border-current pb-0.5 hover:text-cobalt">
            All dates
          </Link>
        </div>

        <div className="mt-12">
          {events.length === 0 ? (
            <Reveal>
              <p className="max-w-md text-current/70">
                No shows currently on the books. Asher has performed at
                Glastonbury, Love Saves The Day, Boomtown, Forwards Festival
                and Bristol Beacon — check back soon for what&apos;s next.
              </p>
            </Reveal>
          ) : (
            <ul className="hairline divide-y divide-line-on-paper border-t">
              {events.slice(0, 3).map((event, i) => (
                <Reveal key={event._id} delay={i * 0.06}>
                  <li className="flex flex-wrap items-baseline justify-between gap-2 py-5">
                    <span className="font-display text-2xl font-medium">{event.name}</span>
                    <span className="font-mono-label text-current/60">
                      {formatDate(event.date)} · {event.venue}, {event.city}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

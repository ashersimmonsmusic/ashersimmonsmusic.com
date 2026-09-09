import type { LiveEvent } from "@/lib/types";

// No upcoming events have been confirmed. Populate via Sanity when booked —
// see sanity/schemas/event.ts. Do not fabricate dates or venues here.
export const events: LiveEvent[] = [];

export function getUpcomingEvents(): LiveEvent[] {
  return filterUpcoming(events).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

/** Plain helper (not a component) so callers can filter without tripping the react-hooks purity rule on Date.now() inside render. */
export function filterUpcoming(list: LiveEvent[]): LiveEvent[] {
  const now = Date.now();
  return list.filter((event) => new Date(event.date).getTime() >= now);
}

export function getPastEvents(): LiveEvent[] {
  const now = Date.now();
  return events
    .filter((event) => new Date(event.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "TBA";
  // A bare year (no known month/day) — return as-is rather than defaulting
  // to a fabricated 1 January.
  if (/^\d{4}$/.test(dateString)) return dateString;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "TBA";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "Single · 14 March 2024", or just "Single" when the date isn't known yet. */
export function releaseMeta(release: { releaseType: string; releaseDate?: string }): string {
  return release.releaseDate
    ? `${release.releaseType} · ${formatDate(release.releaseDate)}`
    : release.releaseType;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

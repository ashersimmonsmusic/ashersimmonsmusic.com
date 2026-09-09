import type { CSSProperties } from "react";

/**
 * Abstract recurring mark for the Bahamas → Bristol throughline — two points
 * and a travelled line, deliberately non-literal (no maps, no palm trees).
 * Reused across the hero and artwork placeholders so the brand has a visual
 * signature beyond typography and colour.
 */
export function RouteMotif({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M24 168 C 120 168, 150 40, 210 96 S 330 24, 376 32"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <circle cx="24" cy="168" r="3.5" fill="currentColor" />
      <circle cx="376" cy="32" r="3.5" fill="currentColor" stroke="currentColor" />
    </svg>
  );
}

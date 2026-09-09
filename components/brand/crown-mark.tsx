import type { CSSProperties } from "react";

/**
 * Primary motif: five uneven peaks, open at the base — drawn like a mark
 * someone made, never a symmetrical heraldic device. Unfilled, single
 * stroke, colour controlled by the caller via currentColor.
 */
export function CrownMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M9 60 L21 16 L34 39 L47 8 L59 35 L67 3 L79 33 L92 12 L100 41 L110 22 L115 56"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

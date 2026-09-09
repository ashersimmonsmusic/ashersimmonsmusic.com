import { cn } from "@/lib/utils";

/**
 * Primary wordmark — two lines, flush left, never centred or stretched.
 * Case is handled by .font-display (uppercase); markup stays sentence case
 * for accessibility.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display flex flex-col leading-[0.85]", className)}>
      <span>Asher</span>
      <span>Simmons</span>
    </span>
  );
}

import { cn } from "@/lib/utils";

/**
 * AS monogram — tight-fit pair, S in gold when colour allows. Used below
 * 32px in place of the crown+monogram lockup (avatar, favicon-scale marks,
 * the collapsed header state).
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display inline-flex", className)}
      style={{ letterSpacing: "-0.08em" }}
    >
      <span className="text-bone">A</span>
      <span className="text-gold">S</span>
    </span>
  );
}

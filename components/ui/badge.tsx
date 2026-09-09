import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-mono-label inline-flex items-center gap-1.5 border border-current/30 px-2.5 py-1 text-[10px] text-current/80",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };

import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("font-mono-label text-[11px] text-current/70", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };

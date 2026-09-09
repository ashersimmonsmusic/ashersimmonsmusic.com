import * as React from "react";
import { cn } from "@/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)}
      {...props}
    />
  );
}

function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-mono-label text-sun", className)} {...props} />;
}

export { Container, Eyebrow };

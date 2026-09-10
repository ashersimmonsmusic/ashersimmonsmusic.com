import type { ReactNode } from "react";
import type { Service } from "@/lib/types";

export function ServiceCard({
  service,
  index,
  children,
}: {
  service: Service;
  index: number;
  children?: ReactNode;
}) {
  return (
    <div className="hairline flex flex-col gap-4 border-t py-8 md:flex-row md:items-baseline md:gap-10">
      <span className="font-mono-label text-current/40">{String(index + 1).padStart(2, "0")}</span>
      <div className="flex-1">
        <h3 className="font-display text-3xl font-medium">{service.title}</h3>
        <p className="mt-2 max-w-xl text-current/70">{service.description || service.summary}</p>
        {children}
      </div>
    </div>
  );
}

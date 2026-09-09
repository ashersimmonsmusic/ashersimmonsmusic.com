"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/nav";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Wordmark } from "@/components/brand/wordmark";

const emptySubscribe = () => () => {};

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex size-10 items-center justify-center text-bone"
      >
        <Menu className="size-6" aria-hidden />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-navy px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <Wordmark className="text-lg" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center text-bone"
                autoFocus
              >
                <X className="size-6" aria-hidden />
                <VisuallyHidden>Close menu</VisuallyHidden>
              </button>
            </div>

            <nav className="mt-16 flex flex-1 flex-col gap-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display border-b border-line py-4 text-[28px] hover:text-cobalt"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/music"
              onClick={() => setOpen(false)}
              className="font-mono-label bg-gold px-6 py-4 text-center text-sm font-bold text-navy"
            >
              Listen
            </Link>
          </div>,
          document.body,
        )}
    </div>
  );
}

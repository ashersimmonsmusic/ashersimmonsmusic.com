import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { PlayReleaseButton } from "@/components/music/play-button";
import { heroLivePhoto } from "@/lib/data/live-photos";
import type { Release } from "@/lib/types";

export function Hero({ featuredRelease }: { featuredRelease: Release }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 md:px-10 md:py-24 lg:py-20 lg:pr-10 lg:pl-16">
          <p className="font-mono-label text-sun">Dundas Town, Abaco → Bristol, UK</p>

          <h1 className="font-display mt-6 text-[clamp(2.75rem,9vw,6.25rem)] leading-[0.88] font-medium tracking-tight text-balance-pretty">
            Asher
            <br />
            <span className="italic">Simmons</span>
          </h1>

          <p className="mt-8 max-w-md text-lg text-paper-dim md:text-xl">
            Caribbean rapper, producer &amp; sound engineer. Hip-Hop and Afrobeat,
            built without a genre ceiling — writing, producing, engineering and
            performing every record from the ground up.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <PlayReleaseButton release={featuredRelease} size="lg" />
            <div>
              <p className="font-mono-label text-paper-dim">Now playing</p>
              <p className="font-display text-lg">{featuredRelease.title}</p>
            </div>
          </div>

          <Link
            href="/about"
            className="font-mono-label mt-14 inline-flex items-center gap-2 self-start text-paper/70 hover:text-sun"
          >
            The story so far
            <ArrowDownRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="relative h-[75vw] max-h-[560px] lg:h-auto lg:max-h-none lg:min-h-[640px]">
          <Image
            src={heroLivePhoto.url}
            alt={heroLivePhoto.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_18%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-ink to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  );
}

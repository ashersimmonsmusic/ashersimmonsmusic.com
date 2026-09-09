import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Rock_Salt, DM_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PlayerProvider } from "@/components/music/player-context";
import { GlobalPlayer } from "@/components/music/global-player";
import { PlausibleAnalytics } from "@/components/analytics/plausible";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const rockSalt = Rock_Salt({
  variable: "--font-rock-salt",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${instrumentSerif.variable} ${rockSalt.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-navy text-bone">
        <PlausibleAnalytics />
        <MotionConfig reducedMotion="user">
          <PlayerProvider>
            <a
              href="#main-content"
              className="font-mono-label sr-only bg-gold px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main-content" className="flex-1 pb-20">
              {children}
            </main>
            <SiteFooter />
            <GlobalPlayer />
          </PlayerProvider>
        </MotionConfig>
      </body>
    </html>
  );
}

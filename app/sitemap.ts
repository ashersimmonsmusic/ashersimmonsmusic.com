import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getReleases } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = await getReleases();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/music",
    "/production",
    "/about",
    "/live",
    "/contact",
    "/store",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const releaseRoutes: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${siteConfig.url}/release/${release.slug}`,
    lastModified: release.releaseDate ? new Date(release.releaseDate) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...releaseRoutes];
}

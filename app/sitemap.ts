import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPosts, getReleases } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [releases, posts] = await Promise.all([getReleases(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/music",
    "/production",
    "/about",
    "/live",
    "/news",
    "/store",
    "/contact",
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

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...releaseRoutes, ...postRoutes];
}

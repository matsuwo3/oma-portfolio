import type { MetadataRoute } from "next";
import { getWorks, getBlogPosts } from "@/lib/microcms";

const SITE_URL = "https://oma-pj.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, posts] = await Promise.all([getWorks(), getBlogPosts()]);

  const workEntries: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${SITE_URL}/works/${encodeURIComponent(work.slug)}`,
    lastModified: work.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((p) => !p.isExternal && p.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...workEntries,
    ...blogEntries,
  ];
}

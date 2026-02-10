import type { MetadataRoute } from "next";
import { getWorks, getBlogPosts, getBlogCategories } from "@/lib/microcms";

const SITE_URL = "https://oma-pj.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, posts, categories] = await Promise.all([
    getWorks(),
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const workEntries: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${SITE_URL}/works/${encodeURIComponent(work.slug)}`,
    lastModified: work.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((p) => !p.isExternal && p.slug)
    .map((post) => ({
      url: `${SITE_URL}/column/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/column/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/column`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...workEntries,
    ...blogEntries,
    ...categoryEntries,
  ];
}

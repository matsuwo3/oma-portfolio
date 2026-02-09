import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/microcms";

const SITE_URL = "https://oma-pj.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();

  const workEntries: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${SITE_URL}/works/${encodeURIComponent(work.slug)}`,
    lastModified: work.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...workEntries,
  ];
}

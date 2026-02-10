import { createClient } from "microcms-js-sdk";
import type { Work, BlogPost } from "./types";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export async function getWorks() {
  const data = await client.getList<Work>({
    endpoint: "works",
    queries: {
      orders: "-publishedAt",
      limit: 20,
    },
  });
  return data.contents;
}

export async function getWorkBySlug(slug: string) {
  const works = await getWorks();
  return works.find((w) => w.slug === slug) ?? null;
}

export async function getBlogPosts() {
  const data = await client.getList<BlogPost>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      limit: 50,
    },
  });
  return data.contents;
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogCategories() {
  const posts = await getBlogPosts();
  const categorySet = new Set<string>();
  posts.forEach((post) => {
    post.category.forEach((cat) => categorySet.add(cat));
  });
  return Array.from(categorySet);
}

export async function getBlogPostsByCategory(category: string) {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category.includes(category));
}

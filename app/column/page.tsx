import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getBlogCategories } from "@/lib/microcms";
import { BlogListClient } from "./BlogListClient";

const SITE_URL = "https://oma-pj.com";

export const metadata: Metadata = {
  title: "コラム｜おま 伴走型医療マーケター",
  description:
    "美容クリニックマーケティング、医療広告、SEOなどに関するナレッジを発信。伴走型医療マーケター「おま」のコラム記事一覧。",
  alternates: {
    canonical: `${SITE_URL}/column/`,
  },
  openGraph: {
    type: "website",
    title: "コラム｜おま 伴走型医療マーケター",
    description:
      "美容クリニックマーケティング、医療広告、SEOなどに関するナレッジを発信。",
    url: `${SITE_URL}/column/`,
    siteName: "おま｜伴走型医療マーケター",
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 pt-28 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="border-t border-black/[0.08] pt-8">
            <span className="section-label-lg block">COLUMN</span>
            <span className="mt-1 block text-sm text-text-secondary md:text-base">
              ナレッジ発信
            </span>
          </div>

          {/* Category Links */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/column/"
              className="rounded-full bg-text-primary px-5 py-2 text-sm font-medium text-white shadow-sm"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/column/category/${encodeURIComponent(cat)}/`}
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04] transition-colors hover:bg-black/[0.02]"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Blog List */}
          <BlogListClient posts={posts} />

          {/* Note CTA */}
          <div className="mt-12">
            <a
              href="https://note.com/nakanto_survey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base"
            >
              noteの記事を見る
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

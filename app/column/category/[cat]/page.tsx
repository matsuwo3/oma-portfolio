import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import {
  getBlogCategories,
  getBlogPostsByCategory,
} from "@/lib/microcms";
import { BlogListClient } from "../../BlogListClient";

const SITE_URL = "https://oma-pj.com";

type Props = {
  params: Promise<{ cat: string }>;
};

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const category = decodeURIComponent(cat);
  const encodedCat = encodeURIComponent(category);

  return {
    title: `${category}の記事一覧｜おまコラム`,
    description: `${category}に関するコラム記事一覧。伴走型医療マーケター「おま」のナレッジ発信。`,
    alternates: {
      canonical: `${SITE_URL}/column/category/${encodedCat}/`,
    },
    openGraph: {
      type: "website",
      title: `${category}の記事一覧｜おまコラム`,
      description: `${category}に関するコラム記事一覧。`,
      url: `${SITE_URL}/column/category/${encodedCat}/`,
      siteName: "おま｜伴走型医療マーケター",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const category = decodeURIComponent(cat);

  const [posts, allCategories] = await Promise.all([
    getBlogPostsByCategory(category),
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
              {category}の記事一覧
            </span>
          </div>

          {/* Category Links */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/column/"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04] transition-colors hover:bg-black/[0.02]"
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={`/column/category/${encodeURIComponent(cat)}/`}
                className={`rounded-full px-5 py-2 text-sm font-medium shadow-sm ${
                  cat === category
                    ? "bg-text-primary text-white"
                    : "bg-white text-text-secondary shadow-black/[0.04] transition-colors hover:bg-black/[0.02]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Blog List */}
          <BlogListClient posts={posts} />

          {/* Back to all */}
          <div className="mt-12">
            <Link
              href="/column/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              コラム一覧へ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/microcms";

const SITE_URL = "https://oma-pj.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts
    .filter((p) => !p.isExternal && p.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getBlogPostBySlug(slug);
  if (!post || post.isExternal) return { title: "Not Found" };

  const description = post.description ?? `${post.title} - おまのコラム記事`;

  return {
    title: `${post.title}｜おまコラム`,
    description,
    alternates: {
      canonical: `${SITE_URL}/column/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${SITE_URL}/column/${slug}`,
      siteName: "おま｜伴走型医療マーケター",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(post.thumbnail && {
        images: [
          {
            url: post.thumbnail.url,
            width: post.thumbnail.width,
            height: post.thumbnail.height,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.thumbnail && { images: [post.thumbnail.url] }),
    },
  };
}

const categoryColor: Record<string, string> = {
  SEO: "bg-accent-blue/10 text-accent-blue",
  マーケティング: "bg-accent-orange/10 text-accent-orange",
  医療広告: "bg-accent-violet/10 text-accent-violet",
  Note記事: "bg-accent-teal/10 text-accent-teal",
};

function extractHeadings(html: string) {
  const headingRegex = /<h([2-3])(?:[^>]*)>(.*?)<\/h[2-3]>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

function injectHeadingIds(html: string) {
  return html.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h([2-3])>/gi,
    (_match, level, attrs, content) => {
      const text = (content as string).replace(/<[^>]*>/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
        .replace(/^-|-$/g, "");
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    }
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getBlogPostBySlug(slug);
  if (!post || post.isExternal) notFound();

  const cat = post.category[0] ?? "";
  const color = categoryColor[cat] ?? "bg-accent-teal/10 text-accent-teal";
  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const headings = extractHeadings(post.body);
  const bodyWithIds = injectHeadingIds(post.body);

  const publishedDate = new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? "",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: "おま",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "おま",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/column/${slug}`,
    },
    ...(post.thumbnail && {
      image: {
        "@type": "ImageObject",
        url: post.thumbnail.url,
        width: post.thumbnail.width,
        height: post.thumbnail.height,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <div className="min-h-screen px-6 pt-28 pb-24">
        <article className="mx-auto w-full max-w-2xl">
          {/* Back link */}
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

          {/* Header */}
          <div className="mt-8">
            <div className="flex items-center gap-3">
              {cat && (
                <span
                  className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${color}`}
                >
                  {cat}
                </span>
              )}
              <time
                className="text-sm text-text-secondary"
                dateTime={post.publishedAt}
              >
                {publishedDate}
              </time>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {post.description}
              </p>
            )}
            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-white px-3 py-1 text-sm text-text-secondary shadow-sm shadow-black/[0.04]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={post.thumbnail.url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
          )}

          {/* Table of Contents */}
          {headings.length >= 3 && (
            <nav className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.04]">
              <p className="text-sm font-bold text-text-primary">目次</p>
              <ul className="mt-3 space-y-2">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-text-secondary transition-colors hover:text-accent-blue"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Body */}
          <div
            className="prose prose-neutral mt-10 max-w-none text-text-primary prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-table:overflow-x-auto prose-th:bg-bg-alt prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-video:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: bodyWithIds }}
          />
        </article>
      </div>
      <Footer />
    </>
  );
}

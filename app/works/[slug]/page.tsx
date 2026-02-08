import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getWorks, getWorkBySlug } from "@/lib/microcms";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const work = await getWorkBySlug(slug);
  if (!work) return { title: "Not Found" };

  return {
    title: `${work.title}｜おまポートフォリオ`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      ...(work.thumbnail && { images: [{ url: work.thumbnail.url }] }),
    },
  };
}

const categoryColor: Record<string, string> = {
  "Web App": "bg-accent-blue/10 text-accent-blue",
  HP: "bg-accent-orange/10 text-accent-orange",
  "Mobile App": "bg-accent-violet/10 text-accent-violet",
};

export default async function WorkDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const cat = work.category[0] ?? "";
  const color = categoryColor[cat] ?? "bg-accent-teal/10 text-accent-teal";
  const tags = work.tags
    ? work.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen px-6 pt-12 pb-24">
      <article className="mx-auto w-full max-w-2xl">
        {/* Back link */}
        <Link
          href="/#works"
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
          戻る
        </Link>

        {/* Header */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${color}`}>
              {cat}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            {work.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {work.description}
          </p>
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
        {work.thumbnail && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={work.thumbnail.url}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {/* External URL */}
        {work.url && (
          <div className="mt-6">
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-accent-blue px-5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              サイトを見る
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 10L10 4M10 4H5M10 4V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Body */}
        {work.body && (
          <div
            className="prose prose-neutral mt-10 max-w-none text-text-primary prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: work.body }}
          />
        )}
      </article>
    </div>
  );
}

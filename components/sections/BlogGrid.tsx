"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, fadeUpChild } from "@/hooks/animations";

const INITIAL_COUNT = 5;

type Props = {
  posts: BlogPost[];
};

function BlogCard({ post }: { post: BlogPost }) {
  const cat = post.category[0] ?? "";

  const cardContent = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10 text-accent-teal">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4H16V16H4V4Z" />
          <path d="M7 8H13" />
          <path d="M7 11H11" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-text-primary group-hover:text-accent-blue md:text-base">
          {post.title}
        </h3>
        {cat && (
          <span className="mt-1 inline-block text-xs text-text-secondary md:text-sm">
            {cat}
          </span>
        )}
      </div>
      {post.isExternal ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-text-secondary/40 transition-colors group-hover:text-accent-blue"
        >
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-text-secondary/40 transition-colors group-hover:text-accent-blue"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  const cardClassName =
    "group flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-5 shadow-sm shadow-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-md";

  return (
    <TiltCard className="overflow-hidden rounded-2xl" maxTilt={3}>
      {post.isExternal ? (
        <a
          href={post.noteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassName}
        >
          {cardContent}
        </a>
      ) : (
        <Link href={`/blog/${post.slug}`} className={cardClassName}>
          {cardContent}
        </Link>
      )}
    </TiltCard>
  );
}

export function BlogGrid({ posts }: Props) {
  const displayPosts = posts.slice(0, INITIAL_COUNT);
  const hasMore = posts.length > INITIAL_COUNT;

  return (
    <>
      {/* Articles (max 5) */}
      <motion.div
        className="mt-10 grid gap-4"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {displayPosts.map((post) => (
          <motion.div key={post.id} variants={fadeUpChild} className="min-w-0">
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA → /blog/ */}
      <div className="mt-8">
        <MagneticButton
          href="/blog/"
          className="inline-flex h-14 items-center gap-2 rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base"
          strength={0.25}
        >
          {hasMore ? "もっと見る" : "コラム一覧を見る"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MagneticButton>
      </div>
    </>
  );
}

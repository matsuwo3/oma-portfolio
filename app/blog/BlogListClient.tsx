"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/types";
import { staggerContainer, fadeUpChild } from "@/hooks/animations";

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

  return post.isExternal ? (
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
  );
}

export function BlogListClient({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <p className="mt-12 text-center text-sm text-text-secondary md:text-base">
        記事がありません
      </p>
    );
  }

  return (
    <motion.div
      className="mt-10 grid gap-4"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={fadeUpChild} className="min-w-0">
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [expanded, setExpanded] = useState(false);
  const hasMore = posts.length > INITIAL_COUNT;
  const initialPosts = posts.slice(0, INITIAL_COUNT);
  const extraPosts = posts.slice(INITIAL_COUNT);

  return (
    <>
      {/* First 5 articles */}
      <motion.div
        className="mt-10 grid gap-4"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {initialPosts.map((post) => (
          <motion.div key={post.id} variants={fadeUpChild} className="min-w-0">
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded articles (6+) */}
      <AnimatePresence>
        {expanded && extraPosts.length > 0 && (
          <motion.div
            className="mt-4 grid gap-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer(0.06)}
          >
            {extraPosts.map((post) => (
              <motion.div
                key={post.id}
                className="min-w-0"
                variants={fadeUpChild}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {hasMore && !expanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setExpanded(true)}
            className="inline-flex h-14 items-center gap-2 rounded-full border border-black/10 px-10 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] md:text-base"
          >
            もっと見る
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 5.5L7 9.5L11 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
        <MagneticButton
          href="https://note.com/nakanto_survey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center gap-2 rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base"
          strength={0.25}
        >
          noteで全記事を見る
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

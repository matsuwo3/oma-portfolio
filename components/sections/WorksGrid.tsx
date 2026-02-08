"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/types";
import { TiltCard } from "@/components/ui/TiltCard";

const categories = ["All", "Web App", "HP", "Mobile App"] as const;

const categoryColor: Record<string, string> = {
  "Web App": "bg-accent-blue/10 text-accent-blue",
  HP: "bg-accent-orange/10 text-accent-orange",
  "Mobile App": "bg-accent-violet/10 text-accent-violet",
};

type Props = {
  works: Work[];
};

export function WorksGrid({ works }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? works
      : works.filter((w) => w.category.includes(active));

  return (
    <>
      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              active === cat
                ? "bg-text-primary text-white shadow-sm"
                : "bg-white text-text-secondary shadow-sm shadow-black/[0.04] hover:bg-black/[0.02]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((work) => {
            const tags = work.tags
              ? work.tags.split(",").map((t) => t.trim()).filter(Boolean)
              : [];
            const cat = work.category[0] ?? "";
            const color = categoryColor[cat] ?? "bg-accent-teal/10 text-accent-teal";

            return (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <TiltCard className="rounded-2xl" maxTilt={5}>
                <Link
                  href={`/works/${work.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/[0.04] transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {work.thumbnail && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={work.thumbnail.url}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold md:text-sm ${color}`}>
                        {cat}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-base font-bold text-text-primary">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2 md:text-base">
                      {work.description}
                    </p>
                    {tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-background px-2 py-0.5 text-xs text-text-secondary md:text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-text-secondary md:text-base">
          該当する実績がありません
        </p>
      )}
    </>
  );
}

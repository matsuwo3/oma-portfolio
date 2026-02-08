"use client";

import { motion } from "framer-motion";

const bentoCards = [
  {
    title: "戦略設計",
    description: "ブランド戦略、集患設計、KPI策定",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12L7 2L12 12" />
        <path d="M7 12V22" />
        <path d="M22 2L17 12V22" />
        <path d="M17 8H22" />
      </svg>
    ),
    color: "bg-accent-blue/10 text-accent-blue",
  },
  {
    title: "プロダクト開発",
    description: "Webアプリ、LP、管理ツール",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21H16" />
        <path d="M12 17V21" />
        <path d="M7 8L10 11L7 14" />
        <path d="M13 14H17" />
      </svg>
    ),
    color: "bg-accent-violet/10 text-accent-violet",
  },
  {
    title: "専門領域",
    description: "医療広告ガイドライン、美容医療マーケ",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
        <path d="M2 17L12 22L22 17" />
        <path d="M2 12L12 17L22 12" />
      </svg>
    ),
    color: "bg-accent-orange/10 text-accent-orange",
  },
];

const skills = [
  "Google Ads",
  "Meta Ads",
  "LINE",
  "SEO",
  "Next.js",
  "React",
  "AI / LLM",
  "Figma",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold tracking-wider text-accent-blue"
        >
          ABOUT
        </motion.p>

        {/* Mission */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-3 text-center text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
        >
          クリーンな美容医療業界を目指す
        </motion.h2>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.04] transition-shadow hover:shadow-md"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-text-primary">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04]"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

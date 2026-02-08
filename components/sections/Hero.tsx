"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8+", label: "年の業界経験" },
  { value: "100+", label: "クリニック支援" },
  { value: "5+", label: "自社プロダクト" },
];

const career = [
  "広告代理店 ストプラ&運用",
  "大手美容外科 マーケ統括",
  "外コン",
  "独立",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04]">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for Projects
          </span>
        </motion.div>

        {/* Main Copy */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl md:leading-tight"
        >
          クリーンな美容医療を、
          <br />
          マーケティングの力で。
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 text-center text-base text-text-secondary md:text-lg"
        >
          おま｜伴走型医療マーケター
        </motion.p>

        {/* Career Path */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary"
        >
          {career.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span className="rounded-lg bg-white px-3 py-1.5 font-medium shadow-sm shadow-black/[0.04]">
                {item}
              </span>
              {i < career.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-text-secondary/40">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 text-center shadow-sm shadow-black/[0.04]"
            >
              <div className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium text-text-secondary md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="https://forms.gle/4wXRSkuxtGMcBwk78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-accent-blue px-7 text-sm font-semibold text-white transition-all hover:brightness-110 sm:w-auto"
          >
            お問い合わせ
          </a>
          <a
            href="#works"
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-7 text-sm font-semibold text-text-primary shadow-sm shadow-black/[0.06] transition-all hover:shadow-md sm:w-auto"
          >
            実績を見る
          </a>
        </motion.div>
      </div>
    </section>
  );
}

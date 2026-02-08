"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8+", label: "Years" },
  { value: "100+", label: "Clinics" },
  { value: "5+", label: "Products" },
];

const career = [
  "広告代理店",
  "大手美容外科",
  "外コン",
  "独立",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-20 md:items-center md:pb-16">
      {/* Floating decorative dots */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="deco-dot absolute top-32 right-[12%] hidden h-5 w-5 bg-accent-blue md:block"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
        className="deco-dot absolute bottom-40 right-[22%] hidden h-7 w-7 bg-accent-orange md:block"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
        className="deco-dot absolute top-[45%] right-[8%] hidden h-4 w-4 border-2 border-accent-violet md:block"
      />

      <div className="mx-auto w-full max-w-5xl">
        {/* Stats row — top right on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 flex items-end gap-8 md:mb-0 md:absolute md:top-36 md:right-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-light tracking-tight text-text-primary md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary/60">
                {stat.label}
              </span>
              {i < stats.length - 1 && (
                <span className="sr-only">,</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="max-w-2xl">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-text-secondary">
              Available for Projects
            </span>
          </motion.div>

          {/* Main Copy */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-[1.75rem] font-bold leading-[1.25] tracking-tight text-text-primary md:text-[3.5rem]"
          >
            クリーンな美容医療を、
            <br />
            <span className="text-text-secondary/40">マーケティングの力で。</span>
          </motion.h1>

          {/* Name + Career — inline typographic style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-8 border-l-2 border-accent-blue pl-4"
          >
            <p className="text-sm font-semibold text-text-primary md:text-base">
              おま — 伴走型医療マーケター
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              {career.join(" → ")}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="https://forms.gle/4wXRSkuxtGMcBwk78"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto"
            >
              お問い合わせ
            </a>
            <a
              href="#works"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-black/10 px-10 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] sm:w-auto"
            >
              実績を見る
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

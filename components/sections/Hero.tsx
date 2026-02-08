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

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 pb-16">
      {/* Floating decorative dots */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="deco-dot hidden md:block absolute top-32 right-[12%] h-5 w-5 bg-accent-blue"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
        className="deco-dot hidden md:block absolute bottom-40 right-[22%] h-7 w-7 bg-accent-orange"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
        className="deco-dot hidden md:block absolute top-[45%] right-[8%] h-4 w-4 border-2 border-accent-violet"
      />

      <div className="mx-auto w-full max-w-5xl">
        <div className="md:flex md:items-center md:gap-12">
          {/* Left: Text content */}
          <div className="md:w-3/5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04]">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available for Projects
              </span>
            </motion.div>

            {/* Main Copy */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl md:leading-tight"
            >
              クリーンな美容医療を、
              <br />
              マーケティングの力で。
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-4 text-base text-text-secondary md:text-lg"
            >
              おま｜伴走型医療マーケター
            </motion.p>

            {/* Career Path */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-8 flex flex-wrap items-center gap-2 text-sm text-text-secondary"
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

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-12 grid grid-cols-3 gap-4 md:mt-0 md:w-2/5 md:grid-cols-1 md:gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-5 text-center shadow-sm shadow-black/[0.04] md:text-left"
              >
                <div className="text-2xl font-bold tracking-tight text-text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-text-secondary md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

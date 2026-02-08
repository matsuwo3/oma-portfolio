"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const stats = [
  { value: 8, suffix: "+", label: "Years" },
  { value: 100, suffix: "+", label: "Clinics" },
  { value: 5, suffix: "+", label: "Products" },
];

const career = [
  "広告代理店",
  "大手美容外科 マーケ統括",
  "外資コンサル",
  "独立",
];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 30 });
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsub = springVal.on("change", (v) => {
      setDisplay(Math.round(v) + suffix);
    });
    return unsub;
  }, [springVal, suffix]);

  return <span ref={ref}>{display}</span>;
}

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const dot1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const dot2Y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const dot3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-24 pt-20 md:items-center md:pb-16"
    >
      {/* Floating decorative dots with parallax */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="deco-dot absolute top-32 right-[12%] hidden h-5 w-5 bg-accent-blue md:block"
        style={isMobile ? undefined : { y: dot1Y }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
        className="deco-dot deco-dot-alt absolute bottom-40 right-[22%] hidden h-7 w-7 bg-accent-orange md:block"
        style={isMobile ? undefined : { y: dot2Y }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
        className="deco-dot absolute top-[45%] right-[8%] hidden h-4 w-4 border-2 border-accent-violet md:block"
        style={isMobile ? undefined : { y: dot3Y }}
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
                <CountUpNumber target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary/60 md:text-xs">
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
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-text-secondary md:text-sm">
              Available for Projects
            </span>
          </motion.div>

          {/* Main Copy — Typewriter reveal */}
          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-[1.75rem] font-bold leading-[1.25] tracking-tight text-text-primary md:text-[3.5rem]"
          >
            <motion.span
              className="inline"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
              }}
            >
              {[..."志ある専門家の価値を、"].map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span
              className="inline text-text-secondary/40"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } },
              }}
            >
              {[..."正しく社会に届ける。"].map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Blinking cursor */}
              <motion.span
                className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-accent-blue md:w-[3px]"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 1.8, ease: "linear" }}
              />
            </motion.span>
          </motion.h1>

          {/* Name + Career — inline typographic style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="mt-8 border-l-2 border-accent-blue pl-4"
          >
            <p className="text-sm font-semibold text-text-primary md:text-base">
              おま — 伴走型医療マーケター
            </p>
            <p className="mt-1.5 text-sm text-text-secondary md:text-base">
              戦略設計〜現場が迷わず動ける仕組みづくり
            </p>
            <p className="mt-1.5 text-xs text-text-secondary/70 md:text-sm">
              {career.join(" → ")}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton
              href="https://forms.gle/4wXRSkuxtGMcBwk78"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto md:text-base"
              strength={0.3}
            >
              お問い合わせ
            </MagneticButton>
            <MagneticButton
              href="#works"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-black/10 px-10 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] sm:w-auto md:text-base"
              strength={0.2}
            >
              実績を見る
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

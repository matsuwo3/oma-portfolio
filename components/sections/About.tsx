"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { useIsMobile } from "@/hooks/useIsMobile";

const bentoCards = [
  {
    num: "01",
    title: "戦略設計",
    description: "MVV策定、Go-To-Market戦略、KPI設計、中長期経営計画",
    accent: "bg-accent-blue",
  },
  {
    num: "02",
    title: "デジタルマーケティング",
    description: "広告運用、SEO/MEO、CRM/MA構築、データ分析",
    accent: "bg-accent-orange",
  },
  {
    num: "03",
    title: "プロダクト開発・AI活用",
    description: "Webアプリ、LP制作、AI業務効率化、システム要件定義",
    accent: "bg-accent-violet",
  },
];

const skills = [
  "Google Ads",
  "LINE Ads",
  "TikTok Ads",
  "Meta Ads",
  "SEO / MEO",
  "CRM / MA",
  "Python",
  "SQL / BigQuery",
  "Next.js",
  "React",
  "AI / LLM",
  "Figma",
];

const careers = [
  {
    accent: "text-accent-blue",
    text: "従業員数100名超のWEB広告代理店にてストラテジックプランニングと制作、運用を担当",
  },
  {
    accent: "text-accent-orange",
    text: "年間売上900億円規模の大手美容外科グループにてマーケティング統括。全国100院以上の広告戦略を統括",
  },
  {
    accent: "text-accent-violet",
    text: "外資系コンサルティングファームにて会社のリブランディングPJに従事",
  },
  {
    accent: "text-accent-teal",
    text: "独立後、累計30院の美容クリニック・歯科医院のマーケティングを支援。広告運用額は年間50億円",
  },
];

const industries = [
  "クリニック",
  "歯科",
  "整体・エステ",
  "人材派遣",
  "百貨店・小売",
  "自動車",
  "不動産",
];

export function About() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dotY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <section ref={sectionRef} id="about" className="relative bg-bg-alt px-6 py-24 md:py-32">
      {/* Floating dot with parallax */}
      <motion.div
        className="deco-dot absolute top-24 right-[10%] hidden h-4 w-4 bg-accent-blue opacity-50 md:block"
        style={isMobile ? undefined : { y: dotY }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader label="ABOUT" subtitle="おまについて" />

        {/* Mission */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-8 text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
        >
          データと現場の両輪で、事業成長を加速させる
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base"
        >
          定量・定性調査に加え、顧客インタビューや現場視察で生の声を掴みにいく。
          戦略設計からLP制作・広告運用・CRM導入まで一気通貫。
          必要なら何でもやる伴走型の支援スタイルで、事業フェーズに合わせた成長を実現します。
        </motion.p>

        {/* Career Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-12"
        >
          <p className="mb-4 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
            CAREER
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {careers.map((career, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm shadow-black/[0.04]"
              >
                <span className={`mt-0.5 text-lg font-bold leading-none ${career.accent}`}>—</span>
                <p className="text-sm leading-relaxed text-text-primary md:text-base">
                  {career.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid with 3D tilt */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {bentoCards.map((card, i) => (
            <TiltCard
              key={card.title}
              className="rounded-2xl"
              maxTilt={6}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.04] transition-shadow hover:shadow-md"
              >
                <div className={`absolute top-0 left-0 h-full w-[3px] ${card.accent}`} />
                <span className="font-display text-xs font-medium tracking-widest text-text-secondary/40">
                  {card.num}
                </span>
                <h3 className="mt-3 text-base font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">
                  {card.description}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10"
        >
          <p className="mb-3 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
            支援業界
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <motion.span
                key={industry}
                className="rounded-xl border border-black/[0.06] bg-white px-4 py-2 text-sm font-medium text-text-primary md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills with hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <p className="mb-3 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
            SKILLS & TOOLS
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04] md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

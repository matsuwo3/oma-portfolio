"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const links = [
  {
    label: "note",
    href: "https://note.com/nakanto_survey",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4H16V16H4V4Z" />
        <path d="M7 8H13" />
        <path d="M7 11H11" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/oma_and_and",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11.47 8.77L17.3 2H15.78L10.8 7.82L6.85 2H2L8.1 11.01L2 18.17H3.52L8.77 11.96L12.95 18.17H17.8L11.47 8.77ZM9.54 11.09L8.86 10.15L4.06 3.1H6.12L10.14 8.72L10.82 9.66L15.78 17.11H13.72L9.54 11.09Z" />
      </svg>
    ),
  },
];

export function Contact() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dot1Y = useTransform(scrollYProgress, [0, 1], [15, -25]);
  const dot2Y = useTransform(scrollYProgress, [0, 1], [-10, 20]);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-bg-alt px-6 py-24 md:py-32">
      {/* Floating dots with parallax */}
      <motion.div
        className="deco-dot absolute top-28 right-[14%] hidden h-3 w-3 border-2 border-accent-blue opacity-40 md:block"
        style={isMobile ? undefined : { y: dot1Y }}
      />
      <motion.div
        className="deco-dot deco-dot-alt absolute bottom-24 right-[20%] hidden h-5 w-5 bg-accent-orange opacity-30 md:block"
        style={isMobile ? undefined : { y: dot2Y }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader label="CONTACT" subtitle="お仕事のご相談" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <p className="max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
            医療機関の集患戦略、現場改善の仕組みづくり、
            プロダクト開発などお気軽にご相談ください。
          </p>

          {/* Google Form CTA */}
          <div className="mt-10">
            <MagneticButton
              href="https://forms.gle/4wXRSkuxtGMcBwk78"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-full items-center justify-center gap-2.5 rounded-full bg-text-primary px-12 text-base font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto"
              strength={0.3}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4H16V16H4V4Z" />
                <path d="M7 8H13" />
                <path d="M7 11H13" />
                <path d="M7 14H10" />
              </svg>
              お問い合わせフォーム
            </MagneticButton>
          </div>

          {/* SNS Links + Contact Page */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              href="/contact/"
              className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-black/10 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] sm:w-auto md:text-base"
              strength={0.15}
            >
              お問い合わせページへ
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
            {links.map((link) => (
              <MagneticButton
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-black/10 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] sm:w-auto md:text-base"
                strength={0.15}
              >
                {link.icon}
                {link.label}
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

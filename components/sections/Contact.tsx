"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white p-8 text-center shadow-sm shadow-black/[0.04] md:p-12"
        >
          <p className="text-sm font-semibold tracking-wider text-accent-blue">
            CONTACT
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            お仕事のご相談
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
            美容医療クリニックのマーケティング戦略、プロダクト開発、
            広告運用などお気軽にご相談ください。
          </p>

          {/* Google Form CTA */}
          <div className="mt-8">
            <a
              href="https://forms.gle/4wXRSkuxtGMcBwk78"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-accent-blue px-7 text-sm font-semibold text-white transition-all hover:brightness-110 sm:w-auto"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4H16V16H4V4Z" />
                <path d="M7 8H13" />
                <path d="M7 11H13" />
                <path d="M7 14H10" />
              </svg>
              お問い合わせフォーム
            </a>
          </div>

          {/* SNS Links */}
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-text-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  label: string;
  subtitle: string;
  className?: string;
};

export function SectionHeader({ label, subtitle, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`border-t border-black/[0.08] pt-8 ${className ?? ""}`}
    >
      <span className="section-label-lg block">{label}</span>
      <span className="mt-1 block text-sm text-text-secondary md:text-base">{subtitle}</span>
    </motion.div>
  );
}

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`border-t border-black/[0.08] pt-8 ${className ?? ""}`}
    >
      <span className="section-label-lg block">{label}</span>
      <span className="mt-1 block text-sm text-text-secondary">{subtitle}</span>
    </motion.div>
  );
}

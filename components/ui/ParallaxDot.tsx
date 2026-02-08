"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { useIsMobile } from "@/hooks/useIsMobile";

type ParallaxDotProps = {
  className?: string;
  speed?: number;
  alt?: boolean;
};

export function ParallaxDot({
  className,
  speed = 0.15,
  alt = false,
}: ParallaxDotProps) {
  const isMobile = useIsMobile();
  const { ref, y } = useParallax({ speed });

  if (isMobile) {
    return (
      <div className={`deco-dot ${alt ? "deco-dot-alt" : ""} ${className ?? ""}`} />
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement | null>}
      className={`deco-dot ${alt ? "deco-dot-alt" : ""} ${className ?? ""}`}
      style={{ y }}
    />
  );
}

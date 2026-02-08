"use client";

import { motion } from "framer-motion";
import { useTiltCard } from "@/hooks/useTiltCard";
import { useIsMobile } from "@/hooks/useIsMobile";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const isMobile = useIsMobile();
  const { ref, style, handleMouseMove, handleMouseLeave } = useTiltCard({
    maxTilt,
  });

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

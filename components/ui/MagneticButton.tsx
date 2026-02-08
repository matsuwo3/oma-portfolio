"use client";

import { motion } from "framer-motion";
import { useMagneticCursor } from "@/hooks/useMagneticCursor";
import { useIsMobile } from "@/hooks/useIsMobile";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  strength = 0.25,
  onClick,
}: MagneticButtonProps) {
  const isMobile = useIsMobile();
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticCursor({
    strength,
  });

  if (isMobile) {
    return (
      <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement | null>}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.a>
  );
}

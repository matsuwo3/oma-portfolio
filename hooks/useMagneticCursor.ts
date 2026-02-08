"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { springConfigs } from "./animations";

type MagneticOptions = {
  strength?: number;
  radius?: number;
};

export function useMagneticCursor(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 150 } = options;
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfigs.magnetic);
  const springY = useSpring(y, springConfigs.magnetic);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        x.set(dx * strength);
        y.set(dy * strength);
      }
    },
    [strength, radius, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

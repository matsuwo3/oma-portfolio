"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { springConfigs } from "./animations";

type TiltOptions = {
  maxTilt?: number;
  perspective?: number;
};

export function useTiltCard(options: TiltOptions = {}) {
  const { maxTilt = 8, perspective = 1000 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springConfigs.tilt);
  const springRotateY = useSpring(rotateY, springConfigs.tilt);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * maxTilt * 2);
      rotateX.set(-py * maxTilt * 2);
    },
    [maxTilt, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    ref,
    style: {
      perspective,
      rotateX: springRotateX,
      rotateY: springRotateY,
      transformStyle: "preserve-3d" as const,
    },
    handleMouseMove,
    handleMouseLeave,
  };
}

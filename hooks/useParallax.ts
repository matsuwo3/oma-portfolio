"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type ParallaxOptions = {
  speed?: number;
  inputRange?: [number, number];
  outputRange?: [number, number];
};

export function useParallax(
  options: ParallaxOptions = {}
): {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<number>;
} {
  const { speed = 0.2, inputRange = [0, 1], outputRange } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const computedOutput = outputRange ?? [speed * 100, speed * -100];
  const y = useTransform(scrollYProgress, inputRange, computedOutput);
  return { ref, y };
}

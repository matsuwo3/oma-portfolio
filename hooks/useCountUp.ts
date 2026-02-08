"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";

export function useCountUp(target: number, suffix = "") {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 30 });
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsub = springVal.on("change", (v) => {
      setDisplay(Math.round(v) + suffix);
    });
    return unsub;
  }, [springVal, suffix]);

  return { ref, display };
}

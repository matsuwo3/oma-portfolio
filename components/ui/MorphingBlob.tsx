"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const blobPaths = [
  "M45.2,-52.3C56.3,-42.5,61.4,-25.7,63.5,-8.4C65.6,8.9,64.8,26.7,55.7,38.6C46.6,50.5,29.2,56.5,11.3,58.9C-6.6,61.3,-25,60.1,-38.8,51.5C-52.6,42.9,-61.8,26.9,-64.2,9.8C-66.6,-7.3,-62.2,-25.5,-51.5,-36.7C-40.8,-47.9,-23.8,-52.1,-5.2,-47.6C13.4,-43.1,34.1,-62.1,45.2,-52.3Z",
  "M42.8,-51.8C54.1,-40.2,60.8,-24.8,62.9,-8.6C65.0,7.7,62.5,24.7,53.2,37.5C43.9,50.3,27.8,58.9,10.2,62.1C-7.4,65.3,-26.5,63.1,-40.0,53.2C-53.5,43.3,-61.4,25.7,-63.1,7.5C-64.8,-10.7,-60.3,-29.5,-49.0,-41.5C-37.7,-53.5,-19.6,-58.7,-1.0,-57.5C17.6,-56.3,31.5,-63.4,42.8,-51.8Z",
  "M38.4,-48.2C50.2,-38.8,60.5,-26.1,64.2,-11.0C67.8,4.1,64.8,21.6,55.6,34.2C46.4,46.8,31.0,54.5,14.4,58.4C-2.2,62.3,-20.0,62.4,-34.6,55.0C-49.2,47.6,-60.6,32.7,-64.4,16.0C-68.2,-0.7,-64.4,-19.2,-54.4,-32.2C-44.4,-45.2,-28.2,-52.7,-12.2,-54.0C3.8,-55.3,26.6,-57.6,38.4,-48.2Z",
];

export function MorphingBlob() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-1/3 -right-32 z-0 h-[600px] w-[600px] opacity-[0.04]"
      style={{ y, rotate }}
    >
      <svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          fill="currentColor"
          className="text-accent-blue"
          animate={{ d: blobPaths }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

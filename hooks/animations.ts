export const springConfigs = {
  gentle: { type: "spring" as const, stiffness: 100, damping: 30, mass: 0.5 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.5 },
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
  tilt: { type: "spring" as const, stiffness: 200, damping: 20, mass: 0.5 },
} as const;

export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  emphasized: [0.2, 0.0, 0.0, 1.0] as const,
} as const;

export const staggerContainer = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
};

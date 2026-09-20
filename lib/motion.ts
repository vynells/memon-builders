export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const viewport = { once: true, margin: "-80px" as const, amount: 0.2 as const };

export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: i * 0.06, ease: EASE_OUT },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const rotateIn = {
  hidden: { opacity: 0, rotateX: 18, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.07, ease: EASE_OUT },
  }),
};

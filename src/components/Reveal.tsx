"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [8, 0] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

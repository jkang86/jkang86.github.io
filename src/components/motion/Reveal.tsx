import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Reusable motion primitives. Built on Framer Motion. All respect
 * prefers-reduced-motion via useReducedMotion().
 */

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, gap = 0.08, className }: { children: ReactNode; gap?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}

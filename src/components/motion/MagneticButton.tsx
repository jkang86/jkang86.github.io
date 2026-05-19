// src/components/motion/MagneticButton.tsx
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import clsx from "@/lib/clsx";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "style" | "ref"> {
  children: ReactNode;
  /** How far the button drifts toward the cursor, in px. Default 14. */
  strength?: number;
}

/**
 * Button with a magnetic hover: cursor proximity attracts the button slightly,
 * giving the click target weight. Uses spring physics for a natural feel.
 */
export default function MagneticButton({ children, strength = 14, className, onMouseMove, onMouseLeave, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });
  const tx = useTransform(springX, (v) => `${v}px`);
  const ty = useTransform(springY, (v) => `${v}px`);

  return (
    <motion.button
      ref={ref}
      className={clsx("relative will-change-transform", className)}
      style={{ x: tx, y: ty }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = e.clientX - (rect.left + rect.width / 2);
        const cy = e.clientY - (rect.top + rect.height / 2);
        x.set((cx / rect.width) * strength * 2);
        y.set((cy / rect.height) * strength * 2);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        x.set(0);
        y.set(0);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative diagonal speed lines. Pure SVG. Animates with framer.
 */
export default function SpeedLines({
  height = 80,
  count = 9,
  className,
}: {
  height?: number;
  count?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const lines = Array.from({ length: count }).map((_, i) => {
    const y = (i / count) * 80 + Math.random() * 6;
    const len = 220 + Math.random() * 380;
    const start = Math.random() * 1440;
    const stroke = i % 3 === 0 ? "var(--color-red)" : i % 3 === 1 ? "var(--color-gold)" : "var(--color-border)";
    const op = 0.15 + Math.random() * 0.4;
    return { y, len, start, stroke, op, dur: 1.2 + Math.random() * 1.6, key: i };
  });

  return (
    <svg
      className={className}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ height, width: "100%", display: "block", pointerEvents: "none" }}
      aria-hidden="true"
    >
      {lines.map((l) => (
        <motion.line
          key={l.key}
          x1={l.start}
          y1={l.y}
          x2={l.start + l.len}
          y2={l.y - 6}
          stroke={l.stroke}
          strokeWidth={1.4}
          opacity={l.op}
          initial={reduce ? false : { x: -200 }}
          animate={reduce ? undefined : { x: [0, 1640] }}
          transition={reduce ? undefined : { duration: l.dur, repeat: Infinity, ease: "linear", delay: -Math.random() * l.dur }}
        />
      ))}
    </svg>
  );
}

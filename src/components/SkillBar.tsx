// src/components/SkillBar.tsx
import { motion, useReducedMotion } from "framer-motion";

interface SkillBarProps {
  name: string;
  pct: number;
  index: number;
}

export default function SkillBar({ name, pct, index }: SkillBarProps) {
  const reduce = useReducedMotion();
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${name} proficiency: ${pct}%`}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-xs tracking-ultra uppercase text-brand-white">
          {name}
        </span>
        <span className="font-mono text-xs tracking-ultra text-brand-gold">
          {pct}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden border border-brand-gold bg-brand-surface rounded-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-red to-red-400"
          style={{ transformOrigin: "left", width: `${pct}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            duration: reduce ? 0.001 : 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: reduce ? 0 : index * 0.08,
          }}
        />
      </div>
    </div>
  );
}

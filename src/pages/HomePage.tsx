// src/pages/HomePage.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import TigerSprite from "@/components/TigerSprite";
import SpeedLines from "@/components/motion/SpeedLines";
import MagneticButton from "@/components/motion/MagneticButton";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Hero / Onboarding page.
 * - GSAP timeline does the cinematic letter reveal of THIS IS / JOSEPH / KANG.
 * - Tiger sprites are positioned absolutely with framer entrance animations.
 * - Stat row uses Framer Stagger.
 * - CTAs are magnetic.
 */
const STATS = [
  { num: "4",    suffix: "",  unit: "PROJECTS BUILT" },
  { num: "12",   suffix: "+", unit: "TOOLS MASTERED"  },
  { num: "6",    suffix: "",  unit: "ML MODELS"        },
  { num: "3.8",  suffix: "",  unit: "GPA"              },
];

export default function HomePage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !titleRef.current) return;
    const lines = titleRef.current.querySelectorAll<HTMLElement>("[data-line]");
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        yPercent: 110,
        rotate: 4,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
      });
    }, titleRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden pt-[120px]">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grid-faint [background-size:48px_48px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 bg-scanlines" aria-hidden="true" />

      {/* Top speed lines */}
      <div className="absolute inset-x-0 top-[72px] z-0">
        <SpeedLines height={120} count={11} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Left — title block */}
        <div>
          <FadeUp>
            <span className="label-kicker">// WELCOME</span>
          </FadeUp>

          <div ref={titleRef} className="relative mt-3 mb-4">
            {/* Tigers around the title */}
            <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: -10 }} transition={{ delay: 0.6, type: "spring", stiffness: 110, damping: 12 }} className="absolute -left-16 -top-10 z-20">
              <TigerSprite state="excited" size={130} float />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0, rotate: 6 }} transition={{ delay: 0.85, type: "spring", stiffness: 80, damping: 14 }} className="absolute right-[-90px] top-[38%] z-20 -translate-y-1/2">
              <TigerSprite state="dash" size={150} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0, rotate: -8 }} transition={{ delay: 1.05, type: "spring", stiffness: 110, damping: 12 }} className="absolute -bottom-8 -left-12 z-20">
              <TigerSprite state="zoom" size={120} flip />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, rotate: 12 }} transition={{ delay: 1.25, type: "spring", stiffness: 130, damping: 10 }} className="absolute bottom-2 right-[-40px] z-20">
              <TigerSprite state="focused" size={110} float />
            </motion.div>

            <h1 className="relative z-10 font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.95] tracking-tightest text-brand-white">
              <span data-line className="block overflow-hidden">THIS IS</span>
              <span data-line className="block overflow-hidden">JOSEPH</span>
              <span data-line className="block overflow-hidden">KANG.</span>
            </h1>
          </div>

          <FadeUp delay={0.4}>
            <p className="max-w-[44ch] font-body text-base text-brand-muted text-pretty">
              Data analyst, CS graduate, and front-end builder. Three minutes to see the work, the data, and the way I think. Let's load in.
            </p>
          </FadeUp>

          <Stagger className="mt-6 flex flex-wrap gap-6" gap={0.1}>
            {STATS.map((s) => (
              <StaggerItem key={s.unit}>
                <div className="font-display text-4xl text-brand-white">
                  {s.num}{s.suffix}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-ultra text-brand-gold">{s.unit}</div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={0.6}>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                className="btn btn-primary"
                onClick={() => navigate("/projects")}
              >
                BEGIN TOUR →
              </MagneticButton>
              <MagneticButton
                className="btn btn-outline"
                strength={8}
                onClick={() => navigate("/showcase")}
              >
                SKIP TO PROJECTS
              </MagneticButton>
            </div>
          </FadeUp>
        </div>

        {/* Right — identity card */}
        <FadeUp delay={0.5}>
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="relative border border-brand-border bg-gradient-to-b from-brand-surface to-brand-raised p-6 hex min-h-[420px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs tracking-ultra text-brand-gold">ID · 0042</span>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-brand-white">JOSEPH KANG</h3>
                <span className="font-mono text-xs tracking-ultra text-brand-dim">SEOUL · KR / SF · US</span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-ultra text-brand-success">
                <span className="h-2 w-2 rounded-full bg-brand-success shadow-[0_0_8px] shadow-brand-success" />
                LIVE
              </span>
            </div>
            <div className="my-6 grid place-items-center">
              <TigerSprite state="excited" size={180} float />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border pt-4">
              <div>
                <div className="font-mono text-[10px] tracking-ultra text-brand-dim">ROLE</div>
                <div className="font-heading text-base font-bold text-brand-white">DATA / FE</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-ultra text-brand-dim">STATUS</div>
                <div className="font-heading text-base font-bold text-brand-success">OPEN TO WORK</div>
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>

      {/* Bottom speed lines */}
      <div className="absolute inset-x-0 bottom-0 z-0">
        <SpeedLines height={80} count={7} />
      </div>
    </section>
  );
}

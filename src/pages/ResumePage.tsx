// src/pages/ResumePage.tsx
import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TigerSprite, { type TigerState } from "@/components/TigerSprite";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Skill { name: string; pct: number; }

const SKILLS: Skill[] = [
  { name: "Python",       pct: 90 },
  { name: "Pandas",       pct: 88 },
  { name: "SQL",          pct: 85 },
  { name: "Excel",        pct: 80 },
  { name: "scikit-learn", pct: 78 },
  { name: "R",            pct: 75 },
  { name: "Tableau",      pct: 70 },
  { name: "Power BI",     pct: 68 },
];

const EXPERIENCE = [
  {
    role:     "Freelance Web Developer",
    org:      "Self-Employed",
    location: "Los Angeles, CA",
    period:   "June 2025 – Present",
    bullets: [
      "Built Loft Café production website — HTML/CSS/JS, custom JavaScript shopping cart",
      "Implemented responsive design across mobile, tablet, and desktop breakpoints",
      "Optimized page load performance and cross-browser compatibility",
    ],
  },
];

const EDUCATION = [
  {
    degree:  "B.S. Mathematics & Computer Science",
    school:  "University of Illinois at Chicago",
    period:  "2021 – 2025",
    gpa:     "3.8",
  },
];

const CERTS = [
  {
    name:   "IBM Data Analyst Professional Certificate",
    issuer: "IBM / Coursera",
    year:   "2025",
  },
];

// ─── SkillBar ─────────────────────────────────────────────────────────────────

interface SkillBarProps { skill: Skill; index: number; }

function SkillBar({ skill, index }: SkillBarProps) {
  const reduce = useReducedMotion();
  return (
    <div
      role="progressbar"
      aria-valuenow={skill.pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill.name} proficiency: ${skill.pct}%`}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-xs tracking-ultra uppercase text-brand-white">
          {skill.name}
        </span>
        <span className="font-mono text-xs tracking-ultra text-brand-gold">
          {skill.pct}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden border border-brand-gold bg-brand-surface rounded-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-red to-red-400"
          style={{ transformOrigin: "left", width: `${skill.pct}%` }}
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

// ─── ResumePage ───────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [spriteState, setSpriteState] = useState<TigerState>("focused");

  const handleDownload = useCallback(() => {
    setSpriteState("excited");
    const t = setTimeout(() => setSpriteState("focused"), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pt-[100px] pb-20">
      <section className="mx-auto max-w-[1280px] px-7">

        {/* ── Header ── */}
        <FadeUp>
          <div className="relative">
            <span className="label-kicker">// CAREER RECORD</span>
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tightest text-brand-white">
              RESUME
            </h1>
            <div className="absolute right-0 top-0 hidden lg:block">
              <TigerSprite state={spriteState} size={140} float />
            </div>
          </div>
        </FadeUp>

        {/* ── Download CTA ── */}
        <FadeUp delay={0.1}>
          <a
            href="/assets/resume.pdf"
            download
            onClick={handleDownload}
            className="mt-6 inline-flex btn btn-primary"
            aria-label="Download resume as PDF"
          >
            ↓ DOWNLOAD PDF
          </a>
        </FadeUp>

        {/* ── Two-column body ── */}
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.6fr]">

          {/* Left — Skills · Education · Certs */}
          <div className="space-y-14">

            {/* Skill Matrix */}
            <div>
              <FadeUp>
                <span className="label-kicker">// SKILL MATRIX</span>
              </FadeUp>
              <div className="mt-5 space-y-5">
                {SKILLS.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <FadeUp>
                <span className="label-kicker">// EDUCATION</span>
              </FadeUp>
              <Stagger className="mt-5 space-y-4" gap={0.08}>
                {EDUCATION.map((e) => (
                  <StaggerItem key={e.degree}>
                    <div className="border border-brand-border bg-brand-surface p-5">
                      <div className="font-heading text-base font-bold uppercase tracking-wide text-brand-white">
                        {e.degree}
                      </div>
                      <div className="mt-1 font-mono text-[11px] tracking-ultra text-brand-gold">
                        {e.school}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-ultra text-brand-muted">
                          {e.period}
                        </span>
                        <span className="font-mono text-[10px] tracking-ultra text-brand-gold">
                          GPA {e.gpa}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Certifications */}
            <div>
              <FadeUp>
                <span className="label-kicker">// CERTIFICATIONS</span>
              </FadeUp>
              <Stagger className="mt-5 space-y-4" gap={0.08}>
                {CERTS.map((c) => (
                  <StaggerItem key={c.name}>
                    <div className="flex items-start gap-4 border border-brand-border bg-brand-surface p-5">
                      <span
                        className="mt-0.5 font-display text-2xl leading-none text-brand-red"
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                      <div>
                        <div className="font-heading text-sm font-bold uppercase tracking-wide text-brand-white">
                          {c.name}
                        </div>
                        <div className="mt-1 font-mono text-[10px] tracking-ultra text-brand-muted">
                          {c.issuer} · {c.year}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Right — Work Experience */}
          <div>
            <FadeUp>
              <span className="label-kicker">// WORK EXPERIENCE</span>
            </FadeUp>
            <div className="mt-5 space-y-10">
              {EXPERIENCE.map((exp, i) => (
                <FadeUp key={exp.role} delay={i * 0.08}>
                  <div className="border-l-2 border-brand-red pl-6">
                    <div className="font-mono text-xs tracking-ultra text-brand-red uppercase">
                      {exp.period}
                    </div>
                    <div className="mt-1 font-heading text-xl font-bold uppercase tracking-wide text-brand-white">
                      {exp.role}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] tracking-ultra text-brand-gold">
                      {exp.org} · {exp.location}
                    </div>
                    <ul className="mt-5 space-y-3" aria-label={`Responsibilities at ${exp.org}`}>
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-3 font-body text-sm leading-relaxed text-brand-muted">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                            aria-hidden="true"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Contact strip */}
            <FadeUp delay={0.2}>
              <div className="mt-14 border-t border-brand-border pt-8">
                <span className="label-kicker">// GET IN TOUCH</span>
                <div className="mt-4 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/jkang86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    aria-label="GitHub profile (opens in new tab)"
                  >
                    GITHUB →
                  </a>
                  <a
                    href="https://linkedin.com/in/jkang86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    aria-label="LinkedIn profile (opens in new tab)"
                  >
                    LINKEDIN →
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}

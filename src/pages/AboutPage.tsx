// src/pages/AboutPage.tsx
import { useReducedMotion, motion } from "framer-motion";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

interface Skill {
  name: string;
  pct: number;
}

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

const ACHIEVEMENTS = [
  {
    title: "B.S. Mathematics & Computer Science",
    sub: "University of Illinois at Chicago · 2021–2025",
  },
  {
    title: "IBM Data Analyst Professional Certificate",
    sub: "IBM / Coursera · 2025",
  },
];

const HOBBIES = [
  "League of Legends",
  "Riftbound TCG",
  "Data Exploration",
  "Esports Analytics",
];

interface SkillBarProps {
  skill: Skill;
  index: number;
}

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

export default function AboutPage() {
  return (
    <div className="pt-[100px] pb-20">
      <section className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <FadeUp>
          <div className="relative">
            <span className="label-kicker">// CHARACTER SHEET</span>
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tightest text-brand-white">
              ABOUT ME
            </h1>
            <div className="absolute right-0 top-0 hidden lg:block">
              <TigerSprite state="focused" size={140} float />
            </div>
          </div>
        </FadeUp>

        {/* Bio */}
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-[60ch] font-body text-base leading-relaxed text-brand-muted">
            Data analyst and CS graduate based in Los Angeles. I build predictive models,
            automate data pipelines, and create visualizations that make complex patterns
            readable — then deploy them live. Outside of data work, I play League of Legends,
            collect Riftbound TCG cards, and analyze esports statistics for fun.
          </p>
        </FadeUp>

        {/* Skill bars */}
        <div className="mt-14">
          <FadeUp>
            <span className="label-kicker">// SKILL MATRIX</span>
          </FadeUp>
          <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-5">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <FadeUp>
            <span className="label-kicker">// ACHIEVEMENTS UNLOCKED</span>
          </FadeUp>
          <Stagger className="mt-5 grid gap-4 md:grid-cols-2" gap={0.1}>
            {ACHIEVEMENTS.map((a) => (
              <StaggerItem key={a.title}>
                <div className="flex items-start gap-4 border border-brand-border bg-brand-surface p-5">
                  <span className="mt-0.5 text-2xl" aria-hidden="true">🏆</span>
                  <div>
                    <div className="font-heading text-base font-bold uppercase tracking-wide text-brand-white">
                      {a.title}
                    </div>
                    <div className="mt-1 font-mono text-[11px] tracking-ultra text-brand-muted">
                      {a.sub}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Quest log */}
        <div className="mt-16">
          <FadeUp>
            <span className="label-kicker">// QUEST LOG</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-5 border-l-2 border-brand-gold pl-6">
              <div className="font-mono text-xs tracking-ultra text-brand-gold">
                2025–PRESENT
              </div>
              <div className="mt-1 font-heading text-lg font-bold uppercase tracking-wide text-brand-white">
                Freelance Web Developer · Los Angeles
              </div>
              <p className="mt-2 font-body text-sm text-brand-muted">
                Built Loft Café production site — HTML/CSS/JS, custom JavaScript
                shopping cart, responsive design across mobile and desktop breakpoints.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Hobbies */}
        <div className="mt-16">
          <FadeUp>
            <span className="label-kicker">// HOBBIES</span>
          </FadeUp>
          <Stagger className="mt-4 flex flex-wrap gap-2" gap={0.06}>
            {HOBBIES.map((h) => (
              <StaggerItem key={h}>
                <span className="tag border-brand-gold text-brand-gold">{h}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}

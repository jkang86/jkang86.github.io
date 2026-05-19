// src/pages/ContactPage.tsx
import { motion, useReducedMotion } from "framer-motion";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";

interface ContactLink {
  label: string;
  href: string;
  ariaLabel: string;
}

const LINKS: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/jkang86",
    ariaLabel: "GitHub profile (opens in new tab)",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jkang86",
    ariaLabel: "LinkedIn profile (opens in new tab)",
  },
];

export default function ContactPage() {
  const reduce = useReducedMotion();
  return (
    <div className="min-h-[calc(100vh-72px)] pt-[120px] pb-20">
      <section className="mx-auto max-w-[1280px] px-7">
        {/* Heading block */}
        <FadeUp>
          <div className="relative">
            <h1
              className="font-display leading-[0.9] tracking-tightest text-brand-red"
              style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
            >
              GG WP.
            </h1>
            {/* Tiger positioned in upper-right of heading — hidden on small screens to avoid overlap */}
            <div className="absolute -right-4 -top-8 hidden lg:block xl:-right-12">
              <TigerSprite state="excited" size={150} />
            </div>
          </div>

          <p className="mt-6 font-body text-lg text-brand-muted">
            Thanks for stopping by.
          </p>
          <p className="font-heading text-xl font-bold uppercase tracking-wide text-brand-white">
            Let's build something.
          </p>
        </FadeUp>

        {/* Link cards */}
        <Stagger className="mt-12 flex flex-col gap-4 sm:flex-row" gap={0.12}>
          {LINKS.map((link) => (
            <StaggerItem key={link.label}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                whileHover={reduce ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="flex items-center justify-between gap-6 border border-brand-border bg-brand-surface px-8 py-6 font-heading text-2xl font-bold uppercase tracking-wide text-brand-white transition-colors hover:border-brand-gold hover:text-brand-gold"
              >
                {link.label}
                <span className="font-mono text-brand-red" aria-hidden="true">→</span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Mobile sprite — below the links so it never overlaps */}
        <div className="mt-14 flex justify-end lg:hidden">
          <TigerSprite state="excited" size={100} />
        </div>
      </section>
    </div>
  );
}

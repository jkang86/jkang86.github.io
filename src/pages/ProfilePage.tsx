import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp } from "@/components/motion/Reveal";

const TABS = ["IDENTITY", "PREFERENCES", "A11Y", "ACCOUNT"] as const;

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("IDENTITY");

  return (
    <div className="pt-[100px] pb-16">
      {/* Hero card */}
      <section className="mx-auto max-w-[1280px] px-7">
        <FadeUp>
          <div className="grid grid-cols-1 gap-8 border border-brand-border bg-brand-surface p-8 lg:grid-cols-[200px_1fr]">
            <div className="hex grid h-40 w-40 place-items-center border border-brand-gold bg-brand-raised">
              <TigerSprite state="excited" size={140} float />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="label-kicker">// PLAYER CARD</span>
                <span className="border border-brand-success px-2 py-0.5 font-mono text-[10px] tracking-ultra text-brand-success">ONLINE</span>
              </div>
              <h1 className="mt-2 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95] tracking-tightest text-brand-white">JOSEPH KANG</h1>
              <div className="mt-3 flex gap-4 font-body text-sm text-brand-muted">
                <span>Data Analyst · Front-End</span>
                <span>·</span>
                <span>Seoul, KR</span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-brand-border">
          <LayoutGroup>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`relative px-4 py-3 font-mono text-xs tracking-ultra ${tab === t ? "text-brand-red" : "text-brand-muted hover:text-brand-white"}`}>
                {t}
                {tab === t && <motion.span layoutId="profile-tab-bar" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-red" />}
              </button>
            ))}
          </LayoutGroup>
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border border-brand-border bg-brand-surface p-6">
          <h3 className="font-heading text-xl text-brand-white">{tab}</h3>
          <p className="mt-2 font-body text-sm text-brand-muted">Settings panel content lives here. Wire to your real account state.</p>
        </motion.div>
      </section>
    </div>
  );
}

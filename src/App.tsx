// src/App.tsx
import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Nav from "@/components/Nav";
import ParticleBG from "@/components/motion/ParticleBG";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ShowcasePage from "@/pages/ShowcasePage";
import GamingPage from "@/pages/GamingPage";
import ResumePage from "@/pages/ResumePage";
import ContactPage from "@/pages/ContactPage";
import useLenis from "@/lib/useLenis";
import { preloadTigers } from "@/components/TigerSprite";

function PageTransitions() {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -12 }}
        transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/"          element={<HomePage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/projects"  element={<ProjectsPage />} />
          <Route path="/showcase"  element={<ShowcasePage />} />
          <Route path="/gaming"    element={<GamingPage />} />
          <Route path="/resume"    element={<ResumePage />} />
          <Route path="/contact"   element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useLenis();
  useEffect(() => { preloadTigers(); }, []);
  return (
    <HashRouter>
      {/* Skip navigation — first focusable element on every page */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:font-heading focus:text-sm focus:uppercase focus:tracking-ultra"
      >
        Skip to main content
      </a>
      <ParticleBG />
      <Nav />
      <main id="main-content" className="relative z-10">
        <PageTransitions />
      </main>
    </HashRouter>
  );
}

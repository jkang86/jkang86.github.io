// src/components/Nav.tsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const links = [
  { to: "/",         label: "Home" },
  { to: "/about",    label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/showcase", label: "Showcase" },
  { to: "/gaming",   label: "Gaming" },
  { to: "/resume",   label: "Resume" },
  { to: "/contact",  label: "Contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("jk-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const location = useLocation();
  const reduce = useReducedMotion();

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("jk-theme", dark ? "dark" : "light");
  }, [dark]);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border/60 bg-brand-bg/80 backdrop-blur-md"
    >
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" aria-label="Joseph Kang — Home" className="flex items-center gap-3">
          <span className="hex grid h-9 w-9 place-items-center border border-brand-gold font-display text-base text-brand-gold">JK</span>
          <span className="font-display text-lg tracking-ultra text-brand-white">JOSEPH KANG</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 font-mono text-xs uppercase tracking-ultra transition-colors ${isActive ? "text-brand-red" : "text-brand-muted hover:text-brand-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-2 -bottom-px h-px bg-brand-red"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid min-h-[44px] min-w-[44px] place-items-center border border-brand-border font-mono text-sm text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            {dark ? "◑" : "◐"}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="relative flex h-8 w-8 min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              className="block h-px w-5 bg-brand-white"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-5 bg-brand-white"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-px w-5 bg-brand-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-brand-border bg-brand-raised/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-6 py-3 font-mono text-xs uppercase tracking-ultra transition-colors ${isActive ? "text-brand-red" : "text-brand-muted hover:text-brand-white"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

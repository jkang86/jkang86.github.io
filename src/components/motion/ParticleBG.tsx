import { useEffect, useRef } from "react";

/**
 * Performance-friendly particle background. Canvas-based, RAF-driven, throttled
 * by devicePixelRatio. Auto-pauses when document is hidden.
 * Hidden entirely under prefers-reduced-motion.
 */
export default function ParticleBG({
  density = 0.00006,
  color = "rgba(214,10,46,0.35)",
  className,
}: {
  density?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      const count = Math.floor(w * h * density);
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    }

    function tick() {
      if (!ctx) return;
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    }

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [density, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

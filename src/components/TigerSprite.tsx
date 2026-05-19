import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import clsx from "@/lib/clsx";

export type TigerState = "excited" | "dash" | "focused" | "zoom";

const SPRITE_MAP: Record<TigerState, string> = {
  excited: "/sprites/tiger-excited.png",
  dash:    "/sprites/tiger-dash.png",
  focused: "/sprites/tiger-focused.png",
  zoom:    "/sprites/tiger-zoom.png",
};

interface TigerSpriteProps extends Omit<HTMLMotionProps<"img">, "src" | "alt"> {
  state?: TigerState;
  size?: number;
  flip?: boolean;
  /** Float animation in idle state. Disabled for users with prefers-reduced-motion. */
  float?: boolean;
}

const TigerSprite = forwardRef<HTMLImageElement, TigerSpriteProps>(
  ({ state = "focused", size = 120, flip = false, float = false, className, style, ...rest }, ref) => {
    const reduce = useReducedMotion();
    return (
      <motion.img
        ref={ref}
        src={SPRITE_MAP[state]}
        alt=""
        aria-hidden="true"
        draggable={false}
        animate={float && !reduce ? { y: [0, -8, 0] } : undefined}
        transition={float && !reduce ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
        className={clsx("select-none pointer-events-none", className)}
        style={{
          width: size,
          height: "auto",
          objectFit: "contain",
          transform: flip ? "scaleX(-1)" : undefined,
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,.45))",
          ...style,
        }}
        {...rest}
      />
    );
  },
);
TigerSprite.displayName = "TigerSprite";

export default TigerSprite;

/** Preload all four sprite PNGs. Call once at app boot. */
export function preloadTigers() {
  Object.values(SPRITE_MAP).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

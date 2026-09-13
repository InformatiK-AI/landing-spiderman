"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { NAV } from "@/content/copy";
import { SPRING } from "@/lib/motion/tokens";

/**
 * Hilo de telaraña que se teje con el scroll. Hace de orientación sin gastar
 * cromo de UI en una barra de navegación.
 *
 * Usa `scaleX`, nunca `width`: `width` provoca layout en cada frame.
 * Decorativo, así que `aria-hidden`.
 */
export function ScrollProgressWeb() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.drift);

  return (
    <div
      aria-hidden="true"
      title={NAV.progressLabel}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-ink-800"
    >
      <m.div
        className="h-full origin-left bg-web-red-500"
        style={{ scaleX, willChange: "transform" }}
      />
    </div>
  );
}

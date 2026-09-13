"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SPRING } from "@/lib/motion/tokens";

/**
 * Parallax ligado al scroll.
 *
 * El progreso se queda como MotionValue y se pasa directo a `style`: Framer lo
 * escribe en el nodo dentro de su propio frameloop, así que hay CERO re-render
 * por frame. Cualquier useState en un handler de scroll está prohibido.
 */
export function Parallax({
  children,
  /** Desplazamiento total, en porcentaje de la propia altura. */
  distance = 18,
  smooth = false,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  smooth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], ["0%", `${distance}%`]);
  // Spring sólo sobre `y`. Nunca sobre opacity: parpadea al invertir dirección.
  const smoothed = useSpring(scrollYProgress, SPRING.drift);
  const springY = useTransform(smoothed, [0, 1], ["0%", `${distance}%`]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y: smooth ? springY : raw }}>{children}</m.div>
    </div>
  );
}

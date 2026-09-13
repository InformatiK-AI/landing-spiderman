"use client";

import { useScroll, type MotionValue, type UseScrollOptions } from "framer-motion";
import { useRef } from "react";

/**
 * Expone el progreso 0→1 de una sección a sus hijos como render-prop.
 *
 * Un `useScroll` con `target` POR SECCIÓN, nunca uno global: así cada escena
 * mide sólo lo suyo y no hay un listener compartido que recalcule todo.
 */
export function ScrollScene({
  children,
  className,
  offset = ["start start", "end end"],
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  className?: string;
  offset?: UseScrollOptions["offset"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <div ref={ref} className={className}>
      {children(scrollYProgress)}
    </div>
  );
}

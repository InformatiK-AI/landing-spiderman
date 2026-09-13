"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { SPRING } from "@/lib/motion/tokens";

/**
 * Atracción magnética al puntero. Sólo con `(pointer: fine)`: en táctil un
 * efecto de hover queda pegado tras el tap.
 */
export function MagneticCTA({
  children,
  strength = 0.18,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const fine = useFinePointer();
  const reduced = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.pop);
  const sy = useSpring(y, SPRING.pop);

  const enabled = fine && !reduced;

  return (
    <m.div
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={
        enabled
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
              y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
            }
          : undefined
      }
      onPointerLeave={
        enabled
          ? () => {
              x.set(0);
              y.set(0);
            }
          : undefined
      }
    >
      {children}
    </m.div>
  );
}

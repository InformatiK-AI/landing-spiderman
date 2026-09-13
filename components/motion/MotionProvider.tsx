"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { DUR, EASE } from "@/lib/motion/tokens";

/**
 * `strict` hace que usar `<motion.div>` lance un error, obligando a `<m.div>`.
 * Eso es lo que mantiene el bundle en el feature-set `domAnimation` (~18 KB gz)
 * en vez de arrastrar layout projection y drag, que este proyecto no usa.
 *
 * `reducedMotion="user"` es el NIVEL 2: Framer desactiva las animaciones de
 * transform y conserva las de opacity, que es el comportamiento correcto —
 * se mantiene la jerarquía de aparición sin movimiento vestibular.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: DUR.base, ease: EASE.snap }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

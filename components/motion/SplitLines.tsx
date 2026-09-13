"use client";

import { m } from "framer-motion";
import { SPRING, STAGGER } from "@/lib/motion/tokens";

/**
 * Parte un titular en líneas que suben desde abajo dentro de un contenedor
 * `overflow-hidden`.
 *
 * A11y: los spans animados son `aria-hidden` y la frase completa se expone una
 * sola vez en un `sr-only`. Si no, un lector de pantalla leería 14 fragmentos
 * sueltos en vez de una frase.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animate = true,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** false en reduced-motion: el titular aparece ya compuesto. */
  animate?: boolean;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => (
        <span key={line} aria-hidden="true" className="block overflow-hidden">
          <m.span
            className={lineClassName ?? "block"}
            initial={animate ? { y: "110%" } : false}
            animate={{ y: "0%" }}
            transition={{ ...SPRING.settle, delay: delay + i * STAGGER.lines }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

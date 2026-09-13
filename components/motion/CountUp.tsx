"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { DUR, EASE } from "@/lib/motion/tokens";

/**
 * Contador accesible.
 *
 * El valor final lo renderiza el servidor en un `sr-only` (`formatted`), y el
 * número que anima es `aria-hidden`. Así el valor es correcto sin JS, es
 * correcto para un lector de pantalla, y no se anuncia 40 veces mientras sube.
 *
 * `tabular-nums` evita que el ancho salte mientras cuenta.
 */
export function CountUp({
  value,
  formatted,
  className,
}: {
  value: number;
  /** El valor ya formateado en es-CL, con su unidad. */
  formatted: string;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>({ amount: 0.6 });
  const nodeRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;

    if (reduced) {
      node.textContent = formatted;
      return;
    }

    const controls = animate(0, value, {
      duration: DUR.epic * 1.5,
      ease: EASE.snap,
      onUpdate: (latest) => {
        // Se interpola el número y se reconstruye el formato a partir del
        // texto final, para no reimplementar el formateo acá.
        const ratio = value === 0 ? 1 : latest / value;
        node.textContent = scaleFormatted(formatted, ratio);
      },
      onComplete: () => {
        node.textContent = formatted;
      },
    });

    return () => controls.stop();
  }, [inView, reduced, value, formatted]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{formatted}</span>
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        {formatted}
      </span>
    </span>
  );
}

/** Escala los dígitos de un texto formateado manteniendo su forma. */
function scaleFormatted(formatted: string, ratio: number): string {
  return formatted.replace(/[\d.,]+/, (match) => {
    const decimals = match.includes(",") ? match.split(",")[1]?.length ?? 0 : 0;
    const numeric = Number(match.replace(/\./g, "").replace(",", "."));
    if (Number.isNaN(numeric)) return match;
    const scaled = numeric * ratio;
    return scaled.toLocaleString("es-CL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  });
}

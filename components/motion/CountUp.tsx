"use client";

import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { DUR } from "@/lib/motion/tokens";

/**
 * Contador accesible.
 *
 * El valor final lo renderiza el servidor en un `sr-only` (`formatted`), y el
 * número que anima es `aria-hidden`. Así el valor es correcto sin JS, es
 * correcto para un lector de pantalla, y no se anuncia 40 veces mientras sube.
 *
 * `tabular-nums` evita que el ancho salte mientras cuenta.
 *
 * El tween se hace con un rAF propio en vez de con `animate` de framer-motion:
 * este es el único consumidor de esa función, e importarla arrastraba su módulo
 * al chunk principal por un interpolado de un número. Medido: 146 kB → 134 kB de
 * first-load JS.
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

    const durationMs = DUR.epic * 1500;
    const start = performance.now();
    let frame = 0;

    // ease-snap, cubic-bezier(.2,0,0,1), aproximado como ease-out cúbica: el
    // ojo no distingue la diferencia en un contador y ahorra la dependencia.
    const ease = (t: number) => 1 - (1 - t) ** 3;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      if (t >= 1) {
        node.textContent = formatted;
        return;
      }
      // Se reconstruye el formato a partir del texto final, para no
      // reimplementar el formateo acá.
      node.textContent = scaleFormatted(formatted, ease(t));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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

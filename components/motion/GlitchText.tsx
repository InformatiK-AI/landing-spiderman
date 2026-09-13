"use client";

import { cn } from "@/lib/cn";

/**
 * Aberración cromática por capas duplicadas. El jitter permanente es CSS-only
 * (±0.4px, ciclo de 4s) y se apaga solo con `motion-reduce:animate-none`.
 *
 * Las capas de color son `aria-hidden`: el texto real se lee una sola vez.
 */
export function GlitchText({
  children,
  className,
  intensity = 2,
}: {
  children: string;
  className?: string;
  /** Desplazamiento de las capas, en px. */
  intensity?: number;
}) {
  return (
    <span className={cn("relative inline-block isolate", className)}>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-web-red-500 mix-blend-screen motion-reduce:hidden"
        style={{
          transform: `translate3d(-${intensity}px, 0, 0)`,
          animation: "chroma-jitter 4s var(--ease-swing) infinite",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-web-blue-300 mix-blend-screen motion-reduce:hidden"
        style={{
          transform: `translate3d(${intensity}px, 0, 0)`,
          animation: "chroma-jitter 4s var(--ease-swing) -2s infinite",
        }}
      >
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

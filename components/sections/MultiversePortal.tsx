"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortalRing } from "@/components/art/PortalRing";
import { GlitchText } from "@/components/motion/GlitchText";
import { MULTIVERSE } from "@/content/copy";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

/**
 * Interstitial del clímax, entre el capítulo 3 y el 4. No es una sección
 * hermana: narrativamente es el punto de quiebre de No Way Home, así que va en
 * el flujo de salida de ese capítulo.
 *
 * Los "fragmentos de otro universo" son paneles de color con las paletas de los
 * otros dos Spider-Man, no imágenes.
 *
 * FOTOSENSIBILIDAD: el centelleo es CSS-only con ciclos de 2.4s (muy por debajo
 * de 3 Hz) y ninguna transición recorre de ink-050 a ink-950 en menos de 200 ms.
 *
 * El cambio ESTRUCTURAL de reduced-motion se expresa en CSS (`motion-reduce:`),
 * no con el hook: así es correcto en la primera pintura, no hay parpadeo de
 * layout al hidratar, y sigue siendo correcto sin JavaScript. El hook queda sólo
 * para lo que de verdad necesita JS: apagar las chispas y los transforms
 * ligados al scroll.
 */
const FRAGMENTS = [
  { id: "azul-rojo", colors: ["#1a4fb4", "#d71920"], label: "Otro universo" },
  { id: "rojo-negro", colors: ["#8e1118", "#0a0d14"], label: "Otro universo" },
] as const;

export function MultiversePortal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.4]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 8]);
  const fragmentOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.85], [0, 1, 0.2]);

  return (
    <section
      aria-labelledby={`${MULTIVERSE.headingId}-titulo`}
      id={MULTIVERSE.headingId}
      className="relative bg-ink-950"
    >
      <div ref={ref} className="h-[200vh] motion-reduce:h-auto">
        <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-gutter motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:py-section">
          {/* Anillos concéntricos */}
          <m.div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
            style={reduced ? undefined : { scale, rotate }}
          >
            <PortalRing sparks={!reduced} className="w-[min(90vw,42rem)]" />
            <PortalRing sparks={false} className="absolute w-[min(66vw,30rem)] opacity-60" />
            <PortalRing sparks={false} className="absolute w-[min(44vw,20rem)] opacity-40" />
          </m.div>

          {/* Fragmentos de otros universos: paneles de color, no imágenes. */}
          <m.div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-between px-[6vw]"
            style={reduced ? undefined : { opacity: fragmentOpacity }}
          >
            {FRAGMENTS.map((fragment, i) => (
              <div
                key={fragment.id}
                className="h-[34vh] w-[22vw] max-w-64 rounded-[var(--radius-panel)] border-2 border-ink-950"
                style={{
                  background: `linear-gradient(${i === 0 ? 145 : 215}deg, ${fragment.colors[0]}, ${fragment.colors[1]})`,
                  transform: `rotate(${i === 0 ? -6 : 5}deg)`,
                }}
              />
            ))}
          </m.div>

          <div className="relative max-w-[var(--container-prose)] text-center">
            <h2
              id={`${MULTIVERSE.headingId}-titulo`}
              className="text-display text-ink-050"
            >
              {MULTIVERSE.heading}
            </h2>
            <p className="mt-6 text-lead text-ink-100">{MULTIVERSE.body}</p>
            <p className="mt-8 font-display text-h2 uppercase">
              <GlitchText>{MULTIVERSE.glitch}</GlitchText>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

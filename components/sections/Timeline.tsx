"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TIMELINE_COPY } from "@/content/copy";
import { TIMELINE } from "@/content/timeline";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

/**
 * Cronología 2016–2026.
 *
 * ⚠️ Es el punto de a11y más delicado de la página: el scroll anclado es el
 * patrón que más proyectos "cinematográficos" reprueban, porque rompe teclado y
 * lectores de pantalla.
 *
 * La mitigación es estructural, no cosmética:
 *
 * 1. El contenido canónico es SIEMPRE un <ol> semántico de enlaces enfocables.
 *    El rail horizontal es una capa de presentación sobre esa lista.
 * 2. Todo el cambio de LAYOUT se expresa en CSS (`max-sm:` y `motion-reduce:`),
 *    nunca con un hook. Así la primera pintura ya es la correcta, no hay
 *    parpadeo al hidratar, y sin JavaScript la sección sigue siendo una lista
 *    vertical legible y navegable.
 * 3. JavaScript sólo añade lo que no se puede expresar en CSS: el desplazamiento
 *    `x` ligado al scroll y el realce del nodo activo. Ambos son transform y
 *    opacity, así que si no se aplican no se pierde nada.
 *
 * El nodo activo se deriva con UN solo useMotionValueEvent sobre el progreso, no
 * con un IntersectionObserver por nodo: un listener en lugar de siete.
 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const wide = useMediaQuery("(min-width: 640px)");
  const [active, setActive] = useState(0);

  /** Sólo gobierna los transforms, no el layout. */
  const animateRail = wide && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(
      Math.min(TIMELINE.length - 1, Math.floor(progress * TIMELINE.length)),
    );
  });

  return (
    <section
      aria-labelledby={TIMELINE_COPY.headingId}
      id={TIMELINE_COPY.headingId}
      className="relative"
    >
      <div className="mx-auto max-w-[var(--container-content)] px-gutter pt-section">
        <SectionHeading id={TIMELINE_COPY.headingId}>
          {TIMELINE_COPY.heading}
        </SectionHeading>
        <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-300">
          {TIMELINE_COPY.intro}
        </p>
      </div>

      {/* Altura: alta para el scrub, automática en móvil y con reduced-motion. */}
      <div ref={ref} className="h-[320vh] max-sm:h-auto motion-reduce:h-auto">
        <div
          className={
            "sticky top-0 flex h-svh items-center overflow-hidden " +
            "max-sm:static max-sm:block max-sm:h-auto max-sm:overflow-visible max-sm:px-gutter max-sm:py-13 " +
            "motion-reduce:static motion-reduce:block motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:px-gutter motion-reduce:py-13"
          }
        >
          {/* Hilo que une los nodos. Decorativo, y sólo en modo rail. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px bg-ink-800 max-sm:hidden motion-reduce:hidden"
          />

          <m.ol
            className={
              "relative m-0 list-none p-0 flex items-center gap-8 pl-[8vw] " +
              "max-sm:mx-auto max-sm:block max-sm:max-w-[var(--container-content)] max-sm:gap-0 max-sm:pl-0 " +
              "motion-reduce:mx-auto motion-reduce:block motion-reduce:max-w-[var(--container-content)] motion-reduce:gap-0 motion-reduce:pl-0"
            }
            style={animateRail ? { x, willChange: "transform" } : undefined}
          >
            {TIMELINE.map((entry, i) => {
              const isSolo = entry.kind === "solo";
              const isActive = animateRail && i === active;

              return (
                <li
                  key={entry.id}
                  className={
                    (isSolo
                      ? "w-[min(78vw,22rem)] shrink-0 "
                      : "w-[min(60vw,15rem)] shrink-0 ") +
                    "max-sm:w-auto max-sm:border-b max-sm:border-ink-800 max-sm:py-6 " +
                    "motion-reduce:w-auto motion-reduce:border-b motion-reduce:border-ink-800 motion-reduce:py-6"
                  }
                >
                  <m.div
                    animate={
                      animateRail
                        ? { scale: isActive ? 1.06 : 1, opacity: isActive ? 1 : 0.65 }
                        : undefined
                    }
                    className={
                      (isSolo ? "panel-ink p-6 " : "border-l-2 border-ink-700 pl-4 ") +
                      "max-sm:border-0 max-sm:bg-transparent max-sm:p-0 max-sm:shadow-none " +
                      "motion-reduce:border-0 motion-reduce:bg-transparent motion-reduce:p-0 motion-reduce:shadow-none"
                    }
                  >
                    <p
                      className={
                        "font-display leading-none " +
                        (isSolo ? "text-h2 text-web-red-500" : "text-h3 text-ink-300")
                      }
                    >
                      {entry.year}
                    </p>
                    <p className="mt-2 font-display text-kicker uppercase text-ink-300">
                      {isSolo ? TIMELINE_COPY.soloLabel : TIMELINE_COPY.ensembleLabel}
                    </p>

                    {/* Cada nodo solista es un enlace real a su capítulo. */}
                    {entry.href ? (
                      <a
                        href={entry.href}
                        className="mt-1 block font-display text-h3 uppercase text-ink-050 underline decoration-transparent transition-colors hocus:decoration-web-red-300 motion-reduce:transition-none"
                      >
                        {entry.title}
                      </a>
                    ) : (
                      <p
                        className="mt-1 font-display text-h3 uppercase text-ink-100"
                        lang="en"
                      >
                        {entry.title}
                      </p>
                    )}

                    <p className="mt-3 text-ink-300">{entry.note}</p>
                  </m.div>
                </li>
              );
            })}
          </m.ol>
        </div>
      </div>
    </section>
  );
}

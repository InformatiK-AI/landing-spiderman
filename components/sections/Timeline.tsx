"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TIMELINE_COPY } from "@/content/copy";
import { TIMELINE } from "@/content/timeline";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/**
 * Cronología 2016–2026.
 *
 * ⚠️ Es el punto de a11y más delicado de la página: el scroll anclado es el
 * patrón que más proyectos "cinematográficos" reprueban, porque rompe teclado y
 * lectores de pantalla.
 *
 * La mitigación es estructural, no cosmética: el contenido canónico es SIEMPRE
 * un <ol> semántico de enlaces enfocables. El rail horizontal es una capa de
 * presentación sobre esa lista, y sólo se activa con (min-width: 640px) Y
 * prefers-reduced-motion: no-preference. En cualquier otro caso se renderiza la
 * lista vertical — no es una degradación, es la versión accesible.
 *
 * El nodo activo se deriva con UN solo useMotionValueEvent sobre el progreso, no
 * con un IntersectionObserver por nodo.
 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const wide = useMediaQuery("(min-width: 640px)");
  const [active, setActive] = useState(0);

  const railMode = wide && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(
      TIMELINE.length - 1,
      Math.floor(progress * TIMELINE.length),
    );
    setActive(index);
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

      <div
        ref={ref}
        className={cn(railMode ? "h-[320vh]" : "h-auto")}
      >
        <div
          className={cn(
            railMode
              ? "sticky top-0 flex h-svh items-center overflow-hidden"
              : "px-gutter py-13",
          )}
        >
          {/* Hilo que une los nodos. Decorativo. */}
          {railMode ? (
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-ink-800" />
          ) : null}

          <m.ol
            className={cn(
              "relative m-0 list-none p-0",
              railMode
                ? "flex items-center gap-8 pl-[8vw] will-change-transform"
                : "mx-auto grid max-w-[var(--container-content)] gap-0",
            )}
            style={railMode ? { x } : undefined}
          >
            {TIMELINE.map((entry, i) => {
              const isSolo = entry.kind === "solo";
              const isActive = railMode && i === active;

              return (
                <li
                  key={entry.id}
                  className={cn(
                    railMode
                      ? isSolo
                        ? "w-[min(78vw,22rem)] shrink-0"
                        : "w-[min(60vw,15rem)] shrink-0"
                      : "border-b border-ink-800 py-6",
                  )}
                >
                  <m.div
                    animate={
                      railMode
                        ? { scale: isActive ? 1.06 : 1, opacity: isActive ? 1 : 0.65 }
                        : undefined
                    }
                    className={cn(
                      railMode && isSolo && "panel-ink p-6",
                      railMode && !isSolo && "border-l-2 border-ink-700 pl-4",
                    )}
                  >
                    <p
                      className={cn(
                        "font-display leading-none",
                        isSolo ? "text-h2 text-web-red-500" : "text-h3 text-ink-300",
                      )}
                    >
                      {entry.year}
                    </p>
                    <p className="mt-2 font-display text-kicker uppercase text-ink-300">
                      {isSolo ? TIMELINE_COPY.soloLabel : TIMELINE_COPY.ensembleLabel}
                    </p>

                    {/* Cada nodo solista es un enlace real al capítulo. */}
                    {entry.href ? (
                      <a
                        href={entry.href}
                        className="mt-1 block font-display text-h3 uppercase text-ink-050 underline decoration-transparent transition-colors hocus:decoration-web-red-300 motion-reduce:transition-none"
                      >
                        {entry.title}
                      </a>
                    ) : (
                      <p className="mt-1 font-display text-h3 uppercase text-ink-100" lang="en">
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

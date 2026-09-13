"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BendayOverlay } from "@/components/art/BendayOverlay";
import { PortalRing } from "@/components/art/PortalRing";
import { SkylineLayer } from "@/components/art/SkylineLayers";
import { SplitLines } from "@/components/motion/SplitLines";
import { TrailerDialog } from "@/components/trailer/TrailerDialog";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HERO, TIMELINE_COPY } from "@/content/copy";
import { getFilm } from "@/content/films";
import { TRAILERS } from "@/content/trailers";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { DUR, EASE } from "@/lib/motion/tokens";

/**
 * El hook: todo el viewport es el interior de un anillo de portal.
 *
 * El LCP es TEXTO, no arte. El h1 está en el HTML del servidor y pinta en el
 * primer frame útil; la apertura del portal es un `clip-path` sobre una capa ya
 * compuesta, así que no retrasa la pintura del titular.
 *
 * Detrás, "el nombre que nadie recuerda" es un muro de tags casi ilegible —
 * y el titular lo tapa. La idea del final de No Way Home, hecha literal.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  // El capítulo 3 es el pico emocional de la era, así que es el tráiler que
  // ofrece el hook. El modal existe sólo acá: en los capítulos el tráiler es
  // inline, que evita por completo el problema de gestión de foco.
  const featured = getFilm("no-way-home");
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Al salir, el portal se traga la pantalla y entrega la sección siguiente:
  // continuidad narrativa en vez de un corte.
  const skylineY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const portalScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div ref={ref} className="relative min-h-svh overflow-hidden bg-ink-950">
      {/* Capa 1 — gradiente de chispa del portal */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ scale: reduced ? 1 : portalScale }}
        initial={reduced ? false : { clipPath: "circle(0% at 50% 58%)" }}
        animate={{ clipPath: "circle(78% at 50% 58%)" }}
        transition={{ duration: DUR.slow, ease: EASE.snap, delay: 0.08 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,var(--color-portal-500)_0%,transparent_38%,var(--color-ink-950)_72%)] opacity-60" />

        {/* Capa 2 — el skyline, recortado dentro de la boca del portal */}
        <m.div
          className="absolute inset-x-0 bottom-0 h-[62%] text-ink-800"
          style={{ y: reduced ? 0 : skylineY }}
        >
          <SkylineLayer depth={0} className="opacity-70" />
        </m.div>
        <m.div
          className="absolute inset-x-0 bottom-0 h-[46%] text-ink-900"
          style={{ y: reduced ? 0 : skylineY }}
        >
          <SkylineLayer depth={2} />
        </m.div>
      </m.div>

      {/* El nombre que nadie recuerda: muro de tags casi ilegible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid select-none place-items-center overflow-hidden"
      >
        <p className="rotate-[-8deg] font-display text-[18vw] leading-[0.8] text-ink-800/70 whitespace-nowrap">
          {Array.from({ length: 4 }, () => HERO.forgottenName).join(" · ")}
        </p>
      </div>

      <PortalRing
        sparks={!reduced}
        className="absolute top-1/2 left-1/2 w-[min(120vw,75rem)] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <BendayOverlay />

      {/* Capa 3 — el titular, al frente, cruzando el borde del anillo */}
      <m.div
        className="relative z-10 mx-auto flex min-h-svh max-w-[var(--container-content)] flex-col justify-end px-gutter pb-24"
        style={{ y: reduced ? 0 : titleY, opacity: reduced ? 1 : titleOpacity }}
      >
        <m.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.fast, delay: 0.3 }}
        >
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </m.div>

        <h1 className="mt-4 text-hook text-ink-050">
          <SplitLines
            lines={HERO.lines}
            delay={0.32}
            animate={!reduced}
            lineClassName="block last:text-web-red-500"
          />
        </h1>

        <m.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.base, delay: 0.9 }}
          className="mt-8 max-w-[var(--container-prose)]"
        >
          <p className="text-lead text-ink-100">{HERO.sub}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <ButtonLink href={`#${TIMELINE_COPY.headingId}`}>
              {HERO.ctaPrimary}
            </ButtonLink>
            <TrailerDialog
              trailer={TRAILERS[featured.slug]}
              label={`${featured.titleEs ?? featured.title} — tráiler oficial`}
              triggerLabel={HERO.ctaSecondary}
              triggerClassName="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-panel)] border border-ink-700 px-6 py-3 font-display text-kicker uppercase text-ink-100 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-snap)] hocus:-translate-y-0.5 hocus:border-portal-300 motion-reduce:transition-none motion-reduce:hocus:translate-y-0"
            />
          </div>
        </m.div>
      </m.div>

      {/* Indicador de scroll: loop CSS, se apaga solo con reduced-motion. */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-display text-kicker uppercase text-ink-300 [animation:scroll-cue_2.4s_ease-in-out_infinite] motion-reduce:[animation:none]"
      >
        {HERO.scrollCue}
      </div>
    </div>
  );
}

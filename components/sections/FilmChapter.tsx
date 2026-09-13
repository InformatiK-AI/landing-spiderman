import { BendayOverlay } from "@/components/art/BendayOverlay";
import { WebPattern } from "@/components/art/WebPattern";
import { Reveal } from "@/components/motion/Reveal";
import { LiteYouTube } from "@/components/trailer/LiteYouTube";
import { Badge } from "@/components/ui/Badge";
import { CHAPTERS_COPY } from "@/content/copy";
import { filmAnchor } from "@/content/films";
import { TRAILERS } from "@/content/trailers";
import type { Film } from "@/content/types";

/**
 * La plantilla del core. UNA sola, instanciada por cada película desde los
 * datos: sin una sola rama por slug (lo hace cumplir check-invariants.mjs).
 *
 * Los tres beats están en el DOM en orden y son legibles sin JS: el scroll sólo
 * los hace entrar, nunca decide su contenido. Así un lector de pantalla lee el
 * arco completo de forma lineal.
 */
export function FilmChapter({
  film,
  showTrailer = true,
}: {
  film: Film;
  /** false cuando el estado de la película no justifica ofrecer un tráiler. */
  showTrailer?: boolean;
}) {
  const anchor = filmAnchor(film.slug);
  const headingId = `${anchor}-titulo`;
  const [primary, secondary, accent] = film.palette;
  const villain = film.villains.find((v) => v.primary) ?? film.villains[0];

  return (
    <section id={anchor} aria-labelledby={headingId} className="relative">
      {/* ── Portada de capítulo ───────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-gutter py-section"
        style={{
          background: `linear-gradient(165deg, var(--color-ink-950) 0%, ${secondary} 58%, ${primary} 140%)`,
        }}
      >
        <div className="absolute inset-0 text-ink-050">
          <WebPattern className="absolute -top-10 -left-10 h-[60%] w-[45%]" opacity={0.16} />
        </div>
        <BendayOverlay />

        <div className="relative mx-auto max-w-[var(--container-content)]">
          {/* El número de capítulo es decoración tipográfica. */}
          <p
            aria-hidden="true"
            className="font-display text-chapter leading-none text-ink-050/10 select-none"
          >
            0{film.chapter}
          </p>
          <div className="-mt-[6vw]">
            <h2 id={headingId} className="text-display text-ink-050">
              {film.titleEs ?? film.title}
            </h2>
            {film.titleEs ? (
              <p className="mt-2 font-display text-kicker uppercase text-ink-300" lang="en">
                {film.title}
              </p>
            ) : null}
            <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-100">
              {film.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Badge tone="red">{film.year}</Badge>
              <Badge>{film.director}</Badge>
              <Badge>{film.runtimeMinutes} min</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ── El arco en tres movimientos ───────────────────────────────── */}
      <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
        <p className="font-display text-kicker uppercase text-web-red-300">
          {CHAPTERS_COPY.beatsLabel}
        </p>
        <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-300">
          {film.synopsis}
        </p>

        <ol className="mt-12 grid list-none gap-10 p-0 md:grid-cols-3">
          {film.beats.map((beat, i) => (
            <Reveal as="li" key={beat.kicker} delay={i * 0.08}>
              <p
                className="font-display text-h3 leading-none"
                style={{ color: accent }}
                aria-hidden="true"
              >
                0{i + 1}
              </p>
              <p className="mt-3 font-display text-kicker uppercase text-ink-300">
                {beat.kicker}
              </p>
              <h3 className="mt-1 text-h3 text-ink-050">{beat.title}</h3>
              <p className="mt-3 text-ink-300">{beat.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* ── Cita ancla ─────────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <figure className="border-l-4 pl-6" style={{ borderColor: accent }}>
            <blockquote className="text-h3 text-ink-050">
              «{film.quote.text}»
            </blockquote>
            <figcaption className="mt-3 font-display text-kicker uppercase text-ink-300">
              — <cite className="not-italic">{film.quote.source}</cite>
            </figcaption>
          </figure>
        </Reveal>

        {/* ── Amenaza ────────────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <p className="font-display text-kicker uppercase text-web-red-300">
            {CHAPTERS_COPY.threatLabel}
          </p>
          <ul className="mt-4 flex list-none flex-wrap gap-x-8 gap-y-2 p-0">
            {film.villains.map((v) => (
              <li key={v.name} className="text-ink-100">
                <span className={v.primary ? "text-ink-050" : undefined}>{v.name}</span>
                <span className="text-ink-300"> · {v.actor}</span>
              </li>
            ))}
          </ul>
          {villain ? <span className="sr-only">Antagonista principal: {villain.name}.</span> : null}
        </Reveal>

        {/* ── Tráiler ────────────────────────────────────────────────── */}
        {showTrailer ? (
          <Reveal className="mt-16">
            <p className="font-display text-kicker uppercase text-web-red-300">
              {CHAPTERS_COPY.trailerLabel}
            </p>
            <div className="mt-4">
              <LiteYouTube
                trailer={TRAILERS[film.slug]}
                title={film.titleEs ?? film.title}
                year={film.year}
                palette={film.palette}
              />
            </div>
          </Reveal>
        ) : null}

        {film.caveat ? (
          <p className="mt-10 max-w-[var(--container-prose)] text-ink-300">
            <span className="font-display text-kicker uppercase">Salvedad · </span>
            {film.caveat}
          </p>
        ) : null}
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/Badge";
import { BRAND_NEW_DAY_COPY } from "@/content/copy";
import type { Film } from "@/content/types";
import { FilmChapter } from "./FilmChapter";

/**
 * Encuadre del capítulo cuatro, gobernado por `film.status`.
 *
 * El estado se comunica por TEXTO además de por color del badge: un estado que
 * sólo existe como color es invisible para quien no lo distingue.
 *
 * Cuando `showTrailer` es false no se renderiza un botón deshabilitado: la
 * sección simplemente no ofrece tráiler. Un control deshabilitado sin
 * explicación es peor que ningún control.
 */
export function WhatsNext({ film }: { film: Film }) {
  const copy = BRAND_NEW_DAY_COPY[film.status];

  return (
    <>
      <div className="mx-auto max-w-[var(--container-content)] px-gutter pt-section">
        <p className="font-display text-kicker uppercase text-web-red-300">
          {copy.kicker}
        </p>
        <h2 className="mt-3 text-h2 text-ink-050">{copy.heading}</h2>
        <div className="mt-5">
          <Badge tone="gold">{copy.badge}</Badge>
        </div>
        <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-300">
          {copy.body}
        </p>
      </div>

      <FilmChapter film={film} showTrailer={copy.showTrailer} />
    </>
  );
}

import { ComicGutter } from "@/components/layout/ComicGutter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CHAPTERS_COPY } from "@/content/copy";
import type { Film } from "@/content/types";
import { FilmChapter } from "./FilmChapter";

/**
 * Mapea las películas a capítulos. Server Component: el HTML de los cuatro
 * arcos viene del servidor, y sólo las hojas animadas son de cliente.
 */
export function FilmsSpine({
  films,
  children,
}: {
  films: readonly Film[];
  /** Se inserta después del último capítulo de `films` (el interstitial). */
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby={CHAPTERS_COPY.headingId} id={CHAPTERS_COPY.headingId}>
      <div className="mx-auto max-w-[var(--container-content)] px-gutter pt-section">
        <SectionHeading id={CHAPTERS_COPY.headingId}>
          {CHAPTERS_COPY.heading}
        </SectionHeading>
      </div>

      {films.map((film, i) => (
        <div key={film.slug}>
          <FilmChapter film={film} />
          {i < films.length - 1 ? <ComicGutter /> : null}
        </div>
      ))}

      {children}
    </section>
  );
}

import { ENSEMBLE } from "./ensemble";
import { FILMS, filmAnchor } from "./films";
import type { TimelineEntry } from "./types";

/** Solistas y apariciones de conjunto fusionadas y ordenadas por fecha. */
export const TIMELINE: readonly TimelineEntry[] = [
  ...FILMS.map(
    (film): TimelineEntry => ({
      id: film.slug,
      title: film.titleEs ?? film.title,
      year: film.year,
      releaseDate: film.releaseDate,
      kind: "solo",
      note: film.tagline,
      href: `#${filmAnchor(film.slug)}`,
    }),
  ),
  ...ENSEMBLE.map(
    (appearance): TimelineEntry => ({
      id: appearance.slug,
      title: appearance.title,
      year: appearance.year,
      releaseDate: appearance.releaseDate,
      kind: "ensemble",
      note: appearance.beat,
    }),
  ),
].sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));

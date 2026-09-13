import { brandNewDay } from "./films/brand-new-day";
import { farFromHome } from "./films/far-from-home";
import { homecoming } from "./films/homecoming";
import { noWayHome } from "./films/no-way-home";
import type { Film, FilmSlug } from "./types";

/** Las cuatro solistas, en orden cronológico. */
export const FILMS: readonly Film[] = [
  homecoming,
  farFromHome,
  noWayHome,
  brandNewDay,
] as const;

/** La trilogía que forma la espina dorsal de la página. */
export const TRILOGY: readonly Film[] = FILMS.slice(0, 3);

export function getFilm(slug: FilmSlug): Film {
  const film = FILMS.find((f) => f.slug === slug);
  if (!film) throw new Error(`Película desconocida: ${slug}`);
  return film;
}

export function filmAnchor(slug: FilmSlug): string {
  return `pelicula-${slug}`;
}

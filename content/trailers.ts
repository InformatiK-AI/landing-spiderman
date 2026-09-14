import type { EnsembleSlug, FilmSlug, Trailer } from "./types";

/**
 * EL ÚNICO lugar del proyecto donde aparece un ID de YouTube.
 * Corregir un tráiler = cambiar una línea acá. Lo hace cumplir
 * scripts/check-invariants.mjs.
 *
 * ⚠️ TODOS están `verified: false`.
 *
 * YouTube está bloqueado por la política de red del entorno de desarrollo
 * (`403 CONNECT`, *policy denial* para www.youtube.com:443), así que no se pudo
 * llamar al endpoint oEmbed ni abrir un solo video. Los IDs vienen de búsqueda
 * web con verificación cruzada del par ID↔título: eso confirma que el ID
 * corresponde a ese título, pero NO confirma la propiedad del canal.
 *
 * Hay canales de fans y de "concept trailers" usando títulos casi idénticos, así
 * que estos IDs necesitan una comprobación contra el canal antes de
 * considerarse correctos. Al marcar uno como `verified: true`, el aviso de dev
 * desaparece solo.
 *
 * Para comprobarlos desde una red que alcance YouTube:
 *
 *     npm run verify-trailers            # informa: título y canal de cada ID
 *     npm run verify-trailers -- --write # marca verified: true los que pasan
 */
export const TRAILERS: Readonly<Record<FilmSlug | EnsembleSlug, Trailer>> = {
  homecoming: {
    youtubeId: "rk-dF1lIbIg",
    label: "Spider-Man: Homecoming — tráiler oficial",
    verified: false,
  },
  "far-from-home": {
    youtubeId: "Nt9L1jCKGnE",
    label: "Spider-Man: Far From Home — tráiler oficial",
    verified: false,
  },
  "no-way-home": {
    youtubeId: "JfVOs4VSpmA",
    label: "Spider-Man: No Way Home — tráiler oficial",
    verified: false,
  },
  "brand-new-day": {
    youtubeId: "8TZMtslA3UY",
    label: "Spider-Man: Brand New Day — tráiler oficial",
    verified: false,
  },
  "civil-war": {
    youtubeId: "dKrVegVI0Us",
    label: "Captain America: Civil War — tráiler 2",
    verified: false,
  },
  "infinity-war": {
    youtubeId: "QwievZ1Tx-8",
    label: "Avengers: Infinity War — tráiler oficial",
    verified: false,
  },
  endgame: {
    youtubeId: "TcMBFSGVi1c",
    label: "Avengers: Endgame — tráiler oficial",
    verified: false,
  },
};

/** Los que aún no se han confirmado a mano. Alimenta el aviso de dev. */
export const UNVERIFIED_TRAILERS = Object.entries(TRAILERS)
  .filter(([, trailer]) => !trailer.verified)
  .map(([slug]) => slug);

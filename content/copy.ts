/** Copy transversal. Todo el texto en es-CL del sitio sale de content/. */

import type { ReleaseStatus } from "./types";

export const HERO = {
  eyebrow: "Cuatro películas · un mismo cabro de Queens",
  lines: ["Nadie iba a recordar su nombre.", "Así que se lo jugó todo."],
  sub: "Homecoming, Lejos de casa, No Way Home y Un Nuevo Día: el arco completo del Spider-Man de Tom Holland, con sus tráilers oficiales.",
  ctaPrimary: "Empezar por el principio",
  ctaSecondary: "Ir a la cronología",
  scrollCue: "Baja para empezar",
  /** El muro de tags del fondo: el nombre que nadie recuerda. */
  forgottenName: "Peter Parker",
} as const;

export const WHO_IS_PETER = {
  headingId: "quien-es-peter",
  heading: "No es un dios ni un millonario",
  quote:
    "Es un cabro de Queens que hace la tarea, pierde el metro y vuelve a levantarse. Todo lo demás de esta historia depende de eso.",
  quoteSource: "La tesis de esta página",
  intro:
    "Los otros héroes del MCU llegan con un martillo, un traje de mil millones o un suero. Peter llega con una mochila. Por eso sus tres pérdidas duelen distinto: no pierde batallas, pierde gente.",
  facts: [
    { term: "Nombre", detail: "Peter Benjamin Parker" },
    { term: "Barrio", detail: "Queens, Nueva York" },
    { term: "Edad al debutar", detail: "15 años, en Civil War (2016)" },
    { term: "Mentor", detail: "Tony Stark — hasta Endgame" },
    { term: "Lo que pierde", detail: "Tony, tía May, y por último su propio nombre" },
    { term: "Lo que le queda", detail: "La responsabilidad. Por elección, no por herencia" },
  ],
} as const;

export const TIMELINE_COPY = {
  headingId: "cronologia",
  heading: "Diez años de Queens",
  intro:
    "Cuatro películas propias y tres apariciones de conjunto. Las de conjunto no tienen capítulo acá: son el contexto que explica en qué estado llega Peter a cada una de las suyas.",
  soloLabel: "Película propia",
  ensembleLabel: "Aparición",
} as const;

export const MULTIVERSE = {
  headingId: "multiverso",
  heading: "Y entonces se rompió todo",
  body: "Un hechizo mal hecho abre el multiverso y entran los villanos de otras tres décadas de Spider-Man. Peter podría devolverlos a morir. Decide curarlos. Esa decisión le cuesta a tía May.",
  glitch: "SIN CAMINO A CASA",
} as const;

export const SUITS_COPY = {
  headingId: "trajes",
  heading: "Seis trajes, una sola historia",
  intro:
    "De las antiparras de soldador al traje cosido a mano en una pieza arrendada. Todo el arte de esta sección está dibujado en CSS y SVG: no hay una sola imagen de las películas en este sitio.",
  approximateNote:
    "Los valores de color son aproximaciones derivadas de la comunidad o de muestreo de pantalla. No existen paletas oficiales publicadas de los trajes del MCU.",
} as const;

export const STATS_COPY = {
  headingId: "cifras",
  heading: "El legado en números",
  intro: "Cada cifra con su fuente y su fecha de corte.",
} as const;

export const CHAPTERS_COPY = {
  headingId: "peliculas",
  heading: "Las cuatro películas",
  beatsLabel: "El arco en tres movimientos",
  threatLabel: "La amenaza",
  trailerLabel: "Tráiler oficial",
  unverifiedNote:
    "Este tráiler no se ha podido verificar automáticamente. Si no es el correcto, el enlace de abajo lleva a YouTube.",
  watchOnYouTube: "Ver en YouTube",
} as const;

export const FOOTER = {
  disclaimerTitle: "Aviso",
  disclaimer:
    "Proyecto de fan, sin fines comerciales y sin afiliación con Marvel, Sony Pictures ni Disney. Todas las marcas y personajes pertenecen a sus titulares. Los tráilers se reproducen desde los canales oficiales de YouTube mediante el reproductor embebido: no se alojan copias. Todo el arte de este sitio es original.",
  sourcesLabel: "Fuentes de las cifras",
  sources: [
    "Box Office Mojo",
    "Variety",
    "Deadline",
    "Forbes",
    "Rotten Tomatoes",
    "Marvel.com",
  ],
  builtWith: "Next.js · TypeScript · Tailwind CSS · Framer Motion",
} as const;

export const NAV = {
  skipToContent: "Saltar al contenido principal",
  sections: "Secciones",
  progressLabel: "Progreso de lectura",
} as const;

/**
 * Copy del capítulo cuatro gobernado por su `status`.
 *
 * `Record<ReleaseStatus, …>` fuerza exhaustividad: si se agrega un estado nuevo
 * al tipo, el compilador rompe el build hasta que se escriba su copy. Cambiar
 * `status` en content/films/brand-new-day.ts reconfigura kicker, título, cuerpo,
 * badge y la presencia del tráiler con UN solo cambio de línea.
 */
export const BRAND_NEW_DAY_COPY: Record<
  ReleaseStatus,
  {
    kicker: string;
    heading: string;
    body: string;
    badge: string;
    /** Si es false, no se renderiza el bloque de tráiler. */
    showTrailer: boolean;
  }
> = {
  estrenada: {
    kicker: "Capítulo cuatro · ya en cines",
    heading: "Y el arco sigue",
    body:
      "Un Nuevo Día se estrenó el 31 de julio de 2026 y se convirtió en la película más taquillera del año y en la Spider-Man más taquillera de la historia. Es la consecuencia directa del final de No Way Home: el único que recuerda a Peter Parker es Peter Parker.",
    badge: "Estrenada",
    showTrailer: true,
  },
  anunciada: {
    kicker: "Capítulo cuatro · anunciado",
    heading: "Lo que viene",
    body:
      "La cuarta película está anunciada pero todavía no se estrena. Lo que se sabe viene de material oficial; lo que circula como rumor no entra acá.",
    badge: "Estreno anunciado",
    showTrailer: true,
  },
  "sin-fecha": {
    kicker: "Capítulo cuatro · sin fecha",
    heading: "Lo que viene",
    body:
      "Hay una cuarta película confirmada, pero sin fecha de estreno publicada. Cuando haya material oficial, esta sección se actualiza.",
    badge: "Sin fecha",
    showTrailer: false,
  },
};

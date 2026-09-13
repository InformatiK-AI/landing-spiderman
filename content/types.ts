/** Tipos de la capa de contenido. Todo el copy es-CL vive en content/. */

export type FilmSlug =
  | "homecoming"
  | "far-from-home"
  | "no-way-home"
  | "brand-new-day";

export type EnsembleSlug = "civil-war" | "infinity-war" | "endgame";

export type ReleaseStatus = "estrenada" | "anunciada" | "sin-fecha";

export type Trailer = {
  /** ID de YouTube. Este archivo es el ÚNICO lugar donde aparece uno. */
  readonly youtubeId: string;
  /** Título del video, para el `title` del iframe y el aria-label. */
  readonly label: string;
  /**
   * `false` mientras no se haya abierto el video y confirmado que es el
   * correcto. Con `false` se muestra un aviso en dev y el enlace de respaldo.
   */
  readonly verified: boolean;
};

export type Villain = {
  readonly name: string;
  readonly actor: string;
  /** `true` sólo para el antagonista principal. */
  readonly primary?: boolean;
};

/** Un beat del arco. Siempre tres por película: planteamiento, crisis, decisión. */
export type StoryBeat = {
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
};

export type SuitPalette = readonly [string, string, string];

export type Film = {
  readonly slug: FilmSlug;
  readonly chapter: 1 | 2 | 3 | 4;
  readonly title: string;
  /** Título en español cuando difiere del original. */
  readonly titleEs?: string;
  readonly year: number;
  readonly releaseDate: string;
  readonly director: string;
  readonly runtimeMinutes: number;
  readonly status: ReleaseStatus;
  readonly tagline: string;
  readonly synopsis: string;
  readonly quote: { readonly text: string; readonly source: string };
  readonly beats: readonly [StoryBeat, StoryBeat, StoryBeat];
  readonly villains: readonly Villain[];
  readonly palette: SuitPalette;
  /** Nota sobre datos con fuentes en conflicto, si aplica. */
  readonly caveat?: string;
};

export type EnsembleAppearance = {
  readonly slug: EnsembleSlug;
  readonly title: string;
  readonly year: number;
  readonly releaseDate: string;
  /** Qué le pasa a Peter en esta película. */
  readonly beat: string;
};

export type TimelineEntry = {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly releaseDate: string;
  readonly kind: "solo" | "ensemble";
  readonly note: string;
  /** Ancla al capítulo, sólo para las solistas. */
  readonly href?: string;
};

export type Suit = {
  readonly id: string;
  readonly name: string;
  readonly film: string;
  readonly palette: SuitPalette;
  readonly note: string;
  /** `true` cuando el valor es aproximación y no dato publicado. */
  readonly approximate: boolean;
};

export type Stat = {
  readonly id: string;
  readonly value: number;
  /** Ya formateado en es-CL, con unidad. Es lo que leen los lectores de pantalla. */
  readonly formatted: string;
  readonly label: string;
  readonly source: string;
  readonly asOf: string;
};

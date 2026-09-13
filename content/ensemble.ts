import type { EnsembleAppearance } from "./types";

/**
 * Las de conjunto no tienen sección propia: viven como nodos menores de la
 * cronología. Como sección serían débiles —sin arco ni tráiler que justifique
 * el peso—; como nodos son el mecanismo de orientación.
 */
export const ENSEMBLE: readonly EnsembleAppearance[] = [
  {
    slug: "civil-war",
    title: "Captain America: Civil War",
    year: 2016,
    releaseDate: "2016-05-06",
    beat:
      "El debut. Tony Stark recluta a un chico de quince años con un traje hecho en casa, le pasa el primero de verdad y lo manda de vuelta a Queens.",
  },
  {
    slug: "infinity-war",
    title: "Avengers: Infinity War",
    year: 2018,
    releaseDate: "2018-04-27",
    beat:
      "Se cuela en la nave, recibe el traje Iron Spider, es nombrado Vengador en Titán y desaparece en los brazos de Tony.",
  },
  {
    slug: "endgame",
    title: "Avengers: Endgame",
    year: 2019,
    releaseDate: "2019-04-26",
    beat:
      "Vuelve con el Blip, carga el Guantelete en la carrera final y va al funeral de Tony. De ahí sale el duelo que arrastra a la película siguiente.",
  },
];

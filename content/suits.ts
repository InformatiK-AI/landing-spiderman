import type { Suit } from "./types";

/**
 * ⚠️ No existen valores hex oficiales publicados para ningún traje del MCU, ni
 * para el rojo de la marca Marvel. Todo esto es aproximación derivada de la
 * comunidad o de muestreo de pantalla: sirve para una landing, no es canon.
 * Los marcados `approximate` son los que tienen menos respaldo.
 */
export const SUITS: readonly Suit[] = [
  {
    id: "casero",
    name: "El casero",
    film: "Civil War",
    palette: ["#8e1118", "#1b2440", "#c9c3b6"],
    note: "Antiparras de soldador y buzo cosido a mano. El punto de partida.",
    approximate: true,
  },
  {
    id: "stark",
    name: "Traje Stark",
    film: "Civil War · Homecoming",
    palette: ["#d71920", "#2b3784", "#f5f5f7"],
    note: "El rojo y azul clásicos, con la araña plateada y ojos ajustables.",
    approximate: false,
  },
  {
    id: "iron-spider",
    name: "Iron Spider",
    film: "Infinity War · Endgame",
    palette: ["#b4202e", "#8e1118", "#d3af37"],
    note: "Nanotecnología con placas doradas. El traje de cuando lo nombraron Vengador.",
    approximate: false,
  },
  {
    id: "sigilo",
    name: "Traje de sigilo",
    film: "Far From Home",
    palette: ["#0b0b0d", "#141619", "#5a6068"],
    note: "Negro mate con grises. Ned lo bautizó «Mono Nocturno».",
    approximate: true,
  },
  {
    id: "integrado",
    name: "Traje integrado",
    film: "No Way Home",
    palette: ["#be1e1e", "#0e1e2a", "#d0a92c"],
    note: "Rojo y azul marino con detalles dorados. El último con tecnología heredada.",
    approximate: false,
  },
  {
    id: "final",
    name: "El casero, otra vez",
    film: "No Way Home · Brand New Day",
    palette: ["#a41420", "#0a0d14", "#e8e2d6"],
    note: "Cosido a mano en una pieza arrendada de Queens. Sin Stark, sin nadie. El hilo se ve.",
    approximate: true,
  },
];

import type { Stat } from "./types";

/** Cada cifra con su fuente y su fecha de corte. */
export const STATS: readonly Stat[] = [
  {
    id: "taquilla-era",
    value: 6.35,
    formatted: "6,35 mil millones",
    label: "Taquilla mundial de las cuatro solistas, en dólares",
    source: "Box Office Mojo · Variety",
    asOf: "12 de septiembre de 2026",
  },
  {
    id: "bnd",
    value: 2.42,
    formatted: "2,42 mil millones",
    label: "Taquilla de Brand New Day: 3ª película más taquillera de la historia",
    source: "Variety · Deadline",
    asOf: "12 de septiembre de 2026",
  },
  {
    id: "anios",
    value: 10,
    formatted: "10",
    label: "Años de Queens en pantalla, de Civil War a Brand New Day",
    source: "Fechas de estreno",
    asOf: "2016–2026",
  },
  {
    id: "vistas-trailer",
    value: 1,
    formatted: "1.000 millones",
    label: "Vistas del tráiler de Brand New Day en cuatro días: récord histórico de un tráiler de cine",
    source: "Malay Mail · Variety",
    asOf: "marzo de 2026",
  },
];

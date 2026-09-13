import type { Film } from "../types";

export const farFromHome: Film = {
  slug: "far-from-home",
  chapter: 2,
  title: "Spider-Man: Far From Home",
  titleEs: "Spider-Man: Lejos de casa",
  year: 2019,
  releaseDate: "2019-07-02",
  director: "Jon Watts",
  runtimeMinutes: 129,
  status: "estrenada",
  tagline: "Un viaje de curso. Nada más. Eso quería.",
  synopsis:
    "Peter sólo quiere un viaje de curso por Europa, una pieza de hotel tranquila y el valor de decirle a MJ lo que siente. Nick Fury tiene otros planes: criaturas elementales están destrozando Venecia, Praga y Londres, y un héroe misterioso de otra Tierra parece ser el único capaz de detenerlas. Con el legado de Tony Stark puesto literalmente en sus manos, Peter tiene que decidir si quiere ser el próximo Iron Man — o simplemente él mismo.",
  quote: {
    text: "La gente necesita creer. Y hoy en día, se creen cualquier cosa.",
    source: "Quentin Beck",
  },
  beats: [
    {
      kicker: "Planteamiento",
      title: "El duelo que no cabe en una maleta",
      body: "Tony murió y el mundo busca reemplazo. Peter sube al avión con un plan de declaración amorosa y baja en Venecia con unos lentes que controlan un sistema de armas orbital. Nadie le preguntó si estaba listo.",
    },
    {
      kicker: "Crisis",
      title: "Todo era una proyección",
      body: "Quentin Beck no es un héroe de otro universo: es un ex empleado de Stark con un ejército de drones y un guion. Peter le entrega EDITH porque quiere creer que alguien más puede cargar con esto. El precio de esa renuncia es casi todo.",
    },
    {
      kicker: "Decisión",
      title: "El traje lo hace él",
      body: "En un laboratorio de Berlín, Peter se arma su propio traje desde cero. Gana sin tecnología heredada y sin mentor. Y entonces, en una pantalla de Times Square, un noticiero dice su nombre frente al mundo entero.",
    },
  ],
  villains: [{ name: "Quentin Beck — Mysterio", actor: "Jake Gyllenhaal", primary: true }],
  palette: ["#101826", "#0b0b0d", "#d4af57"],
};

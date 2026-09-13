import type { Film } from "../types";

/**
 * ESTRENADA el 31 de julio de 2026 (29 de julio en LatAm y España).
 * No es una sección de "próximamente": es el capítulo cuatro.
 *
 * ⚠️ Disciplina de spoilers: la identidad de la antagonista es una revelación
 * de mitad de película y el final está ampliamente reportado. Nada de eso entra
 * acá. Sólo premisa oficial y tagline del tráiler.
 */
export const brandNewDay: Film = {
  slug: "brand-new-day",
  chapter: 4,
  title: "Spider-Man: Brand New Day",
  titleEs: "Spider-Man: Un Nuevo Día",
  year: 2026,
  releaseDate: "2026-07-31",
  director: "Destin Daniel Cretton",
  runtimeMinutes: 145,
  status: "estrenada",
  tagline: "El mundo puede haber olvidado a Peter Parker, pero él no los ha olvidado.",
  synopsis:
    "Peter Parker combate el crimen a tiempo completo en una ciudad que no tiene idea de quién es. Sin plata, sin respaldo y sin nadie a quien volver, mira a Ned y a MJ construir vidas en las que ya no queda un lugar para él — hasta que la presión desata un cambio en él que quizá no pueda controlar.",
  quote: {
    text: "El mundo puede haber olvidado a Peter Parker, pero él no los ha olvidado a ellos.",
    source: "Tráiler oficial",
  },
  beats: [
    {
      kicker: "Planteamiento",
      title: "El único que se acuerda",
      body: "El hechizo funcionó demasiado bien. Peter trabaja de noche en una ciudad que le agradece sin saber su nombre, y de día ve a sus dos mejores amigos seguir adelante sin reconocerlo. Nadie lo está buscando, porque nadie sabe que falta.",
    },
    {
      kicker: "Crisis",
      title: "Algo está cambiando en él",
      body: "Sostener esa soledad tiene un costo biológico, no sólo emocional: el marketing de la película plantea abiertamente que algo en su ADN arácnido empieza a mutar. Y mientras eso pasa, una fuerza desconocida se mueve por Nueva York usando las caras de otras personas.",
    },
    {
      kicker: "Decisión",
      title: "A nivel de calle",
      body: "Sin Stark, sin Strange y sin Vengadores, esta es la versión más adulta y más chica del personaje: un héroe de barrio resolviendo un problema de barrio que resulta tener raíces institucionales. El capítulo que cierra el arco de la era y abre el siguiente.",
    },
  ],
  villains: [
    { name: "Bill Metzger — Department of Damage Control", actor: "Tramell Tillman", primary: true },
    { name: "Mac Gargan — Escorpión", actor: "Michael Mando" },
  ],
  palette: ["#a41420", "#0a0d14", "#e8e2d6"],
  caveat:
    "La duración circula en varias cifras (2h15, 2h24, 2h25, 2h30); se usa la de la BBFC (145 min). La antagonista principal se omite a propósito: su identidad es una revelación de mitad de película.",
};

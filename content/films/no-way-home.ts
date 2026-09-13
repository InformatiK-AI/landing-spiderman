import type { Film } from "../types";

export const noWayHome: Film = {
  slug: "no-way-home",
  chapter: 3,
  title: "Spider-Man: No Way Home",
  titleEs: "Spider-Man: Sin camino a casa",
  year: 2021,
  releaseDate: "2021-12-17",
  director: "Jon Watts",
  runtimeMinutes: 148,
  status: "estrenada",
  tagline: "Pidió que lo olvidaran. Y funcionó.",
  synopsis:
    "Con su nombre y su cara transmitidos al mundo, la vida de Peter Parker se derrumba — y cuando le pide a Doctor Strange que todos lo olviden, el hechizo abre el multiverso en vez de cerrarlo. Empiezan a llegar villanos que ya han enfrentado a un Spider-Man, y el instinto de Peter de salvarlos en vez de destruirlos le cuesta más de lo que puede pagar. La historia más personal de Spider-Man, y la que por fin dice la frase en voz alta.",
  quote: {
    text: "Un gran poder conlleva una gran responsabilidad.",
    source: "Tía May",
  },
  beats: [
    {
      kicker: "Planteamiento",
      title: "Sin nombre no hay vida privada",
      body: "La exposición no le arruina sólo su vida: hunde también a MJ y a Ned, rechazados de todas las universidades a las que postularon. Peter va a buscar una solución mágica porque la solución real —vivir con las consecuencias— le parece imposible.",
    },
    {
      kicker: "Crisis",
      title: "El costo de querer salvarlos",
      body: "Peter se niega a devolver a los villanos a sus muertes y decide curarlos. Tía May lo respalda, y lo paga con su vida. Es la lección de la franquicia entera, dicha por fin en el MCU, y es lo último que ella alcanza a decirle.",
    },
    {
      kicker: "Decisión",
      title: "Que nadie recuerde a Peter Parker",
      body: "Para cerrar el multiverso, Peter le pide a Strange que el mundo entero lo olvide — MJ y Ned incluidos. Después arrienda una pieza en Queens, se cose el traje a mano y sale a trabajar. Sin tecnología Stark, sin Vengadores, sin nadie que sepa su nombre.",
    },
  ],
  villains: [
    { name: "Norman Osborn — el Duende Verde", actor: "Willem Dafoe", primary: true },
    { name: "Otto Octavius — Doctor Octopus", actor: "Alfred Molina" },
    { name: "Max Dillon — Electro", actor: "Jamie Foxx" },
    { name: "Flint Marko — el Hombre de Arena", actor: "Thomas Haden Church" },
    { name: "Curt Connors — el Lagarto", actor: "Rhys Ifans" },
  ],
  palette: ["#be1e1e", "#0e1e2a", "#d0a92c"],
};

import type { Film } from "../types";

export const homecoming: Film = {
  slug: "homecoming",
  chapter: 1,
  title: "Spider-Man: Homecoming",
  year: 2017,
  releaseDate: "2017-07-07",
  director: "Jon Watts",
  runtimeMinutes: 133,
  status: "estrenada",
  tagline: "La tarea puede esperar. La ciudad no.",
  synopsis:
    "Peter Parker tiene quince años, una pasantía con Stark Industries y un ego del tamaño de los Vengadores. Cuando una banda de chatarreros empieza a vender tecnología alienígena en las calles de Queens, Peter ve su oportunidad de jugar en las ligas mayores — y descubre que el hombre detrás de las alas está mucho más cerca de casa de lo que imaginaba.",
  quote: {
    text: "Si no eres nada sin el traje, entonces no deberías tenerlo.",
    source: "Tony Stark",
  },
  beats: [
    {
      kicker: "Planteamiento",
      title: "El chico que quería ser un Vengador",
      body: "Después de Berlín, Peter vuelve al colegio con un traje prestado y un teléfono que nadie contesta. Entrena en azoteas de Queens esperando la llamada, y lo que encuentra no es una misión: es un alijo de armas hechas con restos de la invasión de Nueva York.",
    },
    {
      kicker: "Crisis",
      title: "El precio de querer ser grande",
      body: "Su ambición parte un ferry en dos y casi mata a cientos de personas. Tony le quita el traje. Peter tiene que decidir quién es sin la tecnología que le prestaron — y la respuesta llega con una casa encima y una camiseta vieja de Midtown.",
    },
    {
      kicker: "Decisión",
      title: "Vecino y amigable, por elección",
      body: "Derrota al Buitre solo, con el traje casero. Y cuando Tony por fin le ofrece un puesto entre los Vengadores, Peter dice que no. Se queda en Queens. Es la primera decisión que toma de verdad.",
    },
  ],
  villains: [{ name: "Adrian Toomes — el Buitre", actor: "Michael Keaton", primary: true }],
  palette: ["#d71920", "#2b3784", "#f5f5f7"],
};

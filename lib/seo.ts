import type { Metadata } from "next";
import { FILMS } from "@/content/films";
import { HERO } from "@/content/copy";

export const SITE = {
  name: "Spider-Man: la era Tom Holland",
  description:
    "El arco completo del Spider-Man de Tom Holland: Homecoming, Lejos de casa, No Way Home y Un Nuevo Día, con sus tráilers oficiales.",
  locale: "es_CL",
} as const;

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD: una ItemList de Movie. Sólo datos que están en content/ y que se
 * verificaron; nada inventado para rellenar el esquema.
 */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: SITE.name,
    description: SITE.description,
    itemListElement: FILMS.map((film, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Movie",
        name: film.title,
        alternateName: film.titleEs,
        datePublished: film.releaseDate,
        director: { "@type": "Person", name: film.director },
        duration: `PT${film.runtimeMinutes}M`,
        character: film.villains.map((villain) => ({
          "@type": "Person",
          name: villain.actor,
        })),
      },
    })),
  };
}

export const OG_COPY = {
  eyebrow: HERO.eyebrow,
  lines: HERO.lines,
} as const;

import { describe, expect, it } from "vitest";
import { ENSEMBLE } from "./ensemble";
import { FILMS, TRILOGY, getFilm } from "./films";
import { STATS } from "./stats";
import { SUITS } from "./suits";
import { TIMELINE } from "./timeline";
import { TRAILERS } from "./trailers";
import { isValidYouTubeId } from "@/lib/youtube";

describe("películas", () => {
  it("son cuatro solistas", () => {
    expect(FILMS).toHaveLength(4);
    expect(TRILOGY).toHaveLength(3);
  });

  it("tiene slugs únicos", () => {
    const slugs = FILMS.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("está en orden cronológico", () => {
    const dates = FILMS.map((f) => f.releaseDate);
    expect([...dates].sort()).toEqual(dates);
  });

  it("numera los capítulos de 1 a 4 sin saltos", () => {
    expect(FILMS.map((f) => f.chapter)).toEqual([1, 2, 3, 4]);
  });

  it("tiene exactamente tres beats por película", () => {
    for (const film of FILMS) {
      expect(film.beats, film.slug).toHaveLength(3);
      for (const beat of film.beats) {
        expect(beat.body.length, `${film.slug}/${beat.kicker}`).toBeGreaterThan(80);
      }
    }
  });

  it("tiene exactamente un antagonista principal por película", () => {
    for (const film of FILMS) {
      const primary = film.villains.filter((v) => v.primary);
      expect(primary, film.slug).toHaveLength(1);
    }
  });

  it("getFilm resuelve y falla ruidosamente", () => {
    expect(getFilm("no-way-home").year).toBe(2021);
    // @ts-expect-error slug inválido a propósito
    expect(() => getFilm("spider-verse")).toThrow();
  });

  it("Brand New Day está marcada como estrenada, no como próximamente", () => {
    const bnd = getFilm("brand-new-day");
    expect(bnd.status).toBe("estrenada");
    expect(bnd.year).toBe(2026);
    expect(bnd.director).toBe("Destin Daniel Cretton");
  });
});

describe("tráilers", () => {
  it("todos los IDs tienen el formato de YouTube", () => {
    for (const [slug, trailer] of Object.entries(TRAILERS)) {
      expect(isValidYouTubeId(trailer.youtubeId), `${slug}: ${trailer.youtubeId}`).toBe(true);
    }
  });

  it("hay un tráiler por película solista y por aparición", () => {
    for (const film of FILMS) expect(TRAILERS[film.slug]).toBeDefined();
    for (const appearance of ENSEMBLE) expect(TRAILERS[appearance.slug]).toBeDefined();
  });

  it("no repite IDs entre películas distintas", () => {
    const ids = Object.values(TRAILERS).map((t) => t.youtubeId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("cronología", () => {
  it("fusiona solistas y apariciones", () => {
    expect(TIMELINE).toHaveLength(FILMS.length + ENSEMBLE.length);
  });

  it("está ordenada por fecha", () => {
    const dates = TIMELINE.map((e) => e.releaseDate);
    expect([...dates].sort()).toEqual(dates);
  });

  it("sólo las solistas tienen ancla a un capítulo", () => {
    for (const entry of TIMELINE) {
      if (entry.kind === "solo") expect(entry.href, entry.id).toBeDefined();
      else expect(entry.href, entry.id).toBeUndefined();
    }
  });
});

describe("trajes y cifras", () => {
  it("cada traje tiene tres colores hex válidos", () => {
    for (const suit of SUITS) {
      expect(suit.palette, suit.id).toHaveLength(3);
      for (const color of suit.palette) {
        expect(color, `${suit.id}: ${color}`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("cada cifra declara fuente y fecha de corte", () => {
    for (const stat of STATS) {
      expect(stat.source, stat.id).toBeTruthy();
      expect(stat.asOf, stat.id).toBeTruthy();
      expect(stat.formatted, stat.id).toBeTruthy();
    }
  });
});

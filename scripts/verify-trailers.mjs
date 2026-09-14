#!/usr/bin/env node
/**
 * Verifica los IDs de YouTube de content/trailers.ts contra el endpoint oEmbed.
 *
 * Existe porque YouTube está bloqueado por la política de red del entorno de
 * desarrollo (`403 CONNECT` para www.youtube.com:443, y lo mismo para youtu.be,
 * youtube-nocookie.com, ytimg.com y los espejos), así que los 7 IDs quedaron con
 * `verified: false`. Vienen de búsqueda web con verificación cruzada del par
 * ID↔título: eso confirma que el ID corresponde a ese título, pero NO confirma
 * la propiedad del canal, y hay canales de fans con títulos casi idénticos.
 *
 * oEmbed responde justamente lo que falta: `title` y `author_name` /
 * `author_url`, o sea de qué canal cuelga el video. Este script los pide y
 * contrasta ambos.
 *
 * Uso (desde una red que alcance YouTube):
 *   node scripts/verify-trailers.mjs           # sólo informa, no toca nada
 *   node scripts/verify-trailers.mjs --write   # además marca verified: true
 *
 * `--write` marca SÓLO los que pasan las dos comprobaciones. Un canal fuera de
 * la lista de abajo nunca se marca solo: se reporta para que lo mires vos. La
 * lista es un criterio, no un hecho, así que el canal real se imprime siempre,
 * pase o no pase.
 *
 * Códigos de salida: 0 = los 7 verificados · 1 = alguno falla o queda en duda
 * · 2 = no se pudo llegar a YouTube (red bloqueada).
 */
import { readFileSync, writeFileSync } from "node:fs";

const WRITE = process.argv.includes("--write");
const FILE = "content/trailers.ts";

// ── Canales oficiales aceptados ───────────────────────────────────────────
// Las solistas cuelgan de la distribuidora (Sony); las de conjunto, de Marvel.
// Se compara contra `author_name` y contra el handle de `author_url`.
const SONY = ["sony pictures entertainment", "sonypictures", "spider-man", "spidermanmovie"];
const MARVEL = ["marvel entertainment", "marvel"];

const ESPERADO = {
  homecoming: { titulo: ["homecoming"], canales: SONY },
  "far-from-home": { titulo: ["far from home"], canales: SONY },
  "no-way-home": { titulo: ["no way home"], canales: SONY },
  "brand-new-day": { titulo: ["brand new day"], canales: SONY },
  "civil-war": { titulo: ["civil war"], canales: MARVEL },
  "infinity-war": { titulo: ["infinity war"], canales: MARVEL },
  endgame: { titulo: ["endgame"], canales: MARVEL },
};

/** Minúsculas, sin acentos y con espacios colapsados, para comparar sin sorpresas. */
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// ── Leer los tráilers del archivo, sin importar TypeScript ────────────────
const fuente = readFileSync(FILE, "utf8");
const ENTRADA = /(["']?)([a-z-]+)\1:\s*\{\s*youtubeId:\s*"([A-Za-z0-9_-]{11})"[^}]*?verified:\s*(true|false)/g;

const trailers = [];
for (const [, , slug, youtubeId, verified] of fuente.matchAll(ENTRADA)) {
  trailers.push({ slug, youtubeId, verified: verified === "true" });
}

if (trailers.length === 0) {
  console.error(`No se pudo leer ningún tráiler de ${FILE}. ¿Cambió el formato del archivo?`);
  process.exit(1);
}

// ── Consultar oEmbed ──────────────────────────────────────────────────────
async function consultar(youtubeId) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${youtubeId}`,
  )}&format=json`;
  let respuesta;
  try {
    respuesta = await fetch(url);
  } catch (error) {
    return { estado: "red", detalle: error.message };
  }
  // oEmbed devuelve 404 si el video no existe o es privado, y 401 si el dueño
  // deshabilitó el embebido (el video existe, pero el reproductor no sirve).
  // Nunca devuelve 403 por el estado de un video: un 403 es el proxy o el
  // firewall de la red cortando la conexión, así que se trata como bloqueo.
  if (respuesta.status === 404) return { estado: "inexistente" };
  if (respuesta.status === 401) return { estado: "sin-embed" };
  if (respuesta.status === 403) {
    return { estado: "red", detalle: "HTTP 403: la red bloquea youtube.com (proxy o firewall)" };
  }
  if (!respuesta.ok) return { estado: "http", detalle: String(respuesta.status) };
  return { estado: "ok", datos: await respuesta.json() };
}

const resultados = [];
for (const trailer of trailers) {
  const esperado = ESPERADO[trailer.slug];
  const respuesta = await consultar(trailer.youtubeId);

  if (respuesta.estado === "red") {
    resultados.push({ ...trailer, veredicto: "red", nota: respuesta.detalle });
    continue;
  }
  if (respuesta.estado !== "ok") {
    const nota = {
      inexistente: "el video no existe, es privado o fue borrado",
      "sin-embed": "el dueño deshabilitó el embebido: el reproductor de la landing no va a funcionar",
      http: `respuesta inesperada (HTTP ${respuesta.detalle})`,
    }[respuesta.estado];
    resultados.push({ ...trailer, veredicto: "falla", nota });
    continue;
  }

  const { title, author_name: canal, author_url: canalUrl } = respuesta.datos;
  const tituloOk = esperado
    ? esperado.titulo.every((fragmento) => normalizar(title).includes(normalizar(fragmento)))
    : false;
  const handle = normalizar((canalUrl ?? "").split("/").pop()?.replace(/^@/, "") ?? "");
  const canalOk = esperado
    ? esperado.canales.some((aceptado) => {
        const objetivo = normalizar(aceptado);
        return normalizar(canal ?? "") === objetivo || handle === objetivo.replace(/\s/g, "");
      })
    : false;

  resultados.push({
    ...trailer,
    veredicto: tituloOk && canalOk ? "ok" : "duda",
    title,
    canal,
    canalUrl,
    nota: !esperado
      ? `slug desconocido: no hay canal esperado definido para «${trailer.slug}»`
      : !tituloOk && !canalOk
        ? "ni el título ni el canal coinciden con lo esperado"
        : !tituloOk
          ? `el título no menciona «${esperado.titulo.join(", ")}»`
          : "el canal no está en la lista de oficiales: revisalo a mano",
  });
}

// ── Informe ───────────────────────────────────────────────────────────────
const ICONO = { ok: "✅", duda: "⚠️ ", falla: "❌", red: "🚫" };
console.log(`\nVerificación de ${resultados.length} tráilers contra oEmbed:\n`);
for (const r of resultados) {
  console.log(`${ICONO[r.veredicto]} ${r.slug}  (${r.youtubeId})`);
  if (r.title) console.log(`     título: ${r.title}`);
  if (r.canal) console.log(`     canal:  ${r.canal}  ${r.canalUrl ?? ""}`);
  if (r.veredicto !== "ok") console.log(`     → ${r.nota}`);
}

const bloqueados = resultados.filter((r) => r.veredicto === "red");
if (bloqueados.length === resultados.length) {
  console.error(
    `\n🚫 No se pudo llegar a YouTube desde esta red (${bloqueados[0].nota}).` +
      `\n   Corré este script desde una red sin bloqueo; nada fue modificado.`,
  );
  process.exit(2);
}

const aprobados = resultados.filter((r) => r.veredicto === "ok");
const pendientes = resultados.filter((r) => r.veredicto !== "ok");

// ── Escritura ─────────────────────────────────────────────────────────────
if (WRITE && aprobados.length > 0) {
  let salida = fuente;
  for (const r of aprobados) {
    if (r.verified) continue;
    const slugEscapado = r.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bloque = new RegExp(`(["']?${slugEscapado}["']?:\\s*\\{[^}]*?verified:\\s*)false`);
    salida = salida.replace(bloque, "$1true");
  }
  if (salida !== fuente) {
    writeFileSync(FILE, salida);
    console.log(`\n✍️  ${FILE} actualizado: ${aprobados.length} marcados verified: true.`);
    console.log("   Revisá el diff y acordate de actualizar el comentario de cabecera,");
    console.log("   que todavía dice que están todos sin verificar.");
  } else {
    console.log(`\n${FILE} ya estaba al día: no hubo cambios que escribir.`);
  }
} else if (aprobados.length > 0 && !WRITE) {
  console.log(`\n${aprobados.length} listos para marcar. Volvé a correr con --write para escribirlos.`);
}

console.log(`\nResumen: ${aprobados.length} verificados · ${pendientes.length} pendientes.`);
if (pendientes.length > 0) {
  console.log("Los pendientes hay que abrirlos a mano; cada corrección es una línea en " + FILE + ".");
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Invariantes del proyecto que ni el compilador ni ESLint pueden expresar.
 * Corre en CI: si uno falla, el build falla.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const failures = [];

/** Quita comentarios de línea y de bloque para no revisar prosa. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

// ── 1. LazyMotion strict: nada de <motion.*>, sólo <m.*> ──────────────────
for (const file of files.filter((f) => /\.tsx?$/.test(f))) {
  const code = stripComments(readFileSync(file, "utf8"));
  if (/<motion\.[a-z]/.test(code) || /\bmotion\.[a-z]+\b/.test(code)) {
    failures.push(
      `${file}: usa <motion.*>. LazyMotion corre en modo strict — usar <m.*> ` +
        `o el bundle de animación se duplica (~34 kB en vez de ~18 kB).`,
    );
  }
}

// ── 2. Cero media con copyright: ningún binario versionado ────────────────
const BINARY_EXT =
  /\.(png|jpe?g|gif|webp|avif|bmp|ico|mp4|webm|mov|mp3|wav|pdf|woff2?|ttf|otf|eot)$/i;
for (const file of files) {
  if (BINARY_EXT.test(file)) {
    failures.push(`${file}: archivo binario versionado. Todo el arte debe ser CSS/SVG.`);
    continue;
  }
  try {
    if (statSync(file).isFile()) {
      const buffer = readFileSync(file);
      if (buffer.includes(0)) {
        failures.push(`${file}: contiene bytes nulos (binario).`);
      }
    }
  } catch {
    /* el archivo pudo desaparecer: no es asunto de esta comprobación */
  }
}

// ── 3. Los IDs de YouTube viven SÓLO en content/trailers.ts ───────────────
const ID_IN_URL = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=))([A-Za-z0-9_-]{11})/;
for (const file of files.filter((f) => /\.tsx?$/.test(f))) {
  if (file === "content/trailers.ts") continue;
  const code = stripComments(readFileSync(file, "utf8"));
  if (ID_IN_URL.test(code)) {
    failures.push(
      `${file}: contiene un ID de YouTube. Deben vivir sólo en content/trailers.ts ` +
        `para que corregir uno sea una línea.`,
    );
  }
}

// ── 4. Ninguna rama por slug de película en componentes ───────────────────
for (const file of files.filter((f) => f.startsWith("components/") && /\.tsx$/.test(f))) {
  const code = stripComments(readFileSync(file, "utf8"));
  const match = code.match(/slug\s*===\s*["'][a-z-]+["']/);
  if (match) {
    failures.push(
      `${file}: rama por slug (${match[0]}). Los capítulos se renderizan desde datos, ` +
        `con una sola plantilla.`,
    );
  }
}

// ── 5. Los <iframe> sólo pueden vivir en components/trailer/ ──────────────
// Es lo que mantiene verificable el presupuesto de "cero terceros antes de
// interactuar": un iframe suelto en otra sección lo rompería en silencio.
for (const file of files.filter((f) => /\.tsx$/.test(f))) {
  if (file.startsWith("components/trailer/")) continue;
  const code = stripComments(readFileSync(file, "utf8"));
  if (/<iframe/.test(code)) {
    failures.push(
      `${file}: contiene un <iframe>. Sólo components/trailer/ puede montar uno, ` +
        `y sólo tras una interacción.`,
    );
  }
}

if (failures.length > 0) {
  console.error("\n❌ Invariantes incumplidas:\n");
  for (const f of failures) console.error(`  • ${f}`);
  console.error("");
  process.exit(1);
}

console.log("✅ Invariantes OK: m.* en vez de motion.*, cero binarios, IDs centralizados, sin ramas por slug.");

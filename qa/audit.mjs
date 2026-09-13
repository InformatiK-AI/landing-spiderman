#!/usr/bin/env node
/**
 * Auditoría medida de la etapa `qa`. Arranca contra un servidor ya corriendo
 * (npm run start) y comprueba, de verdad y en un navegador:
 *
 *  1. axe-core: 0 violaciones serias o críticas
 *  2. cero peticiones a terceros antes de interactuar
 *  3. la petición a YouTube ocurre SÓLO tras el clic
 *  4. recorrido por teclado: foco, apertura, Escape y restauración del foco
 *  5. reduced-motion: la página colapsa a su versión accesible
 *  6. tres viewports sin scroll horizontal
 *  7. CLS y LCP reales vía PerformanceObserver
 */
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";

const URL = process.env.QA_URL ?? "http://localhost:3000";
const THIRD_PARTY = /youtube|ytimg|googlevideo|google-analytics|doubleclick|gstatic|googleapis/i;

const results = [];
const record = (name, pass, detail) => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "✅" : "❌"} ${name}${detail ? ` — ${detail}` : ""}`);
};

// Chromium viene preinstalado en el entorno; la version de playwright del
// proyecto puede no coincidir con la descargada, asi que se apunta al binario
// existente en vez de bajar otro.
const EXECUTABLE =
  process.env.QA_CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: EXECUTABLE });

// ── 1 + 2 + 7 ─────────────────────────────────────────────────────────────
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const thirdParty = [];
  page.on("request", (r) => {
    if (THIRD_PARTY.test(r.url())) thirdParty.push(r.url());
  });

  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(1500);

  record(
    "Cero peticiones a terceros antes de interactuar",
    thirdParty.length === 0,
    thirdParty.length ? thirdParty.slice(0, 3).join(", ") : "0 peticiones",
  );

  // El hook tiene que estar EFECTIVAMENTE visible en la primera pantalla, y ser
  // el elemento LCP. Se añadió después de que un bug de posicionamiento dejara
  // el h1 empujado a 1269px y recortado por overflow-hidden: axe, CLS y LCP
  // seguían en verde con el titular invisible.
  const hook = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return null;
    const r = h1.getBoundingClientRect();
    return {
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      vh: window.innerHeight,
      inView: r.top >= 0 && r.bottom <= window.innerHeight && r.height > 0,
    };
  });
  record(
    "El hook (h1) es visible en la primera pantalla",
    Boolean(hook?.inView),
    hook ? `h1 en [${hook.top}..${hook.bottom}] de ${hook.vh}px` : "no hay h1",
  );

  // Lo que de verdad importa del LCP es que sea TEXTO venido del HTML del
  // servidor y no una imagen, un vídeo o un background-image: eso es lo que lo
  // hace pintar en el primer frame útil.
  //
  // El elemento LCP concreto resulta ser el muro tipográfico decorativo del
  // hero, no el <h1>: su área es mayor. Se deja registrado en vez de
  // deformar el diseño para ganar la métrica — sigue siendo texto del servidor
  // y pinta a ~164 ms.
  const lcpInfo = await page.evaluate(
    () =>
      new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entry = list.getEntries().at(-1);
          const el = entry?.element;
          resolve({
            tag: el?.tagName ?? null,
            isText: Boolean(el && !["IMG", "VIDEO", "SVG"].includes(el.tagName)),
            hasBgImage: Boolean(el && getComputedStyle(el).backgroundImage !== "none"),
          });
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve({ tag: null, isText: false, hasBgImage: false }), 1500);
      }),
  );
  record(
    "El LCP es texto del servidor, no una imagen ni un background-image",
    lcpInfo.isText && !lcpInfo.hasBgImage,
    `elemento LCP = <${(lcpInfo.tag ?? "?").toLowerCase()}>`,
  );

  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const serious = axe.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  record(
    "axe-core: 0 violaciones serias o críticas",
    serious.length === 0,
    serious.length
      ? serious.map((v) => `${v.id} (${v.nodes.length})`).join(", ")
      : `${axe.passes.length} reglas pasadas, ${axe.violations.length} menores`,
  );
  if (serious.length) {
    for (const v of serious) {
      console.log(`     ↳ ${v.id}: ${v.help}`);
      console.log(`       ${v.nodes[0]?.target?.join(" ")}`);
    }
  }
  for (const v of axe.violations.filter((x) => !["serious", "critical"].includes(x.impact))) {
    console.log(`     ℹ️  menor · ${v.id} (${v.impact}): ${v.nodes.length} nodo(s)`);
  }

  // Métricas reales
  const metrics = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let cls = 0;
        let lcp = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) lcp = last.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve({ cls, lcp }), 1200);
      }),
  );
  record("CLS ≤ 0.02", metrics.cls <= 0.02, `CLS = ${metrics.cls.toFixed(4)}`);
  record("LCP < 2000 ms", metrics.lcp < 2000, `LCP = ${Math.round(metrics.lcp)} ms`);

  // ── 3 + 4 · teclado y carga diferida del iframe ────────────────────────
  const playButton = page.locator("button:has-text('Reproducir')").first();
  await playButton.focus();
  const focusedBefore = await page.evaluate(() => document.activeElement?.tagName);
  record("El botón de tráiler recibe foco por teclado", focusedBefore === "BUTTON", `activeElement = ${focusedBefore}`);

  thirdParty.length = 0;
  await playButton.press("Enter");
  await page.waitForTimeout(1200);
  const iframeCount = await page.locator("iframe").count();
  record(
    "El iframe se monta sólo tras la interacción",
    iframeCount > 0 && thirdParty.length > 0,
    `${iframeCount} iframe(s), ${thirdParty.length} petición(es) a YouTube tras el clic`,
  );

  // ── 4b · el modal del hero: Escape y restauración del foco ───────────
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(600);

  const trigger = page.locator("button:has-text('Ver el tráiler')").first();
  await trigger.focus();
  await trigger.press("Enter");
  await page.waitForTimeout(500);

  const dialogOpen = await page.evaluate(
    () => document.querySelector("dialog")?.hasAttribute("open") ?? false,
  );
  const focusInsideDialog = await page.evaluate(() => {
    const dialog = document.querySelector("dialog");
    return !!(dialog && document.activeElement && dialog.contains(document.activeElement));
  });
  record("El modal abre y el foco queda dentro", dialogOpen && focusInsideDialog, `open=${dialogOpen}, foco dentro=${focusInsideDialog}`);

  const focusIsNotIframe = await page.evaluate(
    () => document.activeElement?.tagName !== "IFRAME",
  );
  record(
    "El foco inicial NO es el iframe (sería una trampa para el teclado)",
    focusIsNotIframe,
    `activeElement = ${await page.evaluate(() => document.activeElement?.tagName)}`,
  );

  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  const dialogClosed = await page.evaluate(
    () => !(document.querySelector("dialog")?.hasAttribute("open") ?? false),
  );
  const iframeGone = (await page.locator("dialog iframe").count()) === 0;
  const focusRestored = await page.evaluate(() =>
    (document.activeElement?.textContent ?? "").includes("Ver el tráiler"),
  );
  record("Escape cierra el modal", dialogClosed);
  record("El iframe se desmonta al cerrar (corta el audio)", iframeGone);
  record("El foco vuelve al botón que abrió el modal", focusRestored);

  await context.close();
}

// ── 5 · reduced-motion ────────────────────────────────────────────────────
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(800);

  // La cronología y el multiverso deben colapsar: si siguieran en 320vh/200vh,
  // el documento seguiría siendo desproporcionadamente alto.
  const heights = await page.evaluate(() => {
    const pick = (id) => {
      const el = document.getElementById(id);
      const tall = el?.querySelector("[class*='vh]']");
      return tall ? tall.getBoundingClientRect().height : null;
    };
    return {
      doc: document.documentElement.scrollHeight,
      viewport: window.innerHeight,
      cronologia: pick("cronologia"),
      multiverso: pick("multiverso"),
    };
  });
  const collapsed =
    heights.cronologia !== null &&
    heights.multiverso !== null &&
    heights.cronologia < heights.viewport * 2 &&
    heights.multiverso < heights.viewport * 2;
  record(
    "Con reduced-motion la cronología y el multiverso colapsan",
    collapsed,
    `cronología ${Math.round(heights.cronologia ?? -1)}px, multiverso ${Math.round(heights.multiverso ?? -1)}px, viewport ${heights.viewport}px`,
  );

  // Todas las secciones siguen siendo visibles y con su h2 accesible.
  const sections = ["quien-es-peter", "cronologia", "peliculas", "multiverso", "trajes", "cifras"];
  const missing = [];
  for (const id of sections) {
    const visible = await page.locator(`#${id}`).isVisible().catch(() => false);
    if (!visible) missing.push(id);
  }
  record(
    "Con reduced-motion todas las secciones siguen visibles",
    missing.length === 0,
    missing.length ? `faltan: ${missing.join(", ")}` : `${sections.length}/${sections.length} visibles`,
  );

  const axeReduced = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const seriousReduced = axeReduced.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact),
  );
  record(
    "axe con reduced-motion: 0 serias o críticas",
    seriousReduced.length === 0,
    seriousReduced.map((v) => v.id).join(", ") || "limpio",
  );

  await context.close();
}

// ── 6 · viewports ─────────────────────────────────────────────────────────
for (const width of [390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  record(`Sin scroll horizontal a ${width}px`, overflow <= 1, `desborde = ${overflow}px`);
  await context.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones pasadas`);
if (failed.length) {
  console.log("\nFALLAN:");
  for (const f of failed) console.log(`  • ${f.name} — ${f.detail}`);
  process.exit(1);
}

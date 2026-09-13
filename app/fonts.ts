import { Anton, Bangers, Inter } from "next/font/google";

/**
 * Fuentes self-hosteadas por next/font en el build: cero peticiones a
 * fonts.googleapis.com en runtime.
 *
 * `adjustFontFallback` hace que Next calcule size-adjust/ascent-override en la
 * @font-face de respaldo, así el swap no mueve el titular → CLS ≈ 0 con
 * display: "swap".
 */

/** Display. Se elige sobre Bebas Neue por su cobertura latin-ext real:
 *  esta página grita "¿QUÉ PASÓ?" en mayúsculas y Bebas tiene soporte
 *  pobre de diacríticos. */
export const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Texto y UI. Variable: un archivo cubre 400–700. */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/** Sólo para SfxBurst, que aparece bajo el pliegue → sin preload. */
export const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
  display: "swap",
  preload: false,
});

export const fontVariables = `${anton.variable} ${inter.variable} ${bangers.variable}`;

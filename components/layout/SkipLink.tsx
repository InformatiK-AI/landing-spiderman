import { NAV } from "@/content/copy";

/** Primer elemento tabulable de la página. */
export function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-web-red-500 focus:px-5 focus:py-3 focus:font-display focus:text-kicker focus:uppercase focus:text-ink-950"
    >
      {NAV.skipToContent}
    </a>
  );
}

import { SpiderGlyph } from "@/components/art/SpiderGlyph";
import { FOOTER } from "@/content/copy";

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-ink-800 bg-ink-950 px-gutter py-13"
    >
      <div className="mx-auto grid max-w-[var(--container-content)] gap-10 md:grid-cols-[auto_1fr]">
        <SpiderGlyph className="size-10 text-web-red-500" title="Spider-Man" />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-kicker uppercase text-ink-100">
              {FOOTER.disclaimerTitle}
            </h2>
            {/* ink-300 y no ink-500: ink-500 sobre ink-900 no pasa contraste. */}
            <p className="mt-3 max-w-[var(--container-prose)] text-ink-300">
              {FOOTER.disclaimer}
            </p>
          </div>

          <div>
            <h2 className="font-display text-kicker uppercase text-ink-100">
              {FOOTER.sourcesLabel}
            </h2>
            <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-ink-300">
              {FOOTER.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
            <p className="mt-6 font-display text-kicker uppercase text-ink-300">
              {FOOTER.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

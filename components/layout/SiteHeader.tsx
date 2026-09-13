import { SpiderGlyph } from "@/components/art/SpiderGlyph";
import { CHAPTERS_COPY, NAV, STATS_COPY, SUITS_COPY, TIMELINE_COPY } from "@/content/copy";

const LINKS = [
  { href: `#${TIMELINE_COPY.headingId}`, label: "Cronología" },
  { href: `#${CHAPTERS_COPY.headingId}`, label: "Películas" },
  { href: `#${SUITS_COPY.headingId}`, label: "Trajes" },
  { href: `#${STATS_COPY.headingId}`, label: "Cifras" },
] as const;

export function SiteHeader() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/85 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[var(--container-content)] items-center justify-between gap-6 px-gutter py-3">
        <a href="#contenido" className="flex items-center gap-2 text-web-red-500">
          <SpiderGlyph className="size-6" title="Spider-Man: la era Tom Holland" />
          <span className="font-display text-kicker uppercase text-ink-100">
            La era Holland
          </span>
        </a>
        <nav aria-label={NAV.sections}>
          <ul className="flex list-none gap-5 p-0">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-display text-kicker uppercase text-ink-300 transition-colors hocus:text-web-red-300 motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

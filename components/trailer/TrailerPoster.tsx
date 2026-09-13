import { BendayOverlay } from "@/components/art/BendayOverlay";
import { WebPattern } from "@/components/art/WebPattern";
import type { SuitPalette } from "@/content/types";

/**
 * Poster ARTE GENERADO: gradiente de la paleta del traje + ben-day + título en
 * Anton + glifo de play original.
 *
 * Deliberadamente NO se usa i.ytimg.com/vi/{id}/maxresdefault.jpg: seria un
 * fotograma con copyright, una peticion a un tercero en la carga inicial y un
 * riesgo de CLS o de 404. Este poster cuesta 0 bytes extra.
 */
export function TrailerPoster({
  title,
  year,
  palette,
}: {
  title: string;
  year: number;
  palette: SuitPalette;
}) {
  const [primary, secondary, accent] = palette;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${secondary} 0%, ${primary} 70%, ${accent} 160%)`,
      }}
    >
      <div className="absolute inset-0 text-ink-050">
        <WebPattern className="absolute -top-8 -left-8 h-[70%] w-[55%]" opacity={0.2} />
      </div>
      <BendayOverlay fade={false} className="opacity-40" />

      <div className="absolute inset-0 flex flex-col justify-end gap-1 p-6 sm:p-9">
        <p className="font-display text-kicker uppercase text-ink-050/80">
          Tráiler oficial · {year}
        </p>
        <p className="font-display text-h3 uppercase text-ink-050 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
          {title}
        </p>
      </div>

      {/* Glifo de play original */}
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
          className="size-20 drop-shadow-[0_3px_0_rgba(0,0,0,0.45)] sm:size-24"
        >
          <circle cx="50" cy="50" r="46" fill="rgba(7,7,12,0.55)" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--color-ink-050)"
            strokeWidth="3"
          />
          <path d="M40 32 L72 50 L40 68 Z" fill="var(--color-ink-050)" />
        </svg>
      </div>
    </div>
  );
}

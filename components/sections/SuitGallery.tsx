import { SuitSwatch } from "@/components/art/SuitSwatch";
import { SectionShell } from "@/components/layout/SectionShell";
import { StaggerGroup, StaggerListItem, staggerChild } from "@/components/motion/StaggerGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SUITS_COPY } from "@/content/copy";
import { SUITS } from "@/content/suits";

/**
 * Galería de trajes, 100% CSS/SVG.
 *
 * Las tarjetas no llevan acción, así que NO son focusables: nada de
 * tabindex="0" decorativo. Los hex se muestran como texto y no sólo como color,
 * porque la información no puede codificarse únicamente en color.
 */
export function SuitGallery() {
  return (
    <SectionShell labelledBy={SUITS_COPY.headingId} id={SUITS_COPY.headingId} deferPaint>
      <SectionHeading id={SUITS_COPY.headingId}>{SUITS_COPY.heading}</SectionHeading>
      <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-300">
        {SUITS_COPY.intro}
      </p>

      <StaggerGroup
        as="ul"
        childCount={SUITS.length}
        className="mt-12 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SUITS.map((suit) => (
          <StaggerListItem key={suit.id} variants={staggerChild} className="list-none">
              {/* rotateY sólo con puntero fino y sin reduced-motion: en táctil
                  un efecto de hover queda pegado tras el tap. */}
              <div className="[perspective:1000px]">
                <div className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-snap)] fine-pointer:hover:[transform:rotateY(-8deg)] motion-reduce:transition-none motion-reduce:hover:[transform:none]">
                  <SuitSwatch label={suit.name} colors={suit.palette} />
                </div>
              </div>

              <h3 className="mt-4 text-h3 text-ink-050">{suit.name}</h3>
              <p className="mt-1 font-display text-kicker uppercase text-web-red-300">
                {suit.film}
              </p>
              <p className="mt-2 text-ink-300">{suit.note}</p>

              <ul className="mt-3 flex list-none flex-wrap gap-3 p-0">
                {suit.palette.map((color) => (
                  <li key={color} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block size-4 border border-ink-700"
                      style={{ background: color }}
                    />
                    <code className="text-kicker text-ink-300">{color}</code>
                  </li>
                ))}
              </ul>

              {suit.approximate ? (
                <p className="mt-2 text-kicker text-ink-300">Color aproximado</p>
              ) : null}
          </StaggerListItem>
        ))}
      </StaggerGroup>

      <p className="mt-12 max-w-[var(--container-prose)] text-ink-300">
        {SUITS_COPY.approximateNote}
      </p>
    </SectionShell>
  );
}

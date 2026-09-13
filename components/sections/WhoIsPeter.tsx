import { SpeechBubble } from "@/components/art/SpeechBubble";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHO_IS_PETER } from "@/content/copy";

/**
 * Contrato de lectura: establece la tesis para que los cuatro arcos se lean
 * como una sola historia.
 */
export function WhoIsPeter() {
  return (
    <SectionShell id={WHO_IS_PETER.headingId} labelledBy={`${WHO_IS_PETER.headingId}-titulo`} deferPaint>
      <SectionHeading id={`${WHO_IS_PETER.headingId}-titulo`}>
        {WHO_IS_PETER.heading}
      </SectionHeading>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SpeechBubble cite={WHO_IS_PETER.quoteSource}>
            {WHO_IS_PETER.quote}
          </SpeechBubble>
          <p className="mt-8 text-lead text-ink-300">{WHO_IS_PETER.intro}</p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* dl/dt/dd real, no divs: es una ficha de datos. */}
          <dl className="grid gap-0">
            {WHO_IS_PETER.facts.map((fact) => (
              <div
                key={fact.term}
                className="grid gap-1 border-b border-ink-800 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="font-display text-kicker uppercase text-web-red-300">
                  {fact.term}
                </dt>
                <dd className="text-ink-100">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionShell>
  );
}

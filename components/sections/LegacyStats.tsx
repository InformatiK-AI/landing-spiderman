import { BendayOverlay } from "@/components/art/BendayOverlay";
import { SectionShell } from "@/components/layout/SectionShell";
import { CountUp } from "@/components/motion/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS_COPY } from "@/content/copy";
import { STATS } from "@/content/stats";

/**
 * Va DESPUÉS de la galería de trajes: emoción → emoción → evidencia. Los números
 * son el argumento de autoridad que cierra el pasado.
 */
export function LegacyStats() {
  return (
    <SectionShell
      labelledBy={`${STATS_COPY.headingId}-titulo`}
      id={STATS_COPY.headingId}
      className="overflow-hidden"
      deferPaint
    >
      <BendayOverlay />

      <div className="relative">
        <SectionHeading id={`${STATS_COPY.headingId}-titulo`}>{STATS_COPY.heading}</SectionHeading>
        <p className="mt-8 text-lead text-ink-300">{STATS_COPY.intro}</p>

        <dl className="mt-12 grid gap-10 sm:grid-cols-2">
          {STATS.map((stat) => (
            <div key={stat.id} className="border-t border-ink-800 pt-6">
              <dt className="text-ink-100">{stat.label}</dt>
              <dd className="mt-3">
                <p className="font-display text-display leading-none text-iron-gold-400">
                  <CountUp value={stat.value} formatted={stat.formatted} />
                </p>
                <p className="mt-3 text-kicker text-ink-300">
                  {stat.source} · al {stat.asOf}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}

import { BendayOverlay } from "@/components/art/BendayOverlay";
import { GrainOverlay } from "@/components/art/GrainOverlay";
import { PanelFrame } from "@/components/art/PanelFrame";
import { PortalRing } from "@/components/art/PortalRing";
import { SfxBurst } from "@/components/art/SfxBurst";
import { SkylineLayer } from "@/components/art/SkylineLayers";
import { SpeechBubble } from "@/components/art/SpeechBubble";
import { SpiderGlyph } from "@/components/art/SpiderGlyph";
import { SuitSwatch } from "@/components/art/SuitSwatch";
import { WebPattern } from "@/components/art/WebPattern";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main
        id="contenido"
        className="mx-auto max-w-[var(--container-content)] px-gutter py-section"
      >
        <h1 className="text-display text-ink-050">Banco de pruebas del arte</h1>

        <section aria-labelledby="texturas" className="relative mt-13">
          <SectionHeading id="texturas">Texturas</SectionHeading>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="relative h-40 bg-ink-800">
              <BendayOverlay />
              <span className="absolute bottom-2 left-3 text-kicker">ben-day</span>
            </div>
            <div className="relative h-40 bg-ink-800 texture-web [--web-x:10%]">
              <span className="absolute bottom-2 left-3 text-kicker">texture-web</span>
            </div>
            <PanelFrame className="grid h-40 place-items-center">
              <span className="text-kicker">panel-ink</span>
            </PanelFrame>
          </div>
        </section>

        <section aria-labelledby="svg" className="mt-13">
          <SectionHeading id="svg">Primitivas SVG</SectionHeading>
          <div className="mt-6 grid items-start gap-8 sm:grid-cols-4">
            <div className="relative h-40 overflow-hidden bg-ink-950 text-web-red-500">
              <WebPattern className="absolute -top-4 -left-4 h-48 w-48" />
            </div>
            <div className="relative h-40 overflow-hidden bg-ink-950 text-ink-700">
              <SkylineLayer depth={0} />
            </div>
            <PortalRing className="w-40" />
            <div className="flex flex-col items-center gap-4">
              <SpiderGlyph className="size-14 text-web-red-500" title="Araña" />
              <SfxBurst className="size-24">¡THWIP!</SfxBurst>
            </div>
          </div>
        </section>

        <section aria-labelledby="trajes" className="mt-13">
          <SectionHeading id="trajes">Trajes</SectionHeading>
          <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-4">
            {(
              [
                ["Traje Stark: rojo clásico con azul profundo", ["#d71920", "#2b3784", "#f5f5f7"]],
                ["Iron Spider: rojo metálico con placas doradas", ["#b4202e", "#8e1118", "#d3af37"]],
                ["Traje de sigilo: negro con acentos grises", ["#0b0b0d", "#141619", "#5a6068"]],
                ["Traje integrado: rojo con azul marino y oro", ["#be1e1e", "#0e1e2a", "#d0a92c"]],
              ] as const
            ).map(([label, colors]) => (
              <li key={label}>
                <SuitSwatch label={label} colors={colors} />
                <p className="mt-2 text-kicker text-ink-300">{colors.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="cita" className="mt-13 max-w-[var(--container-prose)]">
          <SectionHeading id="cita">Bocadillo</SectionHeading>
          <div className="mt-6">
            <SpeechBubble cite="Tony Stark">
              Si no eres nada sin el traje, entonces no deberías tenerlo.
            </SpeechBubble>
          </div>
          <Badge tone="gold" className="mt-9">
            Homecoming · 2017
          </Badge>
        </section>
      </main>
    </>
  );
}

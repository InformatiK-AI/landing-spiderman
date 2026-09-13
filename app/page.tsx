import { GrainOverlay } from "@/components/art/GrainOverlay";
import { SkylineLayer } from "@/components/art/SkylineLayers";
import { CountUp } from "@/components/motion/CountUp";
import { GlitchText } from "@/components/motion/GlitchText";
import { MagneticCTA } from "@/components/motion/MagneticCTA";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { StaggerGroup, StaggerItem, staggerChild } from "@/components/motion/StaggerGroup";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main
        id="contenido"
        className="mx-auto max-w-[var(--container-content)] px-gutter py-section"
      >
        <h1 className="text-display text-ink-050">
          <SplitLines lines={["Banco de pruebas", "del movimiento"]} />
        </h1>

        <section aria-labelledby="reveal" className="mt-13">
          <SectionHeading id="reveal">Reveal y stagger</SectionHeading>
          <StaggerGroup as="ul" childCount={4} className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-4">
            {["Homecoming", "Far From Home", "No Way Home", "Brand New Day"].map((t) => (
              <StaggerItem key={t} variants={staggerChild} className="panel-ink p-5">
                <p className="font-display uppercase">{t}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-6" delay={0.1}>
            <p className="text-lead text-ink-300">Entra una vez y no se re-anima al volver.</p>
          </Reveal>
        </section>

        <section aria-labelledby="glitch" className="mt-13">
          <SectionHeading id="glitch">Glitch y contador</SectionHeading>
          <p className="mt-6 text-display">
            <GlitchText>MULTIVERSO</GlitchText>
          </p>
          <p className="mt-6 font-display text-display text-iron-gold-400">
            <CountUp value={2.42} formatted="2,42 mil millones USD" />
          </p>
        </section>

        <section aria-labelledby="parallax" className="mt-13">
          <SectionHeading id="parallax">Parallax</SectionHeading>
          <div className="relative mt-6 h-64 overflow-hidden bg-ink-950">
            <Parallax distance={24} className="absolute inset-0 text-ink-700">
              <SkylineLayer depth={1} className="h-64" />
            </Parallax>
          </div>
          <MagneticCTA className="mt-6 inline-block">
            <Button>Imán al puntero</Button>
          </MagneticCTA>
        </section>
      </main>
    </>
  );
}

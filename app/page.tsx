import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main id="contenido" className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <Eyebrow>Tres películas · un mismo cabro de Queens</Eyebrow>
      <h1 className="text-hook text-ink-050">Nadie iba a recordar su nombre.</h1>
      <section aria-labelledby="smoke" className="mt-13">
        <SectionHeading id="smoke">Prueba del sistema de diseño</SectionHeading>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge tone="red">2021</Badge>
          <Badge tone="gold">Iron Spider</Badge>
          <Badge tone="blue">Estreno</Badge>
          <Button>Empezar por el principio</Button>
          <ButtonLink variant="ghost" href="#contenido">
            Ver los tráilers
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

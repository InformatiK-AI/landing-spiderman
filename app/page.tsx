import { FilmsSpine } from "@/components/sections/FilmsSpine";
import { Hero } from "@/components/sections/Hero";
import { MultiversePortal } from "@/components/sections/MultiversePortal";
import { LegacyStats } from "@/components/sections/LegacyStats";
import { SuitGallery } from "@/components/sections/SuitGallery";
import { Timeline } from "@/components/sections/Timeline";
import { WhatsNext } from "@/components/sections/WhatsNext";
import { WhoIsPeter } from "@/components/sections/WhoIsPeter";
import { TRILOGY, getFilm } from "@/content/films";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoIsPeter />
      <Timeline />
      {/* El interstitial de multiverso es la salida del capítulo 3, no una
          sección hermana: narrativamente es el clímax. Por eso la espina se
          corta en la trilogía y Brand New Day viene después del portal. */}
      <FilmsSpine films={TRILOGY}>
        <MultiversePortal />
        <WhatsNext film={getFilm("brand-new-day")} />
      </FilmsSpine>
      <SuitGallery />
      <LegacyStats />
    </>
  );
}

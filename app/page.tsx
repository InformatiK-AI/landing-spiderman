import { SectionShell } from "@/components/layout/SectionShell";
import { Hero } from "@/components/sections/Hero";
import { LiteYouTube } from "@/components/trailer/LiteYouTube";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CHAPTERS_COPY } from "@/content/copy";
import { getFilm } from "@/content/films";
import { TRAILERS } from "@/content/trailers";

export default function Home() {
  const film = getFilm("no-way-home");

  return (
    <>
      <Hero />
      <SectionShell labelledBy={CHAPTERS_COPY.headingId} id={CHAPTERS_COPY.headingId}>
        <SectionHeading id={CHAPTERS_COPY.headingId}>
          {CHAPTERS_COPY.heading}
        </SectionHeading>
        <div className="mt-9">
          <LiteYouTube
            trailer={TRAILERS[film.slug]}
            title={film.titleEs ?? film.title}
            year={film.year}
            palette={film.palette}
          />
        </div>
      </SectionShell>
    </>
  );
}

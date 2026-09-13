import { FilmsSpine } from "@/components/sections/FilmsSpine";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { WhoIsPeter } from "@/components/sections/WhoIsPeter";
import { FILMS } from "@/content/films";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoIsPeter />
      <Timeline />
      <FilmsSpine films={FILMS} />
    </>
  );
}

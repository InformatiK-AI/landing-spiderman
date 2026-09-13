import { Hero } from "@/components/sections/Hero";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TIMELINE_COPY } from "@/content/copy";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionShell labelledBy={TIMELINE_COPY.headingId} id={TIMELINE_COPY.headingId} deferPaint>
        <SectionHeading id={TIMELINE_COPY.headingId}>{TIMELINE_COPY.heading}</SectionHeading>
        <p className="mt-6 max-w-[var(--container-prose)] text-lead text-ink-300">
          {TIMELINE_COPY.intro}
        </p>
      </SectionShell>
    </>
  );
}

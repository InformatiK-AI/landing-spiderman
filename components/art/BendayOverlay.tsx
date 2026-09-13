import { cn } from "@/lib/cn";

/** Capa de puntos ben-day, opcionalmente con degradé de desvanecido. */
export function BendayOverlay({
  fade = true,
  className,
}: {
  fade?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 texture-benday",
        fade && "halftone-fade",
        className,
      )}
    />
  );
}

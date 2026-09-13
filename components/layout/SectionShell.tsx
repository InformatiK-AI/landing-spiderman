import { cn } from "@/lib/cn";

/**
 * Envoltorio de sección. `contain` limita el alcance de recalculos.
 *
 * `content-visibility` NO se aplica acá por defecto: rompe la medición de
 * useScroll y las anclas. Se activa caso a caso con `deferPaint` en las
 * secciones que no dependen del scroll.
 */
export function SectionShell({
  id,
  labelledBy,
  children,
  className,
  deferPaint = false,
  full = false,
}: {
  id?: string;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  deferPaint?: boolean;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative [contain:layout_paint_style]",
        deferPaint && "[content-visibility:auto] [contain-intrinsic-size:auto_900px]",
        !full && "mx-auto max-w-[var(--container-content)] px-gutter py-section",
        className,
      )}
    >
      {children}
    </section>
  );
}

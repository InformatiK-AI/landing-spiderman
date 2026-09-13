import { cn } from "@/lib/cn";

type Tone = "neutral" | "red" | "gold" | "blue";

/**
 * Etiqueta corta (año, rating, estado).
 *
 * El tono es decoración: el significado siempre va en el texto, nunca sólo en
 * el color.
 */
const TONES: Record<Tone, string> = {
  neutral: "border-ink-700 text-ink-300",
  red: "border-web-red-500 text-web-red-300",
  gold: "border-iron-gold-400 text-iron-gold-400",
  blue: "border-web-blue-500 text-web-blue-300",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 font-display text-kicker uppercase",
        "rounded-[var(--radius-panel)]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/cn";

/**
 * Bocadillo de cómic. Semánticamente es una cita, así que el contenido va en
 * blockquote/cite, no en divs.
 */
export function SpeechBubble({
  children,
  cite,
  className,
}: {
  children: React.ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <blockquote
        className={cn(
          "relative bg-paper-500 px-7 py-6 text-ink-950",
          "rounded-[var(--radius-panel)] border-3 border-ink-950",
        )}
      >
        <p className="text-lead">{children}</p>
        {/* cola del bocadillo */}
        <svg
          viewBox="0 0 40 28"
          aria-hidden="true"
          focusable="false"
          className="absolute -bottom-6.5 left-10 h-7 w-10 text-paper-500"
        >
          <path d="M2 0 L38 0 L14 27 Z" fill="currentColor" stroke="#07070c" strokeWidth="3" />
        </svg>
      </blockquote>
      {cite ? (
        <figcaption className="mt-9 font-display text-kicker uppercase text-ink-300">
          — <cite className="not-italic">{cite}</cite>
        </figcaption>
      ) : null}
    </figure>
  );
}

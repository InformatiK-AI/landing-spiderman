import { cn } from "@/lib/cn";

/**
 * Render en CSS de un traje: gradiente de su paleta + líneas de telaraña.
 * Cero imágenes. `role="img"` con aria-label porque comunica información.
 */
export function SuitSwatch({
  label,
  colors,
  className,
}: {
  label: string;
  /** [principal, secundario, acento] */
  colors: readonly [string, string, string];
  className?: string;
}) {
  const [primary, secondary, accent] = colors;

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative aspect-4/5 overflow-hidden rounded-[var(--radius-panel)]", className)}
      style={{
        background: `linear-gradient(150deg, ${primary} 0%, ${primary} 48%, ${secondary} 48%, ${secondary} 100%)`,
      }}
    >
      {/* retícula de telaraña en relieve del traje */}
      <svg
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
        style={{ color: accent, opacity: 0.35 }}
      >
        <g stroke="currentColor" strokeWidth="0.4" fill="none">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 12.5} y1="0" x2={i * 12.5 - 18} y2="125" />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5 + 6} />
          ))}
        </g>
      </svg>
      {/* ojo de la máscara, arriba a la izquierda */}
      <svg
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M18 26 Q34 16 46 28 Q34 40 18 34 Z"
          fill={accent}
          stroke="var(--color-ink-950)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

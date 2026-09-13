import { cn } from "@/lib/cn";

/**
 * Anillo de portal con chispas. El centelleo es CSS-only (12 spans con
 * animation-delay escalonado): cero trabajo en el hilo principal de JS.
 *
 * Fotosensibilidad: la opacidad de cada chispa sube y baja a lo largo de 2.4s,
 * muy por debajo de 3 Hz, y ninguna transición va de claro a oscuro extremo.
 */
const SPARKS = 12;

export function PortalRing({
  className,
  sparks = true,
}: {
  className?: string;
  /** false en reduced-motion: anillo estático, cero chispas. */
  sparks?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none relative aspect-square", className)} aria-hidden="true">
      <svg viewBox="0 0 200 200" focusable="false" className="h-full w-full">
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="var(--color-portal-500)"
          strokeWidth="2"
          opacity="0.75"
        />
        <circle
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="var(--color-portal-300)"
          strokeWidth="0.75"
          strokeDasharray="6 10"
          opacity="0.55"
        />
      </svg>

      {sparks
        ? Array.from({ length: SPARKS }, (_, i) => {
            const angle = (Math.PI * 2 * i) / SPARKS;
            const x = Math.cos(angle);
            const y = Math.sin(angle);
            return (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 block size-1.5 rounded-full bg-portal-300 motion-reduce:hidden"
                style={{
                  // posición en el anillo
                  marginLeft: `${x * 44}%`,
                  marginTop: `${y * 44}%`,
                  // dirección de salida de la chispa
                  ["--spark-x" as string]: `${x * 26}px`,
                  ["--spark-y" as string]: `${y * 26}px`,
                  animation: `spark-drift 2.4s var(--ease-swing) ${i * 0.2}s infinite`,
                  willChange: "transform, opacity",
                }}
              />
            );
          })
        : null}
    </div>
  );
}

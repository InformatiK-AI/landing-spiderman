import { cn } from "@/lib/cn";

/**
 * Tres capas de silueta de Nueva York para parallax. Paths originales: perfiles
 * de azotea genéricos, no la traza de un edificio reconocible concreto.
 */
const LAYERS = [
  // fondo: torres altas y espaciadas
  "M0 100 L0 54 L4 54 L4 40 L9 40 L9 54 L14 54 L14 30 L20 30 L20 54 L26 54 L26 46 L31 46 L31 54 L37 54 L37 22 L43 22 L43 54 L49 54 L49 38 L55 38 L55 54 L61 54 L61 28 L67 28 L67 54 L73 54 L73 44 L79 44 L79 54 L85 54 L85 34 L91 34 L91 54 L96 54 L96 48 L100 48 L100 100 Z",
  // medio: bloques de altura media
  "M0 100 L0 70 L6 70 L6 60 L13 60 L13 70 L19 70 L19 52 L27 52 L27 70 L34 70 L34 64 L41 64 L41 70 L48 70 L48 50 L56 50 L56 70 L63 70 L63 58 L70 58 L70 70 L77 70 L77 62 L84 62 L84 70 L92 70 L92 56 L100 56 L100 100 Z",
  // frente: azoteas de Queens, bajas y densas
  "M0 100 L0 86 L5 86 L5 80 L11 80 L11 86 L17 86 L17 78 L24 78 L24 86 L30 86 L30 82 L36 82 L36 86 L43 86 L43 76 L50 76 L50 86 L57 86 L57 84 L64 84 L64 86 L71 86 L71 79 L78 79 L78 86 L85 86 L85 83 L92 83 L92 86 L100 86 L100 100 Z",
] as const;

export function SkylineLayer({
  depth,
  className,
}: {
  /** 0 = fondo, 2 = frente */
  depth: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("absolute inset-x-0 bottom-0 h-full w-full", className)}
    >
      <path d={LAYERS[depth]} fill="currentColor" />
    </svg>
  );
}

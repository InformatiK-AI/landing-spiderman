/**
 * Une clases condicionales. Sin dependencias: clsx + tailwind-merge costarían
 * ~8 KB para un proyecto donde los conflictos de utilities se evitan por
 * disciplina, no por resolución en runtime.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

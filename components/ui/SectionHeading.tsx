import { cn } from "@/lib/cn";

/**
 * h2 de sección. El `id` es obligatorio: cada `<section>` se etiqueta con
 * `aria-labelledby` apuntando acá.
 */
export function SectionHeading({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("text-h2 text-ink-050", className)}>
      {children}
    </h2>
  );
}

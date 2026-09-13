"use client";

import { m } from "framer-motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";
import { DUR, EASE, ENTER_Y } from "@/lib/motion/tokens";

/**
 * La entrada por defecto del proyecto: ~80% de las animaciones pasan por acá.
 * Gated por el IntersectionObserver compartido y `once` por diseño.
 */
export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  y = ENTER_Y,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  amount?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ amount });

  // Los tags de `m` tienen tipos de ref distintos, y su unión no acepta un solo
  // ref. Se normaliza a `m.div`: en runtime los tres aceptan el mismo ref de
  // elemento, y el tag real lo decide `as`.
  const TAGS = { div: m.div, li: m.li, section: m.section };
  const Tag = TAGS[as] as typeof m.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DUR.slow, ease: EASE.snap, delay }}
      // Promover sólo mientras importa: cada capa promovida es memoria de GPU.
      style={{ willChange: inView ? "auto" : "transform, opacity" }}
    >
      {children}
    </Tag>
  );
}

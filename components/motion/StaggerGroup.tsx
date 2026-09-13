"use client";

import { m } from "framer-motion";
import { useInViewOnce } from "@/lib/hooks/useInViewOnce";
import { DUR, EASE, ENTER_Y, STAGGER } from "@/lib/motion/tokens";

/**
 * Entrada escalonada con variants padre/hijo — no con `delay` encadenado a mano.
 *
 * Techo deliberado: con más de 8 hijos el stagger se comprime, porque la última
 * tarjeta no puede esperar 900 ms.
 */
const MAX_STAGGERED = 8;

export function StaggerGroup({
  children,
  childCount,
  stagger = STAGGER.base,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  /** Para comprimir el stagger cuando hay muchos hijos. */
  childCount?: number;
  stagger?: number;
  className?: string;
  as?: "div" | "ul" | "dl";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ amount: 0.15 });
  const effective =
    childCount && childCount > MAX_STAGGERED
      ? (stagger * MAX_STAGGERED) / childCount
      : stagger;

  // Misma normalización de ref que en Reveal.
  const TAGS = { div: m.div, ul: m.ul, dl: m.dl };
  const Tag = TAGS[as] as typeof m.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: effective } },
      }}
    >
      {children}
    </Tag>
  );
}

export const staggerChild = {
  hidden: { opacity: 0, y: ENTER_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.snap },
  },
} as const;

export const StaggerItem = m.div;

/** Lenguaje de movimiento del proyecto. Documentado en docs/DESIGN.md. */

export const DUR = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.52,
  epic: 0.8,
} as const;

export const EASE = {
  /** entradas decididas */
  snap: [0.2, 0, 0, 1],
  /** el disparo de telaraña */
  thwip: [0.16, 1, 0.3, 1],
  /** balanceo */
  swing: [0.65, 0, 0.35, 1],
  /** salidas que se hunden */
  inInk: [0.7, 0, 0.84, 0],
} as const;

export const SPRING = {
  /** respuesta al usuario: hover, pop, apertura */
  pop: { type: "spring", stiffness: 300, damping: 24, mass: 0.8 },
  /** llegada del titular */
  settle: { type: "spring", stiffness: 200, damping: 26, mass: 0.9 },
  /** parallax suavizado */
  drift: { type: "spring", stiffness: 60, damping: 20, mass: 1.2 },
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.06,
  loose: 0.1,
  lines: 0.08,
} as const;

/**
 * Desplazamiento máximo de una entrada. Más de 24px se siente lento aunque
 * dure lo mismo.
 */
export const ENTER_Y = 16;

/** Variants compartidas: el contenido entra desde abajo. */
export const revealVariants = {
  hidden: { opacity: 0, y: ENTER_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.snap },
  },
} as const;

export const staggerParent = (stagger: number = STAGGER.base, delay = 0) =>
  ({
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }) as const;

"use client";

import { useReducedMotion } from "framer-motion";

/**
 * NIVEL 3 de reduced-motion: gates estructurales.
 *
 * `MotionConfig reducedMotion="user"` (nivel 2) desactiva animaciones de
 * transform y mantiene opacity, que es el comportamiento correcto. Pero no
 * sirve cuando el problema es el LAYOUT y no la animación: una sección de
 * 320vh con sticky sigue siendo hostil aunque no anime. Para esos casos los
 * componentes consultan este hook y cambian de estructura.
 *
 * Devuelve `false` en el servidor (SSR-safe): la primera pintura asume
 * movimiento permitido y se corrige en hidratación.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}

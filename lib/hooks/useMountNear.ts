"use client";

import { useInViewOnce } from "./useInViewOnce";

/**
 * Monta una sección pesada recién cuando se acerca al viewport, para no pagar
 * su coste de hidratación de entrada. El HTML igual viene del SSR: esto aplaza
 * trabajo de cliente, no contenido.
 */
export function useMountNear<T extends Element>(rootMargin = "500px") {
  return useInViewOnce<T>({ amount: 0, rootMargin });
}

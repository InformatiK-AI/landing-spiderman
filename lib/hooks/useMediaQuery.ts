"use client";

import { useEffect, useState } from "react";

/** Suscripción a una media query. `false` en el servidor. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Puntero fino: en táctil los efectos de hover quedan pegados tras el tap. */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

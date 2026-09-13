"use client";

import { useEffect } from "react";
import { TRAILERS, UNVERIFIED_TRAILERS } from "@/content/trailers";

/**
 * Aviso en desarrollo de los tráilers sin verificar. No renderiza nada y se
 * elimina del bundle de producción porque su cuerpo está tras
 * `process.env.NODE_ENV !== "production"`.
 */
export function UnverifiedTrailersNotice() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (UNVERIFIED_TRAILERS.length === 0) return;

    console.warn(
      `[tráilers] ${UNVERIFIED_TRAILERS.length} sin verificar. YouTube está ` +
        `bloqueado por política de red en el entorno de desarrollo, así que estos ` +
        `IDs vienen de búsqueda web y necesitan una apertura manual. ` +
        `Al confirmar uno, poner verified: true en content/trailers.ts.`,
      UNVERIFIED_TRAILERS.map((slug) => ({
        slug,
        id: TRAILERS[slug as keyof typeof TRAILERS].youtubeId,
      })),
    );
  }, []);

  return null;
}

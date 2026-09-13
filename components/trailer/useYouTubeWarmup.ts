"use client";

import { useCallback, useRef } from "react";

const HOSTS = ["https://www.youtube-nocookie.com", "https://i.ytimg.com"] as const;

/**
 * Paga el handshake TLS mientras la persona decide, no antes.
 *
 * Se dispara en `pointerenter`/`focusin` y sólo una vez. Antes de eso NO hay
 * ninguna petición a YouTube: es la diferencia entre cumplir el presupuesto de
 * "cero terceros en la carga inicial" y no cumplirlo.
 */
export function useYouTubeWarmup() {
  const done = useRef(false);

  return useCallback(() => {
    if (done.current) return;
    done.current = true;

    for (const host of HOSTS) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = host;
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, []);
}

"use client";

import { useId, useState } from "react";
import { PanelFrame } from "@/components/art/PanelFrame";
import { CHAPTERS_COPY } from "@/content/copy";
import type { SuitPalette, Trailer } from "@/content/types";
import { buildEmbedUrl, buildWatchUrl } from "@/lib/youtube";
import { TrailerPoster } from "./TrailerPoster";
import { useYouTubeWarmup } from "./useYouTubeWarmup";

/**
 * Embed diferido al clic.
 *
 * Estado inicial: un `<button>` 16:9 cuyo fondo es arte generado. `aspect-ratio`
 * reserva el espacio exacto, así que montar el iframe no produce CLS.
 *
 * Antes del clic NO se carga un solo byte de YouTube. El reproductor de YouTube
 * pesa más de 1 MB de JS; pagarlo en la carga inicial, siete veces, haría
 * imposible cualquier presupuesto.
 *
 * Se reproduce inline a propósito: evita por completo el problema de gestión de
 * foco de un modal. El modal existe sólo donde hace falta (TrailerDialog).
 */
export function LiteYouTube({
  trailer,
  title,
  year,
  palette,
}: {
  trailer: Trailer;
  title: string;
  year: number;
  palette: SuitPalette;
}) {
  const [playing, setPlaying] = useState(false);
  const warmup = useYouTubeWarmup();
  const noteId = useId();

  return (
    <div>
      <PanelFrame className="relative aspect-video w-full overflow-hidden">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={buildEmbedUrl(trailer.youtubeId)}
            title={trailer.label}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            onPointerEnter={warmup}
            onFocus={warmup}
            aria-describedby={trailer.verified ? undefined : noteId}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <span className="sr-only">
              Reproducir {trailer.label}. Se carga desde YouTube.
            </span>
            <TrailerPoster title={title} year={year} palette={palette} />
          </button>
        )}
      </PanelFrame>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        {/* Sin tráiler verificado no se renderiza un control deshabilitado: se
            explica. Un control deshabilitado sin explicación es peor que
            ninguno. */}
        {trailer.verified ? (
          <span />
        ) : (
          <p id={noteId} className="max-w-[42rem] text-ink-300">
            {CHAPTERS_COPY.unverifiedNote}
          </p>
        )}
        <a
          href={buildWatchUrl(trailer.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-kicker uppercase text-web-red-300 underline"
        >
          {CHAPTERS_COPY.watchOnYouTube}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  );
}

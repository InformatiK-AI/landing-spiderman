"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS_COPY } from "@/content/copy";
import type { Trailer } from "@/content/types";
import { buildEmbedUrl } from "@/lib/youtube";
import { useYouTubeWarmup } from "./useYouTubeWarmup";

/**
 * Modal de tráiler sobre el elemento `<dialog>` NATIVO con showModal().
 *
 * No es un div con role="dialog": el elemento nativo da gratis y correcto el
 * focus trap real, el cierre con Escape, `inert` en el resto del documento,
 * ::backdrop estilizable y aria-modal implícito.
 *
 * Encima de eso: se guarda el elemento activo al abrir y se restaura al cerrar,
 * el foco inicial va al botón de cerrar (NO al iframe — el foco dentro de un
 * iframe de tercero es una trampa de la que el teclado no sale fácil), y el
 * iframe se DESMONTA al cerrar, lo que detiene el audio y libera el reproductor.
 */
export function TrailerDialog({
  trailer,
  label,
  triggerLabel,
  triggerClassName,
}: {
  trailer: Trailer;
  label: string;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const warmup = useYouTubeWarmup();

  const openDialog = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    dialogRef.current?.close();
  }, []);

  // `close` cubre también el cierre con Escape, que el navegador hace solo.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        onPointerEnter={warmup}
        onFocus={warmup}
        className={triggerClassName}
      >
        {triggerLabel ?? CHAPTERS_COPY.trailerLabel}
        <span className="sr-only">: {label}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={label}
        onClick={(event) => {
          // Clic en el ::backdrop: el target es el propio dialog.
          if (event.target === dialogRef.current) closeDialog();
        }}
        className="m-auto w-[min(92vw,64rem)] bg-transparent p-0 backdrop:bg-ink-950/85"
      >
        <div className="panel-ink p-3">
          <div className="flex items-center justify-between gap-4 pb-3">
            <p className="font-display text-kicker uppercase text-ink-100">{label}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={closeDialog}
              className="px-3 py-2 font-display text-kicker uppercase text-web-red-300"
            >
              Cerrar
              <span className="sr-only"> el reproductor</span>
            </button>
          </div>
          {/* El iframe sólo existe mientras está abierto: al cerrar se desmonta,
              se corta el audio y se libera el reproductor. */}
          {open ? (
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={buildEmbedUrl(trailer.youtubeId)}
                title={trailer.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-ink-900" />
          )}
        </div>
      </dialog>
    </>
  );
}

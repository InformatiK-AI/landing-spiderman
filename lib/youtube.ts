/** Un ID de YouTube son 11 caracteres de su alfabeto base64url. */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID.test(id);
}

/**
 * URL del reproductor embebido.
 *
 * Se usa `youtube-nocookie.com` por higiene de privacidad. El reproductor se
 * deja intacto: no se bloquea ni se altera su comportamiento, que es una de las
 * condiciones de los términos de YouTube para embeber.
 */
export function buildEmbedUrl(
  id: string,
  { autoplay = true }: { autoplay?: boolean } = {},
): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    hl: "es",
    cc_lang_pref: "es",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** Enlace de respaldo, para cuando el embed falla o el video está restringido. */
export function buildWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

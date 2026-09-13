/** Separador entre viñetas. Decorativo. */
export function ComicGutter() {
  return (
    <div aria-hidden="true" className="relative h-px bg-ink-800">
      <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-transparent via-web-red-700 to-transparent" />
    </div>
  );
}

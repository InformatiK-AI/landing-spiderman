/** Glifo de araña original. Reutilizado en header, footer y favicon. */
export function SpiderGlyph({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* cuerpo */}
      <ellipse cx="16" cy="16" rx="3.2" ry="4.4" fill="currentColor" stroke="none" />
      {/* ocho patas, en pares espejados */}
      <path d="M13 13 6 8 3 10" />
      <path d="M13 15 5 14 2 16" />
      <path d="M13 17.5 5 19 3 22" />
      <path d="M14 20 8 24 7 27" />
      <path d="M19 13 26 8 29 10" />
      <path d="M19 15 27 14 30 16" />
      <path d="M19 17.5 27 19 29 22" />
      <path d="M18 20 24 24 25 27" />
    </svg>
  );
}

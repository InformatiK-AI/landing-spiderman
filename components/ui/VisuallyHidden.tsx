/** Texto disponible para lectores de pantalla pero no visualmente. */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

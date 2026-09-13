/**
 * Grano de papel. UN solo elemento fixed para toda la página — no uno por
 * sección: cada capa con mix-blend-mode cuesta composición.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 texture-grain"
    />
  );
}

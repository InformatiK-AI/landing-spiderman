/**
 * Telaraña en SVG: radios + arcos colgantes, anclada a un origen.
 * `vectorEffect="non-scaling-stroke"` mantiene el grosor al escalar.
 */
export function WebPattern({
  className,
  rings = 5,
  spokes = 14,
  opacity = 0.14,
}: {
  className?: string;
  rings?: number;
  spokes?: number;
  opacity?: number;
}) {
  const cx = 0;
  const cy = 0;
  const max = 100;

  const spokeLines = Array.from({ length: spokes }, (_, i) => {
    // Cuarto de círculo: la telaraña cuelga de la esquina superior izquierda.
    const angle = (Math.PI / 2) * (i / (spokes - 1));
    return {
      key: `s${i}`,
      x: cx + Math.cos(angle) * max,
      y: cy + Math.sin(angle) * max,
      angle,
    };
  });

  // Arcos: entre radio y radio, una curva que "cuelga" hacia el centro.
  const arcs = Array.from({ length: rings }, (_, r) => {
    const radius = ((r + 1) / (rings + 1)) * max;
    const sag = radius * 0.12;
    const d = spokeLines
      .map((s, i) => {
        const x = cx + Math.cos(s.angle) * radius;
        const y = cy + Math.sin(s.angle) * radius;
        if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        const prev = spokeLines[i - 1];
        if (!prev) return "";
        const mid = (prev.angle + s.angle) / 2;
        const qx = cx + Math.cos(mid) * (radius - sag);
        const qy = cy + Math.sin(mid) * (radius - sag);
        return `Q ${qx.toFixed(2)} ${qy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
    return { key: `r${r}`, d };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ opacity }}
    >
      <g stroke="currentColor" fill="none" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
        {spokeLines.map((s) => (
          <line key={s.key} x1={cx} y1={cy} x2={s.x} y2={s.y} vectorEffect="non-scaling-stroke" />
        ))}
        {arcs.map((a) => (
          <path key={a.key} d={a.d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

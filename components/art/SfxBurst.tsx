import { cn } from "@/lib/cn";

/** Estrella de impacto con onomatopeya. Decorativa. */
export function SfxBurst({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // 12 puntas alternando radio largo/corto
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24 - Math.PI / 2;
    const r = i % 2 === 0 ? 50 : 34;
    return `${(50 + Math.cos(angle) * r).toFixed(1)},${(50 + Math.sin(angle) * r).toFixed(1)}`;
  }).join(" ");

  return (
    <div className={cn("relative inline-grid place-items-center", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" focusable="false" className="h-full w-full">
        <polygon
          points={points}
          fill="var(--color-iron-gold-400)"
          stroke="var(--color-ink-950)"
          strokeWidth="2.5"
        />
      </svg>
      <span className="absolute font-sfx text-ink-950 [font-size:clamp(1rem,3vw,2rem)]">
        {children}
      </span>
    </div>
  );
}

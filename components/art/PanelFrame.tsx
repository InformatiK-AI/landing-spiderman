import { cn } from "@/lib/cn";

/** Marco de viñeta de cómic. */
export function PanelFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("panel-ink", className)}>{children}</div>;
}

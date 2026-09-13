import { cn } from "@/lib/cn";

/** Kicker: etiqueta corta sobre un título. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-kicker text-web-red-300 uppercase",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

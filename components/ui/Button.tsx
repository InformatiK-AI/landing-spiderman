import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const BASE =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-display " +
  "text-kicker uppercase rounded-[var(--radius-panel)] " +
  "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-snap)] " +
  "hocus:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hocus:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  // web-red-500 como fondo con texto ink-950: el texto oscuro sobre el rojo
  // de marca sí pasa contraste; rojo sobre oscuro no lo haría.
  primary: "bg-web-red-500 text-ink-950 hocus:bg-web-red-300",
  ghost: "border border-ink-700 text-ink-100 hocus:border-portal-300",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: Props & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </a>
  );
}

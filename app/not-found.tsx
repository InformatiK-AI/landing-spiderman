import Link from "next/link";
import { SfxBurst } from "@/components/art/SfxBurst";

export default function NotFound() {
  return (
    <main
      id="contenido"
      className="grid min-h-svh place-items-center px-gutter py-section text-center"
    >
      <div>
        <SfxBurst className="mx-auto size-40">404</SfxBurst>
        <h1 className="mt-8 text-display text-ink-050">Esta página no existe</h1>
        <p className="mx-auto mt-4 max-w-[var(--container-prose)] text-lead text-ink-300">
          Como Peter después del hechizo: está, pero nadie la recuerda.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-display text-kicker uppercase text-web-red-300 underline"
        >
          Volver al principio
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fracción del elemento que debe estar visible. */
  amount?: number;
  rootMargin?: string;
};

/**
 * IntersectionObserver COMPARTIDO entre todos los consumidores con la misma
 * configuración. Con una primitiva `Reveal` usada decenas de veces, un
 * observer por instancia es desperdicio; acá hay uno por combinación de
 * (threshold, rootMargin).
 *
 * Dispara una sola vez: nada se re-anima al volver a subir. Repetir es ruido.
 */
type Entry = {
  observer: IntersectionObserver;
  callbacks: Map<Element, () => void>;
};

const registry = new Map<string, Entry>();

function getObserver(amount: number, rootMargin: string): Entry {
  const key = `${amount}|${rootMargin}`;
  const existing = registry.get(key);
  if (existing) return existing;

  const callbacks = new Map<Element, () => void>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = callbacks.get(entry.target);
        if (cb) cb();
      }
    },
    { threshold: amount, rootMargin },
  );

  const created: Entry = { observer, callbacks };
  registry.set(key, created);
  return created;
}

export function useInViewOnce<T extends Element>({
  amount = 0.2,
  rootMargin = "0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const { observer, callbacks } = getObserver(amount, rootMargin);
    callbacks.set(node, () => setInView(true));
    observer.observe(node);

    return () => {
      callbacks.delete(node);
      observer.unobserve(node);
    };
  }, [amount, rootMargin, inView]);

  return { ref, inView };
}

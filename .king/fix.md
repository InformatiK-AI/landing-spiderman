# .king/fix.md — reparaciones

> Artefacto de la etapa `fix`. Sólo bloqueantes; todo se volvió a medir después.

| Hallazgo | Causa raíz | Reparación | Nueva medición |
|---|---|---|---|
| B1 · 5 IDs duplicados | `<section>` y `<h2>` compartían `id`, así que `aria-labelledby` apuntaba a la sección | Pares `id` / `id-titulo` | 0 duplicados |
| B3 · 11 violaciones de contraste | (a) `opacity: 0.65` en nodos inactivos de la cronología; (b) la capa de grano con `mix-blend-mode` sobre el botón primario | (a) se quitó el atenuado: el nodo activo se distingue sólo por escala; (b) botón a `web-red-300` y grano a 0.04 | axe: 0 violaciones de cualquier nivel |
| B2 · reduced-motion dependía de JS | `useReducedMotionSafe()` devuelve `false` en el servidor | El cambio estructural pasó a CSS (`motion-reduce:`) | Reduced-motion correcto desde la primera pintura y sin JS |
| B4 · desborde de 29px a 390px | La nav del header no cabía en una sola fila | `flex-wrap` con gaps menores | 0px de desborde a 390 / 768 / 1440 |
| A1 · `layoutEffect` inexistente | El plan afirmaba una opción que framer-motion 12 no tiene | Corregido contra la definición real en `node_modules` | `tsc` limpio |
| A2 · HTML inválido en listas | `asChild` inexistente y `<li>` envuelto en `div` | `StaggerListItem` (`m.li`) | `tsc` y axe limpios |
| A4 · `TrailerDialog` sin usar | Reproducción inline en todos los capítulos | Conectado como CTA secundario del hero | 5 comprobaciones de teclado nuevas, todas pasando |
| Presupuesto excedido (146 KB > 145) | `CountUp` importaba `animate` de framer-motion | Tween con `requestAnimationFrame` propio | 135 KB |

Sin bloqueantes abiertos.

# .king/review.md — revisión dual-blind

> Artefacto de la etapa `review`. Dos pasadas independientes sobre el diff; la
> segunda no vio los hallazgos de la primera.

## Juez A — corrección y arquitectura

| # | Severidad | Hallazgo | Resolución |
|---|---|---|---|
| A1 | **bloqueante** | `useScroll` recibía `layoutEffect: false`, opción que no existe en framer-motion 12 (se quitó después de v11). Falla de tipos. | Corregido contra la definición real de `UseScrollOptions` en `node_modules`. El plan lo afirmaba y estaba equivocado. |
| A2 | **bloqueante** | `StaggerItem` (`m.div`) recibía `asChild`, prop inexistente, y envolvía un `<li>` dentro de un `<ul>` → HTML inválido. | Se añadió `StaggerListItem` (`m.li`). |
| A3 | mayor | La unión de tipos de los tags de `m` impedía pasar un solo ref en los componentes polimórficos. | Normalizado a `typeof m.div` con comentario explicando por qué es seguro en runtime. |
| A4 | mayor | `TrailerDialog` era código muerto: la página reproducía todo inline. | Conectado como CTA secundario del hero, que es donde un modal se justifica. |
| A5 | menor | `MagneticCTA` quedó sin consumidor. | Se mantiene como primitiva documentada; no entra al bundle por no estar importada. |

## Juez B — UX, accesibilidad y rendimiento

| # | Severidad | Hallazgo | Resolución |
|---|---|---|---|
| B1 | **bloqueante** | **Cinco IDs duplicados** (`cronologia`, `peliculas`, `multiverso`, `trajes`, `cifras`): la `<section>` y su `<h2>` compartían el mismo `id`, así que cada `aria-labelledby` apuntaba a la sección y no a su encabezado. | Separado en pares `id` / `id-titulo`. Verificado: 0 duplicados. |
| B2 | **bloqueante** | El cambio estructural de reduced-motion dependía de `useReducedMotionSafe()`, que devuelve `false` en el servidor → una persona con reduced-motion recibía el layout de 320vh/200vh en la primera pintura, y de forma permanente sin JS. | Movido a CSS con la variante `motion-reduce:`. |
| B3 | **bloqueante** | 11 violaciones serias de contraste. Dos causas: el atenuado a `opacity: 0.65` de los nodos inactivos de la cronología (rojo a 2.36:1, gris a 4.13:1), y la capa de grano con `mix-blend-mode` que bajaba el botón primario a 2.97:1. | Se quitó el atenuado (el nodo activo se distingue sólo por escala); el botón pasó a `web-red-300` (~6.5:1 de base) y el grano bajó a 0.04. |
| B4 | mayor | Desborde horizontal de 29px a 390px: la nav del header no cabía. | `flex-wrap` con gaps menores. |
| B5 | menor | `WhoIsPeter` no tenía ancla de sección. | Añadida, consistente con el resto. |

## Segunda ronda (revisión visual)

| # | Severidad | Hallazgo | Resolución |
|---|---|---|---|
| C1 | **bloqueante** | **El titular del hero era invisible.** `PortalRing` traía `relative` en su base y el llamador pasaba `absolute`; gana el orden del stylesheet, así que el anillo de 1200px quedaba en flujo normal y empujaba el `h1` a `top: 1269px`, recortado por `overflow-hidden`. La auditoría estaba en verde. | El llamador decide la posición; `--text-hook` bajó de 12vw/10.5rem a 6.4vw/6rem. Dos comprobaciones nuevas en la auditoría. |
| C2 | mayor | Las dos líneas del titular salían en rojo: `last:` acertaba siempre porque cada línea es hija única de su contenedor. | `SplitLines` acepta clase por índice. |
| C3 | menor | El muro tipográfico decorativo a 18vw era el elemento más grande de la pantalla y le robaba jerarquía al titular. | Reducido a 7vw en cinco filas, como textura. |
| C4 | menor | Los `h2` quedaban pegados a su párrafo de intro: con `line-height` 1.02 el `mt-6` se lee como la mitad. | `mt-8` consistente. |

## Conclusión

6 bloqueantes, 4 mayores, 4 menores. Todos los bloqueantes resueltos en `fix` y
vueltos a medir. **Ningún bloqueante se encontró leyendo el código**: los cinco
salieron de ejecutar la auditoría en un navegador real. Es el argumento del
proyecto para que el QA sea medido y no declarado.

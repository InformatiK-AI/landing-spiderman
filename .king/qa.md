# .king/qa.md — verificación contra acceptance criteria

> Artefacto de la etapa `qa`. **Resultados medidos, no declarados.**
> Reproducible con `npm run qa` (requiere `npm run start` corriendo).

## Cadena de verificación estática

| Comprobación | Resultado |
|---|---|
| `npx tsc --noEmit` (strict + `noUncheckedIndexedAccess`) | ✅ 0 errores |
| `npm run lint` (eslint 9, flat config) | ✅ 0 errores, 0 warnings |
| `npm run check` (invariantes del proyecto) | ✅ 5/5 |
| `npm test` (integridad de contenido) | ✅ 16/16 |
| `npm run build` | ✅ limpio |

## Auditoría en navegador (Chromium + axe-core)

17 de 17 comprobaciones pasadas.

| # | Comprobación | Medición |
|---|---|---|
| 1 | Cero peticiones a terceros antes de interactuar | **0 peticiones** |
| 2 | axe-core: 0 violaciones serias o críticas | **28 reglas pasadas, 0 violaciones de ningún nivel** |
| 3 | CLS ≤ 0.02 | **CLS = 0.0000** |
| 4 | LCP < 2000 ms | **180 ms** |
| 5 | El botón de tráiler recibe foco por teclado | `activeElement = BUTTON` |
| 6 | El iframe se monta sólo tras la interacción | 1 iframe y 1 petición a YouTube **después** del clic |
| 7 | El modal abre y el foco queda dentro | `open=true`, foco contenido |
| 8 | El foco inicial no es el iframe | `activeElement = BUTTON` |
| 9 | `Escape` cierra el modal | ✅ |
| 10 | El iframe se desmonta al cerrar | ✅ (corta el audio) |
| 11 | El foco vuelve al botón que abrió | ✅ |
| 12 | Reduced-motion: cronología y multiverso colapsan | 1374px y 649px con viewport de 900px (sin 320vh/200vh) |
| 13 | Reduced-motion: todas las secciones visibles | **6/6** |
| 14 | Reduced-motion: axe limpio | ✅ |
| 15–17 | Sin scroll horizontal a 390 / 768 / 1440 px | **0px de desborde en los tres** |

## Presupuesto

| Métrica | Objetivo | Techo | Medido | Estado |
|---|---|---|---|---|
| LCP | < 1.5 s | 2.0 s | **180 ms** | ✅ |
| CLS | 0.00 | 0.02 | **0.0000** | ✅ |
| JS primera carga de `/` | ≤ 120 KB | 145 KB | **135 KB** | ⚠️ sobre el objetivo, bajo el techo |
| Peticiones a terceros antes de interactuar | 0 | 0 | **0** | ✅ |
| axe serious + critical | 0 | 0 | **0** | ✅ |
| Archivos binarios versionados | 0 | 0 | **0** | ✅ |

**Sobre los 135 KB:** está bajo el techo de 145 pero sobre el objetivo de 120. Al
sumar la sección de cifras llegó a 146 KB y superó el techo; se bajó a 134
cambiando el tween de `CountUp` de `animate` de framer-motion a un
`requestAnimationFrame` propio, porque era el único consumidor de esa función y
arrastraba su módulo al chunk principal. El resto son React 19 + Next 15 (103 KB
de base compartida) y el feature-set `domAnimation` de framer-motion. Se declara
el incumplimiento del objetivo en lugar de redefinirlo.

## Lo que esta auditoría NO puede cerrar

**Los siete IDs de tráiler siguen sin verificar.** YouTube está bloqueado por la
política de red del entorno (`403 CONNECT`, *policy denial* para
`www.youtube.com:443`), así que no se pudo llamar a oEmbed ni abrir un video. La
auditoría confirma que el iframe se monta y que se hace la petición tras el clic;
**no confirma que el video sea el correcto**.

Requiere una apertura manual de los siete. Cada corrección es una línea en
`content/trailers.ts`, y al poner `verified: true` desaparecen solos el aviso de
dev y la nota visible en la tarjeta.

## Puerta G-qa

| Criterio | Resultado |
|---|---|
| Cadena estática limpia | ✅ |
| 17/17 en navegador | ✅ |
| Bloqueantes de `review` resueltos y vueltos a medir | ✅ 5/5 |
| Presupuesto dentro de los techos | ✅ (con el objetivo de JS declarado como no cumplido) |
| Verificación de tráilers | ❌ **imposible en este entorno** — queda como acción para la persona |

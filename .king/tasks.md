# .king/tasks.md — checklist de trabajo ordenado

> Artefacto de la etapa `tasks`. Espejado 1:1 en issues de GitHub.
> `expected_count` = 16 issues de implementación + 1 épica.

Orden = orden de prioridad. **#1–#9 ya es una página publicable**; #10–#15 son incrementales.
El repo queda compilando y ejecutable después de cada tarea.

| # | Tarea | Depende de | Estado | Issue |
|---|---|---|---|---|
| 1 | `chore: inicializar Next.js 15 + TS strict + Tailwind v4 + CI` | — | ✅ | bloqueado |
| 2 | `feat(design-system): tokens de color, tipografía y movimiento en @theme` | 1 | ⏳ | — |
| 3 | `feat(art): texturas de cómic y primitivas SVG originales` | 2 | ⏳ | — |
| 4 | `feat(motion): proveedor de animación y primitivas accesibles` | 2 | ⏳ | — |
| 5 | `feat(content): capa de datos tipada de películas y tráilers` | 1 | ⏳ | — |
| 6 | `feat(layout): layout raíz, landmarks, header, footer y progreso` | 2,3,4 | ⏳ | — |
| 7 | `feat(hero): hook above-the-fold «se abre el portal»` | 4,5,6 | ⏳ | — |
| 8 | `feat(trailer): embed lite de YouTube y diálogo accesible` | 4,5 | ⏳ | — |
| 9 | `feat(films): plantilla de capítulo y spine de las películas` | 6,7,8 | ⏳ | — |
| 10 | `feat(timeline): cronología 2016–2026 con apariciones de reparto` | 5,9 | ⏳ | — |
| 11 | `feat(multiverse): interstitial de portales para No Way Home` | 4,9 | ⏳ | — |
| 12 | `feat(suits): galería de trajes en CSS/SVG` | 3,5,6 | ⏳ | — |
| 13 | `feat(stats): legado en números con contadores accesibles` | 4,5,6 | ⏳ | — |
| 14 | `feat(chapter-4): capítulo Brand New Day` | 5,8,9 | ⏳ | — |
| 15 | `feat(seo): metadata, OG generado, sitemap, robots y JSON-LD` | 5,7 | ⏳ | — |
| 16 | `perf(a11y): auditoría de presupuesto, axe y reduced-motion` | 1–15 | ⏳ | — |

## Puerta G-tasks

| Criterio | Resultado |
|---|---|
| Tareas independientes e implementables | ✅ |
| Cada una deja el repo compilando | ✅ por diseño del orden |
| Conteo = `expected_count` (16) | ✅ |
| Espejadas en GitHub | ❌ **bloqueado** — `403 Resource not accessible by integration`. Cargas listas en `.king/issues.json` |

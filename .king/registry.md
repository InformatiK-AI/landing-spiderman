# .king/registry.md — registro del pipeline

> Artefacto generado por el pipeline. No editar a mano fuera de su etapa.

## Proyecto

| Campo | Valor |
|---|---|
| Nombre | `landing-spiderman` |
| Repo | `InformatiK-AI/landing-spiderman` |
| Rama de desarrollo | `claude/sharp-knuth-m6z7e3` |
| Stack | Next.js 15 · TypeScript strict · Tailwind CSS v4 · Framer Motion 12 |
| Idioma | es-CL |
| Iniciado | 2026-09-13 |

## Estado

| Campo | Valor |
|---|---|
| `phase` | `spec` |
| `stage` | 2 / 8 |
| `blockers` | 0 |

## Modo de ejecución: manual

El CLI `kingx` **no está disponible en este entorno** y no se puede obtener:

| Verificación | Resultado |
|---|---|
| `which kingx` | no está en PATH |
| `pip show kingx` | no instalado |
| `pypi.org/simple/kingx/` | **404** (también `king-x`, `kingx-cli`) |
| Control `pypi.org/simple/requests/` | 200 — PyPI sí es alcanzable |
| `add_repo InformatiK-AI/kingx` (×3) | `you don't have access` |

Consecuencia: `kingx init|spec|tasks|build|review|qa|fix|ship` no se pueden invocar, y
tampoco el engine (`kingx state`, `kingx gate`). Las **ocho etapas se ejecutan
manualmente** con los mismos artefactos y las mismas puertas, y cada puerta deja su
registro en la tabla de abajo. La fase nunca se asume: se lee de este archivo antes de
cada etapa.

Si el repo `InformatiK-AI/kingx` se hace público (o se entrega el contrato del engine),
se migra al CLI real y este archivo pasa a ser generado por la herramienta.

## Bitácora de etapas

| # | Etapa | Estado | Artefacto | Notas |
|---|---|---|---|---|
| 1 | `init` | ✅ hecho | `.king/registry.md`, `docs/PIPELINE.md`, `docs/BRIEF.md` | Estructura creada |
| 2 | `spec` | ✅ hecho | `.king/spec.md`, `docs/CONTENIDO.md`, `docs/DESIGN.md` | 7 requirements, 12 scenarios |
| 3 | `tasks` | ⏳ pendiente | `.king/tasks.md` + issues en GitHub | — |
| 4 | `build` | ⏳ pendiente | código | 1 issue = 1 commit |
| 5 | `review` | ⏳ pendiente | `.king/review.md` | Dual-blind |
| 6 | `qa` | ⏳ pendiente | `.king/qa.md` | Medido, no declarado |
| 7 | `fix` | ⏳ pendiente | `.king/fix.md` | Sólo si hay bloqueantes |
| 8 | `ship` | ⏳ pendiente | push | **Se detiene antes de merge/tag** |

## Registro de puertas

| Puerta | Etapa | Criterio | Resultado | Fecha |
|---|---|---|---|---|
| G-init | `init` | Registry y estructura existen | ✅ pasa | 2026-09-13 |
| G-spec | `spec` | Requirements + scenarios + inventario verificado + aprobación | ✅ pasa | 2026-09-13 |

## Conteos esperados (verificación tipo Gate 24)

| Métrica | `expected_count` | Real | Estado |
|---|---|---|---|
| Issues de implementación | 16 | — | pendiente |
| Películas en la capa de contenido | 7 (4 solo + 3 ensemble) | — | pendiente |
| Capítulos renderizados | 4 | — | pendiente |
| Tráilers embebidos | 7 | — | pendiente |
| Secciones de página | 9 | — | pendiente |

Si `expected_count` cambia, la puerta falla y hay que actualizar esta tabla
explícitamente antes de continuar.

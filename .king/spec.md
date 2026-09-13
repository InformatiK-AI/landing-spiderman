# .king/spec.md — requirements y scenarios

> Artefacto de la etapa `spec`. Generado, no editar a mano.
> Puerta: propuesta → aprobación antes de pasar a `tasks`.

## Requirements

### R1 — Narrativa
La página cuenta el arco de las **cuatro** películas solistas de Tom Holland. Las
apariciones de conjunto (Civil War, Infinity War, Endgame) dan contexto **dentro de la
cronología**, sin sección propia.

### R2 — Tráilers
Cada película ofrece su tráiler oficial. El embed no carga nada de terceros hasta que la
persona presiona play.

### R3 — Hook
El above-the-fold detiene el scroll en menos de dos segundos y su elemento LCP es **texto**,
no arte.

### R4 — Identidad Marvel
Textura de cómic, movimiento cinético y energía de multiverso, con **cero media con
copyright** en el repositorio.

### R5 — Accesibilidad
Operable 100% por teclado, landmarks semánticos, contraste AA, y `prefers-reduced-motion`
respetado en cada animación.

### R6 — Rendimiento
LCP < 1.5 s, CLS ≤ 0.02, JS de primera carga ≤ 145 KB gz, cero peticiones a terceros antes
de interactuar.

### R7 — Contenido gobernado por datos
Corregir un ID de tráiler o el estado de una película es **una línea** en `content/`.
Ningún componente contiene un ID ni una rama `if (slug === …)`.

## Scenarios de aceptación

| ID | Dado | Cuando | Entonces |
|---|---|---|---|
| S1 | Visito la página por primera vez | carga el hero | veo el titular completo y legible en el primer frame útil; LCP < 1.5 s; CLS 0 |
| S2 | Tengo `prefers-reduced-motion: reduce` | recorro toda la página | ninguna animación se ejecuta, todas las secciones son legibles y ningún contenido es inalcanzable |
| S3 | Navego sólo con teclado | tabulo desde el inicio | el skip link es el primer foco; alcanzo cada tráiler; `Enter` abre; el foco queda dentro del diálogo; `Esc` cierra; el foco vuelve al botón que lo abrió |
| S4 | Abro la pestaña Network | cargo la página sin tocar nada | **cero** peticiones a `youtube.com`, `ytimg.com` o `google.com` |
| S5 | Presiono play en un tráiler | el iframe se monta | el video correcto se reproduce; el espacio ya estaba reservado (sin salto de layout) |
| S6 | Un ID de tráiler es incorrecto | lo corrijo en `content/trailers.ts` | una sola línea cambia y la página entera queda corregida |
| S7 | Reviso el diff del repo | busco archivos binarios | no hay ninguno: todo el arte es CSS/SVG en texto |
| S8 | Uso un lector de pantalla | llego al titular animado | se lee como **una** frase, no como fragmentos sueltos |
| S9 | Uso un lector de pantalla | llego a la cronología | el contenido está en una lista ordenada semántica y cada nodo es un enlace que salta a su capítulo |
| S10 | Veo la página en 390 px | recorro todo | no hay scroll horizontal ni texto cortado; la cronología colapsa a lista vertical |
| S11 | Veo la sección de cifras | entra en viewport | los números animan; con JS desactivado o reduced-motion el valor final ya está en el DOM |
| S12 | Soy sensible a destellos | llego al interstitial de multiverso | nada parpadea a más de 3 Hz ni hace saltos extremos de luminancia bajo 200 ms |

## Delta specs por sección

| Sección | Requirement | Scenario |
|---|---|---|
| `Hero` | R3, R4 | S1, S2, S8 |
| `WhoIsPeter` | R1 | S2 |
| `Timeline` | R1, R5 | S9, S10 |
| `FilmChapter` ×4 | R1, R2, R7 | S5, S6 |
| `MultiversePortal` | R4, R5 | S12 |
| `SuitGallery` | R4 | S2, S7 |
| `LegacyStats` | R1 | S11 |
| `LiteYouTube` | R2, R6 | S3, S4, S5 |
| `SiteFooter` | R4 (legal) | — |

## Correcciones de contenido que el spec incorpora

1. ***Brand New Day* está ESTRENADA** (31 jul 2026, $2.42 B, 3ª más taquillera de la
   historia, dir. Destin Daniel Cretton). Es el capítulo cuatro, **no** un "próximamente".
   Esto invalida el supuesto inicial de una sección de cuenta regresiva.
2. **Disciplina de spoilers**: la identidad de Jean Grey y el final de BND no van en la
   página. Sólo premisa oficial y tagline.
3. **Ningún ID de tráiler está verificado** (YouTube bloqueado por política de red). Todos
   salen con `verified: false`, enlace de respaldo visible y aviso en dev.

## Conteos declarados (Gate 24)

| Métrica | `expected_count` |
|---|---|
| Issues de implementación | 16 |
| Películas en la capa de contenido | 7 |
| Capítulos renderizados | 4 |
| Tráilers embebidos | 7 |
| Secciones de página | 9 |

## Puerta G-spec

| Criterio | Resultado |
|---|---|
| Requirements definidos | ✅ 7 |
| Scenarios de aceptación definidos | ✅ 12 |
| Inventario de contenido verificado y con fuentes | ✅ `docs/CONTENIDO.md` |
| Límites de verificación declarados, no ocultos | ✅ IDs de tráiler y paletas |
| Aprobación | ✅ plan aprobado por el usuario |

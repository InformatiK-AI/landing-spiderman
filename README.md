# landing-spiderman

Landing page narrativa sobre las películas de Spider-Man de Tom Holland: cuenta
el arco de las cuatro solistas y da acceso a sus tráilers oficiales.

**Proyecto de fan, sin fines comerciales y sin afiliación con Marvel, Sony
Pictures ni Disney.** Todas las marcas y personajes pertenecen a sus titulares.
Los tráilers se reproducen desde los canales oficiales de YouTube mediante el
reproductor embebido: no se alojan copias. **Todo el arte de este sitio es
original**, hecho en CSS y SVG — no hay una sola imagen de las películas en el
repositorio.

## Stack

Next.js 15.5.25 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 ·
Framer Motion 12 · es-CL.

Tailwind v4 es **CSS-first**: el tema vive en `@theme` dentro de
`styles/theme.css` y **no existe `tailwind.config.js`**. El único config es
`postcss.config.mjs`.

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run check      # invariantes del proyecto (ver abajo)
npm test           # integridad de la capa de contenido
npm run verify     # typecheck + lint + check + build
npm run qa         # auditoría en navegador (requiere npm run start corriendo)
```

## Estructura

| Carpeta | Qué hay |
|---|---|
| `app/` | rutas, layout, fuentes, OG generada, sitemap, robots |
| `content/` | **todo** el texto es-CL y todos los datos, tipados |
| `components/art/` | arte original en CSS/SVG |
| `components/motion/` | primitivas de animación accesibles |
| `components/sections/` | las secciones de la página |
| `components/trailer/` | embed lite de YouTube y modal |
| `styles/` | `@theme`, base, texturas, keyframes |
| `qa/` | auditoría medida en navegador |
| `.king/` | artefactos del pipeline (generados) |
| `docs/` | brief, contenido verificado, sistema de diseño, pipeline |

## Cómo corregir un ID de tráiler

`content/trailers.ts` es **el único lugar del proyecto** donde aparece un ID de
YouTube; `npm run check` falla el build si aparece uno en otra parte. Para
corregir uno:

```ts
homecoming: {
  youtubeId: "AQUI_EL_ID_CORRECTO",   // ← una línea
  label: "Spider-Man: Homecoming — tráiler oficial",
  verified: true,                     // ← al confirmarlo a mano
},
```

Al poner `verified: true` desaparecen solos el aviso de consola en desarrollo y
la nota visible en la tarjeta.

> ⚠️ **Los siete IDs están `verified: false`.** YouTube estaba bloqueado por la
> política de red del entorno donde se construyó esto (`403 CONNECT`), así que no
> se pudo abrir ni un video para confirmarlo. Los IDs vienen de búsqueda web con
> verificación cruzada ID↔título, lo que confirma el par pero **no la propiedad
> del canal** — y hay canales de fans usando títulos casi idénticos. **Hay que
> abrir los siete una vez.**

## Invariantes (`npm run check`)

Cinco reglas que ni el compilador ni ESLint pueden expresar, y que fallan el
build en CI:

1. Nada de `<motion.*>`: `LazyMotion` corre en modo `strict` y sólo se usa
   `<m.*>`, que es lo que mantiene el bundle de animación en ~18 KB en vez de ~34.
2. **Cero archivos binarios versionados.** `.gitignore` deliberadamente no cubre
   imágenes, para que cualquier raster aparezca en el diff.
3. Los IDs de YouTube sólo en `content/trailers.ts`.
4. Ninguna rama por slug de película en componentes: una sola plantilla.
5. Los `<iframe>` sólo en `components/trailer/`, y sólo tras una interacción.

## Presupuesto y accesibilidad

Medido, no declarado. Resultados en [`.king/qa.md`](.king/qa.md):
LCP **180 ms**, CLS **0.0000**, **0** peticiones a terceros antes de interactuar,
**0** violaciones de axe-core, **0px** de desborde horizontal a 390/768/1440,
135 KB de first-load JS (techo 145).

### Colores prohibidos para texto

Es una regla, no una sugerencia — el problema clásico de una paleta roja y azul
es que los colores de marca no pasan contraste:

| Token | Ratio sobre `ink-900` | Uso |
|---|---|---|
| `--color-web-blue-500` | 2.59:1 | ❌ nunca texto, sólo fondo |
| `--color-web-red-700` | bajo | ❌ nunca texto |
| `--color-ink-500` | bajo | ❌ nunca texto sobre `ink-900` |
| `--color-web-red-500` | 4.26:1 | ⚠️ sólo display ≥24px bold |

Texto rojo pequeño usa `--color-web-red-300` (6.3:1). El anillo de foco es
naranja portal, porque uno rojo sobre esta paleta sería invisible.

### `prefers-reduced-motion`

Respetado en cuatro niveles: red de seguridad CSS global, `MotionConfig
reducedMotion="user"`, gates **estructurales en CSS** (`motion-reduce:`) donde el
problema es el layout y no la animación, y las variantes de utilidad de v4.
**Ninguna información existe sólo en la versión animada.**

## Pipeline

Desarrollado con el pipeline **kingx** de 8 etapas. Ver
[`docs/PIPELINE.md`](docs/PIPELINE.md), que incluye el registro honesto de qué
parte se ejecutó con la herramienta y qué parte a mano, y por qué.

## Documentación

- [`docs/BRIEF.md`](docs/BRIEF.md) — el brief que gobierna el proyecto
- [`docs/CONTENIDO.md`](docs/CONTENIDO.md) — inventario verificado con fuentes y límites declarados
- [`docs/DESIGN.md`](docs/DESIGN.md) — sistema de diseño, el hook elegido y las dos alternativas descartadas
- [`docs/PIPELINE.md`](docs/PIPELINE.md) — las 8 etapas

# Sistema de diseño

## Tipografía

| Rol | Fuente | Por qué |
|---|---|---|
| Display | **Anton** 400 | Condensada, tipo póster. Se elige sobre Bebas Neue porque tiene cobertura `latin-ext` real: esta página grita `¿QUÉ PASÓ?` en mayúsculas y Bebas tiene soporte pobre de diacríticos. |
| Texto / UI | **Inter** variable 400–700 | Legibilidad en párrafo, `tabular-nums` para cifras, buen `latin-ext`. |
| SFX | **Bangers** 400 | Sólo en `SfxBurst`. `preload: false` — aparece bajo el pliegue. |

Se cargan con `next/font/google`, que las self-hostea en el build: **sin peticiones a
`fonts.googleapis.com`**. `adjustFontFallback: true` hace que Next calcule
`size-adjust`/`ascent-override` en la `@font-face` de respaldo, así el swap de Anton no
mueve el titular → **CLS del hero ≈ 0** usando `display: "swap"`.

## Color

Los tokens se derivan de los trajes. Valores en `docs/CONTENIDO.md` (y son aproximaciones:
no existen hex oficiales publicados).

### Colores prohibidos para texto

Esto es una regla, no una sugerencia — el problema clásico de una paleta roja/azul es que
los colores de marca no pasan contraste:

| Token | Ratio sobre `ink-900` | Uso permitido |
|---|---|---|
| `--color-web-blue-500` `#1A4FB4` | **2.59:1** | ❌ nunca texto. Sólo fondo/gráfico. |
| `--color-web-red-700` `#8E1216` | bajo | ❌ nunca texto. |
| `--color-ink-500` `#5A5A6B` | bajo | ❌ nunca texto sobre `ink-900`. |
| `--color-web-red-500` `#E62429` | 4.26:1 | ⚠️ sólo display ≥24 px bold (supera el 3:1 de texto grande). |

### Pares aprobados

| Par | Ratio |
|---|---|
| `ink-050` / `ink-900` | ≈18:1 |
| `ink-950` / `paper-500` | ≈16:1 |
| `ink-300` / `ink-900` | ≈8.9:1 |
| `iron-gold-400` / `ink-900` | 7.96:1 |
| `web-blue-300` / `ink-900` | 7.1:1 |
| `web-red-300` / `ink-900` | 6.3:1 |

Texto rojo pequeño usa `web-red-300`, nunca `web-red-500`.

### Foco

`outline: 3px solid var(--color-portal-300); outline-offset: 3px` — naranja portal, que
contrasta contra el rojo, el azul y el negro por igual. Un anillo de foco rojo sobre paleta
roja es invisible; de ahí la elección.

## Tailwind v4 — diferencias con v3 que importan

Casi todo el material de referencia disponible es de v3. Esto es v4:

- **No existe `tailwind.config.js`.** El único config es `postcss.config.mjs` con
  `@tailwindcss/postcss`.
- `@tailwind base/components/utilities` ya no se usa: es `@import "tailwindcss";`.
- El tema se declara con `@theme { --<namespace>-<name>: value }` y Tailwind genera la
  utility **y** la CSS var a la vez.
- Variantes propias con `@custom-variant`, utilities con `@utility`.
- `theme()` se reemplaza por `var(--...)`.
- El espaciado se deriva de un único `--spacing`, así que `p-13` y `mt-27` funcionan sin
  configurar nada.
- `motion-safe:` / `motion-reduce:` son **built-in**.

## Textura de cómic

- **Ben-day**: dos capas de `radial-gradient` (rojo y azul) de 6×6 px con desfase de 3 px →
  roseta de impresión, no una grilla. `mix-blend-mode: screen`, opacidad .5.
- **Halftone fade**: `mask-image: linear-gradient(to bottom, #000 0%, transparent 70%)`
  sobre la capa de puntos.
- **Grano de papel**: `feTurbulence` como data-URI SVG inline — sin archivo extra, sin
  petición.
- **Telaraña de fondo**: `repeating-conic-gradient` (radios) + `repeating-radial-gradient`
  (arcos). Las telarañas "de verdad" del hero son SVG con `vectorEffect="non-scaling-stroke"`.
- **Viñeta**: borde de 3 px y `box-shadow` duro, `border-radius: 2px`. El cómic impreso no
  tiene esquinas redondeadas.

`mix-blend-mode` y `mask-image` en capas grandes **no se animan nunca** — fuerzan repaint de
toda la capa. Son estáticos; lo que se mueve va encima.

## Lenguaje de movimiento

```
DUR     instant .12 · fast .2 · base .32 · slow .52 · epic .8
EASE    snap   cubic-bezier(.2,0,0,1)      — entradas decididas
        thwip  cubic-bezier(.16,1,.3,1)    — el disparo de telaraña
        swing  cubic-bezier(.65,0,.35,1)   — balanceo
SPRING  pop    {stiffness 300, damping 24} — respuesta al usuario
        settle {stiffness 200, damping 26} — llegada del titular
        drift  {stiffness 60,  damping 20} — parallax suavizado
STAGGER tight .04 · base .06 · loose .1 · lines .08
```

Reglas:

- **Dirección narrativa**: el contenido entra desde abajo (`y: 16 → 0`); lo que sale se va
  hacia arriba. El scroll es "avanzar en el cómic".
- **Distancias cortas**: máximo 24 px de desplazamiento. Más se siente lento aunque dure lo
  mismo.
- **Stagger con techo**: `.06` y máximo 8 hijos; con 9 o más se agrupa (la última tarjeta no
  puede esperar 900 ms).
- **Entradas `once: true`**: nada se re-anima al volver a subir. Repetir es ruido.
- **Spring para lo que responde al usuario**; duración + ease para lo que narra.
- **Scroll-linked nunca lleva spring sobre `opacity`** (parpadea al invertir dirección).

## El hook — «se abre el portal» (elegido)

Todo el viewport es el interior de un anillo de portal. Cuatro capas: gradiente radial
naranja-chispa → negro; silueta del skyline de NY **recortada dentro** del círculo que hace
de boca del portal; el `<h1>` al frente, cruzando el borde; ben-day + grano. Detrás, "el
nombre que nadie recuerda" está escrito como un muro de tags casi ilegible en `ink-800` — y
el titular lo tapa.

```
TRES PELÍCULAS · UN MISMO CABRO DE QUEENS
NADIE IBA A RECORDAR SU NOMBRE.
ASÍ QUE SE LO JUGÓ TODO.
```

Secuencia: `0 ms` negro con grano → `80–600 ms` el portal abre con
`clip-path: circle(0% at 50% 58%) → circle(78%)`, `ease-snap`, y arrancan las chispas
(CSS puro, 12 spans con `animation-delay` escalonado) → `320–900 ms` el titular entra por
líneas desde `y: 110%` dentro de un contenedor `overflow-hidden`, stagger 80 ms, spring
`settle`; la segunda línea llega 140 ms después → `900–1100 ms` subtítulo y CTAs.

Al scrollear: skyline `y: 0 → 18%`, titular `y: 0 → -12%` y `opacity: 1 → 0`, portal
`scale: 1 → 1.25`. El portal se traga la pantalla y entrega la sección siguiente —
continuidad narrativa, no un corte.

### Por qué este y no los otros dos

1. **El LCP es texto del servidor, no una imagen.** El `h1` pinta en el primer frame
   posible; el portal es un `clip-path` sobre una capa ya compuesta.
   Medido: LCP a **164 ms**. El elemento LCP concreto resulta ser el muro tipográfico
   decorativo del hero y no el `h1`, porque su área es mayor — se deja así en lugar de
   deformar el diseño para ganar la métrica: sigue siendo texto venido del HTML del
   servidor, que es lo que hace que pinte de inmediato.
2. **Planta un motivo que se paga después** en `MultiversePortal`. Los otros dos son trucos
   autocontenidos.
3. **El copy hace el trabajo pesado**: "nadie iba a recordar su nombre / así que se lo jugó
   todo" es una apuesta emocional específica, y el muro ilegible de fondo la vuelve literal.
4. **Degrada limpio**: con reduced-motion queda portal abierto, titular compuesto, fade de
   200 ms — sigue siendo un buen hero estático.

### Alternativas descartadas (disponibles para cambiar)

**A — «La decisión»**: pantalla partida en dos mitades verticales, papel crema con ben-day
azul a la izquierda y negro con telaraña roja a la derecha; el `h1` cruza la costura y cada
glifo se tiñe según el lado, con dos copias del texto y `clip-path` complementario. Al
scrollear la costura se desplaza y la oscuridad se come el papel.
Copy: `ERA SOLO UN CABRO CON UNA CÁMARA` / `HASTA QUE EL MUNDO LE PIDIÓ TODO`.
Se descarta porque su idea **es** el movimiento: sin animación pierde el chiste visual.

**B — «¿Cuántos Peter Parker?»**: titular centrado con tres copias desplazadas en rojo,
cian y blanco que **convergen** al entrar, disparando un `¡THWIP!`; detrás, tres siluetas
desfasadas.
Copy: `¿CUÁNTOS PETER PARKER CABEN EN UNA SOLA HISTORIA?`.
Se descarta porque la convergencia invita a esperar antes de leer (peor para los primeros
dos segundos) y porque plantea una pregunta de trivia en vez de una apuesta emocional.

## Orden de secciones y por qué

Tres decisiones deliberadas contra la estructura obvia:

1. **Las apariciones de conjunto no tienen sección propia.** Como sección son débiles: sin
   arco ni tráiler que justifique el peso. Van como **nodos menores de la cronología**, lo
   que convierte relleno en el mecanismo de orientación.
2. **El momento multiverso es la transición de salida del capítulo 3**, no una sección
   hermana: narrativamente es el clímax, no un ítem de lista.
3. **Las cifras van después de los trajes**: emoción → emoción → evidencia → futuro. Los
   números son el argumento de autoridad que cierra el pasado.

Orden final: `Hero` → `WhoIsPeter` → `Timeline` → `FilmChapter` ×3 → `MultiversePortal` →
`FilmChapter` (BND) → `SuitGallery` → `LegacyStats` → `SiteFooter`.

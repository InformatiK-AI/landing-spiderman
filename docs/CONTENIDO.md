# Inventario de contenido (verificado)

> Investigación hecha el 2026-09-13. Cada dato lleva su estado de verificación.
> Regla del proyecto: lo no verificable se marca y se omite antes que inventarse.

## ⚠️ Límite de verificación de este entorno

**YouTube está bloqueado por la política de red de la sesión**: `www.youtube.com:443`
devuelve `403 CONNECT` (el log del proxy lo registra como *policy denial*). No se pudo
llamar al endpoint oEmbed ni cargar ninguna página de video.

Consecuencia: **ningún ID de tráiler pudo verificarse por máquina.** Los IDs de la tabla
de abajo vienen de búsqueda web con verificación cruzada del par ID↔título, lo que
confirma que el ID corresponde a ese título, pero **no confirma la propiedad del canal**.
Todos se marcan `verified: false` en `content/trailers.ts` hasta que alguien con acceso
los abra una vez.

La investigación advirtió explícitamente que hay canales de fans y de "concept trailers"
usando títulos casi idénticos (`qwch4inqwKc`, `c5t4R0sqEm4`, `SVSH3CxR3Po`, `aBlsrtxuwss`,
`aEL2ZDcLT24`, `Tt5F0DQoWJA`, `u4npZvN1YG0` — **no embeber ninguno de esos**).

## Inventario de películas

| # | Película | Estreno | Director | Duración | Taquilla mundial | RT | Rol |
|---|---|---|---|---|---|---|---|
| 1 | Captain America: Civil War | 6 may 2016 | Anthony y Joe Russo | 147 min | $1.155 B | 90% | conjunto |
| 2 | **Spider-Man: Homecoming** | 7 jul 2017 | Jon Watts | 133 min | ~$880 M | 92% | **solo 1** |
| 3 | Avengers: Infinity War | 27 abr 2018 | Russo | 149 min | ~$2.05 B ⚠️ | 85% ⚠️ | conjunto |
| 4 | Avengers: Endgame | 26 abr 2019 | Russo | 181 min | ~$2.799 B | 94% | conjunto |
| 5 | **Spider-Man: Far From Home** | 2 jul 2019 | Jon Watts | 129 min | $1.131 B | 90% ⚠️ | **solo 2** |
| 6 | **Spider-Man: No Way Home** | 17 dic 2021 | Jon Watts | 148 min | $1.92 B | 92% ⚠️ | **solo 3** |
| 7 | **Spider-Man: Brand New Day** | **31 jul 2026** | Destin Daniel Cretton | 145 min ⚠️ | **$2.42 B** | 90% ⚠️ | **solo 4** |

⚠️ Cifras con fuentes en conflicto: Infinity War aparece como $1.965 B (prensa de
mitad de recorrido) y ~$2.05 B (total de por vida); su RT como 85% y 88%. Far From Home
RT 90% / 92%. No Way Home RT 92% / 94%. La duración de Brand New Day circula como 2h15,
2h24, 2h25 y 2h30 — **145 min (2h25) es la cifra de la BBFC y la que se usa**. La
afirmación de que es "la Spider-Man más larga" es falsa: No Way Home la supera con 148 min.

### Brand New Day — estado a septiembre 2026

**ESTRENADA.** No es una sección de "próximamente": es el capítulo cuatro.

| Campo | Valor |
|---|---|
| Estreno EE.UU. | 31 julio 2026 |
| Estreno LatAm / España | 29 julio 2026 |
| Título en español | **Spider-Man: Un Nuevo Día** |
| Presupuesto | $225 M |
| Taquilla mundial | **$2.42 B** ($928.8 M doméstico) al 12 sep 2026 |
| Récords | Spider-Man más taquillera de la historia · película más taquillera de 2026 · **3ª más taquillera de todos los tiempos** · 2ª más rápida a $2 B (3 fines de semana) · $1 B en 6 días |
| Tráiler | 718.6 M de vistas en 24 h; **primer tráiler de cine en pasar 1.000 millones de vistas** (en 4 días) |

**Antagonistas**: Jean Grey (Sadie Sink) como principal; Bill Metzger (Tramell Tillman),
jefe del Department of Damage Control; Scorpion / Mac Gargan (Michael Mando). Frank Castle
(Jon Bernthal) y Bruce Banner (Mark Ruffalo) son figuras moralmente ambiguas, no villanos.

**⚠️ Disciplina de spoilers — no va en la página:** la identidad de Sadie Sink como Jean
Grey es una revelación de mitad de película, y el final está ampliamente reportado.
La página usa sólo la premisa oficial y el tagline del tráiler.

**Premisa oficial**: Peter Parker combate el crimen a tiempo completo en un mundo que no
lo recuerda, y la presión de ver a sus amigos seguir adelante sin él desata un cambio en
él que quizá no pueda controlar.

**Tagline (tráiler 2)**: *"El mundo puede haber olvidado a Peter Parker, pero él no los ha
olvidado a ellos."*

## Antagonistas de la trilogía

| Película | Antagonista | Actor |
|---|---|---|
| Homecoming | Adrian Toomes / **El Buitre** | Michael Keaton |
| Far From Home | Quentin Beck / **Mysterio** | Jake Gyllenhaal |
| No Way Home | Norman Osborn / **Duende Verde** (principal) | Willem Dafoe |
| No Way Home | Doc Ock · Electro · Hombre de Arena · Lagarto | Molina · Foxx · Haden Church · Ifans |

## El arco emocional

La espina de toda la página es **el final de No Way Home**: Peter le pide al mundo que lo
olvide, arrienda una pieza en Queens y se cose a mano el traje clásico. Sin tecnología
Stark, sin Vengadores, sin nadie que sepa su nombre. Tía May dice *"un gran poder conlleva
una gran responsabilidad"* — la primera vez que la frase se pronuncia en el MCU, y lo
último que ella dice.

*Brand New Day* es la consecuencia directa: el único que recuerda a Peter Parker es Peter
Parker.

### Frases ancla por película

| Película | Frase | Quién |
|---|---|---|
| Homecoming | *"Si no eres nada sin el traje, entonces no deberías tenerlo."* | Tony Stark |
| Far From Home | *"La gente necesita creer. Y hoy en día, se creen cualquier cosa."* | Quentin Beck |
| No Way Home | *"Un gran poder conlleva una gran responsabilidad."* | Tía May |
| Brand New Day | *"El mundo puede haber olvidado a Peter Parker, pero él no los ha olvidado."* | tagline |

## IDs de tráiler (todos `verified: false`)

| Película | Canal inferido | ID | Confianza de la investigación |
|---|---|---|---|
| Homecoming | Sony Pictures Entertainment | `rk-dF1lIbIg` | Alta |
| Far From Home | Sony Pictures Entertainment | `Nt9L1jCKGnE` | Alta |
| No Way Home | Sony Pictures Entertainment | `JfVOs4VSpmA` | Media-alta |
| Brand New Day | Sony Pictures Entertainment | `8TZMtslA3UY` | Alta |
| Civil War | Marvel Entertainment | `dKrVegVI0Us` | Alta |
| Infinity War | Marvel Entertainment | `QwievZ1Tx-8` | Alta |
| Endgame | Marvel Entertainment | `TcMBFSGVi1c` | Alta |

"Confianza alta" significa que dos búsquedas independientes resolvieron el ID al mismo
título. **No significa verificado.** Cada uno necesita una apertura manual.

## Paleta de trajes (aproximaciones)

⚠️ **No existen valores hex oficiales publicados para ningún traje del MCU**, ni para el
rojo de la marca Marvel. Todo lo de abajo es aproximación derivada de la comunidad o de
muestreo de pantalla: sirve para una landing, no es canon citable.

| Traje / elemento | Valores |
|---|---|
| Rojo Marvel (marca) | `#EC1D24` (variantes `#ED1D24`, `#F0131E`) |
| Rojo clásico | `#D71920` · sombra `#B11313` |
| Azul clásico | `#2B3784` · realce `#447BBE` |
| Iron Spider | rojo `#B4202E` · oro `#D3AF37` |
| Sigilo (Night Monkey) | negro `#0B0B0D`→`#141619` · gris `#3A3F45`–`#5A6068` ⚠️ |
| Integrado (NWH) | `#BE1E1E` · `#0E1E2A` · `#F3F6F4` · oro `#D0A92C` |
| Casero final (NWH) | rojo `#A41420`–`#8E1118` · casi negro `#0A0D14` · hilo `#E8E2D6` ⚠️ |

### Motivos visuales recurrentes en el marketing

- **Telarañas** ancladas a una esquina; la retícula de líneas en relieve del traje.
- **Puntos ben-day / halftone** — textura de cómic impreso.
- **Glitch de multiverso / aberración cromática** — la firma de No Way Home y Brand New Day.
- **Siluetas del skyline de Nueva York** — "héroe pequeño, ciudad grande".
- **Color por película**: Homecoming cálido y dorado; Far From Home pasteles europeos más
  el verde-magenta de Mysterio; No Way Home dualidad azul frío / naranja; Brand New Day
  desaturado y a nivel de calle.

## Legalidad del embed

Embeber tráilers oficiales con el reproductor estándar de YouTube **está permitido**: los
términos de YouTube otorgan una sublicencia que un tribunal federal (SDNY) consideró que
cubre explícitamente el embedding cuando quien sube deja activada la opción de embed (el
valor por omisión en videos públicos). Sony y Marvel la dejan activada porque los tráilers
son material promocional. Dos condiciones: acceder **sólo** por el embed oficial (nada de
descargar y rehospedar) y no bloquear ni alterar el comportamiento del reproductor.

Se usa `youtube-nocookie.com` por higiene de privacidad.

**La alternativa riesgosa que se evita**: descargar y versionar pósters, fotogramas o
miniaturas. Son obras con copyright de Sony / Marvel y ninguna sublicencia de embed las
cubre — alojar los bytes es reproducción directa. El poster de cada tráiler en este sitio
es **arte generado**, no `i.ytimg.com/vi/{id}/maxresdefault.jpg`.

## Fuentes

Variety (taquilla de BND, $2B, Jean Grey, casting de Bernthal) · Deadline (2º más rápido a
$2B) · Forbes (RT de BND, récord de audiencia) · TIME (Jean Grey y los X-Men) · GamesRadar
(villanos de BND, duración de NWH) · Collider (duración de BND) · Marvel.com (tráiler
oficial y final) · Malay Mail (1.000 M de vistas en 4 días) · Box Office Mojo (Homecoming,
Far From Home, No Way Home) · Rotten Tomatoes · Statista · Copyright Lately (SDNY sobre la
sublicencia de embed) · BrandPalettes / SchemeColor / color-hex (paletas).

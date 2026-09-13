# Pipeline de desarrollo (kingx)

Este proyecto se desarrolla con el pipeline **kingx** de 8 etapas. Este documento describe
las etapas, sus artefactos y sus puertas, y registra con honestidad qué parte del pipeline
se pudo ejecutar con la herramienta y qué parte se ejecutó manualmente.

## Las 8 etapas

| Comando | Qué ocurre | Artefacto |
|---|---|---|
| `kingx init` | Crea el registry y la estructura del proyecto | `.king/registry.md` |
| `kingx spec` | Define requirements y scenarios (propuesta → aprobación) | `.king/spec.md` |
| `kingx tasks` | Descompone en tareas implementables, ordenadas | `.king/tasks.md` |
| `kingx build` | Implementa el código; marca tareas completadas | código + commits |
| `kingx review` | Revisión dual-blind: dos jueces ciegos reportan hallazgos | `.king/review.md` |
| `kingx qa` | Verifica la implementación contra los acceptance criteria | `.king/qa.md` |
| `kingx fix` | Aplica reparaciones si hay bloqueantes | `.king/fix.md` |
| `kingx ship` | PR, merge a `develop`, release tag | PR + tag |

## Comportamiento

- Cada comando consulta el engine (`kingx state`, `kingx gate`). **Nunca se asume la fase.**
- Los artefactos viven en `.king/` — son **generados**, nunca editados a mano.
- La verificación de conteos (tipo *Gate 24*) falla si cambia un `expected_count` sin
  actualizarlo explícitamente.

## Estado real de ejecución en este entorno

El CLI `kingx` **no está disponible y no se puede instalar aquí**:

- `which kingx` → no está en PATH; `pip show kingx` → no instalado.
- `pypi.org/simple/kingx/` → **404**. También `king-x` y `kingx-cli` → 404.
  Un paquete de control (`requests`) devuelve 200, así que PyPI sí es alcanzable:
  **el paquete no existe en PyPI**, no es un problema de red.
- `InformatiK-AI/kingx` → `you don't have access` (3 intentos), así que tampoco se puede
  leer el plugin desde el repo.

Por lo tanto las ocho etapas se ejecutaron **manualmente**, con los mismos artefactos, el
mismo orden y las mismas puertas, dejando cada resultado de puerta registrado en
`.king/registry.md`. La fase se lee de ese archivo antes de cada etapa en lugar de
consultar el engine.

**Qué se perdió respecto a ejecutar la herramienta de verdad:** las llamadas a
`kingx state` / `kingx gate`, y la verificación automática de conteos de *Gate 24* (se hace
a mano contra la tabla de `expected_count` del registry). Todo lo demás —las etapas, sus
artefactos, el gate de aprobación del spec, la revisión dual-blind, el QA contra
acceptance criteria— sí se ejecutó.

**Para migrar al CLI real:** hacer público `InformatiK-AI/kingx` (o conceder acceso al
workspace en `claude.ai/admin-settings/claude-tag`) y volver a correr el pipeline desde
`kingx init`. El plugin sólo se carga como plugin al **inicio** de sesión, así que hace
falta una sesión nueva.

## Desviación deliberada en `ship`

`kingx ship` hace PR + merge a `develop` + release tag. En este proyecto la etapa **se
detiene después del push** a `claude/sharp-knuth-m6z7e3`: el merge y el tag son acciones
difíciles de revertir y hacia afuera, y la instrucción vigente es desarrollar en la rama
designada y no abrir PR sin que se pida. El PR, el merge y el tag quedan a la espera de
una confirmación explícita.

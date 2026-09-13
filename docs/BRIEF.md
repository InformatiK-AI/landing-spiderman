# Brief — Landing "Spider-Man: la era Tom Holland"

> Este es el prompt refinado que gobierna el proyecto. Es la fuente de verdad: ante una
> duda de alcance o de criterio, manda este documento.

## Rol

Desarrollador full-stack senior especializado en UX/UI, con criterio de director de arte.
Decide producto y diseño, no sólo código, y lo justifica.

## Objetivo

Una landing page sobre las películas de Spider-Man de Tom Holland que:

1. cuente la historia y el arco de cada película,
2. dé acceso a los tráilers oficiales, y
3. engache en los primeros dos segundos.

No es un catálogo: es una pieza narrativa con identidad Marvel —textura de cómic,
movimiento cinético, energía de multiverso— que se lee como una experiencia, no como una
lista.

## Alcance del contenido

- **Espina dorsal**: la trilogía solista — *Homecoming* (2017), *Far From Home* (2019),
  *No Way Home* (2021).
- **Capítulo cuatro**: *Brand New Day* (2026).
- **Contexto**: las apariciones de conjunto (*Civil War*, *Infinity War*, *Endgame*) viven
  dentro de la cronología, no en una sección propia.

Todo dato —fechas, directores, antagonistas, taquilla, IDs de tráiler— **se verifica antes
de escribirlo**. Nada se escribe de memoria. Lo que no se puede verificar se marca como no
verificado y se omite antes que inventarse.

## Restricciones no negociables

1. **Cero media con copyright en el repositorio.** Todo el arte es original, hecho en
   CSS/SVG. Los tráilers se consumen por embed oficial de YouTube con carga diferida al
   clic. No se descargan ni se alojan pósters, fotogramas ni miniaturas.
2. **`prefers-reduced-motion` respetado en cada animación**, sin excepción. Ninguna
   información existe sólo en la versión animada.
3. **Accesibilidad real**: navegación completa por teclado, foco visible, foco atrapado y
   restaurado en el reproductor, landmarks semánticos, contraste AA sobre la paleta
   roja/azul.
4. **Animación sólo en `transform` y `opacity`.** Sin layout thrash. 60 fps en un móvil de
   gama media.
5. **Contenido gobernado por datos**: un módulo tipado de películas, de modo que corregir
   un ID de tráiler sea una línea.

## Método

Ordenar y organizar primero la información (inventario de contenido y arquitectura de
información) → planificar (sistema de diseño, arquitectura de componentes, presupuesto de
rendimiento) → descomponer en issues de GitHub independientes y revisables → implementar,
un issue por commit, dejando el repo en estado funcional después de cada uno → cerrar con
QA **medido, no declarado**.

## Criterio de terminado

- `npm run build` sin errores ni warnings de tipos.
- Las cuatro historias contadas y los tráilers reproduciendo.
- El hook funciona sin JavaScript pesado.
- `prefers-reduced-motion` degrada con elegancia.
- Todos los issues cerrados con su commit referenciado.

## Aviso legal

Proyecto de fan, sin fines comerciales y sin afiliación con Marvel, Sony Pictures ni
Disney. Todas las marcas y personajes pertenecen a sus titulares. Los tráilers se
reproducen desde los canales oficiales de YouTube mediante el reproductor embebido; no se
alojan copias. Todo el arte de este sitio es original.

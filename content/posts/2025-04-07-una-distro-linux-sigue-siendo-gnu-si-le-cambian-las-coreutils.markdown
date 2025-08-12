---
layout: post
title: "¿Una distro Linux sigue siendo GNU si le cambian las coreutils?"
date: 2025-04-07
categories: [Informativo, Linux]
tags: [ubuntu, gnu, rust]
image: /img/thumb/gnurust.jpg
---

Hola gente ¿Cómo están? espero que estén bien, con la no tan reciente noticia de que **Ubuntu** planeaba migrar de las coreutils de **GNU** a otras creadas en **Rust**, mucha gente se empezó a cuestionar si **Ubuntu** dejaría de ser GNU por ese pequeño detalle, en esta ocasión analizaremos la situación y los componentes del sistema Linux promedio, asi que sin mas que decir, comencemos.

Como dije en la introducción, El debate sobre si Ubuntu dejaría de ser una distribución **GNU/Linux** al reemplazar las **coreutils** de **GNU** por una implementación en **Rust** plantea una cuestión fundamental: ¿qué elementos hacen que un sistema operativo basado en Linux sea considerado una distribución **GNU/Linux**? Para responder esta pregunta, es crucial analizar la relación entre el sistema GNU y el kernel Linux, los componentes esenciales de una distribución típica y qué impacto real tendría la sustitución de un conjunto de herramientas fundamentales.

## **El sistema GNU y el kernel Linux**

Para entender qué hace que una distribución sea **GNU/Linux**, es necesario revisar la historia del proyecto GNU y su relación con el kernel Linux:

1. **El proyecto GNU** (iniciado en 1983 por Richard Stallman) tenía como objetivo desarrollar un sistema operativo completamente libre. Para ello, se crearon herramientas esenciales como el compilador **GCC**, la biblioteca estándar **glibc**, el intérprete de comandos **Bash** entre muchas utilidades fundamentales para la administración del sistema, incluso se planeaba que **Hurd** (lanzado en 1990), fuera su kernel, pero este no triunfó.

2. **Linux** (desarrollado en 1991 por Linus Torvalds) el cual es solo el **núcleo/kernel del sistema operativo**, o sea, el software que gestiona los recursos del hardware y proporciona una interfaz entre el hardware y el software de usuario.

Entonces, de aqui la tipica frase que a estas alturas es incluso un meme, el sistema operativo completo que la mayoría de la gente llama simplemente "Linux" es en realidad una combinación de ambos: **el kernel Linux junto con las herramientas del sistema GNU**. De ahí el nombre más preciso: **GNU/Linux**, como dato adicional, Richard stallman propuso el nombre Lignux, con G, para que sea facil de pronunciar y siga incluyendo a GNU, pero al final la gente siguió llamandolo simplemente Linux.

## **Componentes GNU en una distribución típica**

Una distribución **GNU/Linux** está compuesta por muchos elementos, pero entre los más importantes proporcionados por GNU están:

1. **Herramientas básicas de usuario**
- **GNU coreutils** (ls, cat, cp, mv, rm, etc.) 
- **GNU findutils** (find, xargs, locate)
- **GNU grep** (grep, egrep, fgrep) 
- **GNU sed** (sed, stream editor)
- **GNU awk** (gawk, procesamiento de texto)

3. **Intérprete de comandos y herramientas de scripting**
- **Bash** (Bourne Again SHell, el shell predeterminado en muchas distribuciones)
- **GNU Make** (Automatización de compilación) 
- **GNU Tar** (Herramienta de archivado)
- **GNU Diffutils** (diff, cmp, sdiff, etc.)

2. **Bibliotecas y compiladores**
- **glibc** (Biblioteca estándar de C utilizada por la mayoría del software en Linux)
- **GCC** (Compilador de GNU, fundamental para la construcción de software)
- **binutils** (Herramientas para ensambladores y enlazadores)
- **GDB** (Depurador de GNU)

4. **Otros programas esenciales**
- **GNU GRUB** (Gestor de arranque de la mayoría de las distribuciones)

Estos componentes han sido utilizados en la mayoría de las distribuciones GNU/Linux durante décadas. Sin embargo, hay algunas distribuciones que han optado por reemplazar ciertos componentes de GNU con alternativas modernas, muchas de ellas escritas en **Rust** o **C**.

## **¿Qué impacto tiene reemplazar GNU coreutils?**

El cambio específico que generó controversia es la decisión de **Ubuntu** de explorar alternativas en **Rust** para reemplazar las herramientas de GNU coreutils. Esto plantea la pregunta:

> **¿Sigue siendo una distribución GNU/Linux si se reemplazan las coreutils de GNU?**

La respuesta corta es **sí**. Para que una distribución deje de ser considerada GNU/Linux, tendría que **eliminar por completo la mayoría de los componentes clave de GNU**. incluso como vemos, hay componentes que son muchisimo mas importantes, como la libreria c que es fundamental y es la que da compatibilidad, si se cambiara la libreria C, podriamos decir que está mas cerca de no ser GNU.

Si se eliminara glibc, perdería compatibilidad con GNU. Un caso similar es Alpine Linux, que no incluye glibc por defecto y por ende no tiene compatibilidad con binarios de otras distros tradicionales, aunque se puede instalar fácilmente para recuperar compatibilidad. Solo en ese caso podría considerarse una distribución GNU/Linux, pero al menos de base, no incluye nada parecido.

Entonces, Cambiar las coreutils no es suficiente para afirmar que Ubuntu ya no es una distribución GNU/Linux.

### **Razones por las que Ubuntu seguiría siendo GNU/Linux**

1. **El sistema sigue dependiendo de otros componentes de GNU** 
- Ubuntu aún tendría que utilizar **glibc**, **GCC**, **Bash**, **GNU Tar**, **GNU Make**, etc.

2. **Las coreutils no son el único pilar del sistema GNU**
- Si bien coreutils proporciona comandos esenciales, su reemplazo por alternativas compatibles no cambia el hecho de que muchas otras herramientas críticas siguen siendo de GNU.
- Existen implementaciones alternativas de coreutils como **BusyBox** (usado en sistemas embebidos) o **Toybox** (usado en Android), y estos sistemas no dejan de ser basados en Linux por usarlas.

3. **No hay un requisito estricto que defina qué tan "GNU" debe ser una distribución** 
- Debian, Fedora y Arch también han reemplazado o modificado algunas herramientas GNU en ciertos casos sin perder su identidad como distribuciones GNU/Linux.

## **¿Qué haría que una distro ya no sea GNU/Linux?**

Para que una distribución deje de ser considerada **GNU/Linux**, tendría que reemplazar completamente los elementos fundamentales de GNU, como:

1. **Sustituir glibc por otra biblioteca C**
- Algunas distribuciones, como Alpine Linux o Chimera Linux, que usan **musl** en lugar de **glibc**

2. **Reemplazar Bash por otro shell predeterminado**
- Entre varias opciones tenemos **Ash** de busybox, **tcsh** o **zsh**, Aunque ninguna de estas tiene compatibilidad total con los scripts para bash y sus "bashismos", o sea codigo especifico de bash

3. **Eliminar GCC y reemplazarlo completamente por LLVM/Clang**
- Aunque muchas distribuciones permiten la compilación con Clang, aún incluyen GCC en sus repositorios.

4. **Eliminar completamente todas las herramientas GNU y reemplazarlas por alternativas no-GNU** 
- Esto ya sería más similar a un sistema tipo BSD o un sistema operativo completamente diferente.

Un ejemplo de un sistema operativo **no-GNU/Linux** sería **Android**, que usa el kernel Linux, que en realidad no está tan modificado, pero no depende del software de GNU, y fuera de que sus estructura impide una compatibilidad mas directa, si nos saltamos componentes de runtime, incluso a bajo nivel, sus binarios son totalmente incompatibles a menos que empecemos a incluir componentes.

## **Conclusión**

Reemplazar GNU coreutils por una versión escrita en **Rust** no hace que Ubuntu deje de ser GNU/Linux. La identidad de una distribución GNU/Linux se basa en el uso combinado del **kernel Linux y el software GNU en su conjunto**, no en una sola herramienta.

Para que una distribución deje de ser considerada GNU/Linux, tendría que eliminar completamente la mayoría de los componentes fundamentales de GNU, lo cual no es el caso de Ubuntu. Este tipo de cambios son parte de la evolución del ecosistema y reflejan el interés por mejorar la seguridad y eficiencia de las herramientas del sistema sin necesariamente abandonar sus raíces en GNU.

{{< youtube q-NaLcM9WT0 >}}

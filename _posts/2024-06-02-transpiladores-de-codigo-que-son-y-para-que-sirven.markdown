---
layout: post
title: "Transpiladores de código: ¿Qué son y para qué sirven?"
date: 2024-06-02
categories: Informativo Programación
image: /assets/img/thumb/transpiladores.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. Anteriormente ya hemos visto a los compiladores; que convierten el código fuente en código máquina, y a los intérpretes; que consiguen ejecutar el código fuente sin necesidad de una compilación previa.

Pero también hay algo muy común de ver, especialmente en programación web: los transpiladores, los cuales convierten código fuente en otro código fuente. Sí, suena raro, pero lo explicaré más adelante en el vídeo. Así que, sin más que decir, comencemos.

## ¿Qué son los transpiladores?

Como dije en la introducción, un transpilador (también conocido como "*source-to-source compiler*" (o compilador de código fuente a código fuente en español) es una herramienta que toma el código fuente escrito en un lenguaje de programación y lo traduce a otro lenguaje de programación, a diferencia de los compiladores tradicionales, que convierten el código fuente a código máquina.

## Funcionamiento

El funcionamiento básico en sí es bastante similar al de un compilador. Primero se analiza el código de manera léxica, sintáctica y semántica, se crea un árbol de sintaxis abstracta y luego, en base a eso, se genera un código objetivo. Doy más detalles en el [post de cómo funcionan los compiladores por dentro)]({% post_url 2024-01-11-como-funcionan-los-compiladores-por-dentro %})

## Utilidad

Ahora, ¿de qué nos sirve un transpilador? Aunque a primeras instancias puede sonar algo redundante, pues si ya existe un compilador, ¿por qué vas a andar pasando de código fuente a otro código fuente? Aunque para producción de programas de escritorio no suele ser muy usado, en otros ámbitos sí. Aquí algunos ejemplos:

El primero sería para **mejorar o especializar un lenguaje**. Esto se ve mucho en programación web, donde los navegadores solo soportan JavaScript. Pero, como es tremendo lenguaje, nadie quiere programar en él. Entonces, la mayoría programa en lenguajes como TypeScript, React o Svelte, pero el resultado termina siendo en JavaScript. Así, los programadores se facilitan un poco la vida y se genera código que entiende cualquier navegador moderno.

El segundo es por **migración de código**. En su día, cuando Python 3 era más nuevo, había un script llamado 2to3, que transpilaba código hecho en Python 2 a Python 3. Aunque era bastante generalista y necesitaba bastante mano, era una considerable ayuda para no corregir manualmente cosas repetitivas, como los cambios sintácticos que presentó Python 3.

El tercero es por **optimización**. Es muy raro de ver, pero existe un transpilador llamado Cython, que convierte código hecho en Python a código hecho en C. Aunque ciertamente genera código muy difícil de leer, si mantienes el código en Python y usas Cython para compilarlo, en teoría tendrías una ventaja de rendimiento. Además, al ser C, puede ser más portable.

Esos son los que yo considero los 3 principales motivos, y a su vez **ventajas**, que para resumir son:

- Facilita la adopción de nuevos lenguajes y características sin abandonar plataformas existentes.

- Puede mejorar la legibilidad y mantenibilidad del código.

- Ayuda en la migración entre diferentes versiones de un lenguaje.

Pero también tienen considerables **desventajas**, como:

- Introduce una capa adicional en el flujo de desarrollo, lo que puede hacer que la depuración sea una pesadilla.

- Dependencia a que el transpilador se mantenga actualizado para que no se quede desfasado en comparación con el lenguaje objetivo.

- Aunque bastante situacional, la dependencia a un transpilador genera que, aunque tu código esté bien, estás a la fe de que el compilador no tenga algún bug o agujero de seguridad, lo cual no debería ser problema si usas un transpilador en forma, pero es algo a considerar.

## Ejemplos de transpiladores

Finalmente, en ejemplos de transpiladores, aunque ya vimos varios en los motivos, tenemos:

- **Cython**: el cual traslada código hecho en Python a código hecho en C.
- Lenguajes como **TypeScript**, **Svelte**, **React** y los otros mil frameworks que trasladan a JavaScript.
- **c2rust**: el cual traslada C a Rust.

En GitHub hay una lista bastante completa de transpiladores, por si les interesa se llama "[awesome-transpilers](https://github.com/milahu/awesome-transpilers)" por Milahu.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/U_kLDdymx48?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
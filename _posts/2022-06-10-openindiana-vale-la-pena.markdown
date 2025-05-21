---
layout: post
title: "OpenIndiana: ¿Vale la pena?"
date: 2022-06-10
categories: Informativo
tags: [openindiana, unix]
image: /assets/img/thumb/openindiana.jpg
---

Hola gente, ¿cómo están? Espero que estén bien. En este video veremos a **OpenIndiana**.

OpenIndiana es un sistema operativo basado en **illumos**, que a su vez está basado en **Solaris**. Es más común verlo en servidores que en sistemas hogareños, esto principalmente por dos motivos:

1. Es más conocido en el ámbito profesional.  
2. Su catálogo de software no es tan amplio.

Pero, ¿qué pasa si por alguna razón se nos ocurre instalar OpenIndiana y usarlo como sistema del día a día?

En este video vamos a ver eso, así que sin más que decir, **¡empecemos!**

## Historia de OpenIndiana

El **Proyecto Indiana** fue originalmente creado por **Sun Microsystems**, para construir una distribución binaria alrededor de la base del código fuente de **OpenSolaris**.

El Proyecto Indiana fue dirigido por **Ian Murdock**, fundador de la distribución **Debian Linux**.

OpenIndiana se creó después de que se llevaran a cabo las negociaciones de adquisición de Sun Microsystems por parte de **Oracle**, con el fin de garantizar la disponibilidad continua y un mayor desarrollo de un sistema operativo basado en OpenSolaris, ya que era ampliamente utilizado.

La incertidumbre entre la comunidad de desarrollo de OpenSolaris llevó a algunos desarrolladores a formar planes tentativos para una bifurcación del código base existente.

Estos planes se materializaron tras el anuncio de interrupción del soporte para el proyecto OpenSolaris por parte de Oracle.

El anuncio formal del proyecto **OpenIndiana** se realizó el **14 de septiembre de 2010** en el **Centro JISC de Londres**.

La primera versión del sistema operativo se puso a disposición del público al mismo tiempo, a pesar de no haber sido probada.

> El motivo del lanzamiento no probado fue que el equipo de OpenIndiana fijó una fecha de lanzamiento anterior a **Oracle OpenWorld** para superar el lanzamiento de **Solaris 11 Express**.

El anuncio de OpenIndiana recibió una respuesta principalmente positiva. Sin embargo, no todos los informes fueron favorables. Algunos artículos en línea cuestionaron la relevancia de Solaris dada la penetración en el mercado de Linux.

Un artículo criticó el lanzamiento de OpenIndiana citando:

- La falta de profesionalismo con respecto al lanzamiento de una compilación no probada.
- La falta de compromiso del proyecto con un calendario de lanzamiento.

El lanzamiento inicial de OpenIndiana se anunció como **experimental** y basado directamente en la última versión de desarrollo de OpenSolaris, preliminar al lanzamiento de OpenSolaris 2010.


## Instalación

La instalación de OpenIndiana es bastante fácil. Hay **dos maneras** de instalarlo:

1. **GUI sencilla** de seguir.  
2. **Interfaz de comandos** guiada.

También se puede instalar de forma manual, pero es más complicado y probablemente no valga la pena.

## Gestión de paquetes

Los paquetes se instalan con el comando `pkg`. Ejemplos:

- Para instalar: `pkg install`
- Para eliminar: `pkg remove`
- Para buscar: `pkg search`

El catálogo de software de OpenIndiana, aunque algo cerrado, es **medianamente decente**. En su página se menciona que hay más de **5600 paquetes** disponibles.

## Entornos de escritorio

En cuanto a entornos de escritorio, no hay muchas opciones:

- **Mate** (incluye todos los programas de Mate).
- Utilidades de **X11**.
- No hay soporte para **Wayland**.

Otras herramientas de escritorio incluyen:

- **Compiz**
- **Dmenu**
- **Neofetch**
- **xscreensaver**
- **Qt**
- Iconos/temas de GTK necesarios

## Software disponible

### Aplicaciones gráficas

- Gnome Media Player
- Wine
- Terminology
- Urxvt
- Firefox
- Qt Creator
- Gnumeric
- AbiWord
- LibreOffice
- GIMP
- Inkscape

### Utilidades de consola y desarrollo

- CMake
- Python
- Navegador Links
- tmux
- zsh, sh
- Rust
- GCC
- Java OpenJDK
- nano, vim, emacs

A pesar de esto, gracias a los compiladores disponibles, se podrían compilar más programas, aunque eso supone un paso extra.

## Conclusión

Aunque tiene un catálogo de software que **no es muy pequeño**, sigue siendo **limitante**. Todo dependerá del software que uses. Es probable que te falte algo, aunque podrías compilarlo.

También puedes enfrentar problemas de **compatibilidad**, ya que no tiene una amplia gama de soporte de hardware. En mi caso, no tuve problemas usándolo en mi laptop.

Sobre la dificultad:  
No lo consideraría difícil, pero **tampoco fácil**. Con conocimientos básicos de sistemas **Unix-like**, se puede usar sin mucha complicación.
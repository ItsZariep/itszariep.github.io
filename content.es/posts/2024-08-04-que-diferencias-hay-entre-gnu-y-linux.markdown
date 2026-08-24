---
layout: post
title: "¿Que diferencias hay entre GNU y Linux?"
date: 2024-08-04
categories: [Informativo, Linux]
image: /img/thumb/gnulinux.jpg
---

¡Hola gente! ¿Cómo están?, espero que estén bien, como casi todos sabrán, los sistemas con Linux regularmente se llaman GNU/Linux, En este ocasión exploraremos la simbiosis entre GNU y Linux, desentrañando qué es cada uno y cómo se complementan para crear lo que conocemos como GNU/Linux, así que sin mas que decir, comencemos.

## Historia

Primero, para hablar de GNU/Linux primero debemos hablar de GNU, y para esto hay que ver la historia un poco por encima.

Y es que en En 1983, Richard Stallman, el padre del software libre, empezó el Proyecto GNU, con la visión de crear un sistema operativo completamente libre. GNU es un acrónimo recursivo que significa "GNU's Not Unix", y está inspirado en los principios del software libre, donde los usuarios tienen la libertad de usar, estudiar, modificar y distribuir el software.

El Proyecto GNU se centró en desarrollar una serie de herramientas y aplicaciones esenciales que serían libres y accesibles para todos.

Algunos ejemplos de herramientas son:

- **Compilador GCC** (GNU Compiler Collection)

- **Librería estandar C de GNU** (glibc)

- **Shell** (bash, bourne-again shell)

- **Coreutils** (que proporciona implementaciones de comandos estandar como ls, cp, mv, etc.)

Posteriormente, en 1990 se empezó a desarrollar el núcleo Hurd, que en principio podríamos decir que era uno de los pasos finales para el desarrollo del sistema operativo GNU.

No mucho tiempo después, En 1991, Linus Tolvards comenzó el desarrollo de Linux como proyecto personal, buscando un reemplazo gratuito similar a Unix, entonces, inspirándose fuertemente en Minix, creó las primeras versiones de Linux, para complementar, por que buscaba un reemplazo a Unix, hizo funcionar algunos programas conocidos como Bash o GCC, después de dar a conocer su proyecto, personas voluntarias ayudaron con el desarrollo del kernel.

## El kernel y los programas

El kernel, no solo en Linux si no en cualquier sistema operativo es un componente esencial que se encarga de la gestión de recursos, como la CPU, la memoria y los dispositivos de hardware. Sin embargo, por sí solo, no puede proporcionar una experiencia de usuario completa, ya que ni siquiera es arrancable.

Aqui es donde entra GNU, ya que para el tiempo donde se creó Linux, no había implementaciones mas conocidas que las de GNU, entonces, cuando se combinan GNU y Linux, forman un sistema operativo completo y funcional. GNU proporciona las herramientas y utilidades esenciales, mientras que Linux actúa como el núcleo del sistema.

## ¿GNU lo es todo?

Sin embargo, en un sistema moderno, GNU si bien sigue estando presente y provee componentes importantes como la shell y las core utils, no podríamos decir que está solo, por que actualmente se suele incluir un servidor grafico como X.org o Wayland, o un entorno de escritorio como Plasma, Xfce o Gnome.

Como curiosidad, este ultimo antes si formaba parte de GNU , sin embargo en el 2021 los proyectos se desligaron, haciendo que la separación sea mas marcada, asi que al menos en las decadas del 2000 y 2010, fuera mas marcado ya que Gnome con GTK siempre han sido una norma en el desarrollo de aplicaciones en Linux, superando a Qt por mucho, aunque igualmente es una opción muy popular.

Dejando de lado eso, también suelen tener otros componentes, pero en esencia estos son los mas importantes.

## Resumen

Entonces, resumiendo, Linux es el kernel, GNU el software base para que el sistema funcione y acompaña a otros componentes como el entorno de escritorio.

La mayoría de distribuciones populares como Ubuntu, Linux Mint, Manjaro, Fedora, etc. se consideran GNU/Linux por estas razones, aunque incluso no respeten al 100% la filosofía de estos componentes. Actualmente, es posible incluso tener un sistema usable sin, o casi sin nada de GNU, ya que se han desarrollado alternativas, pero no son la regla, si no que son la excepción, ya que el software especialmente propietario en Linux, se compila bajo glibc.

Igualmente, GNU no necesariamente tiene que estar en Linux, de hecho sus herramientas son muy populares en otros sistemas como los *BSD e incluso se pueden usar en Windows.

## Conclusión

GNU y Linux son compontes que trabajan en conjunto para formar un sistema operativo completo, a su vez, no es necesario que GNU esté con Linux o viceversa.

{{< youtube 67sF8veF1Lk >}}

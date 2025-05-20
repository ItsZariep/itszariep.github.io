---
layout: post
title: "¿Linux siempre es Linux? (Fragmentación y estándares)"
date: 2024-09-01
categories: Linux
tags: [appimage, glibc, gnu, kernel, linux]
image: /assets/img/thumb/linuxnosiempreeslinux.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. Seguro que la mayoría hemos escuchado cosas como "Linux siempre es Linux" o "todos los binarios de Linux son compatibles entre sí", lo cual, en principio, es cierto y no se puede negar. Sin embargo, al verlo más a fondo, parece más un sueño que una realidad. En esta ocasión, mostraré por qué Linux no siempre es Linux, los problemas de la fragmentación y por qué es imprescindible que existan estándares. Así que, sin más que decir, comencemos.

## Historia

Primero, viendo un poco la historia, en los principios de Linux, cuando ni siquiera había interfaces gráficas y las distribuciones eran contadas, todo era bastante sencillo. GNU era la norma, así que si construías un programa, era muy probable que funcionara en cualquier distribución. Igualmente, cuando llegaron las interfaces gráficas y Xorg a Linux, no hubo mayor problema.

## Toolkits

El primer inconveniente surgió con los entornos de escritorio, ya que había, o más bien hay (porque sigue ocurriendo), dos bandos. El primero es el de Gnome con GTK, heredado directamente de Gimp, y el segundo es el de KDE con Qt. En esas épocas, la integración no era la mejor, así que tanto los usuarios como los desarrolladores se encontraron en el dilema de si usar Gtk, Qt u otra cosa. También hubo otros toolkits menos populares, como Xforms, que originalmente usaba Xfce, FOX o FLTK, pero GTK y Qt fueron los más populares.

Además del toolkit, los entornos de escritorio hacían casi todo —como notificaciones, sonidos, entradas, etc.— a su manera, y todo era una pesadilla. Así que básicamente todos dijeron "ya basta, hay que ponernos de acuerdo", y así nació el proyecto FreeDesktop. FreeDesktop proporcionaba especificaciones para que estas cosas se usaran siempre de la misma manera, y así, aunque los escritorios sean técnicamente distintos, los desarrolladores pudieran programar sin tener que preocuparse mucho por eso.

## Nuevas tecnologías

Hasta aquí, todo bien: los entornos de escritorio conviven en paz y los desarrolladores, en principio, ya no se preocupan por eso. Sin embargo, debido al estancamiento de tecnologías, surgieron cosas como PipeWire o incluso Wayland, uno implementando un nuevo protocolo multimedia y el otro un nuevo protocolo de ventanas. Si bien son más modernos, tuvieron una adopción bastante lenta, aunque la de PipeWire no tanto.

Pero fuera de eso, hay un problema de fondo aún más grave que complica más la situación: la biblioteca C. Si bien hay otras, aparte de glibc, como Musl, estas no son estándar y casi nadie las usa, así que me centraré en glibc, que es la que usamos la mayoría.

## Diferencias de versiones de la librería C

Glibc es un software que se actualiza constantemente, y como casi cualquier biblioteca en Linux, esta no tiene compatibilidad hacia adelante. Es decir, si compilas un programa usando una versión nueva de glibc, este no se va a ejecutar en versiones viejas de glibc.

Esto evidentemente genera una serie de problemas, que como desarrollador se solucionan simplemente usando una versión vieja, pero no tanto, porque las versiones viejas de glibc no corrigen problemas, son vulnerables o no tienen características que sí tienen las nuevas. Así que, como guía, la mayoría prefiere usar la versión más vieja pero con soporte de Ubuntu LTS, por ejemplo, al momento de grabar este video, Ubuntu 20.04.

Esto es importante de aclarar, especialmente para advertir sobre cosas como Alien, que presume de convertir varios tipos de paquetes. Aunque esto no tiene nada de malo, hay que tener en cuenta que, por ejemplo, Arch Linux suele tener una versión más avanzada de glibc que Debian, así que si convertimos en esta dirección, el programa no va a funcionar.

## Paquetería

Ya que estamos, los gestores de paquetes, si bien también generan fragmentación, no es tanta, puesto que los que empaquetan suelen ser los propios mantenedores de las distribuciones, así que los desarrolladores no se preocupan tanto. Además, para desarrolladores que quieren distribuir su software de manera universal, ya existen formatos como AppImage, aunque dependiendo de cómo se haga este AppImage, dependerá en mayor o menor medida de las bibliotecas del sistema. Cuanto menos dependa de estas, el AppImage se vuelve más pesado.

## Conclusión

Podría seguir con otros ejemplos, como los distintos manejos de la red o de los dispositivos de entrada, pero al final llegaríamos al mismo punto.

Como conclusión, tenemos que la diversidad puede ser un arma de doble filo que, en el peor de los casos, provoca fragmentación, siendo esta una desventaja para los desarrolladores al no saber qué usar exactamente y, por ende, también para los usuarios, que se ven en la necesidad de configurar cosas extra o de tener que elegir quedarse en un bando.

Por estos motivos, el que haya estándares como FreeDesktop es una potente ventaja, ya que, aunque haya distintas implementaciones, si estas respetan estos estándares no hay mayor problema. ¿Y ustedes, qué opinan acerca de este tema? ¿Proponen algo para evitar la fragmentación? Déjenme su opinión en los comentarios. Eso fue todo, ¡adiós!

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/0hDXDP86vB4?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
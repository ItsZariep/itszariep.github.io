---
layout: post
title: "Kolibri, un sistema operativo ligero y curioso"
date: 2022-02-24
categories: Informativo
image: /assets/img/thumb/kolibrios.jpg
---

Hola gente, como están? Espero que estén bien, en este video vamos a ver a kolibri, kolibri es un sistema operativo escrito enteramente en ensamblador, y que se centra en el uso en PCs patata de bajos recursos, aunque el sistema es independiente, en la pagina dice que se basa en el código de MenuetOS.

## Requisitos

los requisitos mínimos de Kolibri son 8mb de memoria RAM, procesador 5x86 Pentium, AMD o Cyrix sin MMX a 90Mhz y una tarjeta de video que soporte 640x480 16 bits, o VESA, la iso de Kolibri pesa 100Mb.

## Software

Kolibri viene con un catalogo de aplicaciones preinstaladas en las que se incluyen cosas básicas como procesador de textos, visor de imágenes, editor grafico, navegador de internet, y algunos juegos, soporta fat16/32 para lectura y escritura, y NTFS y Ext2/3/4 en solo lectura, esto del software es muy importante de aclarar ya que en Kolibri no se puede instalar software externo, y tendremos que conformarnos con lo que tiene.

Los programas que a mi opinión mas destacan son DosBox, que nos permitirá ejecutar software viejo de MSDOS, y el navegador de internet.

En su menu hay varias cosas, entre ellas, en su centro de juegos encontrábamos un montón de cosas entretenidas como Doom o Quake, y demás juegos

## Experiencia

Aunque los requisitos mínimos de Kolibri son 8mb, no son óptimos, para usar el sistema sin navegar por internet, lo optimo serian 32 o 64mb de RAM, pero para navegar por internet serian mejor 256 o 512mb de RAM

hablando del navegador de internet, es un navegador bastante simplón, pero que si tienes poquita RAM, el navegador, se cierra, aquí el resumen de paginas funcionando con 256mb de RAM

Google y DuckDuckGo abren pero no dejan buscar
Facebook abre pero no deja iniciar sesión 
Wikipedia abre pero se cierra al abrir un articulo
Twitter abre pero no deja iniciar sesión 
Youtube no abre, y solo se abre el gestor de descargas muchas veces

Como podemos ver, navegar por internet en Kolibri no es de una manera muy optima que digamos, y aunque esta NetSurf, cuando quería probarlo no me abría ninguna pagina web, y solo se veía una pantalla rara de inicio de sesión

## Conclusión

KolibriOS es un sistema curioso cuanto menos, y es interesante que inicie con tan poca RAM, aunque no es una buena experiencia con los 8mb de RAM que indica en su pagina web, una buena experiencia seria con 32 o 64mb de RAM si no usaras internet, y 256 si piensas usarlo, aunque igual no es la mejor experiencia, con 512mb ya tirarías a algo como NetBSD, y con 1gb ya puedes un Linux o BSD con un entorno ligero.
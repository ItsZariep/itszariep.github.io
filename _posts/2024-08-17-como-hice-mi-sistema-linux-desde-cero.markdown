---
layout: post
title: "¿Como hice mi sistema linux desde cero?"
date: 2024-08-17
categories: Linux
tags: [linux, kernel, pacman]
image: /assets/img/thumb/milinuxcero.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. En un [post anterior]({% post_url 2024-07-29-que-componentes-tiene-un-sistema-linux-explicado-desde-cero %}) mostré qué componentes necesita un sistema operativo desde cero para funcionar. Sin embargo, no mostré uno en la práctica, así que voy a mostrar cómo yo, personalmente, hice y cómo tengo montado mi sistema Linux desde cero. Así que, sin más que decir, ¡empecemos!

## Contexto inicial

Primero que nada, en el tiempo que armé el sistema, me había comprado un SSD, así que iba a aprovechar esa oportunidad para armarlo ahí. Por lo tanto, el entorno chroot lo crearé en la raíz del SSD para que, cuando termine, simplemente lo arranque.

## Paquetes

Entonces, lo primero que hice fue crear un repositorio de `pacman`, porque en mi sistema yo quería usar Pacman pero con los paquetes compilados especialmente para mi PC. De paso, así me podía ahorrar el tener que escribir los PKGBUILDs, y en vez de eso podría usar varios de Arch Linux, aunque no todos. Después verán por qué.

## Preparar la base

Primero compilé los paquetes base, como la librería C, que en los tiempos donde armé la distro pude hacer compilaciones con Musl, con variables de entorno y modificando un poco los PKGBUILDs. Sin embargo, luego migré a glibc.

Entonces, para la base, solo eran necesarias herramientas de compilación, el propio Pacman, util-linux, y alguna que otra cosa mas. No recuerdo con exactitud cuántos paquetes eran, pero estoy seguro de que eran menos de 50. En este punto, en la base no estaban ni el init ni el bootloader.

Después de eso, en este caso específico, para poder crear la base en el chroot, simplemente usé el paquete pacstrap, modificando el pacman.conf para que en vez de usar los repositorios de Arch o Artix, que era lo que antes usaba, utilizara el repositorio local, que no es tan difícil de crear.

## Preparar el primer arranque

Luego de hacer esta base, si bien no podía arrancarla, ya podía entrar con chroot y mover varias cosas. Ahora lo que tocaba era escoger un bootloader y un init. En mi caso personal, como me gustan las cosas minimalistas y estas compilaciones las estaba haciendo con un Core2Duo e8600 que no es especialmente rapido para estas cosas, escogí `syslinux` como bootloader y `busybox` como init.

### Problemas menores con el init

Sobre esto último, evidentemente tuve que adaptar un par de servicios, pero nada complicado, puesto que el init de BusyBox y Runit son realmente parecidos, otro detalle es que a pesar de tener este init con elogind, algunos pkgbuilds me daban problemas por systemd como dependencia, asi que tengo un paquete fantasma de systemd que no tiene nada, ademas de que elogind y el systemd fantasma por obvias razones ya no están en conflicto como si pasa en Artix.

Fuera de eso, luego de meter todo lo necesario, como util-linux, las coreutils, BusyBox, etc., ya podría arrancar, o eso si tuviera un kernel. El kernel es lo único que no tengo como paquete, más que nada por flojera, pero no es nada del otro mundo, así que prosigamos.

## Interfaz gráfica

Ahora sí, con esto ya arrancaba el sistema, pero no tenía nada más allá del TTY. En esos tiempos aún usaba IceWM, después migré a Hyprland, donde solo duré un mes, y ahora uso Wayfire. Una cosa bastante random es que recuerdo que tuve un par de problemas con los seats en Wayland, cosa que se resolvía moviendo unos permisos de polkit que, sinceramente, no recuerdo.

Luego de esto, creo que ya no hay nada más que resaltar. "Quemando" el Core2Duo, simplemente compilé todos los programas que uso, exceptuando obviamente software que no puedo compilar, y ya fui feliz.

## Source Manager

Por último, para hacer toda esta locura, programé un Source Manager, que originalmente conseguía las fuentes directamente de una lista de repositorios git, así escogiendo si usar un PKGBUILD de Arch, de Artix o personal, con ese orden de importancia. Mientras que para actualizar hacía git pull por repositorio y, si había cambios, marcaba la actualización. 

Pero por temas de manejo de dependencias, ahora tengo descargados todos los PKGBUILDs de Arch y Artix (los personales no, porque ya estaban en mi PC), y así se sincroniza todo de manera más eficiente y el manejo de dependencias es más conciso.

## Conclusión

Mi sistema, como ven, no es nada del otro mundo. Simplemente agarré PKGBUILDs, hice un repo local e hice pacstrap en un entorno chroot, el cual era un SSD. 

Evidentemente, esto yo solo lo hago porque me gusta tontear y realmente no recomiendo hacer todo esto. Si quieren un sistema compilado a medida, quizás Gentoo con emerge sea más apropiado, o si no les importa mucho, incluso yo usaría Linux Mint. En mis laptops tengo Manjaro y OpenMandriva, ambos con Plasma Wayland, y ahí ni siquiera tengo cosas de desarrollo, porque las uso para otras cosas de manera perfecta.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/dPNxWXM239c?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
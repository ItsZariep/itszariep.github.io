---
layout: post
title: "¿Qué componentes tiene un sistema Linux? (explicado desde cero)"
date: 2024-07-29
categories: Informativo Linux
image: /assets/img/thumb/linuxdesdecero.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. En esta ocasión voy a mostrar los pasos y componentes necesarios para armar un sistema Linux desde cero.

## Aclaración inicial

Cabe recalcar de una vez que no me estoy refiriendo a cosas como Linux From Scratch, que con su nombre genérico arruina cada vez que alguien arma un Linux desde cero de manera distinta.

Con "Linux desde cero" me refiero a sencillamente armar un sistema Linux desde cero, independientemente de los pasos a seguir, incluso si es compilado o no. Así que, más que ser una guía de cómo hacerlo paso a paso, es más bien una documentación de qué es lo necesario para ese propósito, que por supuesto, cada quien puede adaptar a su manera. Así que, luego de esa importante aclaración, empecemos.

## 1. Kernel Linux

Primero que nada, para que sea un sistema Linux desde cero es obviamente necesario que tenga el kernel Linux. Entonces, lo primero es conseguir el kernel; este se puede obtener desde [kernel.org](https://kernel.org).

Opcionalmente, si lo prefieren, pueden aplicar parches, pero esto ya queda al gusto.

Es obvio, pero lo aclaro por si acaso: es necesario compilar el kernel. Lo más recomendable es usar banderas de compilación específicas del procesador; esto se puede hacer desde el menuconfig o cambiando el Makefile que suele estar en `arch/nombre de la arquitectura`, como x86, por ejemplo.

Por supuesto, pueden descargarse un kernel precompilado. No sé de dónde lo vayan a conseguir, pero es una opción válida, y la voy a omitir para los siguientes pasos, ya que aplica de igual forma.

## 2. Bootloader

Sin embargo, no se puede arrancar un sistema solo con el kernel. Si solo está el kernel en el disco duro, el sistema no lo va a detectar. Entonces, es necesario un bootloader. Los más populares son `GNU GRUB`, `elilo`, `rEFInd` (que es más moderno) o `Syslinux` (que es más clásico).

Fuera del bootloader y globalizando cualquier otro componente, si lo prefieren y saben de programación, podrían programar su propia alternativa, pero esto ya es más avanzado.

## 3. Init System

Continuando,luego de configurar el bootloader, si intentamos arrancar el kernel y pasamos del initramfs y/o initrd, nos daremos cuenta de que no tenemos un init, así que toca buscar un init. Al igual que el bootloader, cualquiera sirve mientras sea suficiente para nosotros. Algunos ejemplos son `Systemd`, `OpenRC` o `Runit`.

## 4. Librerías C

Sin embargo, el init ya es algo que se necesita ejecutar bajo una librería C, algo que no se ha escogido en este punto. Lo más común es `glibc`, pero también se puede escoger `musl` por ejemplo. En caso de estar en un sistema precompilado, casi de ley que será glibc.

## 5. Servicios Básicos

Dejando ese paréntesis, aunque tenemos un init, no tenemos realmente ningún servicio y el sistema aún no es booteable. Para tener el sistema booteable, necesitamos iniciar apropiadamente el VT/TTY. Para esto se necesita el `getty`, que podemos encontrar como parte de util-linux o proporcionado por `mingetty`.

## 6. Utilidades Básicas

Y Hablando de util-linux, con el VT/TTY funcional, no podremos hacer realmente nada sin cosas básicas como la shell, y tampoco podremos usar el sistema sin comandos básicos como `cp`, `mv`, `ls`, etc. Para esto necesitamos la shell y una toolbox.

Se puede escoger entre opciones variadas como las coreutils de GNU, BusyBox, etc. Además de esto, y para estar preparado, necesitamos algo que nos ayude a iniciar sesión y gestionar usuarios. Para esto, lo más común es `shadow`.

## 7. Gestor de Paquetes

Hasta aquí todo bien, pero si han puesto atención, no tenemos un gestor de paquetes, entonces aunque es realmente posible andar metiendo las cosas así sueltas, no es lo apropiado, así que antes de meter todas estas cosas básicas, lo más apropiado sería empaquetarlas usando algún gestor de paquetes, al igual que las otras cosas, realmente cualquiera ya existente como `pacman` o `dpkg` sirve.

## 8. Configuración Final

Finalmente, si configuramos el init, creamos un servicio del init que inicie el getty y tenemos los programas básicos, en principio, el sistema ya debería funcionar de una manera mínima. Después ya tocaría escoger opcionalmente el servidor gráfico como Xorg o Wayland, escoger si se quieren servicios de red como connman o NetworkManager, entre otros servicios.

## Conclusión

Bueno gente, esto fue todo, este ha sido un resumen de los pasos y componentes necesarios para armar un sistema Linux desde cero. Recuerden que este proceso puede adaptarse a sus necesidades y preferencias personales, y por ese mismo motivo no fui tan técnico y divagué mas de lo normal, espero que este vídeo les haya servido para empezar a experimentar y aprender más sobre cómo funcionan los sistemas con Linux en profundidad.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/vE6BC-NlKEQ?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
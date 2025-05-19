---
layout: post
title: "¿Qué es un bootloader?"
date: 2023-08-10
categories: [Informativo, "Sistemas Operativos"]
image: /assets/img/thumb/bootloader.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. En este video veremos qué es un bootloader o cargador de arranque. Este se encarga de iniciar nuestros sistemas de manera adecuada y cómoda, así que sin más que  decir, empecemos.

## Origen de los bootloader

Primero que es un cargador de arranque o bootloader y como se origina, como dije anteriormente, un bootloader es un programa básico que se encarga de arrancar un sistema operativo, los cargadores de arranque mas modernos pueden arrancar una diversa cantidad de sistemas operativos.

### Historia

Cómo todo en la computación, estos nacen a raíz de una necesidad, y es que en las épocas mas arcaicas de la computación, los sistemas operativos no eran tan complejos como los de hoy en día. 

Los primeros sistemas operativos se cargaban directamente desde medios físicos como tarjetas perforadas o cintas magnéticas. No había una necesidad inmediata de un bootloader separado, ya que el proceso de inicio era relativamente simple y estaba integrado directamente con el hardware.

Sin embargo, con el paso del tiempo, las computadoras se volvieron más sofisticadas y surgieron nuevas tecnologías de almacenamiento como discos duros y unidades de disquete, los cuales evidentemente almacenaban sistemas operativos bastante mas complejos, estos requerían un proceso más elaborado
para cargar el sistema operativo. Aquí es donde surgió la necesidad de un bootloader.

En la década de 1970, se desarrollaron los primeros sistemas operativos para computadoras personales y miniordenadores, como MS-DOS y CP/M. Estos sistemas operativos requerían una forma de iniciar el sistema desde los discos duros o disquetes para maximizar la facilidad de las computadoras.

El bootloader, se creó para cumplir esta función esencial. Su propósito principal era cargar el sistema operativo en la memoria RAM desde el dispositivo de almacenamiento seleccionado y transferir el control del procesador al código del sistema operativo.

Así, se permitía el inicio del sistema operativo completo, y el usuario podía interactuar con la computadora sin tener que pasar por procesos complejos. 

Con el tiempo, los sistemas operativos se volvieron más diversos y avanzados, simultaneamente aparecieron diferentes sistemas operativos, como Windows, macOS, distribuciones Linux, variantes de BSD, entre muchos otros.

Los cargadores de arranque se adaptaron para permitir a los usuarios elegir entre varios sistemas operativos instalados en una misma computadora, lo que se conoce como "dual boot" si solo son dos, o "multiboot" si son varios.

## Funcionamiento general de un bootloader

Primero, cuando se enciende el dispositivo, el procesador busca automáticamente una dirección de memoria predefinida para iniciar la ejecución. Esta dirección específica se conoce como "Entry Point" o "Punto de entrada" en español, y es donde se encuentra el bootloader. 

El bootloader suele ser un pequeño programa escrito en lenguaje ensamblador o en código máquina, lo que le permite ser lo más eficiente y compacto posible. Este código debe ser capaz de realizar tareas esenciales sin depender del sistema operativo ni de controladores de dispositivos más avanzados, ya que su objetivo es preparar el sistema para su inicio.

Una vez que el bootloader toma el control, realiza una serie de tareas fundamentales, como inicializar registros,
configurar dispositivos esenciales y establecer una configuración básica de la memoria, además, varios bootloaders modernos ofrecen opciones para que el usuario elija el sistema operativo que desea iniciar en caso de que haya varios instalados en el dispositivo. Para ello, el bootloader puede mostrar un menú en la pantalla o permitir la selección a través de comandos específicos.

Una vez que el bootloader ha realizado todas las tareas iniciales, su siguiente objetivo es cargar el kernel en la memoria RAM. El bootloader buscará el sistema operativo en un dispositivo de almacenamiento, como un disco duro o una unidad USB, en una ubicación específica conocida como "bloque de arranque" o "master boot record" (MBR) en el caso de sistemas basados en BIOS.

Algunos bootloaders modernos, tienen la capacidad de verificar la integridad del sistema operativo antes de cargarlo en la memoria RAM. Esto se realiza mediante comprobaciones de suma de comprobación o firmas digitales para garantizar que el sistema operativo no haya sido modificado o alterado de manera  malintencionada.

Una vez que el kernel se ha cargado en la memoria RAM, el control se traspasa al código del sistema operativo. Desde este punto en adelante, el bootloader deja de estar activo y su función ha terminado, a partir de aqui el kernel regularmente hace la llamada al init o su equivalente, y se inician demonios y drivers, pero esto ya es
otro tema. 

Aparte de todo esto, en los sistemas modernos con UEFI, el proceso de arranque es diferente al de los sistemas tradicionales basados en BIOS. En lugar de cargar un solo bootloader, UEFI puede cargar "bootloaders" más grandes y complejas que los bootloaders tradicionales.

Estos se conocen como EFI Boot Managers, son capaces de cargar sistemas operativos específicos, gestionar el inicio seguro y realizar otras tareas avanzadas, sin embargo, en la mayoria de sistemas UEFI modernos, es posible cargar el kernel sin requerir de un bootloader intermediario.

## Ejemplos de Bootloaders

En la actualidad, la gran mayoría de sistemas operativos cuentan con un bootloader que aprovecha las mejores características con cosas modernos, aquí algunos ejemplos:

**El Bootloader de Windows (Windows Boot Manager)**: El bootloader de Windows es el programa que gestiona el inicio de la gran mayoria de Windows modernos, no es tan capable pero esta diseñado especificamente para Windows.

**GRUB (GRand Unified Bootloader)**: GRUB es el bootloader mas popular y es altamente configurable,  se utiliza en muchos sistemas operativos basados en Linux. Es capaz de manejar arranques múltiples y ofrece una interfaz de línea de comandos y una interfaz gráfica para seleccionar el sistema operativo que se iniciará.

**Syslinux**: Syslinux es otro bootloader que se enfoca principalmente en sistemas operativos Linux. Proporciona opciones de arranque flexibles y eficientes, con soporte para arranque desde dispositivos USB, CD-ROM y otras unidades de almacenamiento, este es técnicamente mas limitado que grub y con características avanzadas en sistemas de archivos modernos puede dar problemas, pero para sistemas simples y comunes suele ser suficiente.

**rEFInd**: este es un bootloader para sistemas basados en UEFI. Ofrece una interfaz gráfica atractiva y es compatible con múltiples sistemas operativos y entornos, popularmente usado en macOS y Linux.

**Boot0** (boot easy): Este es un bootloader sencillo y eficiente usado por defecto un par de sistemas unix-like como FreeBSD u OpenIndiana, este generalmente ofrece opciones de arranque básicas. 

## Conclusión

El bootloader es un programa esencial en sistemas operativos modernos que permite iniciar el sistema operativo de forma apropiada, dar características avanzadas y permitir administrar el arranque de varios
sistemas operativos en la computadora.

https://youtu.be/Jgjz64H3BVc

<iframe width="560" height="315" class="ytvideo" src="https://youtu.be/Jgjz64H3BVc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
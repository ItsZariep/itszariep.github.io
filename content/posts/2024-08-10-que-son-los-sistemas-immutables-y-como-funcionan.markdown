---
layout: post
title: "¿Qué son los sistemas inmutables y cómo funcionan?"
date: 2024-08-10
categories: [Informativo, Linux]
image: /img/thumb/sistemasinmutables.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, en este post hablaré de las distribuciones inmutables, estas son un tipo de sistema operativo que ofrece una estructura de archivos raíz que no puede ser modificada durante la operación normal, pero daré mas detalles en después, así que sin mas que decir, empecemos.

## ¿Qué son?

Primero, como ya dije en la introducción, las distribuciones inmutables ofrecen un sistema donde la raiz no es modificable, esto implica que los archivos del sistema y la configuración base están protegidos contra cambios accidentales o malintencionados.

Entonces como es de esperar, los datos del usuario y las configuraciones específicas se almacenan en particiones o directorios separados que son de lectura y escritura Normalmente, estos datos se encuentran en /home para los datos del usuario y en /etc para las configuraciones del sistema, aunque las configuraciones exactas pueden variar entre distribuciones.

## Actualizaciones

Pero fuera de esto y mas interesante, son las actualizaciones:
Las actualizaciones del sistema se gestionan a través de imágenes completas del sistema o (snapshots). Esto permite realizar actualizaciones atómicas, lo que significa que toda la actualización se aplica como una sola unidad.

Cómo ventaja, si una actualización falla o causa problemas, es fácil revertir a una versión anterior del sistema sin complicaciones, utilizando un proceso de rollback.

## Seguridad

Hablando sobre seguridad, en teoría, al ser el sistema base inmutable, es mucho más difícil para los atacantes modificar archivos del sistema operativo para instalar malware o backdoors, aparte de esto que ya es básico, ;as políticas de seguridad, como SELinux o AppArmor, suelen estar integradas y activas para proporcionar una capa adicional de protección.

## Funcionamiento Interno

Primero, el sistema de archivos no suele ser tradicional, si no que normalmente se se aprovecha el uso de `OverlayFS`: Este sistema permite combinar múltiples sistemas de archivos en uno solo. Por ejemplo, un sistema de archivos de solo lectura para el sistema base y un sistema de archivos de lectura/escritura para las configuraciones y datos del usuario.

Aparte de OverlayFS, otras distribuciones utilizan `Btrfs`, que es un sistema de archivos moderno que permite crear snapshots de forma eficiente, en conjunto con `Snapper`, que es una herramienta que facilita la gestión de estos snapshots, permitiendo revertir a estados anteriores del sistema, un ejemplo de este uso es OpenSUSE Micro OS.

Después, sobre las actualizaciones, muchas usan OStree, esta es herramienta que se utiliza en algunas distribuciones, como Fedora Silverblue, para gestionar el sistema de archivos raíz como una colección de commits (similar a git por ejemplo). Cada actualización del sistema se maneja como un nuevo commit, permitiendo fácilmente revertir a versiones anteriores si es necesario, un ejemplo de este uso es Fedora Silverblue.

## NixOS

Además como una variante interesante está NixOS, el cual también es medio inmutable y utiliza un enfoque donde cada paquete y configuración está versionado y gestionado de manera declarativa. Esto significa que el estado del sistema está definido por un archivo de configuración y las actualizaciones se aplican como cambios en este archivo.

## Flatpak

Finalmente y fuera de NixOS, las distribuciones inmutables mas comunes como Micro OS suelen colgarse fuertemente de cosas como Flatpak, ya que es una fuente normalmente centralizada donde se puede conseguir software a nivel usuario.

{{< youtube 85AbrKyoAjo >}}

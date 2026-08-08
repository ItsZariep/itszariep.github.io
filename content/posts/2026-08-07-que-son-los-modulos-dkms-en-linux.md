---
layout: post
title: "¿Que son los Módulos DKMS en Linux?"
date: 2026-08-07
categories: [Informativo, Sistemas operativos]
tags: [linux]
image: /img/thumb/dkmslinux.jpg
---

Muchas distros al actualizarse compilan módulos DKMS, ¿pero qué son exactamente?

## Modulos "Normales"

Para entender los módulos dinámicos, primero hay que ver un módulo normal.

estos módulos normales se compilan para una versión específica del kernel, lo que causa que si por algún motivo cambias el kernel o lo actualizas, el módulo puede dejar de servir.

Esto ocurre porque los módulos del kernel dependen de la versión y de la configuración con la que fue compilado ese kernel. Por eso, un módulo que funciona correctamente en una versión determinada puede no ser compatible con otra. Estos módulos son relativamente comunes en sistemas *point releases* (Como Debian, Ubuntu o Fedora).

## Modulos dinámicos

Ahora bien, los módulos dinámicos del kernel, en vez de guardar únicamente el módulo ya compilado, guardan su código fuente y la información necesaria para volver a compilarlo, normalmente bajo `/usr/src`.

Después de esto debes compilarlo para el kernel que vas a utilizar, ya sea corriendo el comando `dkms` manualmente, o mediante un *hook* del gestor de paquetes, que es lo que normalmente pasa. De esta forma, el mismo código fuente puede utilizarse para generar un módulo compatible con diferentes versiones del kernel.

Entonces, cuando se instala o actualizas un kernel, DKMS detecta los módulos que tiene registrados y comprueba si ya existe una versión compilada para ese kernel:

- Si no existe, DKMS puede compilar el módulo utilizando los *headers* correspondientes a esa versión del kernel. Esto es especialmente útil cuando tienes varios kernels instalados, ya que puede mantener una copia del módulo compilada para cada uno de ellos.

- Si un kernel deja de estar instalado, dependiendo de cómo esté configurado el sistema y de los paquetes involucrados, DKMS también puede eliminar las compilaciones asociadas a ese kernel porque ya no son necesarias.

Después de que se recompilen los módulos para un kernel específico, DKMS los instala en el árbol de módulos de ese kernel, usualmente bajo `/lib/modules/<version>/updates/dkms`.

A partir de ahí, el sistema puede encontrar y cargar estos módulos de la misma manera que otros módulos externos del kernel. Es importante aclarar que DKMS no convierte estos módulos en módulos oficiales del kernel: simplemente automatiza su compilación e instalación fuera del árbol principal del kernel.

## Administración

Finalmente, para administrar los módulos manualmente se puede el comando `dkms`:

- `dkms status` para ver los módulos tienes registrados y para qué kernels están compilados.
- `dkms build` para compilar manualmente un módulo para un kernel específico
- `dkms install` para instalar una compilación en el árbol de módulos correspondiente.
- `dkms remove` para eliminar módulos registrados o sus compilaciones.

> `dkms` tiene mas funciones, estas son las basicas, recomiendo revisar las paginas man `dkms(8)` para mas información

## Funcionalidad practica

Gracias a DKMS es que, en sistemas *rolling release* como Arch Linux, paquetes del AUR (usualmente firmware) o hardware que no cuenta con soporte dentro del kernel principal pueden mantenerse funcionando mediante módulos DKMS.

Esto puede incluir drivers propietarios, módulos para hardware específico o antigüo, o proyectos que necesitan mantenerse actualizados conforme cambia el kernel (por ejemplo v4l2-loopback).

Un ejemplo conocido son algunos controladores de NVIDIA o módulos de hardware antiguo que se distribuyen fuera del árbol principal del kernel y Nvidia ya no mantiene (por ejemplo GPUs pre-pascal).


## conclusión
En resumen, DKMS no es realmente un tipo diferente de módulo: es un sistema que mantiene el código fuente de módulos externos y automatiza su recompilación para las versiones del kernel que tienes instaladas. Así, cuando actualizas el kernel, no tienes que compilar manualmente cada módulo desde cero.


{{< youtube xwVy8ibmtzs >}}
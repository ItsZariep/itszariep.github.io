---
layout: post
title: "¿Qué es Fuchsia OS y cual es su estado actual?"
date: 2025-08-05
categories: [Informativo, Sistemas operativos]
tags: ["fuchsia os", "Google"]
image: /img/thumb/fuchsiaos.jpg
---

Hola gente ¿Cómo están? espero que estén bien, en esta ocasión voy a hablar acerca de Fucsia OS; un sistema operativo alternativo credo por Google que tiene Linux y en su lugar usa otras cosas, analizando la estructura del sistema, su historia y su situación actual, asi que sin mas que decir, comencemos.

## ¿Qué es Fuchsia OS?

Comó dije en la introducción FuchsiaOS es un sistema operativo de código abierto desarrollado por Google desde 2016. A diferencia de Android o Chrome OS, no se basa en Linux, sino en un **microkernel propio** llamado **Zircon** (aunque antes se llamaba Magenta).

Fucsia se diseñó con el objetivo de ser altamente modular y funcionar en una gran variedad de dispositivos: desde dispositivos embebidos hasta celulares o PCs.

Oficialmente debutó como repositorio público en agosto de 2016, pero no fué hasta 2021 que su primera implementación productiva se realizó en el **Google Nest Hub** de primera generación,


## Arquitectura interna

La arquitectura de Fuchsia OS se puede organizar en cuatro capas:

### Zircon

Primero está el kernel o mas bien Microkernel llamado `Zircon`, el cual está hecho en C++ (con partes en C y ensamblador). Este [roporciona gestión de hilos, memoria virtual, IPC, drivers esenciales y sistema básico para arrancar.

### Garnet

Despues está Garnet, el cual ofrece servicios de dispositivo, gráficos (Escher), red, medios y gestión de paquetes/actualizaciones (Amber).

### Peridot

Despues está Peridot, que estiona el ecosistema modular. este también tiene submodulos:

- **Ledger**: almacenamiento distribuido de estado entre dispositivos, sincronizado vía cuenta Google.
- **Maxwell**: sistema modular de inteligencia artificial, incluye al asistente (Kronk), aunque este mismo asistente no es de codigo abierto

### Topaz

Finalmente está la interfaz de usuario. La GUI (“Armadillo” o “Capybara”) está desarrollada con **Flutter**, sobre Vulkan vía Escher y el compositor Scenic


## Funcionamiento modular y seguridad

Fuchsia emplea una arquitectura basada en **componentes** o (paquetes) que se combinan dinámicamente para formar aplicaciones o (“stories”). Cada componente puede ser:

- **Módulo**: visible y con UI.
- **Agente**: procesos de fondo que proporcionan servicios.

Entonces, Fuchsia es gestionado mediante cocreación dinámica basada en “verbos” y “sustantivos”: cuando el usuario realiza una acción, se elige el módulo adecuado según la combinación de acción y entidad . Además, la seguridad se basa en **capabilities**: control granular de acceso a recursos, fuerte aislamiento de componentes .

## Componentes clave adicionales

Otros componentes clave que podrían destacar serían:

- **FIDL** (Fuchsia Interface Definition Language): define interfaces estándar entre componentes en múltiples lenguajes (C++, Rust, Dart, Go...).
- **Magma**: interfaz GPU centrada en Vulkan, con drivers en espacio de usuario.
- **Sistemas de archivos en espacio de usuario**: MemFS, MinFS, Blobfs, ThinFS; pueden cambiarse sin reiniciar el kernel).

## Estado actual

Ahora bien, como está el estado actual de Fucsia OS?

1. **En producción en Nest Hub**: Como dije anteriormente, desde 2021, los Nest Hub de primera generación se han actualizado a Fuchsia, sin cambiar la interfaz para el usuario .

2. **Versiones recientes**: la capa del sistema muestra lanzamientos continuos (por ejemplo, F20 en junio de 2024)).

3. **Desarrollo comunitario abierto**: Google ha abierto listas de correo y permite contribuciones externas.

4. **Compatibilidad con apps Android/Linux**: Google trabaja en un runtime Android y en “Starnix”, una capa de compatibilidad binaria para ejecutar Linux y Android sin recompilación.

## Conclusión

Fuchsia OS representa varias **mejoras en la arquitectura de sistemas operativos**:

- Su microkernel ofrece bajo nivel y seguridad.
- Su modelo por componentes y capacidades permite alta modularidad y aislamiento.
- FIDL facilita interoperabilidad entre lenguajes.
- Ya está en uso real en los Nest Hub, con versión activa y comunidad creciente.

Si bien aún no es un sistema operativo de consumo masivo en móviles o PCs, Fuchsia sigue en desarrollo continuo. Su compatibilidad con apps existentes y desarrollo abierto lo convierten en un proyecto de gran impacto para el futuro de los SO. lo que sugiere que Google lo impulsará como laboratorio de innovación, y quizás, en unos años, hacia una adopción más amplia.

Y ustedes, ya conocían a Fucsia OS? dejenme su opinión en los comentarios, eso fué todo, adiós

{{< youtube 3MpOqKOrJoU >}}

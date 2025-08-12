---
layout: post
title: "¿Cómo funciona ChromeOS por dentro?"
date: 2025-06-19
categories: [Informativo, Sistemas operativos]
tags: [chromiumos]
image: /img/thumb/chromeos.jpg
---

¡Hola gente! ¿como están? espero que esten bien.

En esta ocasión voy a hablar acerca del funcionamiento interno de ChromeOS, el cual como seguramente todos ya sabran, es el sistema operativo principal que usa Google para sus chromebooks, en este video me enfocaré mas que nada en como está construido el sistema, ya que sorpresivamente al menos yo no encontré información en español y mucho menos en youtube acerca de este tema asi que sin mas que decir, comencemos.


## Introducción

Primero, como ya dije en la introducción, ChromeOS es un sistema operativo desarrollado por Google, el cual utiliza el nucleo Linux. y aunque parezca raro, no es un sistema tan hecho desde cero, ya que su base es Gentoo Linux, aunque en sus versiones mas tempranas usaban a Ubuntu como base, parece ser que en algun punto del 2009 o 2010, se les hizo mas conveniente usar la base de Gentoo.

dejando de lado eso, ChromeOS está  diseñado principalmente para dispositivos de bajo costo como Chromebooks. Su propósito es ofrecer una experiencia centrada en la web, y según google,  optimizada para velocidad, seguridad y simplicidad. A diferencia de los sistemas operativos tradicionales como alguna distribución Linux, Windows o macOS, Chrome OS depende en gran medida del navegador Chrome como su principal interfaz de usuario.


## 1. Fundamentos Técnicos


### 1.1 Núcleo Linux (Kernel)

Dejando de lado descripciones, como ya dije anteriormente, Chrome OS está construido sobre un **kernel Linux personalizado**, el cual es optimizado por Google para:

* Bajo consumo de recursos
* Arranque rápido
* Alta seguridad (con parches específicos y configuraciones personalizadas)
* Soporte específico de hardware

El kernel se adapta a ChromeOS con varias ramas especificas que  usualmente se sincroniza con versiones LTS oficiales del kernel de Linux.


## 2. Arquitectura General

La arquitectura de Chrome OS se puede dividir en capas, de mas altas a mas bajas:



| Componente                  |
|---------------------------|
| Aplicaciones Web          |
| Google Chrome (UI)        |
| Chrome OS System          |
| Daemons & Services        |
| User Space (Linux)        |
| Kernel de Linux           |
| Firmware (Coreboot)       |
| Hardware (x86/ARM)        |


## 3. Componentes Clave

### 3.1 Chrome (el Navegador)

El navegador **Google Chrome** es el entorno de usuario primario. Todas las aplicaciones, incluyendo las PWA (Progressive Web Apps), extensiones y servicios, se ejecutan dentro o a través del navegador.

### 3.2 Protocolo gráfico

Chrome OS. Antes se basaba en **X11**, pero migró a un sistema distinto llamado **Freon**, que usa **DRM/KMS** y **GBM** directamente desde el kernel para administrar la pantalla y el rendering, aunque en sus versiones mas modernas se ha optado por migrar a Wayland.

### 3.3 ARC (Android Runtime for Chrome)

Permite ejecutar aplicaciones Android directamente en Chrome OS usando una versión adaptada de **Android Runtime (ART)**. Esto se hace en un contenedor protegido, llamado **ARC++**, que corre junto con el sistema principal.

### 3.4 Crostini (Linux en Chrome OS)

Para permitir herramientas de desarrollo y ejecutar aplicaciones Linux, Google implementó **Crostini**, un entorno basado en **LXD/LXC** que corre Debian GNU/Linux en una máquina virtual utilizando **Termina VM** sobre **crosvm**, el hipervisor de Google.



## 4. Seguridad

Chrome OS fue diseñado bajo el principio de "defensa en profundidad". Sus mecanismos incluyen:

### 4.1 Verificación de Arranque (Verified Boot)

Cada vez que se enciende el dispositivo, Chrome OS verifica criptográficamente el sistema de archivos para asegurarse de que no haya sido alterado.

### 4.2 Sistema de Archivos de Solo Lectura

El sistema operativo principal se monta en modo de solo lectura para evitar modificaciones no autorizadas.

### 4.3 Sandboxing

Cada pestaña de Chrome, app o proceso corre en un entorno **sandbox**, separado del resto del sistema para limitar el daño potencial de exploits.

### 4.4 Actualizaciones Automáticas y Particiones A/B

Chrome OS utiliza un sistema de **dual-partitioning (A/B)**, donde las actualizaciones se descargan en segundo plano en una partición secundaria, y se intercambian tras el reinicio si pasan las verificaciones.


## 5. Manejo del Sistema de Archivos

* El sistema usa **ext4** y ahora también soporta **fs-verity** para integridad de archivos.
* La partición de usuario, para  cifrar los datos del usuario. usa  **dircrypto** (basado en **fscrypt**) , aunque antes usaba **eCryptfs**
* Las configuraciones y archivos personales están aislados por cada usuario.


## 6. Contenedores y Virtualización

Chrome OS ha adoptado tecnologías de contenedores y VMs:

* **crosvm**: hipervisor basado en **KVM** escrito en Rust, usado para Crostini y Android.
* **Termina VM**: sistema operativo base mínimo que corre como VM para contenedores Crostini.
* **LXD/LXC**: usados para gestionar los contenedores Linux de usuario.


## 7. Firmware: Coreboot

En lugar de BIOS tradicional, Chrome OS suele utilizar **Coreboot**, una plataforma de firmware open-source ultra-rápida y personalizable. A veces incluye un segundo cargador llamado **Depthcharge**, específico para Chrome OS.

## 8. Desarrollo y Actualización

Chrome OS se desarrolla a partir del **proyecto de código abierto Chromium OS**. Tiene tres canales de desarrollo:

* **Dev channel**: lo más experimental
* **Beta channel**: funcionalidades en prueba
* **Stable channel**: producción

El código fuente se mantiene en [https://chromium.googlesource.com/chromiumos/](https://chromium.googlesource.com/chromiumos/)


## Conclusión

Chrome OS representa un cambio radical del concepto tradicional de sistemas operativos. Su diseño centrado en la web, relativo enfoque en la seguridad desde la arquitectura, y el uso intensivo de contenedores, lo convierten en una plataforma curiosa aunque moderna y robusta, también consiguiendo set minimalista desde el punto de vista del usuario.


y ustedes ¿ya sabían como funcionaba ChromeOS? dejenme su opinión en los comentarios.

{{< youtube XahnErtM95s >}}

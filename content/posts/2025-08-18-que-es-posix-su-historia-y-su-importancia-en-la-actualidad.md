---
layout: post
title: "¿Qué es POSIX? - Su historia e importancia en la actualidad"
date: 2025-08-18
categories: [Informativo]
tags: [posix]
image: /img/thumb/posix.jpg
---

Hola gente ¿Cómo están? espero que estén bien, si han estado un poco metido en el mundo de sistemas operativos como las distribuciones linux, las variantes BSD o incluso MacOS, seguramente han odio hablar acerca de POSIX, pero que es exactamente POSIX? en este video explicaré que es posix, su historia y su importancia en la actualidad, asiq ue sin mas que decir, comencemos.

### Introducción

Como seguramente ya sabrán, desde siempre un problema constante en diferentes sistemas operativos o incluso programas, es la interoperabilidad entre varios programas, ya que naturalmente los programadores programan a su manera y se les ocurren ideas distintass para hacer cosas similares.

Debido a esto, durante las décadas de 1970 y 1980, la existencia de diferentes versiones de UNIX generó un problema: cada fabricante desarrollaba su propia implementación, dificultando la portabilidad del software. Para resolver esta fragmentación, nació **POSIX**, cuyas siglas significan "Portable Operating System Interface", con el objetivo de tener un estándar que unificara criterios y garantizara que los programas pudieran ejecutarse en distintos entornos sin modificaciones sustanciales en el codigo

Incluso a dia de hoy, POSIX sigue siendo un pilar fundamental en la arquitectura de los sistemas modernos.

### ¿Qué es POSIX?

POSIX es un conjunto de estándares definido por **IEEE (Institute of Electrical and Electronics Engineers)**, con el respaldo de la organización **ISO/IEC**, que especifica la interfaz entre el sistema operativo y las aplicaciones.
Su objetivo es garantizar la portabilidad del software entre sistemas compatibles, estableciendo cómo deben comportarse las llamadas al sistema, las utilidades de línea de comandos y otros elementos esenciales.

En términos técnicos, POSIX define:

- APIs (Application Programming Interfaces) para manejar procesos, hilos, señales y memoria.
- Utilidades estándar como `ls`, `grep`, `awk` o `vi`.
- Convenciones de shell (como el comportamiento de `sh`).
- Formato y semántica de archivos.

### Historia de POSIX

En los años 70, el sistema operativo UNIX, desarrollado en los laboratorios Bell de AT&T, comenzó a expandirse. Universidades y empresas crearon sus propias variantes: BSD (Berkeley Software Distribution), Xenix, AIX, HP-UX, Solaris, entre otros.
Aunque todos “eran UNIX”, las diferencias internas hacían que un programa escrito para una versión no siempre funcionara en otra sin cambios.

Para resolver este problema, en 1984 el **IEEE** inició un proyecto para unificar las especificaciones bajo un estándar. La idea era que un software escrito para POSIX pudiera compilarse y ejecutarse en cualquier sistema compatible, sin importar el fabricante y sin hacer que todos los sistemas sean exactamente iguales.

Cómo curiosidad, el nombre original del estándar era **IEEE 1003**, pero el ingeniero Richard Stallman, fundador del proyecto GNU, propuso un nombre más “amigable”: **POSIX** (acrónimo de *Portable Operating System Interface*, con una “X” al final en referencia a UNIX).

#### Evolución de las versiones

- **POSIX.1** (1988); Definió las API básicas para manejo de procesos, señales y archivos.
- **POSIX.2** (1992): Especificó utilidades de línea de comandos y el comportamiento del shell.
- **POSIX.1b** (1993): Extensiones de tiempo real (colas de mensajes, semáforos, temporizadores, memoria compartida).
- **POSIX.1c** (1995): Añadió soporte para hilos (Pthreads).
- **POSIX.1d/1j/1q**: Extensiones varias en tiempo real, seguridad y administración de calidad de servicio.

- **ISO/IEC 9945**: Es el nombre de la versión internacional de POSIX, que más tarde se unificó con la Single UNIX Specification (SUS) bajo The Open Group e IEEE, para evitar duplicidad.

### Importancia de POSIX en la actualidad

Aunque el mercado actual está dominado por sistemas como Linux, macOS y Windows (Este ultimo ni siquiera cumpliendo con el estandar) POSIX sigue siendo vital por varias razones:

Muchos programas escritos para entornos POSIX pueden compilarse en diferentes sistemas con cambios nulos o mínimos. Esto permite que un software funcione en Linux, macOS y otros sistemas UNIX sin reescribirlo por completo, con el unico requerimiento de recompilarlo.

Linux o mas bien sus distribuciones, aunque no está certificado formalmente como UNIX, implementa gran parte del estándar POSIX. macOS, por su parte, está certificado y cumple el estándar casi por completo.

Pero incluso Windows, ha incorporado compatibilidad mediante subsistemas como **Windows Subsystem for Linux (WSL)** y anteriormente el menos conocido **Windows Services for UNIX**.

Ademas, POSIX ha logrado mantenerse vigente durante más de tres décadas gracias a que define conceptos universales como la jerarquía de archivos, la gestión de procesos y el uso de shells.

Sistemas de tiempo real, servidores, supercomputadoras y dispositivos embebidos usan especificaciones POSIX para garantizar estabilidad, previsibilidad y compatibilidad.

### Críticas y limitaciones

Aunque POSIX es un pilar importante, no está exento de críticas:

- **Lentitud en la actualización**: La estandarización es un proceso burocrático que no siempre sigue el ritmo de la innovación tecnológica.
- **Cobertura incompleta**: No abarca todos los aspectos modernos de un sistema operativo, como entornos gráficos o APIs de red avanzadas.
- **Compatibilidad parcial**: Algunos sistemas implementan solo una parte del estándar, lo que puede generar problemas de portabilidad.


## Sistemas no POSIX

Finalmente, como ejemplo de sistemas que NO son POSIX, tendriamos a android, que aunque usa el kernel de linux tiene una estructura muy diferente y desde la librería C (Bionic) la rompe.

También, como vimos anteriormente, Windows no cumple con POSIX, y esto ya es desde sus bases en DOS o incluso CP/M, no las cumplia.

y finalmente algunas distribuciones linux que sean bastante distintas también podrían romperlo o ser mas o menos POSIX que otras, debido a la naturaleza de los entornos Linux


### Conclusión

POSIX nació como una respuesta al caos de la fragmentación en el mundo UNIX, y su impacto ha trascendido a lo largo de décadas. Aunque muchos usuarios no lo conocen, casi cualquier comando que ejecutan en una terminal moderna sigue las reglas establecidas por este estándar. Su capacidad de ofrecer un lenguaje común entre diferentes sistemas ha sido clave para el avance de la informática, y su legado sigue vivo en servidores, supercomputadoras, móviles y hasta en las consolas de videojuegos.

En un mundo donde la tecnología evoluciona rápidamente, POSIX representa un raro ejemplo de estabilidad y consenso técnico, recordándonos que a veces la mejor innovación es mantener un terreno común.

{{< youtube YaFJEtGbQT8 >}}
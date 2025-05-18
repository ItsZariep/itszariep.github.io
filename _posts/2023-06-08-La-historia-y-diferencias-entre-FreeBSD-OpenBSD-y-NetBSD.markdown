---
layout: post
title: "La historia y diferencias entre FreeBSD, OpenBSD y NetBSD"
date: 2023-06-08
categories: [Informativo, "Sistemas Operativos"]
image: /assets/img/thumb/bsd.jpg
---

¡Hola gente! ¿como están? espero que estén bien, si han investigado un poco sobre sistemas operativos,  conocerán a BSD, que fué un sistema de la universidad de Berkeley, pero como el software se dejo de mantener, se crearon 3 variantes de este mismo, estos siendo FreeBSD, NetBSD y OpenBSD, cada uno destinado a diferentes usos, en este video, voy a explicar cuales son las diferencias entre estos, sus usos comunes y un poco de la historia de estos, asi que sin mas que decir, empecemos.

## Historia

En los primeros años del sistema Unix, sus creadores, los Laboratorios Bell de AT&T, autorizaron a la Universidad de Berkeley en California y a otras universidades, a utilizar el código fuente y adaptarlo a sus necesidades. Durante la década de los 70’s y 80’s Berkeley utilizó el sistema para sus investigaciones en materia de sistemas operativos. 

Cuando AT&T retiró el permiso de uso a la universidad por motivos comerciales, la universidad promovió la creación de una versión inspirada en el sistema Unix utilizando los aportes que ellos habían realizado,permitiendo luego su distribución con fines académicos y al cabo de algún tiempo reduciendo al mínimo las restricciones referente a su copia, distribución o modificación, naciendo asi BSD.

La versión inicial, llamada `1BSD`, se lanzó en 1978, y posteriormente se lanzaron las versiones `2BSD` y `3BSD` en los años siguientes. En 1983, se lanzó `4BSD`, una versión importante que introdujo el sistema de archivos rápido y jerárquico (FFS), así como el sistema de red TCP/IP. Estas mejoras fueron fundamentales para el desarrollo de Internet y sentaron las bases para la futura popularidad de BSD. 

A mediados de la década de 1980, el equipo de desarrollo de BSD de la Universidad de California, Berkeley, liderado por Bill Joy, comenzó a trabajar en la versión 4.3BSD, que se considera una de las versiones más
influyentes de BSD. `4.3BSD` incluía muchas mejoras y características nuevas, como soporte para redes de área local (LAN), mejoras en el rendimiento y la estabilidad del sistema operativo, y una interfaz de usuario más amigable.

En 1991, se lanzó `386BSD`, una versión de BSD que estaba específicamente adaptada para funcionar en la arquitectura de procesadores x86. Esta versión allanó el camino para el desarrollo de FreeBSD, ya que fue utilizada como base para su creación. 

Estas versiones iniciales de BSD añadieron muchas mejoras y características nuevas al sistema operativo UNIX original. sin embargo, la universidad le dejo de dar importancia a BSD para centrarse en otras cosas, pero como BSD era muy querido, surgieron algunas variantes, como lo son FreeBSD, NetBSD y OpenBSD, que son las variantes mas populares a dia de hoy.

Aunque como curiosidad, MacOS tambien esta parcialmente basado en BSD, me explico, el nucleo de MacOS esta basado en "Darwin", que a su vez está basado en "Mach" y utiliza muchos componentes de software de BSD. Por lo tanto, MacOS y BSD comparten ciertas características y funcionalidades gracias a los componentes de software de BSD que se incorporan en Darwin y, por ende, en MacOS, aunque no dare enfasis en este por que ya todos conocemos a MacOS, asi que ahora si, a empezar con los 3 sistemas BSD mas populares.

## FreeBSD

Empezando con FreeBSD, En 1993, un grupo de desarrolladores liderados por Jordan Hubbard, Nate Williams y Rod Grimes, lanzaron FreeBSD 1.0. Esta versión fue una derivación de 386BSD 0.1, y se basó en la versión 4.3BSD Net/2 de la Universidad de California, Berkeley. 

FreeBSD 1.0 ofrecía un sistema operativo completo, estable y de alto rendimiento para la plataforma x86. A lo largo de los años siguientes, FreeBSD continuó su desarrollo y se mejoró en muchos aspectos, como la paqueteria, el soporte de hardware, la seguridad, el rendimiento de red y la virtualización.

Se agregaron nuevas características, se mejoró la estabilidad y el rendimiento, y se añadió soporte para diferentes arquitecturas de hardware, como Alpha, SPARC, PowerPC, entre otras.

FreeBSD se caracteriza por su enfoque en la estabilidad, el rendimiento y la escalabilidad. Está diseñado principalmente para ser utilizado en entornos de servidor y se ha ganado una excelente reputación por su robustez y fiabilidad. 

FreeBSD ha puesto un gran énfasis en optimizar el rendimiento del sistema operativo, especialmente en áreas como la gestión de memoria, el subsistema de red y el sistema de archivos, otra característica que lo diferencia es que tambien es el mas familiar con el usuario promedio, comparado con otros BSD evidentemente, aunque hay variantes de FreeBSD que si son faciles de usar.

Hoy en día, FreeBSD se utiliza ampliamente en una variedad de aplicaciones, desde servidores web y de base de datos, hasta dispositivos integrados, sistemas embebidos y routers. de hecho si usas un sistema de Sony como PlayStation a partir de 3, o una Nintendo Switch, estas usando una versión personalizada de FreeBSD.

Este También ha servido como base para otros sistemas operativos, como macOS de Apple, que como dije anteriormente, se basa parcialmente en FreeBSD.

## OpenBSD

En segunda instancia tenemos a OpenBSD, este un sistema basado en la rama 4.4BSD-Lite. Fue creado en 1995 por Theo de Raadt y un grupo de desarrolladores con el objetivo de ofrecer un sistema operativo seguro, libre y de alto rendimiento.

A lo largo de los años, OpenBSD ha mantenido su enfoque en la seguridad y la corrección del código,  convirtiéndose en una opción popular para aquellos que valoran la seguridad en su infraestructura.

Desde su lanzamiento inicial, OpenBSD ha sido ampliamente reconocido por su enfoque en la auditoría del código fuente y en la implementación de medidas de seguridad avanzadas. Los desarrolladores de OpenBSD se dedican a eliminar errores, vulnerabilidades y debilidades del sistema operativo, y han creado una reputación
de fiabilidad y robustez en el proceso.

Esta dedicación a la seguridad se refleja en características como el sistema de cifrado de paquetes, el control de acceso estricto y las políticas predeterminadas de seguridad que minimizan las posibilidades de ataques
exitosos. 

OpenBSD también ha realizado importantes contribuciones al mundo de la seguridad informática, creando herramientas como OpenSSH, que es ampliamente utilizado para establecer conexiones seguras y encriptadas en redes. Además, OpenBSD ha desarrollado y promovido el uso de tecnologías como PF (Packet Filter), un potente cortafuegos, y CARP (Common Address Redundancy Protocol), un protocolo de redundancia de dirección IP.

Estas herramientas y tecnologías se han convertido en estándares en la comunidad de seguridad y se han integrado en otros sistemas operativos. Aunque la seguridad es su enfoque principal, OpenBSD también se preocupa por la facilidad de uso y la portabilidad. El sistema operativo se esfuerza por ofrecer una experiencia coherente y amigable para los usuarios, proporcionando una instalación sencilla y una configuración intuitiva.

Además, OpenBSD se ha portado a varias arquitecturas de hardware, lo que lo hace versátil y adecuado para diferentes entornos, pero lo que mas lo caracteriza, es el fuerte enfoque a la seguridad, que se puede ver mas que nada en las implementaciones del kernel y de varios de sus programas.

## NetBSD

En tercera y ultima instancia tenemos a NetBSD, este se originó como una bifurcación de 386BSD en 1993 creada inicialmente por  Chris Demetriou, [Theo de Raadt](https://en.wikipedia.org/wiki/Theo_de_Raadt), Adam Glass, and Charles Hannum. Desde sus inicios, NetBSD ha seguido un enfoque distintivo al poner énfasis en la portabilidad y la capacidad de ejecutarse en una amplia gama de arquitecturas de hardware. Esta flexibilidad lo ha convertido en uno de los sistemas operativos más versátiles y ampliamente portados, haciendo que se pueda ejecutar incluso en hardware muy poco potente, como una Dreamcast por ejemplo. 

La filosofía principal de NetBSD es "Write Once, Run Anywhere" (o "escribe una vez, ejecútalo en cualquier lugar" en español). Los desarrolladores de NetBSD han dedicado esfuerzos significativos para garantizar que el sistema operativo pueda ejecutarse en múltiples plataformas sin la necesidad de modificaciones extensas. 

Esto se logra mediante la creación y el mantenimiento de una capa de abstracción de hardware que permite que el núcleo de NetBSD se ejecute en diferentes arquitecturas, incluyendo x86, ARM, MIPS, PowerPC, SPARC y  muchas más.

La portabilidad de NetBSD también se extiende a su amplia gama de dispositivos compatibles. Además de las computadoras de escritorio y servidores, NetBSD es conocido por su soporte en dispositivos integrados, como enrutadores, conmutadores, dispositivos de almacenamiento y sistemas embebidos. Esta capacidad de adaptarse a diferentes entornos y requerimientos de hardware ha permitido que NetBSD se utilice en una amplia variedad de aplicaciones.

Además de su enfoque en la portabilidad, NetBSD ha mantenido un enfoque en la corrección y la simplicidad del código. El equipo de desarrollo de NetBSD se ha esforzado por escribir un código limpio, legible y bien estructurado, lo que facilita la comprensión, el mantenimiento y las futuras mejoras del sistema operativo.

La estabilidad y la confiabilidad también son características destacadas de NetBSD, lo que lo convierte en una elección popular para aquellos que buscan un sistema operativo robusto y de bajo mantenimiento.

## Compatibilidad

Como pueden ver, estos 3 sistemas comparten varias cosas pero se centran en lo suyo, ahora, una cosa interesante es su compatibilidad con software, ya que fuera de que naturalmente puedan ejecutar software de codigo abierto, estos no dejan de ser sistemas unix like como Linux precisamente, entonces comparten instrucciones del kernel muy similares, esto da pie a algo llamado emulación binaria.

La emulación binario consiste en traducir las llamadas del kernel que sean diferentes, para que el kernel las  pueda entender, aunque como digo, al ser unix like, muchas funciones son identicas y no llega a diferir mucho, aunque eso si, es una traducción de llamadas y no de instrucciones, o sea que solo funcionara entre mismas arquitecturas, NetBSD tiene un articulo dedicado a esto que puede ser interesante para algunos.

De igual forma muchas cosas difieren entre BSDs y en la documentación pueden cambiar cosas, pero en los 3 se encuentran soluciones para ejecutar especialmente software de linux, que es lo que mas interesa ya que es el unix-like que mas catalogo tiene, con cosas como compat_linux, aunque FreeBSD es el que viene mas facil con eso de la compatibilidad, de igual forma, como digo lo mejor es leer la documentación.

Otra segunda opción un poco mas brusca es usar Wine, que tambien esta para los 3 sistemas, pero como digo es bastante brusco y la compatiblidad con Linux es mas rapida. 

## Conclusión

Estos 3 sistemas, son unas excelentes soluciones para los escenarios en los que se pensaron, y aunque como usuarios hogareños comunes derrepente no nos interesa por cualquier motivo, es cierto que tienen una comunidad decente y que en sus respectivos contextos son bastantes utiles.

Resumiendo y repasando un poco concluimos en que:

- FreeBSD se centra en estabilidad y rendimiento.

- OpenBSD esta centrado en ser bastante seguro y estable.

- NetBSD se centra en ser lo mas portable posible.

Estas características distintivas los convierten en opciones atractivas para diferentes necesidades y requisitos.
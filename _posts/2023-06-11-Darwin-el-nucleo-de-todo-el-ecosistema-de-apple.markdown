---
layout: post
title: "Darwin: el nucleo de TODO el ecosistema de Apple"
date: 2023-06-11
categories: [Informativo, "Sistemas Operativos"]
image: /assets/img/thumb/darwin.webp
---

¡Hola gente! ¿como están? espero que esten bien. Si no vives debajo de una roca, seguro conoces o has usado  algun producto de apple, pero ¿alguna vez te haz preguntado como eran sus origenes? esto especialmente en el software, ya que sobre hardware la historia esta bastante mas divulgada, en este video hablare sobre el kernel darwin y los origenes del ecosistema de Apple, asi que sin mas que decir, empecemos.

## Historia

### Origenes

En la década de 1970, dos visionarios, Steve Jobs y Steve Wozniak, fundaron Apple Inc. en un garaje, en esos días, se dedicaban a la fabricación de computadoras personales revolucionarias. El Apple II fue su primer gran éxito, pero fue con el lanzamiento de la Macintosh en 1984 que la compañía realmente dejó una huella en la industria tecnológica.

En 1985, Steve Jobs fundó la compañía NeXT Inc. después de su salida de Apple. NeXT desarrolló un sistema operativo avanzado llamado NeXTSTEP, que se ejecutaba en las estaciones de trabajo NeXT Computer.

NeXTSTEP se basaba en una combinación de tecnologías, incluyendo el kernel Mach y una implementación del sistema de archivos basada en BSD, por ende los lenguajes dominantes eran C y C++, mucho despues En 1997, Apple adquirió NeXT Inc., y Steve Jobs regresó a Apple como CEO.

Esta adquisición fue fundamental para el futuro de Apple y tuvo un impacto significativo en el desarrollo del kernel Darwin. Apple decidió utilizar el núcleo Mach de NeXTSTEP como base para el nuevo sistema operativo de Apple, que finalmente se convertiría en macOS.

El núcleo Mach es un microkernel desarrollado en la Universidad Carnegie Mellon que proporciona las  Funcionalidades básicas de un sistema operativo, como la gestión de procesos y la comunicación entre ellos.

Sin embargo, el núcleo Mach por sí solo no era suficiente para satisfacer todas las necesidades del sistema operativo macOS. Por lo tanto, Apple agregó componentes adicionales al kernel, incluyendo partes del sistema operativo FreeBSD. para los que no sepan del tema, FreeBSD es un sistema de codigo abierto derivado BSD el cual se inspira en UNIX,, pero eso ya es otra historia.

Volviendo al tema, FreeBSD al parecer era la mejor opción para sus necesidades. La combinación del kernel Mach y las tecnologías de FreeBSD dio como resultado el kernel Darwin. Darwin se convirtió en la base del sistema operativo macOS, proporcionando las funcionalidades esenciales del núcleo y permitiendo que se ejecutara en hardware de Apple. 

### Actualidad

Posteriormente, para no tener que reinventar la rueda, además de ser la base de macOS, se decidio que este mágico kernel seria la base para todos los productos de Apple, como iOS, iPadOS, watchOS y tvOS. Estos sistemas operativos comparten una base común con macOS y comparten muchas de las características y funcionalidades del kernel Darwin.

A lo largo de los años, el kernel Darwin ha evolucionado y ha recibido numerosas actualizaciones y mejoras para adaptarse a tecnologias mas modernas y por supuesto a cualquier necesidad que requiera Apple. Apple ha contribuido al desarrollo del kernel y ha liberado gran parte del código fuente de Darwin como software de código abierto, lo que permite a la comunidad de desarrolladores acceder y contribuir al proyecto.

Solo como dato, Apple lanzaba un instalador binario (como imagen ISO) después de cada versión principal de Mac OS X, el cual permitia a cualquiera instalar Darwin en los sistemas PowerPC e Intel x86 como un sistema operativo independiente.

Se lanzaron actualizaciones menores como paquetes que se instalaron por separado. lastimosamente esto ya no se hace, distribuyendo solo el codigo fuente de darwin.

En base a esto y a otros inconvenientes con apple como el hecho de tener componentes propietarios de Apple que no se pueden distribuir libremente, tenemos actualmente el proyecto puredarwin, que es un sucesor espiritual de opendarwin, el cual se centra en conseguri ejecutar Darwin en hardware no apple y en reemplazar los componentes de Apple por otros de codigo abierto, aunque debido a la naturaleza compleja del proyecto y al poco apoyo debido a su pequeña comunidad, no ha alcanzado una estabilidad muy decente que digamos.

## Conclusión

En resumen, el kernel Darwin es el núcleo del sistema operativo macOS de Apple. Se basa en el kernel Mach de NeXTSTEP y agrega componentes de FreeBSD para proporcionar las funcionalidades esenciales del sistema operativo. Desde su origen en la adquisición de NeXT Inc. por parte de Apple., mientras que  el kernel Darwin ha evolucionado y se ha convertido en la base de varios sistemas operativos de Apple.
---
layout: post
title: "¿Que tipos/variantes del kernel Linux existen?"
date: 2023-01-29
categories: Informativo Linux
image: /assets/img/thumb/tiposdekernel.webp
---

Hola gente, ¿como están? espero que estén bien, si estas un poco metido en el mundo de Linux, lo mas probable es que alguna vez hayas escuchado acerca de kernels custom, o kernels personalizados, kernels con una configuración especifica para cumplir ciertas tareas y/o necesidades, en esta ocasión explicare mas o menos de que van, asi que sin mas que decir, empecemos.

### Kernel Generico

Primero empezare con Generic, este como tal no es un kernel en especifico, si no que es a lo que se refiere cuando se habla de una compilación de un kernel pensada y preparada para funcionar en la mayoría de hardware y en la mayoría de situaciones, por ejemplo, el kernel por defecto o regulares de Debian, Ubuntu, OpenSUSE, Manjaro, etc, son kernels genéricos, ya que no tienen un propósito especifico y son mas generalistas.

### Kernel LTS

Luego estaría el kernel LTS, que de nuevo no se trata de un kernel o configuración especifica, si no que simplemente son los lanzamientos de largo soporte del kernel, en sistemas de lanzamiento continuo, o Rolling Release, como Arch por ejemplo, este kernel esta disponible por si no quieres actualizar tanto el kernel, y solo recibes actualizaciones esenciales de seguridad sobre el ultimo LTS, estos kernels son los por defecto en sistemas Point Release como Debian

### Kernel Realtime

Este es un parche que se aplica sobre el código de linux y asi se compila. Este parche permite que casi todo el kernel se adelante, con la excepción de algunas regiones de código muy pequeñas llamadas "raw_spinlock" Esto se hace reemplazando la mayoría de las cerraduras de kernel con mutexes.

Un Mutex, abreviatura de Mutual Exclusion, o Exclusión mutua, es un objeto de sincronización que se utiliza para controlar el acceso a un recurso compartido en un sistema en ejecución, como un programa multiproceso, se utiliza para  garantizar que un solo un hilo pueda acceder al recurso a la vez, evitando condiciones de carrera y otros problemas de sincronización.

Cuando un hilo quiere acceder al recurso, primero debe bloquear el mutex, si el mutex ya esta bloqueado por otro hilo, el hilo  solicitante se bloqueara hasta que se libere el mutex, una vez que el hilo se realiza utilizando  el recurso, debe liberar el mutex, para permitir que otro hilo acceda a el.

Volviendo al kernel realtime, estos mutex admiten la herencia prioritaria, así como moviendo todas las interrupciones y interrupciones de software a los subprocesos del kernel, ahora bien, ¿para que querríamos esta funcionalidad? en usos hogareños, en la mayoría de casos no tendrá ningún impacto, tampoco para gaming ni nada por el estilo.

Este kernel esta diseñado para dar un tiempo de respuesta preferiblemente bajo, a eventos externos, como entradas de usuario, o lecturas de sensores, esto en sistemas donde un retraso en el procesamiento podría tener graves consecuencias, como sistemas de control industrial, o equipos médicos, aunque en un caso menos arriesgado, también es usado para producción musical. 

### Kernel Zen/Liquorix

Zen, o Liquorix, que son prácticamente lo mismo, es el intento de proporcionar el mejor kernel de Linux posible para los sistemas cotidianos, mejorando la capacidad de respuesta e interactividad del sistema mediante el uso de un scheduler o programador de procesos que prioriza las tareas que son importantes 
para el uso en escritorio.

Zen se basa en el scheduler completamente justo (CFS) e incorpora una serie de modificaciones al comportamiento del programador para manejar mejor las cargas de trabajo interactivas. Algunas de las características clave de Zen incluyen un comportamiento mejorado de activación de tareas, un mejor manejo de las tareas vinculadas a entrada/salida y un mejor soporte para procesadores multinúcleo. 

En esencia, el kernel zen es bueno para tareas intensivas multinúcleo, como navegar por internet, productividad multitarea, reproducción multimedia, gaming y demas, o sea, que en esencia intenta cumplir su propósito de  proporcionar el mejor sistema para uso cotidiano.

### Kernel Hardened

El kernel Hardened es una versión del kernel Linux que ha sido mejorado para proporcionar una mayor seguridad. Esto se logra a través de la implementación de características de seguridad adicionales, como la protección de memoria, el control de privilegios y la detección de exploits. También se incluyen parches de seguridad adicionales para corregir vulnerabilidades conocidas en el kernel.

El objetivo del kernel Hardened es proporcionar un sistema operativo más seguro y resistente contra ataques y  explotaciones, este kernel se utiliza principalmente en entornos de servidores y sistemas  embebidos, como routers y dispositivos de Internet de las cosas.

También se utiliza en sistemas de alto rendimiento y en sistemas críticos, como sistemas de control industrial y  sistemas de seguridad. En general, se utiliza en entornos donde la seguridad es esencial y donde los sistemas deben ser resistentes a los ataques y las explotaciones.

### Kernel XanMod

El kernel XanMod, medianamente parecido a zen, tiene parches para proporcionar mejoras de rendimiento y estabilidad; Incluye una serie de parches y características adicionales que se centran en mejorar la experiencia del usuario y el  rendimiento del sistema. Algunas de las características incluyen mejoras
en el soporte de hardware, optimizaciones de rendimiento para diferentes usos (por ejemplo juegos, navegación web, etc), y una mayor estabilidad y compatibilidad.  Estas mejoras son enfocadas en mejorar el rendimiento.

### Kernel GNU/Linux-Libre

El kernel GNU/Linux-libre es una versión del kernel Linux que ha sido purgada completamente de código propietario y controlado por patentes. El objetivo de Linux-libre es proporcionar una versión del kernel Linux que cumpla con los estándares de libertad y ética de la comunidad de software libre.

Esto significa que todo el código incluido en Linux-libre debe ser libremente utilizable, modificable y distribuible, acorde a las 4 libertades establecidas por Richard Stallman, el padre del Software Libre. Linux-libre se basa en el código fuente del kernel Linux estable, pero elimina cualquier componente que no cumpla con estos estándares de libertad.

Es utilizado en entornos donde se valora la libertad y la ética del software libre y se busca evitar el uso de componentes propietarios o controlados por patentes.

### Kernel Clear

El kernel Clear o de Clear Linux esta principalmente enfocado en mejorar considerablemente el rendimento, seguridad y uso energetico en sistemas con CPUs Intel, puesto que Clear Linux esta creada por la misma Intel, aunque este suele ser mas visto en servidores, nubes y computación de borde, donde se requiere un alto rendimiento y seguridad.

### Kernel Gallium

El kernel Gallium, proveniente el sistema GalliumOS es una versión del kernel que se ha optimizado para mejorar el rendimiento y la compatibilidad con hardware de bajo costo.

Este incluye una serie de parches y características adicionales que se centran en mejorar la experiencia del usuario en Chromebooks y dispositivos basados en ARM, como la compatibilidad con pantallas táctiles, mejoras en el soporte de hardware y optimizaciones de rendimiento.

GalliumOS se enfoca en proporcionar una distribución ligera y fácil de usar para dispositivos de bajo costo y está diseñado para funcionar con una gran variedad de hardware, ademas de las Chromebooks, incluyendo  Computadores convencionales con CPUs como Intel o AMD.

### Otros Kernels

Estos son los mas populares y medio interesantes, no son los unicos puesto que tambien hay otros, pero son mas nicho, como VFIO que sirve especialmente
para passthrought en virtualización KVM, Ck que es una especie de mezcla entre realtime y zen, dando un uso mas hogareño, pf el cual incluye varios parches comunitarios, y asi con varios kernels que tienen distintas cositas pero son mas raros y de nicho, y  personalmente yo no recomendaría mucho un kernel no muy conocido

### Conclusión

Aunque hay varias modificaciones y parches del kernel, lo mas conveniente si eres un usuario hogareño es usar el kernel genérico, y derrepente el kernel Zen, por algo la gran mayoría de distribuciones incluyen un kernel generico, aunque si necesitas cubrir una necesidad que solo te pueda suplir un kernel, considera hacer el cambio, puede salir conveniente.
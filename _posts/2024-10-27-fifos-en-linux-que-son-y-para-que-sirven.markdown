---
layout: post
title: "FIFOs en Linux / Unix like: ¿Qué son y para que sirven?"
date: 2024-10-27
categories: Informativo Linux
tags: [linux, fifo, programación ]
image: /assets/img/thumb/fifos.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, En los sistemas operativos Unix-like, el manejo de la comunicación entre procesos (o IPC, por sus siglas en inglés) es fundamental para la ejecución eficiente de programas. Uno de los mecanismos más antiguos y utilizados en este contexto son los **FIFOs** o "First In, First Out". A veces también conocidos como *named pipes* (tuberías con nombre), los FIFOs permiten que los procesos que se ejecutan de manera independiente puedan intercambiar información de manera organizada y eficiente.

En está ocasión explicare en qué son los FIFOs, cómo funcionan en un entorno Unix-like y para qué sirven. Así que sin mas que decir, Comencemos.

## Definición de FIFO

Un FIFO (First In, First Out) es un tipo de mecanismo de IPC que sigue una política de cola: el primer dato que entra es el primer dato que sale. La analogía más simple sería la de una fila de personas esperando para ser atendidas; la primera persona en entrar a la fila es la primera en salir de ella. En los sistemas Unix-like, los FIFOs son un tipo especial de archivo que actúa como un canal de comunicación entre procesos.

Un **FIFO** puede ser visto como una extensión de las pipes (tuberías) tradicionales, pero con una diferencia clave: mientras que las pipes son anónimas y solo funcionan entre procesos con un parentesco directo (es decir, procesos relacionados como un padre y un hijo), los FIFOs tienen un nombre en el sistema de archivos, lo que les permite ser utilizados por procesos completamente independientes entre sí. Esta característica hace que los FIFOs sean más flexibles que las pipes estándar.

## Creación de un FIFO en Unix-Like

Para crear un FIFO en un sistema Unix-like, se utiliza el comando **`mkfifo`** o la función **`mknod`** en C. El comando `mkfifo` permite asignar un nombre a este tipo especial de archivo, que luego puede ser abierto tanto para escritura como para lectura por diferentes procesos.

Por ejemplo, en un terminal se podría utilizar el comando `mkfifo mififo` para crear un FIFO o archivo especial llamado "mififo" en el folder actual. Cualquier proceso que necesite enviar datos lo abriría para escritura, mientras que los procesos que deseen recibir esos datos lo abrirían para lectura.

## Funcionamiento
Una vez que se ha creado un FIFO,

el proceso de comunicación entre los procesos sigue un patrón muy simple:

1. Un proceso abre el FIFO para escritura y coloca datos en él. 
2. Otro proceso abre el FIFO para lectura y extrae esos datos.

El aspecto más interesante de los FIFOs es que se comportan de manera síncrona. Esto significa que si un proceso intenta leer del FIFO cuando no hay datos disponibles, el proceso esperará hasta que haya datos. De manera similar, si un proceso escribe en el FIFO pero no hay ningún proceso esperando para leer los datos, el proceso de escritura se bloqueará hasta que alguien lea los datos.

Esta naturaleza síncrona tiene el efecto de sincronizar a los procesos, lo que es útil para situaciones en las que el intercambio de datos debe ser coordinado, como en la comunicación entre un productor de datos y un consumidor, simultáneamente y es de aclarar, los datos en ningún momento se escriben en el disco, en vez y por conveniencia, se escriben en la memoria RAM.

### Ejemplo de Uso

Un ejemplo clásico de uso de un FIFO sería la comunicación entre un proceso que genera datos (un productor) y otro que consume esos datos (un consumidor). Consideremos el siguiente escenario:

1. El proceso productor abre el FIFO para escritura. 
2. El proceso consumidor abre el FIFO para lectura. 
3. El productor escribe datos en el FIFO, y el consumidor los recibe en el orden en que fueron escritos.

Por ejemplo, en una terminal se podría ejecutar el comando `'echo "Mensaje de prueba" > mififo'`, que escribirá datos en el fifo, y luego en otra terminal incluso aunque sea otra sesión, mientras pueda leerlo, si se usa `cat < mi_fifo`, se leerá el contenido, esto sin escribir nada en el sistema de archivos.

Entonces, un proceso puede escribir en el FIFO y otro proceso, que puede ejecutarse en un terminal completamente diferente o incluso en un momento diferente, puede leer los datos que el primer proceso escribió.

## ¿Para qué sirven los FIFOs?
### Comunicación entre Procesos Independientes

El uso más común de los FIFOs es para la **comunicación entre procesos independientes**. A diferencia de las pipes tradicionales, que requieren que los procesos estén relacionados, los FIFOs permiten que dos procesos que no tienen ninguna relación familiar puedan compartir información. Esto es extremadamente útil en entornos de sistemas donde diferentes procesos o servicios necesitan coordinarse entre sí.

### Gestión de Datos en Flujos

Otra utilidad de los FIFOs es en la gestión de flujos de datos. Los FIFOs aseguran que los datos se procesen en el orden en que se generan, lo que es esencial en aplicaciones donde el orden de los datos es importante, como en los sistemas de logging, transmisión de datos en redes o en procesamiento de flujos multimedia.

### Desacoplamiento de Procesos

Los FIFOs permiten un cierto grado de **desacoplamiento** entre procesos. Como los datos se transmiten a través del sistema de archivos, el productor y el consumidor no necesitan ejecutarse al mismo tiempo. El productor puede escribir datos en el FIFO y el consumidor puede leer esos datos en un momento posterior. Esta característica es muy útil en sistemas donde la disponibilidad de los recursos es impredecible, como en sistemas distribuidos.

### Soporte en Programación Concurrente

En la programación concurrente, o sea dedicada a paralelismo y sincronización, los FIFOs también se usan para manejar la sincronización de procesos. Como mencioné antes, la naturaleza bloqueante de los FIFOs hace que los procesos esperen hasta que haya datos disponibles, lo que puede ser utilizado como un mecanismo simple de coordinación entre procesos que ejecutan tareas paralelas.

## Ventajas y Desventajas de los FIFOs

### Ventajas
- **Simplicidad**: Los FIFOs son fáciles de implementar y usar en comparación con otros mecanismos de comunicación entre procesos como sockets o memoria compartida.
- **Sincronización Implícita**: Los FIFOs proporcionan sincronización natural, lo que puede simplificar el desarrollo de aplicaciones que necesitan comunicación entre procesos.
- **Desacoplamiento**: No es necesario que los procesos estén relacionados o se ejecuten al mismo tiempo.

### Desventajas
- **Bloqueo**: Si no se maneja adecuadamente, el comportamiento de bloqueo puede provocar que los procesos queden "atascados" esperando datos o espacio en el FIFO.
- **Almacenamiento limitado**: Los FIFOs tienen un tamaño de buffer limitado, lo que significa que si el productor genera datos más rápido de lo que el consumidor puede leerlos, se puede provocar un cuello de botella. 
- **Solo comunicación local**: A diferencia de otros mecanismos como los sockets, los FIFOs están restringidos al sistema local y no permiten la comunicación a través de redes.

## Conclusión

Los FIFOs en sistemas Unix-like son una herramienta valiosa para la comunicación entre procesos, especialmente en situaciones en las que los procesos no están relacionados y necesitan intercambiar datos de manera organizada y síncrona.

Su simplicidad y el hecho de que se integren fácilmente con el sistema de archivos los hacen accesibles y efectivos para diversas aplicaciones, desde la programación concurrente hasta la gestión de flujos de datos. Sin embargo, su uso implica ciertas limitaciones, como el bloqueo y la dependencia de la capacidad de buffer, que deben ser gestionadas adecuadamente por los desarrolladores. A pesar de esto, los FIFOs continúan siendo una de las formas más utilizadas de IPC en los entornos Unix-like debido a su eficiencia y facilidad de uso.

Y ustedes, ¿Conocían los FIFOS? ¿Que utilidad le aplicarían? déjenme su opinión en los comentarios, eso fue todo, adiós

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/Iokdrw833Yc?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
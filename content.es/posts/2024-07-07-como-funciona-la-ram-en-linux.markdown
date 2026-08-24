---
layout: post
title: "¿Cómo funciona la RAM en Linux?"
date: 2024-07-07
categories: [Informativo, Linux]
image: /img/thumb/comofuncionalaramenlinux.jpg
---

¡Hola gente! ¿cómo están? espero que estén bien, en esta ocasión voy a mostrar como Linux maneja la memoria RAM, que aunque parezca algo sencillo, si la memoria no se administrara habría un enredón que causaría muchos problemas de ejecución, así que sin mas que decir, comencemos.

## Separar software de hardware

Primero, para hablar de la memoria RAM no solo de Linux, lo mas conveniente es separar un poco el software de el hardware, de este planteamiento nacen la memoria física y la memoria virtual.

Entonces, Cualquier sistema operativo con Linux utiliza un sistema de memoria virtual. Esto significa que cualquier dirección referenciada por una aplicación debe ser traducida a una dirección física. Esta traducción se logra a través de una combinación de tablas de páginas y hardware de traducción de direcciones en el sistema informático subyacente.

Estas tablas de páginas son tablas multinivel en la memoria física que contienen mapeos de direcciones virtuales a direcciones físicas. Estos mapeos son leídos por el hardware de traducción de memoria (el MMU) virtual en el procesador, Para esto se suele usar unos Cachés llamados TLB.

Una ventaja de tener este mecanismo es que el sistema operativo puede "robar" páginas cuando sea necesario. Esto se logra marcando una entrada de tabla de páginas previamente usada como inválida. Incluso bajo presión de memoria normal, el sistema operativo puede recuperar páginas de una aplicación para dárselas a otra. Aunque suele estar bastante regulado por que si un sistema necesita un comportamiento exacto, mas que nada con el tiempo, puede llegar a tener problemas.

Entonces, hasta aquí todo bien, tenemos la memoria separada, sin embargo estas memorias las cuales deben gestionarse, lo que nos lleva a…

## 1. Gestión de la Memoria Física y Virtual

Para gestionar la **Memoria Física** se suelen usar

- **Página y Marco de Página**: Los marcos de pagina para resumir son bloques pequeños de generalmente de 4 KB, en los cuales esta repartida la RAM. luego el kernel debe asignar estos bloques a los procesos de manera ordenada.

**MMU (Memory Manager Unity)**: El cual traduce las direcciones virtuales a direcciones físicas, haciendo que los programas no necesiten saber las direcciones físicas exactas, las cuales suelen ser mas complicadas de manejar.

Mientras que por parte de la **Memoria Virtual** están

- **Los Espacios de Direcciones Virtuales**: De los cuales cada proceso tiene su propio espacio, que es aislado y puede ser más grande que la memoria física, de ahí que en el gestor de tareas se vea que la columna con nombre "virtual" o similar, sea desproporcionalmente mas grande.

Pero además El espacio de direcciones virtuales se divide en "páginas", y las maneja la **paginación**: Estas paginas son mapeadas a los "marcos de página" de la memoria física. Como detalle.

La paginación también se encarga de manejar el swapping, que es el método donde la información que ya no cabe en la ram, se guarda en el almacenamiento principal, como un disco duro.

Entonces, en este punto la RAM ya no parece una piscina de pelotas y esta técnicamente ordenada, pero no esta en su mejor forma, para esto hay otras técnicas que se apoyan en esta base, lo que nos lleva a…:

## 2. Administración de apoyo

Aquí se puede bifurcar en 2 tipos de apoyo

### Asignación de Memoria

- **Buddy System**: El cual Linux utiliza para gestionar la memoria física. En el Buddy System la memoria se divide en bloques de tamaño que son potencias de dos, y los bloques se fusionan o se dividen según sea necesario.

Además del Buddy System también se suele usar el Slab Allocator: El cual sirve para asignaciones de memoria más pequeñas y frecuentes (como estructuras de datos del kernel). El Slab Allocator organiza estos objetos en cachés para su rápido acceso.

### Gestión de Páginas

- **Page Cache**: Linux mantiene una caché de páginas en memoria para acelerar el acceso a archivos y dispositivos. La memoria no utilizada por aplicaciones se utiliza como caché.

- **Swap**: Cuando la memoria física se llena, las páginas menos utilizadas se mueven a una partición o archivo de intercambio en el disco duro, para determinar esto se suele usar un Algoritmo llamado LRU o (Least Recently Used)

## 3. Mecanismos de Optimización

Además de los los métodos anteriores, que eran para gestión y administración de la RAM, el kernel también suele hacer uso de técnicas de optimización, como…

- **Copy-on-Write (COW) Para la memoria compartida**: Este se suele usar cuando un proceso se clona, entonces, las páginas de memoria son compartidas entre el proceso padre y el hijo hasta que uno de ellos modifica una página, momento en el cual se crea una copia.

Aparte del Cow, otra técnica es que va mas la paginación es…

- **HugePages**: Son páginas de memoria de mayor tamaño (que van desde 2 MB hasta 1 GB en lugar de 4 KB), reduciendo la sobrecarga de la gestión de muchas páginas pequeñas.

Luego, para prevenir que el sistema se quede sin memoria, ademas del uso del swap, se suelen usar:

- **Zram**: El cual es comprimir segmentos de la RAM adentro de si misma, creando un bloque para esto, para comprimir se usa mas que nada el procesador y un algoritmo de compresión rápido.

- Despues ya en casos mas extremos esta el **OOM Killer**: Que cuando el sistema se queda sin memoria, este selecciona y termina procesos para liberar memoria, eligiendo aquellos que tienen menos impacto en el sistema, pero ya es un caso mas extremo y es preferible evitar esto, el OOM Killer al igual que la zram suelen ser opcionales y se pueden habilitar y deshabilitar manualmente.

## 4. Asinación de Memoria en el Kernel

Durante todo el articulo he estado hablando de técnicas para manejar la memoria ya existente, sin embargo, también hay que tener un control a la hora de asignar memoria. Simplificando, los procesos no tienen acceso directo a la memoria física (o sea RAM real), ya que para eso está memoria virtual, como dije anteriormente.

La memoria virtual permite que el sistema operativo gestione de manera más eficiente y segura el acceso a la memoria física. Además de esto, se requieren permisos elevados, normalmente de root, para acceder y modificar ciertas áreas de la memoria, si, modificar, si un proceso con los permisos adecuados puede modificar la memoria de otros procesos, y si, potencialmente peligroso. 

Sin embargo, si se utiliza correctamente, herramientas como GameConqueror (Que es como un cheat engine barato para linux) pueden ser ayudar a modificar las variables de los programas en ejecución, lo que puede ayudar en la depuración y en la experimentación con comportamientos específicos.

El Kernel suele constantemente escribir archivos como /proc/PID/stat o /proc/vmstat, lo que permite hacer precisamente lo anterior.

Fuera de esto, hay un espacio reservado en la memoria que es exclusivo del kernel, este espacio si es mas seguro y no puede nisiquiera ser leido por los procesos.

En cuanto a la asignación de memoria, el kernel de Linux tiene dos funciones llamadas `kmalloc` y `vmalloc`:

- `kmalloc` asigna memoria física contigua, lo que significa que las direcciones de memoria asignadas son consecutivas. Esto es útil para operaciones que requieren acceso rápido y contiguo a la memoria.

- `vmalloc` asigna memoria de manera virtual en caso de que no pueda no se pueda hacer una asignación contigua de manera fisica. Esto se suele usar con bloques de memoria mucho mas grandes.

Entonces, Cuando un proceso solicita memoria, primero el kernel le asigna un rango de direcciones virtuales al proceso, después, el MMU traduce estas a las direcciones físicas, si el proceso esta parcialmente en swap, se tiene que mover de nuevo a la RAM para que no haya problemas, finalmente el kernel actualiza sus estructuras para reflejar estos cambios.

{{< youtube I_1I4PFMxmY >}}

---
layout: post
title: "Procesos y señales en Linux / Unix-like explicados"
date: 2025-01-26
categories: [Informativo, Linux]
tags: [procesos, linux, CFS ]
image: /img/thumb/procesoslinux.jpg
---

Hola gente ¿Cómo están?, espero que estén bien, en esta ocasión explicaré cómo funciona la gestión de procesos y señales en UNIX y sistemas Unix-Like como Linux, el cual por temas practicos usaré como punto e ejemplo.

### 1. ¿Qué es un proceso en UNIX?

En UNIX, un **proceso** es una instancia de un programa en ejecución, que opera en un espacio de ejecución separado y aislado, con su propio espacio de memoria, identificador de proceso (PID) y contexto. Cada proceso tiene un conjunto de recursos asignados por el sistema operativo y es gestionado en función de prioridades, tiempo de CPU y necesidades de memoria.

- Ademas de eso, en cualquier sistema minimamente moderno, los procesos incluyen también el concepto de **Lightweight Processes (LWP)** o hilos ligeros, gestionados mediante la llamada `clone()`, que permite crear procesos que comparten recursos específicos, como memoria y archivos abiertos, lo cual es crucial en el sistema de hilos y en la implementación de contenedores.

### 2. Creación de procesos: `fork()` y `exec()`

Para crear procesos, UNIX utiliza principalmente dos llamadas al sistema: **`fork()`** y **`exec()`**.

- **`fork()`**: Duplica el proceso que lo llama (proceso padre) creando un nuevo proceso (hijo). Ambos procesos comparten el mismo código, pero tienen sus propios espacios de memoria. 
- Tras ejecutar `fork()`, el padre recibe el PID del hijo, mientras que el hijo recibe un valor 0, lo que permite diferenciar el código que ejecutará cada proceso.

- **`exec()`**: Reemplaza el espacio de memoria del proceso con un nuevo programa. Se usa normalmente después de `fork()` para cargar un programa diferente en el proceso hijo.

- Además de `fork()` y `exec()`, existe **`vfork()`**, una variante de `fork()` que es más eficiente cuando el hijo va a ejecutar `exec()` inmediatamente, ya que no duplica el espacio de memoria, reduciendo el consumo de recursos.

- También está **`clone()`**, una llamada de bajo nivel que permite al proceso especificar qué recursos compartir con el hijo. `clone()` es la base para los hilos en Linux y se usa ampliamente en contenedores (mediante namespaces y cgroups) para crear espacios de ejecución aislados que comparten recursos como red, montajes, o PIDs.

### 3. Finalización de procesos: `exit()` y `wait()`

- **`exit()`**: Termina un proceso. Libera recursos y cambia el estado del proceso a "zombie" hasta que su proceso padre lo recoja.
 
- **`wait()`**: Permite que el proceso padre espere a que el proceso hijo termine. Cuando un hijo finaliza, el proceso padre recoge su estado de salida y el sistema elimina al hijo de la tabla de procesos, esto permite que no queden procesos huerfanos.

- Existen variantes de `wait()` como **`waitpid()`** y **`waitid()`**, que permiten un control más preciso sobre qué proceso hijo esperar y cómo manejar su estado de terminación.
- Además, en situaciones donde se necesitan procesos ligeros (como en hilos), se utilizan técnicas de "limpieza de recursos" sin tener que esperar a que cada hijo termine, facilitado por el sistema de manejo de hilos de Linux.

### 4. Tipos de procesos en UNIX

Existen varios tipos de procesos:

- **Procesos padre e hijo**: Un proceso padre crea un proceso hijo con `fork()`. 
- **Procesos zombies**: Procesos que han terminado su ejecución pero siguen en la tabla de procesos hasta que el padre los recoja.
- **Procesos huérfanos**: Procesos cuyo padre ha finalizado antes que ellos, adoptados por el proceso `init`.

- Por ejemplo, en Linux el init mas usado es **`systemd`**, entonces, `systemd` ademas de manejar tareas de inicio del sistema, es responsable de recoger los procesos zombies y adoptar a los procesos huérfanos, ayudando a mejorar la estabilidad del sistema.

### 5. Comunicación entre procesos (IPC)

UNIX ofrece varias herramientas de **comunicación entre procesos** (IPC):

- **Pipes** (`|`): Permiten enviar datos entre procesos.
- **Colas de mensajes (Message queue)**: Envía mensajes estructurados de un proceso a otro.
- **Memoria compartida (Shared Memory)**: Permite que varios procesos accedan a un mismo espacio de memoria. 
- **Semáforos (Semaphore)**: Controlan el acceso concurrente a recursos compartidos.

- En **Linux**, además de estos mecanismos, se pueden usar los **futexes** (fast user-space mutexes), una tecnología que permite una sincronización más eficiente en operaciones de memoria compartida, evitando bloquear el núcleo y mejorando el rendimiento.
- Linux también introduce **namespaces y cgroups** como extensiones avanzadas de IPC y control de recursos. Los namespaces permiten aislar recursos como red, usuarios y archivos, y los cgroups restringen y monitorean el uso de recursos (CPU, memoria) de grupos de procesos, algo fundamental en la virtualización ligera (contenedores).

### 6. Señales en UNIX

Finalmente, para hablar de procesos hay que hablar de señales y estados. Las **señales** son una forma de comunicación asíncrona para notificar a los procesos de eventos específicos.

#### Principales señales en UNIX

Algunas señales comunes en UNIX incluyen:

- **`SIGKILL`**: Mata el proceso inmediatamente. No puede ser interceptada. 
- **`SIGTERM`**: Solicita una terminación ordenada. 
- **`SIGINT`**: Interrumpe un proceso (usualmente con `Ctrl + C`). 
- **`SIGHUP`**: Notifica que la terminal se ha cerrado. 
- **`SIGCHLD`**: Notifica que un proceso hijo ha terminado.

**Nota para Linux**:
- Linux implementa señales adicionales, especialmente las **señales de tiempo real (`SIGRTMIN` a `SIGRTMAX`)**. Estas señales pueden ser utilizadas en aplicaciones de tiempo real y tienen prioridades definidas, permitiendo a los procesos una mayor precisión y control sobre eventos específicos.

### 7. Estados de los procesos

Cada proceso en UNIX tiene un estado que indica su situación:

- **Running (Ejecutándose)**: El proceso está en ejecución. 
- **Sleeping (Durmiendo)**: Está inactivo, esperando un evento. 
- **Stopped (Detenido)**: Su ejecución ha sido pausada. 
- **Zombie**: Ha terminado, pero no ha sido eliminado de la tabla de procesos.

### 8. Planificación de procesos

La **planificación de procesos** determina el orden de ejecución en el CPU. UNIX usa un algoritmo de **Round-Robin con prioridades**.

**Nota para Linux**:
- Linux utiliza el **Completely Fair Scheduler (CFS)**, que asigna el tiempo de CPU basándose en un algoritmo de árbol rojo-negro, garantizando una distribución equitativa y dinámica del tiempo de CPU, especialmente en sistemas multicore. CFS se adapta en tiempo real, considerando factores como las prioridades y el tiempo de espera para optimizar la respuesta y el rendimiento.
 
### Resumen

1. **Creación de procesos**: `fork()` y `exec()` son el estándar, con Linux ofreciendo extensiones como `vfork()` y `clone()` para optimizar la creación y manejo de procesos ligeros. 
2. **Finalización de procesos**: `exit()` y `wait()` se usan en todos los sistemas Unix-like, con variantes en Linux como `waitpid()` para mayor control. 
3. **Comunicación entre procesos (IPC)**: Linux añade futexes, namespaces y cgroups como mecanismos avanzados.
4. **Señales**: Linux ofrece señales en tiempo real para un control más preciso de eventos.
5. **Estados de procesos**: Linux añade estados adicionales y optimiza el manejo de hilos compartiendo recursos específicos. 
6. **Planificación de procesos**: Linux utiliza el Completely Fair Scheduler (CFS) para un reparto justo y dinámico de CPU.

{{< youtube EmtkHWNjgDs >}}

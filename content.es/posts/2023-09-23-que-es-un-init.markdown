---
layout: post
title: "¿Qué es un init?"
date: 2023-09-23
categories: [Informativo, "Sistemas Operativos"]
image: /img/thumb/init.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. Si han usado Linux, posiblemente hayan escuchado acerca de systemd, que es el sistema de inicio más popular en Linux, pero no es el primero ni mucho menos el único. En este vídeo veremos qué es un sistema de inicio,  sus orígenes y cómo funcionan. Así que sin más que decir, empecemos.

## ¿Qué es el init?

Para entender que es systemd y que es un init, primero debemos de saber que es, y es que en los sistemas operativos tipo UNIX, init es un programa fundamental encargado de coordinar y gestionar el proceso de arranque del sistema. Es el primer proceso que se ejecuta al iniciar el sistema operativo y tiene el identificador de proceso (PID) 1.

La función principal del init es establecer el entorno necesario para el funcionamiento adecuado del sistema operativo. Esto incluye la inicialización de los distintos subsistemas del sistema, la configuración de variables de entorno, la carga de controladores de dispositivos, y otros elementos esenciales para el correcto funcionamiento del sistema.

Además, init es responsable de iniciar y controlar otros procesos y servicios del sistema. Cuando el sistema se  inicia, init lee un archivo de configuración llamado "inittab" (o su equivalente en sistemas más modernos) para
determinar qué procesos y servicios deben iniciarse automáticamente en diferentes niveles de ejecución o estados del sistema.

Los diferentes niveles de ejecución, también conocidos como "runlevels", representan diferentes estados del sistema con diferentes conjuntos de servicios activos. Por ejemplo, el nivel de ejecución 1 suele ser el modo de usuario único, con solo unos pocos servicios esenciales en funcionamiento, mientras que el nivel de ejecución 5 puede ser el modo multiusuario con todos los servicios disponibles. 

Ahora, esto es en el init de System V. Este init no tiene nombre y nos solemos referir a él como SysVinit, pero en sistemas Linux, incluso no tan modernos, el init ha sido reemplazado por otros según las necesidades. 

La implementación más popular es systemd, que es de Red Hat, pero no es la única. Otras opciones son OpenRC, desarrollado por Gentoo; Runit, que es más ligero e independiente; y Busybox init, que es una implementación más ligera de Runit

## Historia

Ahora sabiendo esto, vamos a la historia, ya que en el computo todo surge por la necesidad de facilitar una tarea, y es que en los años 60's, cuando se desarrollo UNIX, la computación era muy diferente de lo que es hoy en día. Los sistemas eran generalmente mainframes o computadoras centrales, y la interacción con ellos se realizaba a través de terminales que estaban conectados al sistema central a través de líneas de comunicación.

Estos terminales no eran tan inteligentes como los ordenadores actuales, por lo que no podían iniciar el sistema operativo por sí mismos. La necesidad de tener un programa que iniciara el sistema operativo y administrara los procesos y servicios surgió de esta configuración, ya que iniciar una de estas computadoras llegaba a ser demasiado técnico y tardado.

Aparte de eso, existían varios riesgos, como que los procesos no se iniciaran en el orden correcto, no se pudieran gestionar de forma fácil o que quedaran procesos huérfanos. De esta forma, nació el "init", que como mencioné anteriormente, es el proceso encargado de arrancar todos los demás procesos del sistema operativo durante el inicio del sistema.

## Funcionamiento interno

Ya sabemos que es un init y sus orígenes, pero ahora, ¿como funciona exactamente un init?

Esto depende claramente del init que estemos utilizando, ya que no todos están programados de la misma forma y tampoco todos funcionan igual, pero aquí haremos un vistazo general.

### Carga del init

Primero antes del init, el kernel, cuando se enciende la computadora o se reinicia, el firmware de la máquina (ya sea BIOS o UEFI) carga el bootloader, el cual facilita la carga núcleo del kernel en la memoria RAM, en sistemas modernos con UEFI un bootloader no puede ser necesario.

Después, el kernel realiza una serie de tareas esenciales, como reconocer y configurar el hardware básico, establecer la tabla de páginas para la gestión de memoria, y cargar los drivers necesarios para el hardware más importante.

### Lectura de configuración y servicios

Una vez que el kernel está listo, invoca el proceso init, que se suele encontrar en la ruta /sbin/init, ya sea como binario directo o un enlace simbólico, aqui, el init lee su archivo de configuración principal, el cual varia segun el init, Este archivo puede contener información sobre los diferentes niveles de ejecución (runlevels), servicios, supervisor y demas cosas, para los que no sepan, los runlevels son estados del sistema que determinan qué servicios y demonios están activos en un momento dado.

El sistema puede tener varios runlevels, como "modo de usuario único" (single-user mode), "modo de mantenimiento" (maintenance mode), o "modo multiusuario" (multi-user mode). Cada runlevel tiene un propósito específico según el init. 

Continuando, una vez que se ha leído el archivo de configuración, init carga el runlevel predeterminado, esto realmente varia bastante según el init, generalmente es el modo multiusuario (runlevel 3) o el modo gráfico (runlevel 5) en las distribuciones más modernas.

Al cambiar de runlevel, se activan o desactivan servicios y demonios correspondientes, pero esto puede variar en la estructura tanto del init como de la configuración del sistema operativo. Para cada runlevel, init ejecuta
una serie de scripts ubicados en directorios específicos. Estos scripts son los encargados de inicializar los servicios y demonios necesarios para el funcionamiento del sistema en el runlevel actual.

Los scripts están ubicados en directorios como /etc/rc.d/ o /etc/init.d/ de nuevo, esto depende del init o de la configuración del sistema operativo.

### Supervición del sistema arrancado

Después de este punto, el sistema operativo ya debería estar completamente arrancado, dependiendo de la estructura puede terminar en el tty, en el gestor de sesiones o directamente en una interfaz gráfica de usuario moderna, pero, el proceso del init sigue en ejecución, esto es por que técnicamente todos los procesos
después del init, son procesos hijos, me explico, es como un arbol, el tronco es el init mientras que las ramas son los procesos, si cortas el tronco, claramente las ramas también se van con el tronco.

### Apagado

Aparte de eso, el init no solo controla el inicio, también suele controlar la sesión y el apagado; en el caso de la sesión, suelen monitorear los procesos y servicios que se están ejecutando en el sistema. Si un servicio
se detiene inesperadamente, init puede reiniciarlo automáticamente según la configuración definida en los scripts de inicio, en el apagado, las señales de apagado o reinicio se suelen lanzar al init para que se realice el apagado o reinicio adecuado, regularmente el init también se encarga de cosas como suspensión o hibernación de formas parecidas.

## Comparación

Ahora, hare una pequeña comparativa entre inits que podemos encontrar disponibles:

### `SysVinit`:
Este es uno de los sistemas de inicio más antiguos y tradicionales en los sistemas operativos tipo UNIX. Utiliza scripts de inicio basados en el shell para manejar el arranque y apagado del sistema, Aunque se sigue  utilizando en algunas distribuciones Linux, muchas de las distribuciones modernas han migrado a otros sistemas de inicio más avanzados, algunas distros que lo usan son Devuan, Antix y MX Linux parcialmente.

**Pros**:

- Es simple y fácil de entender.

- Funciona de manera predecible y es ampliamente compatible con diferentes sistemas.

- Utiliza scripts de inicio bastante legibles.

**Contras**:

- Tiende a ser más lento debido a la secuencialidad de los scripts de inicio.

- No tiene funciones avanzadas de administración de servicios o control de dependencias.

### `OpenRC`:
Este es un sistema de inicio creado por el equipo de Gentoo que se enfoca en ser rápido y eficiente. algunos sistemas populares en donde lo podemos encontrar son Gentoo, Artix y Alpine.

**Pros**:

- Es rápido y eficiente.

- Utiliza scripts de inicio similares a SysVinit, lo que facilita la transición desde SysVinit.

- No depende de complejas dependencias de servicios.

### `Systemd`:
Este es un sistema de inicio más moderno y ampliamente utilizado en muchas distribuciones de Linux. Está diseñado para ser rápido, eficiente y proporcionar una administración avanzada de servicios y control de dependencias.

**Pros**:

- Arranque paralelo para acelerar el tiempo de inicio.

- Administración de servicios avanzada, permitiendo un control más granular y opciones adicionales para cada servicio.

- Control de dependencias más sólido y flexible.

- Uso de registro detallados y herramientas de depuración.

**Contras**:

- Es considerado demasiado complejo y acaparador de funciones para ser solo un init

### `Runit`:
Runit es un sistema de inicio simple y ligero que es conocido por su estabilidad y eficiencia. algunos sistemas populares en donde lo podemos encontrar son Artix, Void Linux, Venom Linux y Dragora GNU/Linux-libre

**Pros**:

- Es Rápido y eficiente.

- Enfoque minimalista y confiable. 

- Proceso de inicio y servicio simple.

**Contras**:

- Puede carecer de ciertas características avanzadas que ofrecen sistemas más complejos.

- Puede requerir configuración adicional para ciertas funcionalidades.

### Init en *BSD

En BSD, tenemos a un sistema de inicio llamado "`rc`". Los archivos de configuración principales se encuentran en `/etc/rc.conf` y y los scripts de inicio se encuentran en `/etc/rc.d/`, este puede variar entre BSDs pero en general son bastante parecidos, siendo en características relativamente similar a sysvinit.

## Conclusión

El init, es el primer proceso del sistema en sistemas tipo unix, que regularmente tiene PID 1, este init es el encargado de iniciar drivers, demonios y demás cosas esenciales del sistema, supervisar que la ejecución
de estos sea adecuada, manejar errores de forma simple, y asegurar un apagado o reinicio correcto, ademas de que tenemos varias opciones de init con distintos pros y contras entre si.

{{< youtube W3T3evz-XB4 >}}
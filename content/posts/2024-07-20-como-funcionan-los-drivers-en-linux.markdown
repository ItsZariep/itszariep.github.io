---
layout: post
title: "¿Cómo funcionan los drivers en Linux?"
date: 2024-07-21
categories: [Informativo, Linux]
image: /img/thumb/comofuncionanlosdriversenlinux.jpg
---

Hola gente ¿cómo están?, espero que estén bien, en esta ocasión voy a mostrar como funcionan los drivers en Linux de una manera resumida y basándome mas que nada en la propia documentación del kernel, la cual pueden encontrar fácilmente en linea para mas detalles, así que sin mas que decir, comencemos.

## ¿Qué es un driver?

Un driver de manera muy resumida (por que no es relevante para el contexto) es un software que traduce instrucciones entre hardware y kernel, para que el hardware haga una acción, o viceversa, así que vamos que es un driver en Linux, que es mas especifico.

En el contexto de Linux, los drivers son módulos que manejan una pieza específica de hardware, desde cosas simples como un teclado o un mouse, hasta cosas complejas como una impresora, en esencia cualquier dispositivo necesita un driver, pero actualmente los dispositivos mas comunes funcionan con simples drivers genéricos que además tiene el kernel de base. Los drivers pueden estar integrados en el kernel o cargarse como módulos separados.

## Tipos de drivers en Linux

En Linux, existen 3 tipos de drivers:

- **Drivers de Dispositivo**: Manejan la interacción con dispositivos de hardware específicos, como discos duros, interfaces de red, dispositivos de entrada (teclados, ratones), etc.

- **Drivers de Interfaz**: Interactúan con protocolos de hardware, como USB, PCI, SATA, etc.

- **Drivers de Pseudo-dispositivos**: Son drivers que no manejan hardware real, sino dispositivos virtuales que el sistema operativo usa para ciertas funciones, como /dev/null o /dev/random.

## Estructura de un driver

Dejando de lado definiciones, ahora toca ver un poco la estructura. Para empezar, tenemos que diferenciar entre drivers que están en el espacio del kernel y los que están en el espacio del usuario.

En el caso del espacio del kernel, los drivers tienen acceso directo al hardware y a las instrucciones de bajo nivel del procesador. Esto es lo más común.

En el caso del espacio de usuario, los drivers no pueden acceder directamente al hardware, así que envían información al kernel, y de ahí el kernel ya maneja los eventos. Esto se ve más que nada con drivers de código cerrado, como los de Nvidia.

Yendo un poco mas a fondo con el primero, los drivers normalmente son Un módulo del kernel (o loadable kernel module, LKM), el cual es un pedazo de código que puede ser cargado y descargado en el kernel a voluntad, sin necesidad de recompilar o reiniciar el sistema. pero tiene que ser normalmente la misma versión del kernel, como derivado están los drivers dkms, que se recompila solo ese driver, cuando hay un nuevo kernel.

Fuera de los módulos, los drivers suelen componerse de 3 piezas principales:

Primero, están las funciones de Inicialización y Limpieza, las cuales son las funciones que se ejecutan cuando el módulo se carga y descarga, regularmente se llaman (`init_module` y `cleanup_module`).

Después está la Interfaz de Manejo de Dispositivos, esta incluye funciones para manejar operaciones de entrada/salida, lectura, escritura y control.

Finalmente Estructuras de Datos del Kernel: Estas estructuras mantienen la información necesaria sobre el dispositivo y el estado del driver.

Finalmente para que los drivers funcionen bien, el kernel es capaz de recibir llamadas al sistema o (syscalls), estas son puntos de entrada para las aplicaciones de usuario para interactuar con el kernel. Cuando una aplicación necesita interactuar con el hardware, realiza una syscall que el kernel redirige al driver adecuado.

Complementando lo anterior, existen las interrupciones, estas son señales del hardware que alertan al CPU de un evento que necesita atención. Los drivers de dispositivos configuran manejadores de interrupciones para responder a estos eventos.

## Analizando un driver

Finalmente, vamos a analizar un ejemplo teórico de como funciona un driver. Este será un dispositivo de bloque, o sea que almacena datos en bloques, por ejemplo en un disco duro.

Los componentes clave de este driver son:

- La estructura `block_device_operations`: Define las operaciones que el driver soporta, como leer, escribir, y otras funciones específicas del dispositivo.

- Y el registro del Dispositivo: Ya que el driver debe registrarse con el subsistema de bloques del kernel para que el sistema operativo lo reconozca. Esto se hace mediante register_blkdev.

Entonces suponiendo que con nuestras súper habilidades de programación pudimos hacer el driver, tenemos que hacer una serie de pasos

- **Compilación del Módulo**: El código fuente del driver se compila en un módulo de kernel (`.ko`).

- **Carga del Módulo**: Se utiliza el comando insmod para cargar el módulo en el kernel.

- **Inicialización**: La función de inicialización del módulo configura el hardware y registra el driver con el kernel.

- **Interacción con el Dispositivo**: El sistema operativo utiliza el driver para comunicarse con el dispositivo según sea necesario.

- **Descarga del Módulo**: Se utiliza el comando rmmod para descargar el módulo, ejecutando la función de limpieza para liberar recursos.

## Analisis a la interacción con el usuario

Analizando la interacción con el usuario, tenemos que muchas veces por no decir siempre, los dispositivos se representan como archivos en el sistema de archivos, típicamente en el directorio `/dev`. Por ejemplo, `/dev/sda` podría representar un disco duro. Una tecnología que ayuda a gestionar esto es Udev, el cual realiza cambios dinámicamente cuando se detecta un nuevo dispositivo.

Fuera del sistema de archivos, tenemos herramientas como `lsmod`, `modprobe`, `insmod`, y `rmmod`, que nos ayudan a gestionar la carga, descarga y ejecución de los módulos del kernel.

## Programar un driver sencillo

Finalmente para analizar mejor el contexto, voy a crear un driver, este va a ser un driver bastante sencillo pero servirá de ejemplo para el propósito.


```
// Primero se incluyen las cabeceras necesarias

#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

// Luego un par de metadatos

MODULE_LICENSE("GPL");
MODULE_AUTHOR("PatoDriver");
MODULE_DESCRIPTION("Módulo de Ejemplo");
MODULE_VERSION("1.0");

//Despues una función de inicio

static int __init ejemplo_init(void) {
    printk(KERN_INFO "Hola, mundo!\n");
    return 0;
}

// Y Finalmente una función de salida
static void __exit ejemplo_exit(void) {
    printk(KERN_INFO "Adiós, mundo!\n");
}

module_init(ejemplo_init);
module_exit(ejemplo_exit);
```

Con esto finalmente toca seguir los tipicos pasos de compilar, cargar y verificar el modulo y todo estaría correcto

Compilar:

```
 make -C /lib/modules/$(uname -r)/build M=$(pwd) modules
```

Cargar:

```
sudo insmod ejemplo.ko
```

Verificar:

```
dmesg | tail (para ver los mensajes del módulo)
```

Descargar (Remover):

```
 sudo rmmod ejemplo
```

---

Bueno gente eso fue todo, como conclusión tenemos que Los drivers en Linux son componentes vitales que permiten la comunicación eficiente y segura entre el hardware y el software. Entender cómo funcionan y cómo se implementan puede ser útil para el desarrollo y mantenimiento de sistemas operativos y hardware.

{{< youtube 51Xw0A9kTOE >}}

---
layout: post
title: "¿Qué es la compresión del kernel en Linux?"
date: 2024-11-09
categories: Informativo Linux
tags: [linux, compresion, programación ]
image: /assets/img/thumb/linuxcompression.jpg
---

Hola gente ¿Cómo están?, espero que estén bien, si alguna vez han visto un sistema linux un poco por dentro, se habrán dado cuenta que el kernel no está como tal en el sistema de archivos, en vez, hay un archivo comprimido que adentro tiene el kernel de verdad y se descomprime en el arranque.

En este video hablaré de como fuciona la compresión del kernel en linux y por que se hace esto en primer lugar, asi que sin mas que decir, comencemos.

### 1. ¿Por qué se usa la compresión en el kernel de Linux? 
La compresión del kernel de Linux es importante porque permite reducir el tamaño del archivo binario del kernel y, por lo tanto, del espacio en disco necesario y el tiempo de carga en el arranque del sistema. Comprimir el kernel permite que se cargue más rápido en la memoria desde un medio de almacenamiento (como un disco duro o SSD) y también reduce el tamaño en sistemas con espacio de almacenamiento limitado, como dispositivos embebidos o sistemas con RAM restringida.

### 2. Métodos de compresión soportados por el kernel 
Linux soporta varios algoritmos de compresión que se pueden usar para comprimir el kernel. Los más comunes incluyen:

- **gzip**: Uno de los métodos de compresión más antiguos y comunes, ofrece buena compresión y es relativamente rápido en descomprimir.
- **bzip2**: Ofrece una mejor compresión que `gzip`, pero es más lento en descomprimir.
- **xz**: Ofrece una compresión aún mejor que `bzip2`, pero también es más lento en descomprimir. 
- **lzo** y **lz4**: Son algoritmos de compresión diseñados para ser rápidos en la descompresión, aunque su compresión no es tan buena como `xz` o `bzip2`.

La elección del algoritmo de compresión puede tener un impacto significativo en el rendimiento del arranque del sistema:
- **gzip** es comúnmente usado en muchas distribuciones por ser una opción balanceada entre velocidad de descompresión y eficiencia de compresión, aunque en sistemas mas modernos se ha optado por usar Lz4.
- **lz4** es preferido en sistemas embebidos o de alto rendimiento, ya que aunque su compresión no es tan eficiente, su descompresión es extremadamente rápid.
- **xz** es común en sistemas donde el tamaño del kernel es más crítico que la velocidad del arranque.

El kernel Linux permite elegir el tipo de compresión al momento de compilarlo, dependiendo de las prioridades (velocidad de descompresión o eficiencia de compresión) que se tengan para el sistema en el que será desplegado.

### 3. Proceso de Compresión y Descompresión

#### a) Compresión del Kernel en el Tiempo de Compilación 
1. **Selección del Algoritmo**: Al momento de configurar el kernel (por ejemplo, usando `make menuconfig`), se puede elegir el algoritmo de compresión deseado. Esto influirá en cómo se construye la imagen comprimida del kernel.
 
2. **Compilación del Kernel**: El kernel se compila y, en lugar de producir un binario sin comprimir, el compilador toma el binario resultante (`vmlinux`) y lo comprime utilizando el algoritmo elegido. Esto produce un archivo comprimido llamado `vmlinuz`.

3. **Construcción del Archivo Cargable**: La imagen `vmlinuz` (o `bzImage`) es una imagen "bootable" del kernel, preparada para ser cargada y ejecutada por el bootloader (por ejemplo, GRUB). Este archivo contiene un pequeño código de "bootstrap" que es responsable de descomprimir el kernel en la RAM cuando el sistema se inicia.

#### b) Descompresión en el Tiempo de Ejecución (Arranque del Sistema) 
1. **Carga por el Bootloader**: Cuando el sistema se inicia, el bootloader (como GRUB o LILO) carga la imagen `vmlinuz` en la memoria. Este archivo, aunque comprimido, contiene un pequeño "bootstrapping code" en el encabezado que es capaz de descomprimir el resto del kernel.

2. **Inicia la Descompresión**: El código de bootstrap se ejecuta y llama al descompresor adecuado (integrado para el tipo de compresión seleccionado, como gzip, lz4, etc.). Este descompresor descomprime la imagen comprimida `vmlinuz` directamente en la memoria RAM.

3. **Descomprimir en la RA M**: Durante el proceso de descompresión, el kernel descomprimido se guarda en una ubicación de memoria específica. Este proceso debe completarse antes de que el kernel pueda tomar el control completo del hardware y comenzar el proceso de inicialización del sistema.

4. **Transferencia de Control al Kernel**: Una vez que la imagen del kernel está completamente descomprimida en la memoria, el código de bootstrap transfiere el control al kernel descomprimido. En este punto, el kernel comienza su ejecución normal, inicializando el sistema, montando los sistemas de archivos, detectando hardware, y más.

### 4. Funciones y Módulos Clave en el Código Fuente del Kernel 
Dentro del código fuente del kernel de Linux, existen módulos específicos para manejar la compresión y descompresión, entre los cuales se destacan:

- **`arch/x86/boot/compressed/`**: Este directorio contiene el código de descompresión del kernel en arquitecturas x86, incluyendo el código de bootstrap y los métodos específicos para cada tipo de compresión.
- **`head_64.S` y `head_32.S`**: Estos archivos contienen las rutinas de arranque y descompresión para arquitecturas de 64 y 32 bits. 
- **`decompress.c`**: Este archivo gestiona el proceso de descompresión y elige el descompresor adecuado en función del tipo de compresión utilizado en la imagen del kernel.

### 5. Diferencias entre `vmlinux`, `vmlinuz` y `bzImage` 
- **`vmlinux`**: Es la imagen del kernel sin comprimir y sin optimizaciones para el arranque. Este archivo no contiene el código de bootstrap necesario para que el sistema lo ejecute desde un bootloader.
 
- **`vmlinuz`**: Es la versión comprimida de `vmlinux` con el encabezado de bootstrap para poder ser descomprimido en el tiempo de arranque. Esta imagen es la que típicamente se carga en sistemas con GRUB o LILO.

- **`bzImage`**: Es una versión optimizada de `vmlinuz` para arquitecturas x86. En este formato, el kernel se organiza en segmentos para evitar limitaciones de tamaño en ciertos sistemas. Aunque contiene la misma funcionalidad que `vmlinuz`, su estructura interna permite manejar kernels más grandes.

### Conclusión

En resumen, la compresión del kernel se divide en 4 puntos importantes

1. **Compilación y Compresión**: Se selecciona el algoritmo de compresión y se genera una imagen comprimida (`vmlinuz` o `bzImage`).
2. **Carga del Kernel**: En el arranque, el bootloader carga `vmlinuz` en la RAM.
3. **Descompresión**: El código de bootstrap inicia la descompresión, expandiendo la imagen comprimida en memoria. 
4. **Transferencia de Control**: Una vez descomprimido, el kernel toma control y comienza la inicialización del sistema.

Saber esto no permite, especialmente si estamos construyendo un kernel personalizado, escojer cual es la mejor opción para una situación especifica, y ustedes, ¿Que tipo de compresión usan? ¿Se les ocurre otra manera de manejar el kernel?, dejenme su opinión en los comentarios

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/OjW1l3lW2X8?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
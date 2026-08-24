---
layout: post
title: "Estructura de carpetas en Linux: Explicación detallada"
date: 2023-08-17
categories: [Informativo, Linux]
image: /img/thumb/carpetaslinux.jpg
---

Hola gente, ¿cómo están? Espero que estén bien. Si usas Linux o algún otro sistema Unix-like, lo más probable es que utilices un esquema de archivos bastante parecido al de Unix. Por esto mismo, navegar entre directorios de diferentes distros Linux o sistemas operativos similares a Unix no tiene mucha diferencia. Pero, ¿alguna vez te has preguntado el significado, la utilidad y por qué de cada directorio común en estos sistemas? En este vídeo veremos precisamente eso. Así que sin más que decir, empecemos.

## Funcionamiento del sistema de archivos

Primero, antes de entender la estructura de los archivos, creo que es apropiado entender como funcionan los sistemas de archivos:

En un vistazo rápido, un sistema de archivos (o filesystem en ingles) es una estructura lógica que organiza la forma en que los datos se almacenan, recuperan y gestionan en un dispositivo de almacenamiento, como un disco duro, una unidad flash o una tarjeta de memoria. Su principal objetivo es permitir que el sistema operativo acceda y administre los archivos y directorios de manera eficiente.

no entraré mucho en detalle por que ya tengo un post explicando como funcionan los sistemas de archivos, pero en un contexto rápido, son una suma de organización jerárquica, uso de inodos y bloques, journaling y uso inteligente de acceso y almacenamiento de datos.

## Discos y particiones

Ya entendiendo los sistemas de archivos, estamos listos para entender los discos y particiones de un sistema tipo unix, estos discos para el sistema son archivos que se suelen encontrar en /dev, luego entraré mas en detalle sobre eso, pero estos pseudo archivos se crean en función de que dispositivos de almacenamiento tengas conectados, la jerarquia de nombres común es sd, una letra de la a a la z para determinar el dispositivo, seguido de un numero de partición, por ejemplo, si hablamos de la segunda partición del disco principal, estaremos hablando de sda2, el disco principal siempre sera sda por norma y lógicas.

Para los que se lo pregunten, cuando por ejemplo hay mas de 26 discos conectados por alguna razón y ya no hay mas letras, se usan 2 letras, por ejemplo sdaa, sdab, sdac y asi sucesivamente, también esta bien aclarar que las particiones pueden tener distintos sistemas de archivos a pesar de que estén en el mismo disco.

## Jerarquia de directorios

Ya sabiendo como funcionan los dispositivos de almacenamiento podemos entender la jerarquia del sistema operativo, primero tenemos a la raíz, este es el directorio madre de todo el sistema, y en el podemos encontrar una variedad de directorios importantes, los directorios se separan de subdirectorios o archivos dentro de ese directorio, usando una diagonal (/):

`/bin`: Contiene comandos esenciales del sistema que pueden ser utilizados por todos los usuarios. Estos son programas básicos que son necesarios para el funcionamiento del sistema, como ls (listar archivos), cp (copiar archivos) o mkdir (crear directorios).

`/sbin`: Similar a /bin, pero contiene comandos esenciales que solo el administrador del sistema (root) puede ejecutar. Estos comandos generalmente están relacionados con la administración y configuración del sistema.

`/lib`: Contiene las librerías compartidas del sistema, es esencial para que la mayoría de programas se ejecuten y no haya librerías repetidas

`/lib64`: Lo mismo que lib pero en 64 bits

`/etc`: Contiene archivos de configuración del sistema. Aquí se encuentran archivos como passwd (información de usuarios), hosts (resolución de nombres de dominio) y fstab (información de montaje de dispositivos).

`/usr`: Esta es una de las carpetas más grandes y complejas en el sistema. Se utiliza para instalar programas y datos que no son esenciales para el funcionamiento del sistema. Contiene subdirectorios como /usr/bin (comandos para usuarios), /usr/lib (bibliotecas compartidas), /usr/share (datos compartidos entre aplicaciones) y más, luego entrare mas en detalle.

`/var`: Almacena datos variables que pueden cambiar durante la ejecución del sistema. Aquí se encuentran archivos de registro (logs), bases de datos, correos electrónicos y otros datos temporales o cambiantes.

`/home`: Contiene directorios personales de usuarios. Cada usuario normalmente tiene una carpeta con su nombre de usuario (por ejemplo, `/home/juan`) donde pueden almacenar sus archivos y configuraciones personales.

`/root`: Este es el directorio personal del usuario administrador del sistema (root). A diferencia de los usuarios normales, el directorio raíz se encuentra aquí en lugar de /home/root por conveniencia.

`/tmp`: Un directorio temporal donde se almacenan archivos temporales creados por el sistema y los usuarios. Estos archivos suelen eliminarse automáticamente cuando el sistema se reinicia.

`/dev`: Contiene archivos especiales que representan dispositivos fisicos en el sistema. Por ejemplo, `/dev/sda` representa el primer disco duro, `/dev/null` es un dispositivo especial que descarta datos, y `/dev/tty` es el terminal actual.

`/proc`: Proporciona una interfaz al kernel del sistema operativo y muestra información sobre los procesos en ejecución y otros detalles del sistema en tiempo real.

`/sys`: Similar a /proc, pero proporciona una interfaz para acceder y configurar parámetros del kernel, principalmente relacionados con dispositivos y controladores.

`/mnt` y `/media`: Son directorios utilizados para montar dispositivos externos, como unidades USB, discos duros externos o CD-ROM.

`/opt`: Es utilizado para la instalación de paquetes de software adicionales no proporcionados por el sistema operativo o sus gestores de paquetes.

`/boot`: tiene toda información relacionada con el boot loader, como archivos de configuración, imagenes del kernel o incluso el propio bootloader

Esta es la estructura básica y común, pero hay que aclarar mas información sobre un par de directorios

### `/usr`

Dentro de usr tenemos basicamente varias de las mismas cosas que en el root pero pensados para cosas a nivel usuario, como programas instalados que no vienen con el sistema.

Entre estos los repetidos son bin, lib, lib32, y lib64, algunos extras suelen ser:

man que tiene las manpages

local que suele incluir cosas locales como su nombre indica

include que es para los headers en librerias de programación especialmente en C y C++

Y en linux suele estar src para cosas relacionadas con el o los kernel

Entrando mas en detalle sobre local, en el caso de la carpeta en /usr no suele ser muy usada a menos que en serio no se quiera ese programa en /usr/bin, pero debido a la estructura, en la home podremos replicar este local, lo que nos lleva a la estructura común de la home.

### `Home`

En la home, adentro de una carpeta con nuestro username, en caso de tener un sistema que use estandares xdg, tenemos Desktop, Music, Pictures, Downloads y Videos, estos se describen solos, Templates es algo extra que es para varias cosas, entre esos lo mas común son plantillas para cuando crees un nuevo archivo, poder usar una de las plantillas establecidas.

Fuera de eso, tambien hay directorios y archivos ocultos, en sistemas tipo unix podemos esconder archivos de 2 formas, primero simplemente poniendo un punto antes del nombre del archivo, y segundo creando un archivo llamado .hidden donde adentro estaran los directorios y archivos, volviendo a la home, entre los directorios y ficheros ocultos comunes estan:

`.local`: aqui hay cosas a las que solo puede acceder el usuario, por ejemplo esta .local/bin, .local/share, .local/share/icons para los iconos visuales etc,

`.config`: aca estan los archivos de configuración del usuario, antes de que existan, estos se suelen copiar de una plantilla existente en /etc

`.icons` y `.themes`: son equivalentes obsoletos de .local/share/icons y themes

`.shellrc`: esto se refiere a la configuración de la shell, por ejemplo .bashrc, .tcshrc o .zshrc

`.profile`: cosas que se ejecutan para el usuario y no son dependientes de la shell

Finalizando con la home, cabe aclarar que la home también es conocida como "`~/`", esto nos puede ahorrar bastante tiempo al querer acceder a un archivo de la home si no estamos ahi.

## Enlaces simbolicos en sistemas modernos

Finalizando con la jerarquía, es importante aclarar que aunque muchos directorios tienen usos específicos de parte de unix, en la practica, en sistemas modernos se suele usar mucho el uso de enlaces simbólicos, o sea, redirecciones para que 2 carpetas tengan el mismo contenido, por ejemplo, hacer que /bin, /sbin/, /usr/bin y /usr/sbin lleven al mismo lugar.

Algo parecido sucede con las librerías, separando las arquitecturas evidentemente, esto se debe a varias necesidades de los sistemas modernos y formas de pensar, aunque es bastante variable la implementación, regularmente se suele respetar la estructura aunque haya muchos enlaces simbólicos.

Otro detalle secundario, es que puedes dejar cualquier directorio vació, y usar una partición o disco específicamente para esa función, para eso simplemente debes montar el disco o partición usando el directorio objetivo, por ejemplo, mount /dev/sda2 /bin, esto montara la segunda partición en /bin, y en esa partición se guardaran los binarios, si montas en una carpeta que es un enlace simbólico, no pasará nada grave y todos los enlaces redireccionarán a tu disco.

## Conclusión

En sistemas tipo unix, se utilizan particiones del estilo sd, letra, seguido de un numero en función de la partición (ejemplo: sda1 o sdc2), un disco puede tener varios sistemas de archivos por partición, en la mayoría de sistemas nos manejamos con una raíz con directorios importantes, y en la actualidad se ha adoptado el uso de enlaces simbólicos para simplificar la estructura.

{{< youtube Bi-C6xGGdtM >}}
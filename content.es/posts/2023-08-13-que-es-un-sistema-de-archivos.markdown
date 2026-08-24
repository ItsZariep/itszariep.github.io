---
layout: post
title: "¿Qué es un sistema de archivos?"
date: 2023-08-13
categories: [Hardware, "Sistemas Operativos"]
image: /img/thumb/sistemadearchivos.jpg
---


¡Hola gente! ¿Cómo están? Espero que estén bien. Lo más probable es que tengas un dispositivo de almacenamiento, ya sea interno como un disco duro, o uno externo como una memoria USB. Pero, ¿alguna vez te has preguntado cómo funcionan a nivel de software? En esta ocasión mostraré cómo funcionan los 
sistemas de archivos en dispositivos de almacenamiento. Así que sin más que decir, ¡comencemos!

## Como se determina el sistema de archivos

Primero, ¿cómo se determina y se sabe qué sistema de archivos se está usando?

Para determinar el sistema de archivos, el sistema operativo generalmente lee la información almacenada en el inicio de la partición. 

Cada sistema de archivos tiene una estructura única y una firma que lo identifica. Por ejemplo, el sistema de archivos ExFat tiene una firma específica en su sector de inicio, al igual que NTFS u otros sistemas de archivos, sin embargo estas firmas son distintas entre si.

Cuando el sistema operativo monta una partición, busca esta firma y utiliza el driver correspondiente para ese sistema de archivos para interpretar los datos almacenados en ella. En los sistemas mas modernos ya hay de base controladores para leer y escribir en los sistemas de archivos mas populares como ExFat por ejemplo.

Los dispositivos de almacenamiento también tienen una tabla de particiones, su función es proporcionar información sobre la disposición de las particiones en el disco y sus tamaños, esta se encuentra en los primeros sectores del dispositivo.

En resumen rápido, el sistema operativo determina el sistema de archivos de una partición leyendo la información almacenada en el sector de inicio de la partición, la cual o las cuales son determinadas gracias a la tabla de particiones, luego el sistema utiliza los drivers adecuados para interactuar con ese sistema de archivos y acceder a los datos.

## ¿Qué son los sistemas de archivos?

Con la base en mente, ya podremos continuar con los sistemas de archivos, estos en contexto rapido, son una estructura organizada que se utiliza para almacenar y gestionar los datos en un dispositivo de  almacenamiento, como un disco duro, una memoria usb, una tarjeta sd o cualquier otro medio de  almacenamiento.

Es una parte esencial del sistema operativo de una computadora que permite la creación, modificación,  eliminación y búsqueda de archivos y directorios. Los sistemas de archivos proporcionan una forma de organizar la información de manera jerárquica, donde los directorios pueden contener archivos y  subdirectorios.

Los archivos son unidades básicas de almacenamiento que pueden contener datos, programas, imágenes, videos o cualquier otro tipo de información. 

## Funcionamiento de los sistemas de archivos

La mayoria de sistemas de archivos se conforman de las siguientes caracteristicas:

**Organización de bloques y Sectores**: Los sistemas de archivos organizan la información en bloques o clústeres. Cada bloque contiene una cierta cantidad de bytes (por ejemplo, 4KB o 8KB). A su vez, los dispositivos de almacenamiento físico, como discos duros, están divididos en sectores, que generalmente tienen 512 bytes cada uno. Los sistemas de archivos se encargan de gestionar cómo se asignan estos bloques y sectores para almacenar los datos.

**Inodos**: La mayoría de los sistemas de archivos utilizan una estructura para llevar un registro de qué bloques están ocupados y cuáles están libres. Esto se realiza a través de una tabla de asignación de archivos (en FAT) o mediante la utilización de inodos. El sistema operativo consulta esta tabla o estructura para saber qué bloques están disponibles para almacenar nuevos datos y cómo están distribuidos los archivos en el almacenamiento.

**Nombre y ubicación de archivos**: Los sistemas de archivos almacenan los nombres de los archivos junto con información sobre su ubicación en el disco. La información sobre la ubicación de los archivos se guarda en la tabla de asignación (FAT) o en los inodos. El sistema de archivos mapea el nombre del archivo a su ubicación física en el dispositivo de almacenamiento.

**Directorios**: Los sistemas de archivos utilizan directorios para organizar los archivos en estructuras jerárquicas, similar a un árbol. Un directorio es simplemente un tipo especial de archivo que contiene entradas que asocian nombres de archivos con sus ubicaciones físicas en el almacenamiento. Los directorios pueden contener subdirectorios, lo que permite organizar los archivos en una estructura en forma de árbol.

**Metadatos**: Además de los datos reales de los archivos, los sistemas de archivos almacenan metadatos sobre ellos. Estos metadatos pueden incluir información sobre el propietario del archivo, los permisos de acceso, las fechas de creación y modificación, entre otros detalles. Los metadatos permiten al sistema operativo realizar operaciones de gestión y control sobre los archivos y directorios. 

**Operaciones de lectura y escritura**: Los sistemas de archivos gestionan las operaciones de lectura y escritura de los archivos. Cuando un programa o usuario desea acceder a un archivo, el sistema operativo utiliza la información de la tabla de asignación o inodos para encontrar su ubicación en el almacenamiento y recuperar o almacenar los datos solicitados.

**Integridad y seguridad**: Los sistemas de archivos suelen ser capaces de mantener la integridad de los datos almacenados y protegerlos contra pérdidas o daños. Para ello, utilizan diversas técnicas como copias de seguridad, control de errores, sistemas de archivos journaling, etc.

**Journaling**: El journaling o registro en diario es una técnica utilizada en algunos sistemas de archivos para mejorar la integridad de los datos y la recuperación después de un fallo del sistema o un corte de energía. Cuando un archivo se modifica, en lugar de escribir directamente en el bloque original, el sistema de archivos escribe primero los cambios en un "registro en diario" o "journal" que se encuentra en una ubicación segura. Luego, el sistema de archivos actualiza el bloque original. Si ocurre un fallo durante la escritura, el sistema de archivos puede recuperarse utilizando el registro en diario para deshacer o rehacer las operaciones pendientes y evitar corrupción de datos.

Esto es lo mas esencial, pero puede variar dependiendo de un sistema de archivos.

## Analisis y comparación de distintos sistemas de archivos

**NTFS (New Technology File System)**: Este el sistema de archivos predeterminado para Windows desde  Windows NT, o sea a partir de Windows 2000, este proporciona una serie de características avanzadas, como control de acceso a archivos, cifrado, compresión y recuperación de datos.

**FAT32 (File Allocation Table 32)**: Este es un sistema de archivos antiguo y fue ampliamente utilizado en  sistemas Windows más antiguos y dispositivos USB. Tiene limitaciones en cuanto al tamaño máximo de archivo y tamaño máximo de partición, lo que lo hace menos adecuado para unidades de almacenamiento de gran capacidad, ademas de que por archivo tenia un limite de 4gb.

**exFAT (Extended File Allocation Table)**: Este es una extensión del sistema de archivos FAT32 y fue desarrollado por Microsoft para superar las limitaciones de FAT32. Es bastante popular y compatible, siendo ampliamente utilizado en dispositivos de almacenamiento externo, como unidades usb y tarjetas SD, por esto mismo evidentemente este ya no tiene los problemas de almacenamiento de fat32

**APFS (Apple File System)**: Este es el sistema de archivos predeterminado utilizado por macOS High Sierra (10.13) y versiones posteriores. Fue desarrollado por Apple para reemplazar HFS+ y está diseñado específicamente para dispositivos SSD y sistemas de 64 bits. Ofrece ventajas en términos de velocidad, eficiencia y seguridad.

**ext4 (Fourth Extended File System):** este es una versión mejorada de ext3 y es el sistema de archivos predeterminado utilizado en muchas distribuciones de Linux. Proporciona journaling, soporte para archivos
grandes y particiones de gran tamaño, y es adecuado para sistemas de archivos de alto rendimiento.

**ZFS (Zettabyte File System)**: Este es un sistema de archivos avanzado y escalable desarrollado originalmente por Sun Microsystems y utilizado en sistemas Solaris y algunas variantes de FreeBSD. Es conocido por su capacidad de administrar grandes cantidades de almacenamiento y proporcionar características como snapshot y RAID-Z.

**Btrfs (B-tree File System)**: Btrfs es un sistema de archivos de próxima generación desarrollado para sistemas Linux. Está diseñado para ser escalable, eficiente y confiable, y se basa en una estructura de árbol balanceado (B-tree) para administrar los datos. 

Btrfs ofrece varias características avanzadas, incluyendo la administración de snapshots, clonación de subvolúmenes, compresión, desduplicación de datos y RAID nativo. Además, Btrfs admite la detección y recuperación de errores, lo que lo hace adecuado para sistemas de almacenamiento de gran tamaño.

**XFS (X File System)**: XFS es otro sistema de archivos que ha sido ampliamente utilizado en sistemas Linux. Fue desarrollado por Silicon Graphics y ofrece un alto rendimiento y escalabilidad para sistemas de archivos de gran tamaño. 

XFS está diseñado para manejar eficientemente grandes volúmenes de datos y archivos, lo que lo hace especialmente útil para servidores y sistemas de almacenamiento de alto rendimiento. Al igual que otros sistemas de archivos modernos, XFS también admite características como journaling y crecimiento en línea. 

También hay otros sistemas de archivos como `F2FS` que se usa en bastantes android o `ReFS` que es un intento de crear un sistema de archivos mas dedicado a servidores, pero si me pongo a hacer una lista, el post queda muy extenso.

## Conclusión

Los sistemas de archivos son una parte esencial de cualquier dispositivo de almacenamiento, estos se usan por partición las cuales son manejadas por la tabla de particiones, a su vez, un mismo dispositivo puede tener
varios sistemas de archivos repartidos entre sus particiones, estos sistemas de archivos son bastante variados y tienen pros y contras que los hace excelentes opciones para sus respectivos contextos.

{{< youtube v_F0OkFzfLY >}}
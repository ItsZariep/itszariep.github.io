---
layout: post
title: "¿Que es el VFS en Linux? (Manejo de almacenamiento)"
date: 2025-11-24
categories: [Informativo]
tags: [linux]
image: /img/thumb/vfslinux.jpg
---


¡Hola gente! ¿Cómo estan? espero que estén bien, Si usan Linux o en general un sistema unix-like, es bastante probable, y en realidad casi obligatorio, que hayan usado un sistema de archivos, pero ¿como es que estos se comunican con el kernel?. A esto se le llama *Virtual File System*  (VFS o **Sistema de Archivos Virtual** en español).

El VFS Constituye uno de los pilares fundamentales del **kernel Linux**. Ya que su propósito es proporcionar una abstracción unificada para la manipulación de archivos, independientemente del tipo de sistema de archivos (como podría ser ext4, zfs, nfs, etc.). Esta capa permite que las aplicaciones y las llamadas al sistema interactúen con los archivos de manera uniforme, sin requerir conocimiento sobre los detalles de implementación física o lógica de los distintos sistemas de almacenamiento.

Más allá de ser una mera capa de compatibilidad, el VFS es mas como una arquitectura modular y extensible, capaz de integrar sistemas de archivos locales, distribuidos, pseudo-sistemas (como `/proc` o `/sys`), y dispositivos virtuales. Su diseño también refleja la filosofía de Unix: “todo es un archivo”.

En esta ocasión itentaré explicar de manera sencilla, que es el VFS, como funciona y cuales son sus usos en sistemas modernos, y aunque en general aplica para casi cualquier unix-like, me enfocaré en linux por ser el sistema que mas conozco, asi que sin mas que decir, comencemos .

### Fundamentos Conceptuales del VFS

El VFS define una interfaz abstracta que debe ser implementada por cada sistema de archivos que desee integrarse al kernel. Esta interfaz está compuesta por estructuras de datos y operaciones estándar que encapsulan el comportamiento de archivos, directorios, nodos y superblocs.

El núcleo del modelo VFS gira en torno a cuatro estructuras clave:

1. `super_block`
   Representa una instancia montada de  un sistema de archivos. Contiene metadatos globales (como tamaño de bloque, estado de montaje, punteros a operaciones del sistema de archivos) y sirve como raíz de la jerarquía interna.

2. `inode`
   Es la representación en memoria de un archivo o directorio. Cada *inode* contiene información sobre permisos, propietario, tamaño, marcas temporales y punteros a las operaciones asociadas (`inode_operations`), pero no su nombre (el nombre está asociado al directorio que lo referencia).

3. `dentry` (directory entry)

   Es la estructura que utiliza el kernel para mantener un seguimiento de la relación entre un nombre de archivo  y su inode. Este también tiene  El **dentry cache** mantiene las relaciones entre nombres y *inodes*. Esta capa intermedia permite resolver rutas y facilita una caché que mejora el rendimiento al evitar búsquedas repetitivas en disco.

4. `file`
   Representa una instancia abierta de un archivo, vinculada a un descriptor de archivo de usuario. Contiene punteros a las operaciones que pueden ejecutarse sobre el archivo (`file_operations`) y mantiene el desplazamiento actual (**file offset**).

Estas estructuras interactúan para proporcionar una interfaz coherente y eficiente. Cuando un proceso ejecuta, por ejemplo, `open()`, el VFS coordina la resolución de nombre (mediante dentries), obtiene el *inode* correspondiente, crea una estructura *file* y asocia las operaciones adecuadas del sistema de archivos subyacente.

### Arquitectura y Flujo de Operaciones

El flujo general de una operación en el VFS puede resumirse en los siguientes pasos:

1. Llamada al sistema: 
   Una aplicación invoca una función estándar como `open()`, `read()`, `write()`, o `close()`.
   Estas llamadas son traducidas en llamadas al kernel (syscalls) y dirigidas al VFS.

2. Resolución de nombre y búsqueda de *inode*:
   El VFS analiza la ruta (path lookup) usando la caché de dentries. Si el *dentry* no está en caché, se consulta el sistema de archivos subyacente.

3. Creación de la estructura `file`:
   El VFS asigna un descriptor de archivo al proceso y asocia las operaciones definidas en el sistema de archivos físico.

4. Delegación al sistema de archivos real:
   Una vez identificado el *inode*, las operaciones de lectura o escritura se delegan a las funciones concretas de ese sistema de archivos (por ejemplo, ext4, tmpfs o NFS).
   Esta delegación ocurre a través de las tablas de operaciones: `inode_operations`, `file_operations`, `super_operations`.

5. Caché y coherencia:
   El VFS mantiene diversas cachés (páginas, dentries, inodes) para minimizar el acceso a disco y coordina la coherencia de datos mediante el subsistema de memoria y *writeback*.


### La Abstracción del Montaje

El VFS también gestiona la **jerarquía de montaje**. Cada punto de montaje se representa mediante una estructura `vfsmount` que asocia un *super_block* con una posición dentro del árbol global de directorios. Así, el VFS construye una **vista unificada del espacio de nombres del sistema**, donde distintos sistemas de archivos pueden coexistir de manera transparente.

Por ejemplo, el árbol raíz (`/`) puede residir en un sistema `ext4`, mientras que `/home` puede ser un volumen NFS y `/proc` un sistema virtual generado en memoria. El VFS es responsable de mantener la coherencia de las operaciones entre estos espacios heterogéneos.


### Mecanismos de Extensibilidad


La arquitectura modular del VFS permite añadir nuevos sistemas de archivos sin alterar el código existente del kernel. Un desarrollador puede implementar las estructuras de operaciones y registrarlas mediante la interfaz del kernel (`register_filesystem()`), definiendo cómo se montará y qué operaciones soportará.

Entonces, el VFS sirve de base para capas superiores como:

* **Stackable filesystems** (ej. eCryptfs, OverlayFS): permiten montar un sistema de archivos sobre otro.
* **Pseudo-filesystems**: como `/proc` (interfaz con procesos y kernel), `/sys` (sysfs), o `/dev` (udev), que exponen información del kernel y dispositivos en forma de archivos.
* **Redirfs** y **FUSE (Filesystem in Userspace)**: permiten implementar sistemas de archivos en espacio de usuario con soporte del VFS.

### Consideraciones de Rendimiento y Diseño

El diseño del VFS combina eficiencia y flexibilidad mediante tres estrategias clave:

1. Cachés jerárquicos:
   El *dentry cache* y el *inode cache* reducen drásticamente el coste de acceso a disco.

2. Desacoplamiento lógico:
   La separación entre estructuras (inode, file, superblock) facilita el mantenimiento de estados independientes para múltiples procesos.

3. Interacción con el subsistema de memoria:
   El VFS coopera con la capa de gestión de memoria y page cache para unificar el almacenamiento de datos de archivos y páginas virtuales, evitando redundancias.


### Conclusión

El Virtual File System (VFS) es uno de los componetes más refinados del kernel Linux. Su diseño modular y su capacidad para abstraer la diversidad de los sistemas de archivos lo convierten en un elemento central del modelo Linux y Unix contemporáneo.
Actúa como mediador entre la semántica de alto nivel de las operaciones sobre archivos y las implementaciones específicas de cada sistema de almacenamiento, garantizando uniformidad, extensibilidad y rendimiento.

En un sentido más amplio, el VFS no solo es un mecanismo técnico, sino una arquitectura que prioriza la transparencia, interoperabilidad y la modularidad, principios que han permitido su adaptabilidad desde entornos embebidos hasta supercomputadores y sistemas distribuidos globalmente.

{{< youtube YcgfiyvJMx8 >}}
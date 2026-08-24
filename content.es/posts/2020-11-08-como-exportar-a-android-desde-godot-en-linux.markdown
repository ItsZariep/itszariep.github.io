---
layout: post
title: "Como exportar a Android desde Godot en Linux"
date: 2020-11-08
categories: [Tutorial]
image: /img/thumb/exportargodotandroid.jpg
---

¡Hola gente! como estan? espero que estén bien. En esta ocasión voy a mostrar como exportar juegos de Godot a Android desde Linux.

## Procedimiento

Lo primero es abrir el proyecto, y dentro de el, abrir el apatado para exportar, al escojer a android lo mas probable es que salgan muchos avisos de que nos faltan cosas.

Entonces hay que primero descargar la plantilla de construccion de Android (`Proyecto -> Instalar plantillas de construcción de Android`), le damos en descargar y seleccionamos la URL.

Despues hay que descargar el ADB y el OpenJDK , para esto son necesarios 2 paquetes, el primero es «`android-tools`» y el segundo es «`jdk-openjdk`», los nombres pueden variar según la distribución Linux usada,

Despues hay que identificar la ruta de los binarios necesarios, esto con el comando «whereis«:

```
ItsZariep@PC~-> whereis adb
adb: /usr/bin/adb
ItsZariep@PC~-> whereis adb
jarsigner: /usr/bin/adb
```

Estas rutas hay que ponerlas en `Editor -> Ajustes del editor -> Exportación -> Android`

Debajo de las entradas de adb y jarsigner, habrá una tercera entrada llamada «`Debug keystore`», está hay que generarla manualmente con el comando 

```
keytool -keyalg RSA -genkeypair -alias androiddebugkey -keypass android -keystore debug.keystore -storepass android -dname "CN=Android Debug,O=Android,C=US" -validity 9999 -deststoretype pkcs12`
```

Este comando generará un archivo llamado debug.keystore en la ruta personal (`$HOME`), asi que desde godot hay que seleccionar ese archivo.

Finalmente antes de exportar, hay que marcar la opción de importar ETC en los ajustes del proyecto (`renderizado -> Compresión de VRAM -> Importar ETC`).

Con esto ya estaría todo preparado para exportar el proyecto.
---
layout: post
title: "Forzar / Emular una versión de OpenGL en Linux"
date: 2024-08-13
categories: [Linux, Tutorial]
image: /img/thumb/gloverride.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. En esta ocasión, voy a mostrar cómo forzar la versión de OpenGL en Linux. Esto es útil, especialmente en equipos viejos donde la versión de OpenGL soportada no es muy alta.

## Aclaración

Aunque esto es posible, no hay que esperar un rendimiento espectacular. Además, algunos programas sencillamente no van a funcionar con el método normal. En ese caso, tocaría usar el renderizador por software, que es aún más lento. Aun así, en muchos casos, bajando la resolución, se pueden disfrutar de juegos.

En mi laptop con Core2Duo P8600 y gráficos Intel Q45, he podido jugar juegos como Minecraft 1.20.X o juegos hechos en Unity (solo nativos) como Hollow Knight, ademas de poder usar OBS Studio.

##P reparación

Hacer esto es realmente fácil gracias a las variables de entorno de Mesa, que nos permiten manipular el comportamiento de OpenGL. Las variables que nos interesan son las siguientes:

`MESA_GL_VERSION_OVERRIDE`: Cambiar la versión de OpenGL reportada.

`MESA_GLSL_VERSION_OVERRIDE`: Cambiar la versión de GLSL reportada.

`MESA_GLES_VERSION_OVERRIDE`: Cambiar la versión de OpenGL ES reportada.

`LIBGL_ALWAYS_SOFTWARE`: Usar el CPU en vez del GPU para renderizar (lento).

## Procedimiento

Simplemente declara la variable de entorno antes del comando del programa. Por ejemplo, si queremos ejecutar Alacritty, que pide OpenGL 3.3 y GLES 3.3, hay que poner:

```
MESA_GL_VERSION_OVERRIDE=3.3 MESA_GLSL_VERSION_OVERRIDE=330 alacritty
```

En el caso de la versión de GL y GLES, se pone la versión con decimal (2.1, 3.0, 3.3, 4.6), mientras que con GLSL se pone sin decimal y con un 0 de más (210, 300, 330, 460).

### Renderizador por software

Si el programa no funciona con el método anterior, la otra solución es usar software (CPU) para renderizar. Esto es muy lento e incluso inviable en algunos contextos, pero puede ser una opción. Este método se usa de manera similar al método anterior:

```
LIBGL_ALWAYS_SOFTWARE=1 alacritty
```


### Aplicar el método en Steam

Para aplicar el método en Steam, usa las variables de entorno seguidas de %command%, y luego los argumentos del juego:

```
MESA_GL_VERSION_OVERRIDE=3.3 MESA_GLSL_VERSION_OVERRIDE=330 %command%
```

### Aplicar el método en lanzadores de Minecraft

Con Minecraft, el método general puede causar problemas, así que hay que ajustarlo un poco. En este caso, hay que buscar un launcher (yo uso Prism Launcher) que permita establecer el comando wrapper (wrapper command) y configurarlo de la siguiente 
forma:

```
sh -c "export MESA_GL_VERSION_OVERRIDE=4.6 MESA_GLSL_VERSION_OVERRIDE=460; exec $INST_JAVA "$@""
```
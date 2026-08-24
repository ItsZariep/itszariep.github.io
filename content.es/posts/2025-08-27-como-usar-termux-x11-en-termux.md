---
layout: post
title: "Cómo usar Termux-X11 en Termux"
date: 2025-10-27
categories: [Tutorial]
tags: [termux, x11]
image: /img/thumb/termux-x11.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. En esta ocasión quiero mostrar una guía rápida acerca de cómo usar **Termux-X11** en **Termux**, así que, sin más que decir, comencemos.

## Requisitos

* [Termux](https://github.com/termux/termux-app)
* [Termux-X11](https://github.com/termux/termux-x11)

## Procedimiento

### Instalar paquetes necesarios

```
pkg update
```

```
pkg install x11-repo
```

```
pkg install termux-x11-nightly
```

> Si tienes [pacman en Termux]({{< relref "2023-02-23-Termux-Reemplazar-DPKG-APT-por-pacman" >}}), no es necesario instalar `x11-repo`.

Además de esto, también se puede instalar un entorno de escritorio o gestor de ventanas. En este ejemplo usaré `IceWM` y `XFCE` como ejemplos, pero los repositorios de Termux tienen otras opciones como `Openbox` o `Lxqt`.

### Configurar el entorno

En este punto, Termux debería tener `termux-x11` como comando disponible. Es recomendable declarar `$DISPLAY=:0` como variable de entorno, dentro del archivo `~/.profile` (si no existe, se puede crear con `touch ~/.profile`) para que cualquier programa que abramos se ejecute en la sesión de Termux-X11.

* `~/.profile`:

```
export DISPLAY=:0
```

### Ejecutar el entorno gráfico

Ahora solo hace falta ejecutar `termux-x11` y el entorno de escritorio o gestor de ventanas deseado (de preferencia en una nueva sesión de Termux).

Por suerte, esto se puede resumir en un solo comando:

```
termux-x11 :0 -xstartup "dbus-launch --exit-with-session {comando}"
```

Por ejemplo:

* `XFCE`:

```
termux-x11 :0 -xstartup "dbus-launch --exit-with-session startxfce4"
```

* `IceWM`:

```
termux-x11 :0 -xstartup "dbus-launch --exit-with-session icewm-session"
```

Si escogieron otro entorno, toca ver cuál es el comando, por ejemplo: `fluxbox`, `openbox`, `startlxqt` o `mate-session`.

De preferencia, pueden guardarlo en un comando (por ejemplo, en `~/../usr/bin`) y darle permisos de ejecución. Por ejemplo:

* `~/../usr/bin/customx11`

```
termux-x11 :0 -xstartup "dbus-launch --exit-with-session icewm-session"
```

```
chmod +x ~/../usr/bin/customx11
```

Con esto, ahora solo con poner `customx11` se lanzará el entorno:

```
customx11
```

### Terminar la sesión

Normalmente basta con cerrar la sesión (o terminar el gestor de ventanas) desde la interfaz gráfica. Si no, con presionar `Ctrl + C` debería terminarse la sesión.

## Conclusión

Usar **Termux-X11** es útil por si queremos o necesitamos un entorno tipo Linux tradicional en nuestros dispositivos Android. Termux-X11 también soporta teclado y ratón, lo cual mejora la experiencia de usuario.



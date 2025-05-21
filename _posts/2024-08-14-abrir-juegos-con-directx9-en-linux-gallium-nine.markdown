---
layout: post
title: "Abrir juegos con DirectX 9 en Linux (Wine) (Sin perdida de rendimento)"
date: 2024-08-13
categories: Linux Tutorial
image: /assets/img/thumb/galliumnine.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, en está ocasión voy a mostrar como ejecutar programas y juegos de Windows que usen directx 9, esto mediante wine pero sin dxvk ni wined3d, si no que propiamente con directx, sin intermediarios, esto es gracias a wine-nine y los drivers Gallium de Mesa.

Esto es especialmente util en hardware viejo que no soporta tecnologias modernas y wined3d causa una penalización de rendimiento.

## Preparación

- Tener un driver galllium, si usas Arch, procura tener `mesa` y no `mesa-amber`.

- Tener Wine instalado.

- Tener wine-nine instalado, puedes seguir las instrucciones del propio [GitHub del projecto](https://github.com/iXit/wine-nine-standalone).

## Procedimiento

Si ya tienes instalado `wine-nine`, simplemente habilitalo con los comandos:

```
wine ninewinecfg
```

```
wine64 ninewinecfg
```

En caso de recibir el error `ShellExecuteEx failed: File not found`, prueba con:

```
wine64 /usr/lib/wine/x86_64-windows/ninewinecfg.exe
```

```
wine /usr/lib32/wine/i386-windows/ninewinecfg.exe
```

Al hacer esto, se abrirá un dialogo, tenemos que asegurarnos que "Enable Gallium Nine for better D3D9 graphic performance" esté activado, despues de eso, al abrir un juego que use DirectX 9 desde el terminal, debería salir un mensaje similar a este:

```
Native Direct3D 9 v0.9.0.396-release is active.
For more information visit https://github.com/iXit/wine-nine-standalone
```

![Abriendo un juego con wine-nine]({{ site.baseurl }}/assets/img/content/gallium1.webp)

<figcaption>Abriendo un juego con wine-nine</figcaption>

## Medir rendimiento

Mangohud no funcionará bajo wine-nine, asi que lo mas cercano que tenemos es `GALLIUM_HUD`, para usarlo simplemente debemos declarar una variable de entorno:

Grafico con fps:

```
GALLIUM_HUD=fps
```

Texto simple con algunos datos (yo personalmente uso este):

```
GALLIUM_HUD=simple,fps+cpu+GPU-load+frametime
```

Ejemplo
```
GALLIUM_HUD=simple,fps+cpu+GPU-load+frametime wine game.exe
```


Para mas información acerca de Gallium HUD puedes ver [esta guía](https://manerosss.wordpress.com/2017/07/13/howto-gallium-hud/)(en inglés).


![Flatout con información de GALLIUM_HUD]({{ site.baseurl }}/assets/img/content/gallium2.webp)
<figcaption>Flatout con información de GALLIUM_HUD</figcaption>
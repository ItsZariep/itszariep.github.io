---
layout: post
title: "Cómo Habilitar / Deshabilitar el touchpad mientras se escribe en Linux"
date: 2024-09-02
categories: [Linux, Tutorial]
tags: [linux, touchpad, wayland, xorg]
image: /img/thumb/habilitartouchpad.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. En esta ocasión, voy a mostrarles cómo usar el touchpad mientras se escribe en el teclado o, al contrario, deshabilitarlo para evitar que esto ocurra, evidentemente obviare metodos que involucren el panel de control, por que son ya bastante sencillos de por si.

Esto es bastante util en situaciones como jugar videojuegos usando el touchpad, o usar programas como Inkscape donde es necesario usar atajos y el touchpad a la vez.


## Método 1: Xorg (Xorg.conf.d)

> Para este método es necesario tener acceso root.

1. Abrir o crear el archivo:
 `/etc/X11/xorg.conf.d/30-touchpad.conf`.

2. Colocar lo siguiente en el archivo:

```
    Section "InputClass"
        Identifier "libinput touchpad catchall"
        MatchIsTouchpad "on"
        Driver "libinput"
        Option "DisableWhileTyping" "0"
    EndSection
```

### Drivers synaptic

Si se están usando los drivers Synaptics, el proceso varía:

1. Abrir o crear el archivo:
`/etc/X11/xorg.conf.d/70-synaptics.conf`.

2. Colocar lo siguiente en el archivo:

```
    Section "InputClass"
        Identifier "touchpad catchall"
        MatchIsTouchpad "on"
        Driver "synaptics"
        Option "PalmDetect" "0"
        Option "PalmMinWidth" "1"
        Option "PalmMinZ" "1"
        Option "Synaptics Jumpy Cursor Threshold" "200"
        Option "MaxTapTime" "125"
    EndSection
```

## Método 2: xinput

Este método no requiere acceso root.

1. Verificar que se esté usando el driver `xinput` con el comando `xinput`:

```
    ItsZariep@PC~-> xinput
    ⎡ Virtual core pointer                          id=2    [master pointer  (3)]
    ⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
    ⎜   ↳ SynPS/2 Synaptics TouchPad                id=10   [slave  pointer  (2)]
    ⎜   ↳ TPPS/2 IBM TrackPoint                     id=11   [slave  pointer  (2)]
    ⎣ Virtual core keyboard                         id=3    [master keyboard (2)]
        ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
        ↳ Power Button                              id=6    [slave  keyboard (3)]
        ↳ Video Bus                                 id=7    [slave  keyboard (3)]
        ↳ Sleep Button                              id=8    [slave  keyboard (3)]
        ↳ AT Translated Set 2 keyboard              id=9    [slave  keyboard (3)]
        ↳ ThinkPad Extra Buttons                    id=12   [slave  keyboard (3)]
```

2. Aprovechar la salida del comando anterior para identificar el touchpad (en este caso, SynPS/2 Synaptics TouchPad), y anotar el ID (en este caso, 10).

3. Ejecutar `xinput list-props 10 | grep "Typing"`:
 
```
ItsZariep@PC~-> xinput list-props 10 | grep "Typing"libinput Disable While Typing Enabled (314): 1 libinput Disable While Typing Enabled Default (315): 1
```

4. Anotar el identificador del parámetro (en este caso, 314) y cambiar su valor:

Para habilitar el touchpad mientras se escribe:
`xinput set-prop 10 314 1`

Para deshabilitarlo:
`xinput set-prop 10 314 0`

> Aunque se puede guardar este comando y agregarlo al inicio, a veces los identificadores pueden variar. Por este motivo es recomendable el primer metodo.

## Wayland

En Wayland, no hay una forma estándar de hacer esto, por lo que el método varía según el escritorio o gestor de ventanas en uso.

> Todos los metodos a continuación, no necesitan acceso root.

### KDE Plasma

Plasma tiene una opción fácil en "Gestión del panel táctil".

### GNOME

`gsettings set org.gnome.desktop.peripherals.touchpad disable-while-typing false`

false para habilitar, true para deshabilitar.

### Sway

En la configuración de Sway:

```
input type:touchpad {
    dwt disabled
}
```

disabled para habilitar, enabled para deshabilitar.

### Hyprland

```
touchpad {
    disable_while_typing = true
}
```

false para habilitar, true para deshabilitar.

## Conclusión

Intenté listar los entornos y gestores de ventana más comunes. Si falta alguno y conoces un método, házmelo saber en los comentarios o en el grupo de Telegram.
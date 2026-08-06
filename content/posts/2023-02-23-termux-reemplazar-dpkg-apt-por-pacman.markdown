---
layout: post
title: "Termux: Reemplazar DPKG/APT por pacman"
date: 2023-02-23
categories: [Android, Tutorial]
image: /img/thumb/termuxpacman.jpg
---

Hola gente, ¿como están? espero que estén bien, en esta ocasión mostrare el sencillo método para reemplazar dpkg/apt (la paqueteria de Debian) por pacman (la paqueteria de Arch Linux) en Termux.

## ¿Por que hacer esto?

Pacman suele ser mas rapido que apt, asi que cambiando la paquetería tendremos una experiencia mas rapida a la hora de instalar paquetes (esto especialmente con dispositivos viejos), Termux tiene repositorios con pacman, asi que no es una idea alocada.

## Procedimiento

- Actualizar el sistema:

```
pkg upgrade
```

- Instalar pacman:

```
pkg install pacman
```

- Inicializar y actualizar las llaves de pacman

```
pacman-key --init && pacman-key --populate
```

- instalar pacman con pacman (suena retorico, pero asi agregamos pacman y sus dependencias al "registro de pacman"), ademas, también instalar apt y dpkg (esto para agregarlos al "registro" y luego poder borrarlos con pacman)

```
pacman -Syu pacman dpkg apt --overwrite '*'
```

- remover dpkg y apt con pacman

```
pacman -Rns dpkg apt 
```

---

Con esto, ya no tendremos dpkg ni apt en el sistema, y nos basaremos puramente en pacman, sin embargo, los comandos pkg de Termux son compatibles tambien con pacman, asi que podremos usarlos con normalidad

## Posibles problemas

### Archivo ya existe

Algunos paquetes pueden darnos un error por que ya existe, entonces, solo toca usar --overwrite '*'

### El repositorio no existe

Es raro, pero si te pasa eso, puedes abrir `~/../usr/etc/pacman.conf` y cambiar los mirrors acorde a https://github.com/termux-pacman/termux-packages
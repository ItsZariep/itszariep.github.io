---
layout: post
title: "Cómo tener servicios de usuario en Runit de manera sencilla"
date: 2025-11-11
categories: [Tutorial]
tags: [linux]
image: /img/thumb/serviciosusuariorunit.jpg
---


¡Hola, gente! ¿Cómo están? Espero que estén bien.
Si usan un sistema con **Runit** (como Void Linux, Artix o Devuan), probablemente estén interesados en tener **servicios de usuario** en Runit. Estos servicios funcionan de manera similar a los servicios del sistema, pero con `runsvdir` ejecutándose bajo el usuario en lugar de `root`.

## ¿Por qué hacer esto?

A diferencia de simplemente lanzar los programas sin más, tenerlos como servicios nos da la ventaja de poder **supervisarlos, detenerlos o reiniciarlos** de manera independiente, sin tener que reiniciar toda la sesión.

## Requisitos

Antes de empezar, hay que preparar la siguiente jerarquía de directorios.
No tienen que estar necesariamente en esta ubicación, pero en la guía se asume que se crean así:

```
-> ls ~/.local/share/runit/
├── sv/
└── service/
```

En `sv/` estarán definidos los servicios, mientras que en `service/` estarán los **enlaces simbólicos** (los servicios activos).

Para crear los directorios rápidamente, se puede usar este comando:

```bash
	mkdir -p ~/.local/share/runit/{sv,service,log}
```

## Servicios

### Instalación

En varios lugares se pueden encontrar servicios a nivel de usuario para Runit.

En mi [repositorio de Codeberg](https://codeberg.org/itszariep/zariep-runit-usersv) tengo algunos que uso personalmente.

### Creación manual

Para la creación de un servicio, voy a poner de ejemplo a un servicio que inicia `pipewire`.

La estructura de un servicio debería verse así:

```
-> tree /home/itszariep/.local/share/runit/sv/pipewire
├── log
│   └── run
└── run
```

El archivo `run` incluye el comando que se ejecutará. Por ejemplo:

```bash
#!/bin/sh
exec pipewire 2>&1
```

Mientras que `log/run` indica dónde se guardará el registro (log) del servicio:

```bash
#!/bin/sh
exec svlogd -tt ~/.local/share/runit/log/pipewire
```

> No es obligatorio tener un log, pero sí es recomendable para identificar errores con el servicio.

### Activación

Después de añadir o crear los servicios en `~/.local/share/runit/sv/`, hay que **activarlos**.
Para ello, basta con crear un enlace simbólico:

```bash
ln -s ~/.local/share/runit/sv/pipewire ~/.local/share/runit/service/
```

Si crearon varios servicios, pueden enlazarlos todos con un solo comando:

```bash
ln -s ~/.local/share/runit/sv/* ~/.local/share/runit/service/
```

### Resultado

Suponiendo que haya varios servicios, la estructura debería ser similar a esta:

```
-> tree /home/itszariep/.local/share/runit/
.
├── log
│   ├── mate-polkit
│   ├── pipewire
│   ├── pipewire-pulse
│   └── wireplumber
└── sv
    ├── mate-polkit
    │   ├── log
    │   │   └── run
    │   └── run
    ├── pipewire
    │   ├── log
    │   │   └── run
    │   └── run
    ├── pipewire-pulse
    │   ├── log
    │   │   └── run
    │   └── run
    └── wireplumber
        ├── log
        │   └── run
        └── run

16 directories, 10 files
```

## Iniciar los servicios

Para iniciar el supervisor y los servicios, hay que ejecutar el siguiente comando:

```bash
runsvdir ~/.local/share/runit/service
```

Este comando se puede añadir al **autoarranque** del entorno de escritorio o del gestor de ventanas.

## Administrar los servicios

Probablemente, al intentar administrar los servicios de la manera tradicional, les suceda esto:

```
-> sv status pipewire
fail: pipewire: can't change to service directory: No such file or directory
```

Esto ocurre porque `sv` busca las rutas por defecto del sistema.
Por lo tanto, deben especificar la ruta completa:

```bash
sv status ~/.local/share/runit/service/pipewire
```

También pueden usar un script como el que está en mi [repositorio de Codeberg](https://codeberg.org/ItsZariep/zariep-runit-usersv/src/branch/main/usv), que funciona igual que `sv`, pero se llama `usv`:

```
-> usv status pipewire
run: /home/itszariep/.local/share/runit/service/pipewire: (pid 1403) 2124s; run: log: (pid 1402) 2124s
```

## Turnstile

[Tunrstile](https://github.com/chimera-linux/turnstile/) nos permite tener servicios de usuario de manera similar, aunque necesita configuraciones extra, puede ser util si nuestros servicios necesitan acceder a la sesión gráfica por ejemplo.

yo personalmente no he usado turnstile, pero la guía de void linux puede ser un buen punto de partida para los que estén interesados.
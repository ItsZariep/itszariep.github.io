---
layout: post
title: "Cómo usar spice-html5 en qemu/virt-manager"
date: 2025-06-22
categories: [Tutorial]
tags: [qemu, virt-manager, spice]
image: /assets/img/thumb/spice-html5.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien.

En esta ocasión quiero compartir un simple tutorial sobre cómo usar spice-html5 en Qemu y Virt-manager. Esto es bastante útil si necesitamos un buen acceso remoto a una máquina virtual que esté usando SPICE/QXL y no tengamos acceso al cliente spice-gtk por algún motivo.

## Preparación

### Qemu

En caso de usar QEMU sin una interfaz gráfica, simplemente tenemos que cambiar el parámetro de SPICE:

```
 -spice port=5900,disable-ticketing
```

Esto si queremos usar el puerto `5900` (puede cambiarse), por ejemplo, en un comando completo:

```
qemu-system-x86_64 \
  -m 1024 \
  -cdrom TinyCore-current.iso \
  -boot d \
  -vga qxl \
  -spice port=5900,disable-ticketing=on \
  -device virtio-serial \
  -chardev spicevmc,id=vdagent,debug=0,name=vdagent \
  -device virtserialport,chardev=vdagent,name=com.redhat.spice.0
```

### Virt-manager

En Virt-manager, simplemente tenemos que asegurarnos de que el ajuste `Monitor Spice -> Tipo de escucha` sea `Dirección`, y que `Monitor Spice -> Direcciones` sea `Anfitrión local` o `Todas las interfaces`, dependiendo de las necesidades. También, si es necesario, definir un puerto (si está configurado como `Automático`, este será `5900`).

## Iniciar Spice-html5

Para iniciar `spice-html5`, es necesario tener [`websockify`](https://github.com/novnc/websockify) y, claramente, [`spice-html5`](https://www.spice-space.org/spice-html5.html).

En caso de tener ambos instalados y ya haber iniciado la máquina virtual, simplemente ejecutan el siguiente comando:

```
websockify --web=/usr/share/spice-html5/ 5959 localhost:5900
```

> `5959` es el puerto objetivo, mientras que `localhost:5900` es la dirección de entrada.

Con esto, si en el navegador abren `http://localhost:5959/spice.html` (o reemplazando *localhost* con la IP de su dispositivo), podrán ver la interfaz cargada y ya podrán manipular la máquina virtual.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/RcDvZ88ewLQ?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
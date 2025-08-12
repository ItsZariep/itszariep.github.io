---
layout: post
title: "Emular ray tracing (RTX) en GPUs AMD no compatibles (Linux)"
date: 2024-08-10
categories: [Tutorial, Linux]
image: /img/thumb/emularraytracingamdlinux.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, en este post voy a mostrar como pueden ejecutar juegos que requieren ray tracing en graficas AMD que no soportan esta tecnologia, esto se hace gracias a una caracteristica de Mesa, el driver de codigo abierto de OpenGL y Vulkan. 

## Requisitos

El unico requisito indispensable es que la GPU necesita ser de la arquitectura GCN, como las RX (como la RX 550), Radeon HD 7700+ (como la Radeon HD 7750), Radeon 240+ (como la r5 240) o Vega, como punto de referencia, casi cualquier GPU AMD del 2013 en adelante podrá hacerlo, de igual manera si usas AMDGPU como driver, tu gpu es GCN o superior.

Para saber si tu GPU puede hacer esto, simplemente ejecuta `lspci -k | grep -A 3 -E "(VGA|3D)"`

```

ItsZariep@PC~-> lspci -k | grep -A 3 -E "(VGA|3D)"
03:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Polaris 20 XL [Radeon RX 580 2048SP] (rev ef)
        Subsystem: Advanced Micro Devices, Inc. [AMD/ATI] Device 0b31
        Kernel driver in use: amdgpu
        Kernel modules: amdgpu
```

Si el driver en uso es `amdgpu`, entonces puedes proseguir con el tutorial.

## Instrucciones

Para hacer esto en realidad no se necesita mucha magia, simplemente es modificar los parametros de lanzamiento del juego y poner:

```
RADV_PERFTEST=rt,emulate_rt VKD3D_CONFIG=dxr PROTON_HIDE_NVIDIA_GPU=0 %command%
```

Esto en caso de lanzar el juego desde Steam, en caso de usar Lutris, Heroic u algún otro lanzador, simplemente es poner las variables de entorno de esa manera:

```
RADV_PERFTEST=rt,emulate_rt
VKD3D_CONFIG=dxr
```

![Steam](/img/content/emularmdlinux6.webp)
*Steam*

![Heroic](/img/content/emularmdlinux5.webp)
*Heroic*

## Detalles a tener en cuenta:

En teoria funciona con cualquier juego, pero mi solo me funcionó con juegos que se ejecutan bajo Proton

Al ser instrucciones emuladas con shaders, el rendimiento no es el mejor, en mi caso con la rx580, solo es jugable con FSR

## Comparación:


![Heroic](/img/content/emularmdlinux4.webp)
*Con RTX*

![Heroic](/img/content/emularmdlinux3.webp)
*Sin RTX*

![Heroic](/img/content/emularmdlinux1.webp)
*Con RTX*

![Heroic](/img/content/emularmdlinux2.webp)
*Sin RTX*


## Video de muestra

{{< youtube 1AGIV9HGms4s >}}

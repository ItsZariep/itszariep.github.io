---
layout: post
title: "Cambiar el esquema de color del TTY en Linux"
date: 2024-06-23
categories: [Linux, Tutorial]
image: /img/thumb/cambiaresquemadecolordeltty.jpg
---

¡Hola gente! ¿cómo están? espero que estén bien, en esta ocasión les voy a enseñar como pueden cambiar el esquema de color de su terminal de manera sencilla, tener acceso a root no es necesario pero es recomendable.

## Procedimiento

Para esto primero hay que tener un esquema, si bien es posible escribirlo manualmente, hay herramientas que generan esquemas fácilmente, un ejemplo es [VT Colorscheme Generator](https://itszariep.codeberg.page/vt-colorscheme-generator/) (creado por mi) que lo genera desde el navegador. 

### Método con root

Si hay acceso a root (como en la mayoría de casos), lo mas recomendable es modificar la linea de ejecución del kernel, esto se hace desde la configuración del bootloader, entonces, para grub, hay que abrir el archivo `/etc/default/grub` y buscar la linea `GRUB_CMDLINE_LINUX`, al final de esa linea hay que poner el esquema de color, quedando de una forma similar a la siguiente:

Original:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

Modificado:

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash vt.default_red=42,166,145,166,102,154,102,166,102,166,145,166,102,154,102,166 vt.default_grn=42,105,166,156,119,102,166,166,102,105,166,156,119,102,166,166 vt.default_blu=42,102,102,102,166,166,170,166,102,102,102,102,166,166,170,166"
```

### Método sin root

Si no hay acceso a root, si bien aún es posible cambiar el esquema a root, este solo se verá en la sesión abierta, entonces, para cambiar el esquema en este caso, hay que abrir la configuración del shell (.bashrc en BASH) y poner una serie de comandos que cambien los colores de la sesión ([VT Colorscheme Generator](https://itszariep.codeberg.page/vt-colorscheme-generator/) también genera esquemas de color para la shell), entonces la configuración del shell quedaría de una forma similar a la siguiente:

```
#... PS1, otros comandos, alias, etc.

printf "\033]P02a2a2a"; printf "\033]P1a66966"; printf "\033]P291a666"; printf "\033]P3a69c66"; printf "\033]P46677a6"; printf "\033]P59a66a6"; printf "\033]P666a6aa"; printf "\033]P7a6a6a6"; printf "\033]P8666666"; printf "\033]P9a66966"; printf "\033]Pa91a666"; printf "\033]Pba69c66"; printf "\033]Pc6677a6"; printf "\033]Pd9a66a6"; printf "\033]Pe66a6aa"; printf "\033]Pfa6a6a6";
```

## Comparación

A la izquierda se ve una imagen del TTY con los colores por defecto, y a la derecha con los colores modificados

![Comparación]({{ site.baseurl }}/img/content/ttycompare-colorscheme.webp)


## Conclusión

Cambiar el esquema de color del TTY puede ser de ayuda para usuarios que pasen la mayoría del tiempo en este entorno, o simplemente usuarios que quieren una mejor integración, no es un procedimiento difícil gracias a que hay herramientas que facilitan el proceso.
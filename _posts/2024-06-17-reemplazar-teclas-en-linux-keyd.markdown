---
layout: post
title: "Reemplazar teclas en Linux (keyd)"
date: 2024-06-17
categories: Linux Tutorial
image: /assets/img/thumb/keyd.jpg
---

Hola gente ¿Cómo están?, espero que estén bien, en esta ocasión les voy a explicar un software bastante útil para teclados rotos donde una tecla no es funcional.

## ¿Que es keyd?

`keyd` es un demonio que toma las entradas del teclado desde udev, y después le envía al propio udev una alternativa que el usuario haya configurado. Ademas de `keyd`, también está `xmodmap`, pero este ultimo solo funciona en X.org, mientras que keyd funciona en X.org, Wayland y hasta el TTY,  es universal.

## ¿Cómo instalar y usar keyd?

Según [Repology](https://repology.org/project/keyd/versions), `keyd` esta en los repositorios de algunas distribuciones populares, si no esta, puedes seguir las instrucciones de su [pagina de GitHub](https://github.com/rvaiya/keyd).

---

Después de tenerlo instalado, pueden habilitar e iniciar el servicio de systemd:
```
sudo systemctl enable keyd && sudo systemctl start keyd
```
O si no quieren o no usan systemd, iniciarlo manualmente, pero debe ser como root, así que lo recomendable es que sea un servicio del init.

Finalmente solo queda configurarlo: para esto hay que abrir el archivo `/etc/keyd/default.conf`:

```
[ids]
*
[main]

# Usar Ctrl derecho como enter
rightcontrol = enter
# Bloq Mayus es k
capslock = k
```

La sintaxis es simple, en el primer segmento ([`ids`]) se pone la id del teclado a usar, normalmente solo se usa un teclado, así que si ese es el caso, se pone un asterisco (mas abajo explico como especificar un teclado).

Después, en [main], debes seguir la syntaxis `teclaentrada = teclasalida`, como se ve en el código de ejemplo, puedes agregar muchas entradas siempre y cuando se declaren en lineas diferentes.

Si quieres poner comentarios en la configuración puedes usar un numeral (#)

---

Si queremos saber el nombre de una tecla, con el comando `keyd monitor` podemos saber el nombre exacto de una tecla. Ademas del teclado, keyd también detecta otros dispositivos como el mouse.

```
ItsZariep@PC~-> keyd monitor
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard (/dev/input/event6)
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard Consumer Control (/dev/input/event5)
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard (/dev/input/event3)
device added: 30fa:0400 USB Optical Mouse  (/dev/input/event2)
SINO WEALTH Mechanical Keyboard 0603:00f5       m up
SINO WEALTH Mechanical Keyboard 0603:00f5       leftcontrol up
SINO WEALTH Mechanical Keyboard 0603:00f5       rightshift down
SINO WEALTH Mechanical Keyboard 0603:00f5       rightshift up
SINO WEALTH Mechanical Keyboard 0603:00f5       tab down
SINO WEALTH Mechanical Keyboard 0603:00f5       tab up
USB Optical Mouse       30fa:0400       leftmouse down
USB Optical Mouse       30fa:0400       leftmouse up
USB Optical Mouse       30fa:0400       rightmouse down
USB Optical Mouse       30fa:0400       rightmouse up
USB Optical Mouse       30fa:0400       mouse2 down
USB Optical Mouse       30fa:0400       mouse2 up
USB Optical Mouse       30fa:0400       mouse1 down
USB Optical Mouse       30fa:0400       mouse1 up
SINO WEALTH Mechanical Keyboard 0603:00f5       leftcontrol down
SINO WEALTH Mechanical Keyboard 0603:00f5       c down
```

Si en serio quieres especificar el teclado, podemos usar misma la salida del comando keyd monitor, en mi caso es 0603:00f5, así que si quisiera que solo se aplicar a ese teclado, pondría esa id, es de notar que no hay que cambiar el puerto donde se conecta el teclado, por que si no el id puede cambiar.

## Mas opciones

keyd es muy potente y permite hacer cosas como j+k = esc, si quieres ver el potencial de keyd, puedes revisar [su pagina de GitHub](https://github.com/rvaiya/keyd) o revisar su manual.
---
layout: post
title: "Conviertete en un PRO usando la terminal en linux: Introducción a la linea de comandos"
date: 2023-04-23
categories: Informativo Linux
image: /assets/img/thumb/terminallinux.webp
---

# Introducción a la Terminal en Linux con Bash

Hola gente, ¿cómo están? Espero que estén bien. En esta ocasión les mostraré cómo empezar a usar la terminal en Linux utilizando la **shell Bash**. Aunque existen varias shells disponibles en Linux, **Bash** es la más común y popular.

Si eres nuevo en Linux y en la línea de comandos, no te preocupes. Este post está diseñado para guiarte a través de los conceptos básicos y ayudarte a sentirte más cómodo utilizando la terminal. ¡Así que sin más que decir, **empecemos**!

---

## 1. Identificar el emulador de terminal

Lo primero que se debe hacer, aunque es muy obvio y posiblemente ya lo hayas hecho, es identificar el emulador de terminal en uso. Algunos de los más populares son:

![Terminales]({{ site.baseurl }}/assets/img/content/terminals.webp)

> No te preocupes si hay varios y es confuso, todos sirven para lo mismo: **poner comandos**. Aunque difieren en características, en este contexto esas diferencias no importan.

---

## 2. Verificar que la shell sea Bash

Para revisar si estás utilizando **Bash**, ejecuta el siguiente comando:

```bash
echo $SHELL
```

Salida esperada:

```bash
/bin/bash
```

---

## 3. Conceptos básicos

### PATH

El `PATH` es la ruta donde se encuentran los binarios (los comandos que puedes ejecutar). Un ejemplo común es `/usr/bin`. Puedes tener múltiples rutas en tu `PATH`.

Para ejecutar un archivo desde una carpeta local, usa:

```bash
./nombredelarchivo
```

Ejemplo:

```bash
./paru
```

---

### Argumentos

Muchos comandos aceptan **argumentos** o **opciones**:

```bash
ls -lsh --color
```

* `-l`: muestra información detallada
* `-s`: muestra tamaño
* `-h`: muestra tamaños legibles (KB, MB, etc.)
* `--color`: aplica colores

> Puedes combinar argumentos de una sola letra (`-lsh`), pero no con los de doble guion (`--color`).

---

### Rutas

* Separador de carpetas: `/`
* Si una carpeta tiene espacios: `"/nombre con espacios"`
* Carpeta actual: `./`
* Carpeta anterior: `../`

Ejemplo para retroceder 3 carpetas:

```bash
../../../
```

Mostrar contenido de archivo en carpeta anterior:

```bash
cat ../hola
```

> Usa la tecla **Tab** para autocompletar nombres de archivos y carpetas.

---

### Variables de entorno

Se usan para configurar programas o comandos.

Ver todas:

```bash
env
```

Ejecutar un comando con una variable temporal:

```bash
LANG=en_US.UTF-8 gcolor3
```

Declarar una variable para toda la sesión:

```bash
export VARIABLE=valor
```

---

## 4. Comandos básicos

| Comando | Descripción                                                  |
| ------- | ------------------------------------------------------------ |
| `ls`    | Lista archivos/directorios                                   |
| `cd`    | Cambia de directorio                                         |
| `mkdir` | Crea un directorio                                           |
| `touch` | Crea un archivo vacío                                        |
| `cp`    | Copia archivos/directorios (`-r` para copiar recursivamente) |
| `mv`    | Mueve o renombra archivos                                    |
| `rm`    | Elimina archivos (`-r`, `-f`, `-i`)                          |
| `cat`   | Muestra el contenido de un archivo                           |
| `grep`  | Busca texto en archivos                                      |
| `sudo`  | Ejecuta comandos como root                                   |
| `su`    | Cambia a usuario root                                        |

> Para ayuda rápida de un comando:
>
> * `man comando`
> * `comando --help`

---

## 5. Tuberías lógicas y Streams

### Pipes (`|`)

Usados para conectar la **salida de un comando** con la **entrada de otro**.

```bash
ls | grep archivo.txt
```

Cadena de comandos:

```bash
cat archivo.txt | grep "texto" | wc -l
```

---

### Streams

* Redirigir salida a archivo:

  ```bash
  ls > archivos.txt
  ```

* Leer entrada desde archivo:

  ```bash
  grep "texto" < archivo.txt
  ```

* Redirigir salida y errores:

  ```bash
  ls noexiste.txt 0> salida.txt 1> errores.txt
  ```

> `>` salida estándar
> `<` entrada estándar
> `2>` errores estándar

---

## 6. `.bashrc`

Archivo que se ejecuta al iniciar la shell.

Ejemplo:

```bash
PS1='\[\033[02m\]ItsZariep\[\033[0;32m\]@\[\033[00m\]PC\[\033[0;32m\]\w\[\033[00m\]-\[\033[0;32m\]>\[\033[00m\] '
export PATH="$PATH:."
alias pi='sudo pacman -Syu'
```

### ¿Qué es `PS1`?

Es el **prompt**: el texto que aparece antes del cursor.

### ¿Qué son los `alias`?

Comandos abreviados personalizados:

```bash
alias dn="ls -lh"
alias ls="ls -sh --color"
```

> El comando `unalias` elimina un alias temporalmente.

---

## 7. Atajos de teclado

### Universales (funcionan incluso en `tty`):

* **↑ / ↓**: Navega por el historial
* **Ctrl + C**: Interrumpe el comando actual
* **Ctrl + Z**: Suspende el comando actual (usar `fg` para reanudar)
* **Ctrl + D**: Cierra la terminal (equivale a `exit`)
* **Ctrl + L**: Limpia la terminal (equivale a `clear`)
* **Tab**: Autocompleta
* **Ctrl + A**: Inicio de línea
* **Ctrl + E**: Final de línea
* **Alt + F / B**: Mueve el cursor por palabras
* **Alt + Backspace**: Borra la última palabra
* **Ctrl + K / U**: Borra desde el cursor a la derecha / izquierda
* **Alt + .**: Usa el último argumento

### Alternativas si flechas no funcionan:

* **Ctrl + F / B / P / N**: Derecha / Izquierda / Arriba / Abajo

---

### Específicos de emuladores de terminal:

* **Ctrl + Shift + C / V**: Copiar / Pegar
* **Shift + PgUp / PgDn**: Scroll con teclado
* **Ctrl + teclas al lado del `0`**: Zoom

---

## Conclusión

Aquí concluye la guía. Ahora deberías tener una comprensión básica de cómo utilizar la terminal en Linux usando **Bash**. Recuerda que hay otras shells, pero Bash es la más común.

Espero que esta guía te haya sido útil y que te sientas más cómodo usando la línea de comandos en Linux.

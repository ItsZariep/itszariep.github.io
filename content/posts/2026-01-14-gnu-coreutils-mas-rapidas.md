---
layout: post
title: " ¿GNU yes mas rapido que busybox yes?"
date: 2026-01-14
categories: [experimentos, programación]
tags: []
image: /img/thumb/gnuvsbusyboxyes.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien. El otro dia estaba revisando el comportamiento de comandos de linux, lo que me llevó a notar que `yes` en GNU es mas rapido que en otras implementaciones, como `busybox` o `BSD`

## ¿Que es `yes`?

El comando `yes` es una utilidad extremadamente simple: imprime repetidamente una cadena (por defecto `y`) hasta que el proceso es interrumpido o la salida falla. A pesar de su simplicidad funcional y su desuso debido a la evolución de programas de terminal, existen implementaciones con filosofías muy distintas, como la de `GNU coreutils` y la de `BusyBox`.

En esta ocasión haré un experimento práctico para comparar ambas implementaciones, analizando los resultados obtenidos y concluyendo sobre si la complejidad de GNU `yes` está justificada para el uso real.

## Descripción del experimento

Se realizaron dos tipos de pruebas:

### Prueba de rendimiento bruto (sin terminal)

```sh
/bin/yes | pv > /dev/null
busybox yes | pv > /dev/null
```

> `/bin/yes` es la imlementación de GNU, mientras que `busybox yes` la de Bussybox

Esta prueba mide la cantidad de datos que cada implementación puede generar cuando la salida no está limitada por un dispositivo lento (como un terminal), sino por un pipe y el kernel.

### Prueba práctica (salida a terminal)

```sh
(sleep 10 && pkill /bin/yes) & /bin/yes
(sleep 10 && pkill busybox) & busybox yes
```

En esta prueba, ambos comandos escriben directamente al terminal durante 10 segundos. Se cuenta aproximadamente el número de líneas generadas y se observa el consumo de memoria.


## Resultados

### Rendimiento bruto

Salida del terminal:

```
ItsZariep@PC~-> /bin/yes | pv > /dev/null
37.7GiB 0:00:10 [3.96GiB/s] [<=>]
ItsZariep@PC~-> busybox yes | pv > /dev/null
991MiB 0:00:07 [99.0MiB/s] [<=>]
```
- **GNU `yes`**: varios GiB/s (≈ 3–4 GiB/s)
- **BusyBox `yes`**: varios MiB/s (≈ 100 MiB/s)

La diferencia es de varios órdenes de magnitud.

### Prueba práctica en terminal

* **GNU `yes`**: ~`50 120` líneas en 10 segundos
* **BusyBox `yes`**: ~`49 994` líneas en 10 segundos

> Las lineas fueron contadas de manera precisa gracias a `tmux`


La diferencia es pequeña y apenas perceptible.

### Uso de memoria RAM

Acorde a `htop`, `top` y `btop`:

- busybox yes: `570KiB` (0.5MiB)
- gnu yes `5900KiB` (5MiB)

> **GNU `yes`**: aproximadamente 10× más memoria que `busybox yes``


## Análisis técnico

### Por qué GNU `yes` es tan rápido en pipes

GNU `yes`:

Acorde a [https://cgit.git.savannah.gnu.org/cgit/coreutils.git/tree/src/yes.c](https://cgit.git.savannah.gnu.org/cgit/coreutils.git/tree/src/yes.c), especificamente en:

```c
  /* If a larger buffer was allocated, fill it by repeating the buffer
     contents.  */
  size_t copysize = bufused;
  for (size_t copies = bufalloc / copysize; --copies; )
    {
      memcpy (buf + bufused, buf, copysize);
      bufused += copysize;
    }
```

- Construye un buffer grande (decenas de KiB) con múltiples repeticiones de la salida
- Usa `write` directamente
- Reduce drásticamente el número de llamadas al sistema, alojando repeticiones de "**y**"

Esto permite un uso extremadamente eficiente del kernel y del ancho de banda de memoria, a costa de usar mas memoria.

### Por qué BusyBox `yes` es más "lento"

BusyBox `yes`:

Acorde a [mirror/busybox (Github)](https://github.com/mirror/busybox/blob/master/coreutils/yes.c)

```c
	do {
		pp = argv;
		while (1) {
			fputs_stdout(*pp);
			if (!*++pp)
				break;
			putchar(' ');
		}
	} while (putchar('\n') != EOF);
```

- Usa `stdio` (`putchar`, `fputs`)
- Escribe pocos bytes por iteración
- Realiza muchas llamadas de alto nivel

Esto introduce sobrecarga en espacio de usuario y limita el rendimiento máximo, a pesar de usasr menos memoria.

### El terminal como cuello de botella

Cuando la salida va al terminal:

- El renderizado
- La gestión de scrollback
- La disciplina de línea

limitan la velocidad a unos pocos miles de líneas por segundo. En este escenario, ninguna de las optimizaciones de GNU `yes` aporta una ventaja significativa (Usar una terminal acelerada como Kitty tampoco aporta mucho, en las pruebas se usó `alacritty`, `foot` y `qterminal`).

## ¿está sobrediseñado GNU `yes`?

Desde un punto de vista práctico:

- La mayoría de los usos de `yes` son interactivos o de corta duración
- El terminal domina el coste total
- El mayor uso de memoria no aporta beneficios visibles

Desde la filosofía de GNU coreutils:

- `yes` debe ser lo más eficiente posible
- No debe convertirse nunca en el cuello de botella
- Debe comportarse bien incluso en pruebas sintéticas o extremas

Ambas posturas son coherentes con sus respectivos objetivos.

## Otras implementaciones

### [BSD](https://github.com/DiegoMagdaleno/BSDCoreUtils/blob/master/src/yes/yes.c):

```c
int
main(int argc, char *argv[])
{
	if (argc > 1)
		for (;;)
			puts(argv[1]);
	else
		for (;;)
			puts("y");
}
```

- Es mas simple que Busybox, tiene un rendimiento relativamente similar
- Usas `puts`, que aunque en BSD tiene un buffer interno, es mas lento y siguen siendo mas llamadas al sistema

### [UUtils](https://github.com/uutils/coreutils/blob/main/src/uu/yes/src/yes.rs)

```rust
fn prepare_buffer(buf: &mut Vec<u8>) {
    if buf.len() * 2 > BUF_SIZE {
        return;
    }

    assert!(!buf.is_empty());

    let line_len = buf.len();
    let target_size = line_len * (BUF_SIZE / line_len);

    while buf.len() < target_size {
        let to_copy = std::cmp::min(target_size - buf.len(), buf.len());
        debug_assert_eq!(to_copy % line_len, 0);
        buf.extend_from_within(..to_copy);
    }
}
```
- Es un port bastante fiel a la implementación de GNU
- En lugar de imprimir "y" en cada ciclo, imprime bloques de 16KB de un solo golpe usando stdout.write_all(bytes)
- Debería ser incluso mas rapido en pruebas sínteticas

## Resultados

Para el uso cotidiano, BusyBox `yes` es suficiente, más simple y más eficiente en memoria.

GNU `yes`, aunque claramente sobreingenierizado para el caso típico, cumple su objetivo de maximizar el rendimiento en escenarios ideales, como pipes rápidos o pruebas de estrés.

El experimento demuestra que una implementación "mejor" depende del contexto: rendimiento teórico máximo frente a simplicidad y adecuación al mundo real.

## Conclusión

Para `yes` en escenarios reales, la implementación de GNU puede considerarse excesiva.

Pero esa complejidad no es un error, sino una consecuencia directa de una filosofía de diseño distinta.


<!--
{{< youtube HRefYhi-JwE >}}
-->
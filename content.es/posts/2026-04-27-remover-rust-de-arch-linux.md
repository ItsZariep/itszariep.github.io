---
layout: post
title: "Eliminar programas basados en Rust en Arch Linux"
date: 2026-04-27
categories: [Tutorial]
tags: [linux]
image: /img/thumb/archnorust.jpg
---

## ¿Por qué?

Por lo general, no existe una ventaja práctica para eliminar software basado en Rust, principalmente porque Rust no es un entorno de ejecución (*runtime*), sino que compila estáticamente el programa en un único binario; quizás sea solo una preocupación por el espacio de almacenamiento.

Sin embargo, algunos usuarios pueden querer auditar su sistema por preferencia personal, minimalismo, curiosidad o razones ideológicas.

## Problema

En las distribuciones basadas en Arch, Rust suele ser solo una dependencia de compilación (`makedepend`), por lo que no aparece en `pacman -Q` ni en consultas de paquetes similares. Esto significa que no hay un comando único que pueda detectar de manera confiable qué paquetes instalados se construyeron con Rust, ya que esa información se elimina de los metadatos del paquete.

## Posible solución

La mayoría de los compiladores dejan algún tipo de marca de agua o firma en los binarios que producen, por lo que tal vez podamos usar eso.

`rustc` suele dejar un rastro en la sección `.comment`:

```bash
readelf -p .comment /usr/bin/tokei

```

```bash
String dump of section '.comment':
  [     0]  GCC: (GNU) 15.2.1 20251112
  [    1b]  rustc version 1.92.0 (ded5c06cf 2025-12-08) (Arch Linux rust 1:1.92.0-1)
  [    65]  Linker: LLD 21.1.6

```

> [!IMPORTANT]
> Este método es heurístico, no definitivo.
> Detecta muchos binarios construidos con Rust, pero no todos.

Dado que Arch Linux normalmente coloca los binarios en `/usr/bin`, podemos hacer lo siguiente:

```bash
find /usr/bin -maxdepth 1 -type f -executable -print0 |
xargs -0 -P"$(nproc)" -n50 readelf -p .comment 2>/dev/null |
awk '
/File:/ {file=$0}
/rustc/ {print file; print}
'

```

O bien, una forma más lenta pero más compatible:

```bash
readelf -p .comment /usr/bin/* 2>/dev/null | grep -E "(File:|rustc)" | grep -B 1 "rustc"

```

Esto imprimirá algo como:

```yaml
File: /usr/bin/bat
  [    1c]  rustc version 1.93.0 (254b59607 2026-01-19) (Artix Linux rust 1:1.93.0-1)
File: /usr/bin/paru
  [    1b]  rustc version 1.92.0 (ded5c06cf 2025-12-08) (Arch Linux rust 1:1.92.0-1)
File: /usr/bin/resvg
  [    1c]  rustc version 1.93.1 (01f6ddf75 2026-02-11) (Artix Linux rust 1:1.93.1-1)
File: /usr/bin/bluetui
  [    14]  rustc version 1.94.0 (4a4ef493e 2026-03-02) (Arch Linux rust 1:1.94.0-3)

```

Luego puedes evaluar manualmente si realmente necesitas ese software, o revisar la lista de paquetes de [Arch](https://archlinux.org)/[Artix](https://www.google.com/search?q=packages.artixlinux.org/) para confirmar si el paquete fue construido realmente con Rust o si se trata de un falso positivo.

Por ejemplo, si quieres reemplazar `bat` (Rust), ya que no es un programa principal (*core*), una opción podría ser `ccat` (Go).

## Alternativas comunes

Si deseas cambiar de software, enumero algunas alternativas comunes (por favor, consulta las notas a continuación):

| Programa | Descripción | Alternativa(s) |
| --- | --- | --- |
| [`paru`](https://github.com/morganamilo/paru) | Ayudante de AUR | [`yay`](https://github.com/jguer/yay) (Go), [`pakku`](https://github.com/zqqw/pakku) (Nim) |
| [`bat`](https://github.com/sharkdp/bat) | Muestra un archivo con resaltado | [`ccat`](https://github.com/jingweno/ccat) (Go), `cat` del sistema |
| [`lsd`](https://github.com/lsd-rs/lsd) / [`eza`](https://github.com/eza-community/eza) | Lista archivos con iconos/colores | [`colorls`](https://github.com/athityakumar/colorls) (Ruby), `ls` del sistema |
| [`tokei`](https://github.com/XAMPPRocky/tokei) | Cuenta líneas de código | [`scc`](https://github.com/boyter/scc) (Go) |
| [`ripgrep` (rg)](https://github.com/BurntSushi/ripgrep) | Búsqueda de texto recursiva rápida | `grep` del sistema, [`ack`](https://github.com/beyondgrep/ack3) (Perl), [`ag`](https://github.com/ggreer/the_silver_searcher) (C) |
| [`fd`](https://github.com/sharkdp/fd) | Buscador de archivos simplificado | `find` del sistema |
| [`zoxide`](https://github.com/ajeetdsouza/zoxide) | Un `cd` más inteligente (basado en frecuencia) | `cd`, [`autojump`](https://github.com/wting/autojump) (Python) |
| [`bottom` (btm)](https://github.com/ClementTsang/bottom) | Monitor de sistema y procesos | [`htop`](https://github.com/htop-dev/htop) (C), [`btop`](https://github.com/aristocratos/btop) (C++) |
| [`dust`](https://github.com/bootandy/dust) | Uso de disco visual | `du`, [`ncdu`](https://code.mynoname.net/ncdu/) (C), [`gdu`](https://github.com/dundee/gdu) (Go) (TUI) |
| [`xh`](https://github.com/ducaale/xh) | Cliente HTTP fácil de usar | [`curl`](https://github.com/curl/curl) (C), [`httpie`](https://github.com/httpie/httpie) (Python) |
| [`bandwhich`](https://github.com/imsnif/bandwhich) | Utilidad de red | [`iftop`](https://pdw.ex-parrot.com/iftop/) (C), [`nethogs`](https://github.com/r-lyeh/nethogs) (C++) |
| [`delta`](https://github.com/dandavison/delta) | Paginador con resaltado de sintaxis | `git diff` estándar, [`diff-so-fancy`](https://github.com/so-fancy/diff-so-fancy) (Perl) |
| [`starship`](https://github.com/starship/starship) | Prompt de shell minimalista y rápido | [`Oh My Zsh`](https://github.com/ohmyzsh/ohmyzsh) (Shell) |
| [`zellij`](https://github.com/zellij-org/zellij) | Multiplexor de terminal | [`tmux`](https://github.com/tmux/tmux) (C), [`screen`](https://git.savannah.gnu.org/cgit/screen.git) (C) |

> Aunque `find` es más potente para expresiones lógicas complejas, `fd` es significativamente más rápido y utiliza expresiones regulares por defecto, razón por la cual la mayoría de la gente lo prefiere para el uso diario.

> `zoxide` se considera generalmente la herramienta de "salto" más rápida porque está escrita en Rust y se integra en tu shell de manera más eficiente que el antiguo `autojump` basado en Python.

> `bat` se utiliza a menudo como paginador para las páginas `man` o como visor previo en `git` porque maneja el resaltado de sintaxis y la paginación de una sola vez, mientras que el `cat` estándar simplemente vuelca texto en la terminal. Si utilizas `nvim`, es posible que prefieras usarlo como paginador de manuales: `MANPAGER=nvim +Man!`.

> `bottom` (btm) y `btop` ofrecen un "valor de un vistazo" mucho mayor que `htop` gracias a sus gráficos integrados en vivo de picos de CPU y red, los cuales normalmente requerirían herramientas separadas.

> `eza` suele preferirse para flujos de trabajo modernos porque admite "hipervínculos" (rutas de archivos en las que se puede hacer clic) y tiene un mejor soporte para los símbolos de estado de Git directamente en la lista de archivos.

> `ripgrep` (rg) está construido sobre el motor de expresiones regulares de Rust, el cual utiliza autómatas finitos; evita la vuelta atrás (*backtracking*), lo que significa que no se "congelará" ni disminuirá su velocidad de manera exponencial en patrones de búsqueda complejos en comparación con el `grep` estándar.

> `delta` está diseñado específicamente para facilitar las revisiones de código en la terminal; ofrece diferencias lado a lado y resaltado "dentro de la línea" (mostrando exactamente qué caracteres cambiaron), algo de lo que carece el `git diff` estándar.

> `zellij` incluye una interfaz de descubrimiento "integrada" en la parte inferior de la pantalla, lo que lo hace mucho más accesible para principiantes que `tmux`, el cual normalmente requiere memorizar una tecla de "prefijo" (como `Ctrl+b`) y varios atajos solo para dividir una ventana.

> `xh` se suele preferir a `httpie` porque es un único binario nativo. Esto elimina el "retraso de inicio" común en las herramientas basadas en Python, el cual se nota cuando los scripts realizan cientos de llamadas API secuenciales.

> `dust` proporciona una representación visual en forma de "árbol" del espacio en disco. A diferencia de `du -h`, ordena automáticamente los directorios más grandes en la parte inferior de tu pantalla para que no tengas que desplazarte hacia arriba para encontrar qué está consumiendo tu almacenamiento.
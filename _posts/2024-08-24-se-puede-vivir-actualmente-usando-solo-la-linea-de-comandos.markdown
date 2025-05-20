---
layout: post
title: "¿Se puede vivir actualmente usando solo la línea de comandos?"
date: 2024-08-24
categories: Linux
tags: [cli, tmux, tui, linux]
image: /assets/img/thumb/terminalonly.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, creo que todos estamos de acuerdo en que la gran mayoria de personas está acostumbrada al uso de programas con interfaces graficas complejas y modernas, las cuales proveen una funcionalidad mas accesible de las funciones que podríamos encontrar usando la linea de comandos, sin embargo, ¿es posible vivir actualmente usando solo la linea de comandos?, en este video haré ese experimento, asi que sin mas que decir, comencemos.

## Contexto

Primero que nada, hagamos como que no tenemos ningún tipo de acceso a la interfaz grafica y por ejemplo, estamos en el TTY y tampoco es posible usar el framebuffer, ya que sería alta trampa para el reto, pero fuera de eso, primero veamos lo básico

Empecemos con que para tener una experiencia mas decente, lo mejor es usar algo como tmux, que nos permite separar las ventanas si es que se les puede llamar asi, y tener multiples sesiones.

Pero ya yendo a programas, para manejar de manera básica una consola de comandos es necesario conocer comandos basicos, suponiendo que estamos en una consola de Linux, podemos manejarnos por los directorios con comandos como cp, mv, ls, etc., o eso si solo existieran las coreutils.

## Diferencia entre CLI y TUI

Actualmente para estas tareas basicas existen gestores de archivos en TUI, que para diferenciar, CLI serían programas que reciben una entrada y esa entrada provoca una salida, sin un paso intermedio, mientras que TUI serían programas que tienen una interfaz de usuario en forma, y normalmente como cualquier programa con interfaz, funcionan con un buclé que se termina hasta que el usuario cierra el programa explícitamente.

En este video me centraré mas que nada en programas TUI.

## Gestores de archivos

Para manejar archivos las opciones que yo considero las mas apropiadas son

- `nnn`: el cual es simple y tiene 4 pestañas.

- `Rager`: el cual es mas completo y tiene buenas opciones de previsualizado.

- `mc`: que se centra en vistas multiples.

Evidentemente y lo aclaro de una vez, hay muchas opciones, pero las que yo menciono son las que mas me gustan.

pero fuera de listar los archivos, es necesario verlos y editarlos.

## Editores de texto

Empezando con lo basico que es edición de texto, creo que todos conocemos clasico `nano`, al poderoso` neovim` o al extensible `emacs`, que de paso especificamente con estos 2 ultimos, también tienen extensiones para suplir muchas necesidades, pero por motivos de diversidad preferiré omitirlos, por que este articulo no es sobre hacer un sistema operativo encima de emacs.

fuera de eso, con estos editores pues no hay mucho que decir, sirven desde texto simple hasta IDE si nos manejamos bien, pero  ¿que pasa si necesitamos algo como una suite ofirmatica?

## Oficina

Como cualquier ya sabrá, los archivos de word, que dentro de lo que cabe es lo mas basico, no son texto plano, si no docx, u odt si son universales o sea no puedes abrilos con nano, ¿aquí que?

Pues la verdad existen varias opciones, no son tan completas por obvias razones, pero algo es algo, entre esto tenemos

`WordGrinder`, que es un procesador de texto.

`sc`, que es un procesador de hojas de calculo.

`emacs` con Org mode.

Algo que cabe aclarar es que estas opciones no suelen soportar a los formatos de microsoft, que tampoco es como que lo quisieramos por que seguro que la compatibilidad sería malisima, pero es algo a considerar, igualmente `pandoc` hace magia.

Y para powerpoint pues que les digo, dudo que sea rentable andar haciendo presentaciones con una interfaz tan simple, creo que lo mas similar es `mdp`, que son presentaciones en markdown, la verdad está interesante de ver.

Ademas de las apps de office, hay infinidad de programas relacionados a oficina, como `calcurse` y `calcure` que son calendarios, `pdiary` que es un diario, `taskwarrior` que para tareas, etc.

## Multimedia

Dejando de lado la ofirmatica o siquiera la productividad, creo que cualquiera usa su PC para escuchar musica y ver videos.

Lo primero es sencillo, puesto que la terminal no suele tener limitaciones de sonido, entonces, tenemos varios reproductores como `musikcube`, `cmus`, `ncmpcpp` o `termusic`. También hay clientes para servicios como youtube music con `ytermusic`, o spotify con `ncspot`, asi que fino.

Pero para video se pone mas dificil, en plan, ¿como veo video?

Pues tanto `vlc`, como `mpv` y `mplayer`, tienen backends para simular video usando ascii, que de paso aprovecho para mencionar que igual hay visores de imagenes como chafa que funcionan asi, la mayoria se apoya de `libcaca`.

Esto funciona masomenos bien, lo unico "malo" es que al menos yo no ví forma de poner subtitulos, lo cual es triste por que creo que simplemente reservando una fila se puede implementar, pero igual no es como que alguien vea videos asi y entiendo el por que no está implementado.

Terminando esta sección, para crear y componer creo que no hay buenas opciones, tipo hay cosas como upiano que pues es eso, un piano, o un proyecto llamado line, que no es la app de mensajería si no un compositor midi, para dibujo está textual paint pero no se si tomarlo en cuenta por que necesita el mouse.

## Juegos

Fuera de la multimedia, si son como yo seguro son altos viciados a los juegos, y si bien no vamos a poder jugar a los juegos mas populares por obvias razones, tenemos otras opciones que si bien parecen mas juegos anteriores a la NES, son entretenidos.

Realmente se pueden jugar a juegos simples y conocidos como snake (`nsnake`), ajedrez(`nchess`), wordle, tetris (`vitetris`), solitario (`tty-solitaire`) o buscaminas (`freesweep`). pero hay proyectos que van mas lejos como un super mario bros, aunque solo el nivel 1, o un port de doom como no podía faltar.

## Internet

Fuera de los juegos, algo indispensable es la conectividad a internet, para esto si bien hay navegadores que están basados en chromium o firefox y asi sacan una salida, estos suelen ser muy pesados, otras opciones son `links` y `elinks`, el segundo es considerablemente mejor, con esto podemos navegar tranquilamente.

Pero fuera de navegar, también hay clientes de varios servicios, por ejemplo `discordo` para Discord, `nchat` para telegram, que este yo lo uso bastante y aprovecho para mencionar que hay un [grupo de telegram del canal](https://t.me/IsZariep), `gomuks` para matrix o `meli` para correos, aunque esto también lo puede hacer emacs.

## Conclusión

Yo creo que es bastante posible vivir solo con la linea de comandos, obvio por ejemplo no se puede editar video por ejemplo, pero dejando de lado detalles, de manera escencial es posible e incluso muchas de estas herramientas se siguen actualizando a dia de hoy.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/5D8617kbaa8?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
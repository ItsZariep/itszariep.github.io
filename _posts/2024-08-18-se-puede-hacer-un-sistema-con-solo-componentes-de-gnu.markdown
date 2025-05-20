---
layout: post
title: "¿Se puede usar un sistema operativo con componentes SOLO DE GNU?"
date: 2024-08-18
categories: Linux
tags: [emacs, gnu, kernel, linux]
image: /assets/img/thumb/gnuonly.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. Hace un par de años subí un articulo sobre cómo sería usar Linux sin GNU, y vimos que era más o menos posible. Pero, algo que prometí y no cumplí en su momento fue hacer un vídeo sobre cómo sería usar un sistema operativo solo con componentes GNU, así que ahora toca hacer ese reto.

### ¿Por qué solo GNU y no simplemente software libre?

La razón detrás de esto es bastante simple. A estas alturas, está más que comprobado que es posible usar solo software libre, como lo demuestra el Proyecto Trisquel o el uso de distribuciones completamente libres como Parabola. Pero hacer el reto de usar solo GNU me parece más interesante y desafiante. Al fin y al cabo, GNU es la base filosófica y técnica de muchos sistemas libres.

Fuera de eso, una cosa que por desinformado no sabía cuando hice el vídeo anterior, es que GTK y GNOME ya no forman parte de GNU. Esto nos deja un poco más "solos" en este reto. En caso de que llegar a un punto donde no sea posible seguir solo con GNU, consideraré añadir otro programa que no sea de GNU, pero mi objetivo principal es evitar eso a toda costa.

## Aclaración

Aunque siendo realistas, creo que todos entendemos que GNU solo no va a ser utilizable de una manera práctica en el sentido moderno. Es más fácil obtener cosas útiles fuera de un círculo cerrado que dentro de él. O sea, intentar operar solo con componentes GNU va a ser complicado, y es casi seguro que nos vamos a topar con limitaciones importantes.

Además, aunque algunos programas sean hechos por GNU, dependen de librerías que, aunque sean software libre, no son parte de GNU, y nada que decir acerca de drivers. Así que para que este experimento dure un poco más, vamos a obviar algunos detalles menores y enfocarnos en mantener el entorno lo más puro de GNU posible, así que sin mas que decir, comencemos.

## La base

lo primero que necesitamos es una base sólida, y creo que empezar con GNU Hurd es la opción más coherente si queremos mantenernos dentro del ecosistema GNU. Es cierto que GNU Hurd es notoriamente inestable, es cierto solo soporta ext2, es cierto que solo está para 32 bits. Pero, dado el contexto del reto, estas limitaciones son aceptables.

Si no les gusta esta opción la segunda supongo que es usar Linux. pero eso ya está afuera de GNU, aunque no se si contar a GNU/Linux-libre que está mas o menos por la linea, pero para evitar cosas mejor uso Hurd que igual no cambiaría mucho por que con solo GNU por mas que tengamos a Linux-Libre, los programas siguen siendo pocos.

## Init y Bootloader

Una vez decidido el kernel, el siguiente paso es el sistema de inicio o (init). Afortunadamente, el proyecto GNU tiene su propio init, llamado Shepherd. que aunque no lo conocen ni en su casa, parece ser una opción viable. Shepherd es flexible y puede manejar servicios de manera modular, lo cual encaja bien con nuestra necesidad de mantener el sistema "puro" de GNU, la única distro que vi que tiene Shepherd es Guix asi que fino.

Pero para arrancar el sistema necesitamos un bootloader, y aquí es donde GRUB entra en escena. GRUB es uno de los gestores de arranque más utilizados en las distribuciones Linux, y por suerte, es parte del proyecto GNU. Esto significa que al menos el arranque inicial está cubierto sin comprometer nuestro objetivo.

## Problemas para iniciar el VT/TTY

Hasta aquí, en teoría, todo va bien, pero ahora nos encontramos con un pequeño problema: ¿cómo iniciamos el tty?, para los que no sepan, normalmente se usa agetty, que no es parte de GNU sino de util-linux. Este paquete también contiene muchas otras herramientas esenciales. Entonces, ¿qué hacemos?

El truco es saltarse ese paso, una posible solución es crear un servicio en Shepherd que inicie directamente la shell, saltándonos la necesidad de un verdadero tty. Esto no es lo ideal, y puede ser inseguro, pero es una solución viable dentro de los límites del reto. Así que, aunque no tenemos un tty "real" en funcionamiento, al menos el sistema arranca y podemos interactuar con él.

## Utilidades basicas

Ahora que el sistema está funcionando, nos damos cuenta rápidamente de que no podemos hacer mucho con una shell sin comandos. Aquí es donde entran en juego las GNU Coreutils, que son esenciales para realizar operaciones básicas como copiar, mover, borrar archivos.

Sin embargo, solo con Coreutils no llegamos muy lejos. Necesitamos una herramienta más poderosa para hacer algo realmente útil, y aquí es donde entra Emacs. Aunque Emacs tiene muchas dependencias externas, sigue siendo un producto GNU y es extremadamente extensible.

Con Emacs, no solo tenemos un editor de texto, sino también un entorno de desarrollo, un cliente de correo electrónico, un lector de noticias, y mucho más. Claro, muchas de las extensiones no son hechas por GNU, así que lo mas propio sería evitar todo esto en medida de lo posible, pero en el contexto de este experimento, Emacs puede ser bastante útil, ampliando considerablemente lo que podemos hacer con este sistema limitado, así que el meme se hará canon y emacs será medio sistema operativo.

## Interfaz Gráfica

Sin embargo a pesar de tener al dios emacs, no tenemos un protocolo de ventanas en forma como X11 o Wayland, si quisiéramos, por que en teoría es un componente importante, podríamos dejarlos pasar a pesar de romper mas o menos con el reto, pero en mi caso no será necesario.

## Otras tareas diarias

Entonces, tenemos lo básico, pero aquí es donde el reto realmente se pone interesante. Sin acceso a la mayoría de las aplicaciones modernas, ¿cómo cubrimos nuestras necesidades diarias? Podríamos, por ejemplo, usar Emacs como un navegador web simple mediante Emacs/W3 o EWW (Emacs Web Wowser), aunque la experiencia no será comparable a la de un navegador moderno como Firefox o Chromium.

En cuanto a la multimedia, estamos peor. No hay herramientas de GNU puras que puedan reproducir vídeos o música, así que saliéndonos un poco de GNU, podríamos intentar usar emms en emacs, o alguna utilidad como SoX, pero bueno con propósitos del reto supongo que nos quedamos sin poder hacer eso.

Fuera de eso, para la conectividad que es casi indispensable, podemos recurrir a GNU Inetutils, que incluye herramientas básicas de red como ftp, telnet, ping, y hostname. No es la suite más avanzada, pero para lo básico podría funcionar.

## Conclusión

Podría seguir con un poco mas pero creo que ya está mas que claro que un sistema con casi exclusivamente cosas de GNU no es tan viable, pero tampoco es imposible y se puede medio usar el PC, como dije al inicio, era evidente que iba a ser casi imposible por que en vez de ser inclusión es exclusión, pero las herramientas de GNU no son malas y realmente tienen una cantidad increíble de software.

Hasta aquí hemos logrado arrancar un sistema basado casi exclusivamente en GNU, con un bootloader, init, y algunas herramientas básicas. Sin embargo, es poco práctico para un uso diario en el mundo moderno. Este experimento nos muestra no solo las limitaciones del software GNU en solitario, sino también la importancia de la colaboración y la interdependencia dentro del software libre y de código abierto. Al final del día, es esa combinación de esfuerzos lo que ha hecho posible el ecosistema rico y diverso que conocemos hoy en día.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/sxo1SvqUSUQ?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
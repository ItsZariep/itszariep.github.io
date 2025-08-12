---
layout: post
title: "¿Se puede tener un sistema Linux utilizable sin GNU?"
date: 2022-06-21
categories: [Informativo, Linux]
image: /img/thumb/nognu.jpg
---

¡Hola gente! como estan? Espero que esten bien, en este video voy a hacer un reto, bueno, no es un reto como tal, pero quiero comprobar algo, la cosa es tener un sistema Linux funcional con interfaz grafica y software de utilidad, o sea, un sistema operativo en forma para trabajar, asi que tener la tty no servira por que no podria trabajar de manera decente, todo esto sin depender en lo absoluto, o al menos de lo mas minimo de GNU.

Ahora, con GNU me refiero a solo las cosas que desarrollo GNU en plan Glibc, Bash o nano, cualquier software que tenga la licenca Gpl pero no sea desarrollado por GNU queda fuera, por que si no este reto seria virtualmente imposible, antes de empezar, tambien cabe aclarar que no desprecio el trabajo de GNU, y se que al inicio de Linux sirvio de mucha ayuda, pero actualmente con tantas alternativas a su software, pienso que ya no es tan necesario, ahora si, sin nada mas que decir, empecemos.

## Base para el reto

El primer paso es escoger un buen sistema para la base, evidentemente Ubuntu, Mint o Manjaro son pesimas opciones ya que tienen muchas cosas de GNU, y por supuesto que Trisquel, Hyperbola, Guix o cualquier linux-libre son peores opciones para el reto, pero fuera de la broma, hay 2 candidatos para este reto, Void Musl, y Alpine, Void Musl requiere mas tanteo que Alpine, asi que Alpine es la mejor opcion para este reto.

Ahora bien, veamos los detalles tecnicos de Alpine antes de empezar

Alpine es una distribucion linux hecha desde 0 que usa Musl como librería C, asi que sobre Glibc no hay problema, tambien usa Busybox, Alpine para arrancar utiliza SysLinux, asi estamos libres de grub, y la shell que usa es Ash, asi que estamos libres de Bash, por defecto el editor de textos que viene es Vi, que no es de gnu pero como a mi no me gusta, lo reemplazare por Pico, como ven, de momento vamos bien con nuestra base.

Ahora toca instalar el sistema con normalidad, y luego de tenerlo instalado se necesita hacer un paso muy importante, y es activar los repositorios comunitarios de Alpine, ya que sin eso no podremos proceder.

Ahora, el siguiente paso es escoger nuestro entorno de escritorio, aca hay 3 opciones, la primera y la que yo usare, luego explicare por que, es Plasma, la segunda opcion es LxQt, y la tercera es usar algun WM sencillo en plan IceWM, Fluxbox, i3, etc.

Ahora bien, porque no se puede usar algo como Xfce o Mate por ejemplo? Lo que pasa es que estos entornos usan GTK, y GTK significa Gimp Toolkit, y GIMP es el programa de manipulacion de imagenes de GNU, si, GTK es parte del software de GNU que no se puede usar, pero no todo esta perdido, ya que la salvacion de este video, sera Qt, y LxQt y Plasma lo usan, un wm en plan IceWM, Fluxbox o i3, no usan nada porque son sencillos, ellos dibujan al menos el marco de las ventanas como les apetece.

# Programas a usar

Entonces, continuando con el reto, yo instale Plasma, y ahora la cosa es, ¿que programas usar? 

Teniendo en cuenta que GTK queda totalmente fuera de plano, pues de nuevo, KDE sera el heroe de la historia, puesto que tiene alrededor de 200 programas que nos seran de utilidad para reemplazar a casi cualquiera de GTK, por eso tambien escojí Plasma, porque de todos modos iba a instalar cosas de KDE, aunque igual no hace falta instalar todo el entorno solo por una app, asi que usarlas en LxQt no es problema realmente.

Ahora bien, ¿que apps se pueden usar usar para cada cosa?

Voy a omitir las apps basicas de KDE en plan Dolphin porque ciertamente son relleno y algo a obviar.

- Para editar texto simple, ademas de pico que lo instale hace rato, se puede usar Kate, Kwrite o Nota.

- Para Suite ofirmatica esta la suite Calligra, que nos ofrece un procesador de textos, hojas de calculo y presentaciones, no conozco su compatibilidad con Microsoft Office, pero de que cumplen su funcion, la cumplen, no se puede usar Libreoffice ni OnlyOffice porque estos requieren forzosamente de GTK, si no les convence Calligra, tambien es una opcion el Microsoft Office Online.

- Para ver documentos pdf se puede usar Okular

- Para edicion multimedia tampoco se queda corto, para editar imagenes y dibujar se puede usar Krita, para editar videos esta Kdenlive, para editar audio esta Kwave, LMMS y Musescore para componer musica pueden ser util, para editar vectores esta Karbon, y para hacer modelos 3D esta Blender.

- Pero si son mas de reproducir multimedia en vez de crearla, pues podemos usar sin problemas VLC o MPV puesto que no dependen en lo absoluto de gtk, para ver imagenes pues gwenview, para escuchar musica esta Elisa, o Strawberry que no es de KDE pero usa Qt y yo lo prefiero.

- Ahora, si queremos desarrollar software, necesitamos un editor de codigo, y si, podemos usar vim, micro o algo parecido en la terminal, pero hablando de programas graficos, podemos usar Kdevelop, curiosamente esta Godot en los repositorios, pero no se como sea al exportar un proyecto.

- Para navegar por internet solo se puede usar Falkon, porque Chrome y derivados requieren de GTK, al igual que Firefox

- Si queremos jugar algun juego, tristemente no va a ser el caso, ya que steam ni siquiera abre, y los juegos que hay nativos para linux, estan compilados contra glibc asi que igual tampoco abriria, a lo mucho tenemos emuladores para emular juegos, por supuesto copias de seguridad legitimas de nuestros juegos para fines recreativos.

## conclusión

![Alpine Image]({{ site.baseurl }}/img/content/alpine-nognu.webp)

La verdad, es que se pueden hacer muchas cosas con un sistema linux sin GNU, pero querramos o no, Glibc es un estandar, y gran parte del software, especialmente de codigo cerrado, esta compilado con esa librería C, entonces siempre estará esa limitante, aparte de que por el mismo motivo no podremos usar appimages.

Pero tampoco es inusable, puesto que ya vimos que podemos hacer bastantes cosas de bastantes indoles, ya lo unico que queda es poner una mona china de wallpaper que yo se que a ustedes les encantan, y a publicar el escritorio presumiendo que no usamos GNU.
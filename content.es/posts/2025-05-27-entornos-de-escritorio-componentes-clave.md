---
layout: post
title: "Entornos de escritorio: componentes clave [Linux]"
date: 2025-05-27
categories: [Informativo, Linux, Programación]
tags: [xorg, wayland, desktop]
image: /img/thumb/decomponents.jpg
---

Hola gente ¿Cómo están? Espero que estén bien. En esta ocasión hablaré sobre qué componentes tiene un entorno de escritorio y qué cosas se necesitarían para crear uno. Este vídeo, más que servir como lista de qué cosas tiene un entorno de escritorio, es más sobre cómo debería estar construido cada componente, desde una vista más de programador. Así que, sin más que decir, comencemos.

## ¿Qué es un entorno de escritorio?

Primero que nada, aunque no creo que sea necesario, un entorno de escritorio es una colección de programas que juntos proveen una interfaz de usuario coherente y unificada para interactuar con el sistema operativo, o sea, los programas básicos como el gestor de archivos, el lanzador de aplicaciones o incluso el gestor de ventanas.

Con esto en mente, es posible hacer una lista de qué es lo básico que debería proveer un entorno de escritorio, y a su vez qué es lo más común de ver entre entornos de escritorios ya existentes.

Entonces, como lista (luego explicaré con más detalle), se necesitan:

* **Un gestor de ventanas**: para poder administrar, mover y en general manipular las ventanas.
* **Un panel o barra de tareas**: que dependiendo del diseño o de los ajustes, pueda desde mostrar un poco de información hasta mostrar las ventanas abiertas.
* **Un centro de ajustes**: para configurar fácilmente los aspectos tanto del entorno como del sistema.
* **Un lanzador de aplicaciones**: para poder ejecutar fácilmente otro software.

Finalmente y opcionalmente, aplicaciones extra, como terminales, editores de texto, juegos simples, etc., que si bien no sean necesarios para el funcionamiento base, sirvan como programas de utilidad que además se integren apropiadamente con el entorno, ya que después de todo son hechos con las mismas normas de diseño.

Evidentemente estos últimos componentes deberían ser opcionales para gente que simplemente no los quiera, o ya esté cómoda con una alternativa.

Ahora bien, con esto en mente, podríamos analizar algunos entornos ya existentes y sacar un poco de inspiración, observando detalles que nos gusten o no nos gusten, o creamos que funcionarían mejor de manera distinta:

## Entornos de escritorio populares

Algunos de los entornos más populares, al menos en Linux, son:

* **GNOME**: Conocido por su interfaz moderna y minimalista y su enfoque en la simplicidad. Prioriza una navegación estética limpia y intuitiva.
* **KDE Plasma**: Ofrece amplias opciones de personalización, un diseño elegante y un sólido conjunto de funciones. Es ideal para usuarios que valoran el control y la flexibilidad.
* **Xfce**: Un entorno de escritorio liviano diseñado para brindar rendimiento y eficiencia, lo que lo hace adecuado para hardware antiguo o configuraciones minimalistas.
* **Mate**: Similar a Xfce, se centra en proveer una interfaz totalmente clásica adaptada a estándares modernos.
* **Cinnamon**: Desarrollado por Linux Mint, ofrece una filosofía similar a Mate, pero apostando por más personalización y flexibilidad, tirando a Plasma aunque un poco más limitado que este mismo.

Evidentemente hay muchos más, pero yo creo que estos son los más importantes que podemos ver.

## Cómo programar

Ahora sí, luego de este largo resumen, tocaría ver cómo se deberían programar o pensar estos componentes (de una forma general y sin embarrar mucho mi opinión, claro).

Primero, comenzando de lo más fácil a lo más difícil, estarían los componentes visuales básicos, o sea la o las barras. Para esto, dependiendo de las características, podríamos necesitar implementar un par de cosas.

### Centro de ajustes

Primero, lo más fácil que puede tener un entorno de escritorio es un centro de ajustes, ya que normalmente solo consisten en unos cuantos accesos a categorías y a hacer lectura/escritura bastante simple. Incluso si usamos **glib** esto último es 30 veces más fácil, ya que tiene un *ini parser* ya integrado.

### Barra / Panel

Después, una barra. Aquí es donde ya se complica todo. Una barra debería ser capaz de identificar el largo, alto y puntos medios de la pantalla para poder ajustarse correctamente sin que el usuario tenga que especificar explícitamente su tamaño. Esto por comodidad.

Si estamos programando para **X11**, `Xlib` nos provee funciones como `XWidthOfScreen`, que nos da el largo de la pantalla. En **Wayland** es un poco más complicado por diferencias entre compositores, pero por ejemplo en **wlroots** estas funciones están disponibles en `wlr_output_layout`.

Pero mucho ojo, porque aunque con estos datos efectivamente ya tenemos información de en dónde y qué tamaño debe tener el panel, si lo ponemos así nada más, será como una ventana más del montón y el gestor de ventanas no le reservará espacio. Para esto:

* En **X11** están los *átomos*.
* En **wlroots** tendríamos que acoplarnos ya sea con `wlr_foreign_toplevel_management` o con *layer-shell*.

Además de esto, y para que el panel quede más pulido, tendríamos que declarar el tipo de ventana, que funciona de manera muy similar a los espacios exclusivos que vimos anteriormente, ya que en X11 lo manejan los átomos y en wlroots lo maneja `wlr_foreign_toplevel_management`.

Dejando de lado la posición, que ya es un lío enorme, si quisiéramos dotar a nuestro panel con las características básicas, seguiríamos con problemas posiblemente igual de complejos.

Primero que nada, para poder mostrar las ventanas abiertas y hacer llamadas para cerrarlas o darles foco, deberíamos, de nuevo, acceder a la interfaz del protocolo de ventanas:

* En **X11** esto se hace con `XQueryTree`, proveído por `xlib`.
* En **wlroots**, de nuevo, se hace con `wlr_foreign_toplevel_management`, el cual envía la lista a un evento y se puede acceder fácilmente.

Luego, para el *tray* es un poco menos complejo, pero sigue siendo difícil ya que deberíamos conseguir la información vía **D-Bus**, ya que las implementaciones modernas lo usan para guardar ahí la información del *tray*. Una cosa curiosa es que no puede haber más de un *tray*, esto porque D-Bus por sí mismo lo limita.

Finalizando, ya tocaría otros componentes con menos relevancia y que son mucho más fáciles de programar. Por ejemplo:

* Un reloj: que solo consiste en conseguir la hora del sistema.
* Accesos a aplicaciones: que es conseguir un ícono e invocar `fork` o `exec`.
* Y opcionalmente, un menú.

El menú es un poco más complicado, pero básicamente es conseguir todas las entradas `.desktop` de directorios comunes. **GLib** provee esta lista con `get_user_data_dir()` y `get_system_data_dirs()`. Luego de esto se leen todos los archivos y se consiguen sus parámetros, como ícono, nombre, comentario, etc. Finalmente se crea un widget con ese elemento. Obvio, como es un menú, deberíamos crear varios *notebooks* según qué categorías hay (que en el contexto de los widgets son una especie de pestaña rara), y si es necesario crear más de un widget si la app abarca varias categorías.

### Gestor de ventanas

Finalmente y luego de todo esto, tocaría hacer el gestor de ventanas.

Aquí sí toca tener un conocimiento de un nivel más bajo. En el caso de crear un gestor de ventanas de **X11** no es tan complicado relativamente, ya que muchas cosas las maneja el servidor X y el gestor de ventanas muchas veces accede a esa información y como mucho dibuja un marco de la ventana. Así que nuestro máximo conocimiento sería saber conseguir esa información, cosa que ya hace `xlib`, y programar bien el comportamiento para que al hacer cosas como redimensionar no pasen cosas raras.

Aunque desde luego no es fácil, parece un chiste cuando pasamos a **Wayland**.

En Wayland el gestor de ventanas hace también de protocolo gráfico y de compositor, o sea, que se encarga de manejar cosas de muy bajo nivel como la pantalla o la composición, además de lo que ya se hacía en X11.

Por suerte para todos, existe **wlroots**, que implementa las bases para poder continuar de manera relativamente más simple, aunque desde luego ya es cosa del compositor implementar protocolos y esas cosas.

No puse tanto énfasis en detalles, ya que estos son muy técnicos y tampoco es que se pueda usar una librería de referencia más que el propio `x.org` o `wlroots`, pero en general es muchísimo más complicado programar un gestor de ventanas que otros componentes.

Aunque, si el diseño del entorno lo permite, puede no ser necesario totalmente. Por ejemplo:

* **LXDE** y **LXQt** no tienen uno que podríamos llamar oficial, y el mismo entorno te incita a usar el que quieras.
* Ya las aplicaciones como paneles, por ejemplo, deberían estar programadas para seguir los estándares.
* Otros entornos como **Mate** o **Xfce**, aunque tienen el suyo propio, también soportan usar otro gestor de ventanas. Incluso Mate (al menos al momento de hacer este video), de momento para su sesión de Wayland ha optado por usar **Wayfire**, un popular compositor hecho en wlroots y que además se parece a Compiz, haciendo que incluso usar Mate en Wayfire pueda dar vibras a entornos de los años 2000, objetivo muy común de Mate.

**Plasma** y **GNOME** son casos especiales y realmente es complicado usar otro gestor de ventanas. Con Plasma se suele hacer el camino inverso, o sea, llamar primero al gestor de ventanas y luego llamar a los componentes del escritorio, así saltándose el inicio de KWin, aunque de una muchas cosas funcionan mal y más en Wayland.

Con GNOME directamente es imposible, ya que sus componentes están más ligados entre sí. Además, por la propia filosofía de GNOME, **Mutter** es el único gestor de ventanas que cumple con las necesidades de GNOME.

## Otros componentes

Fuera del gestor de ventanas, el panel y los ajustes, hacer las demás cosas debería ser teóricamente más fácil, ya que son componentes que no necesitan conocimiento de un nivel tan bajo, aunque esto obviamente dependerá de la complejidad.

Otros componentes esenciales serían:

* Programar un agente **polkit** para accesos a root, cosa que solo es hacer un *fetch* al propio polkit.
* Programar un gestor de archivos, que es simplemente listar archivos, aunque se puede extender en base a las necesidades.
* Crear un tema visual y de íconos que podríamos considerar el por defecto del entorno.

Pero en términos generales, no son tan esenciales como lo que ya vimos anteriormente.

## Conclusión

Un entorno de escritorio, en primera instancia, no parece algo difícil de programar. Y creo que con un conocimiento relativamente básico de programación y el suficiente tiempo, cualquiera podría programar uno. Esto también sirve para darse una idea de cómo entornos de escritorios ya existentes están construidos.

En fin, ¿ustedes se animarían a construir uno desde cero?
¡Déjenme su opinión en los comentarios!
Eso fue todo, ¡adiós!

{{< youtube ZTy-qP0UxoQ >}}

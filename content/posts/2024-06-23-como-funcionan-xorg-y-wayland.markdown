---
layout: post
title: "¿Cómo funcionan Xorg y Wayland? (Servidores gráficos)"
date: 2024-06-23
categories: [Informativo, Linux]
image: /img/thumb/xorgwayland.jpg
---

¡Hola, gente! ¿Cómo están? Espero que estén bien. Si usan algún sistema con Linux u otro Unix-like, como algún derivado de BSD, lo más probable es que para mostrar los programas del día a día usen X.org, o si usan algo más moderno, Wayland. Pero, ¿cómo funcionan estas tecnologías? En esta ocasión voy a responder a esa pregunta, así que sin más que decir, comencemos.

Primero voy a explicar cómo funciona X.org y después cómo funciona Wayland.

## X.org es un servidor 

Para X.org, tenemos que X.org en realidad no se encarga de las ventanas, sino de proporcionar un servidor para X11. Con ese conjunto tenemos un sistema de ventanas de red que muestra bitmaps y permite construir interfaces gráficas de usuario en sistemas unix-like. En el contexto de X, el servidor vendría a ser el propio X.org.

Anteriormente, hace muchísimos años, se usaba XFree86. Este servidor, en principio, se encarga de manejar la entrada y salida de dispositivos, de ahí que se necesiten drivers específicos de X.org, y de proporcionar esa información al cliente.

El cliente serían las ventanas; en la mayoría de los casos, el cliente principal es el gestor de ventanas, como pueden ser Xfwm4, el gestor de Xfce, o KWin, el gestor de Plasma. Después, el gestor de ventanas le da la información a los programas.

## Teoría

Entonces, si pusieron atención, entenderán que el esquema quedaría de una forma tal que el cliente, o sea, el gestor de ventanas o la ventana, hace una petición al servidor. El servidor le da una respuesta dando a entender que su petición es válida y luego ocasiona un evento, donde se maneja la entrada o salida, como puede ser dar un clic, en caso de una entrada, o mostrar una ventana moviéndose, si es una salida.

## Funcionamiento 

Hasta aquí tenemos la teoría, pero ¿qué pasa en la ejecución?

Primero, antes de siquiera intentar iniciar el servidor, se deben cargar los drivers, especialmente para el vídeo, donde se determinan cosas como las resoluciones disponibles, si se usa aceleración gráfica o se hace todo vía software.

Después de iniciar el servidor, lo más común es iniciar un cliente. Como dije anteriormente, el cliente principal suele ser el gestor de ventanas. Entonces, X11 le da al gestor de ventanas información sobre dónde están las ventanas u otros clientes, y así se pueden hacer cosas como dibujar un marco de la ventana.

Pero el gestor de ventanas no puede hacer lo que se le antoje, sino que tiene que hacer una petición al servidor para poder saber dónde está una ventana, de qué tamaño es y si puede dibujar el marco. Esto es para determinar cómo debe hacerse; los drivers de X.org se encargan de esto.

Finalmente, el servidor queda en una especie de modo de espera a que el usuario haga algo, como mover el mouse. Si eso pasa, el servidor se lo hace saber a los clientes. Aquí ya el cliente determina qué hacer o no. Por ejemplo, si es una aplicación GTK, que cuenta como un cliente, si el mouse está encima de un botón clickable, lo más probable es que GTK cambie el color de ese botón.

## Funcionamiento de Wayland y diferencias con X.org

El modelo de Wayland, de una manera muy superficial, funciona de manera muy similar a X.org. El servidor, que en este caso es un compositor, recibe llamadas de los clientes y, en base a eso, realiza acciones de dibujado y le da información a los clientes sobre la entrada de datos.

Pero a diferencia de X.org, Wayland en vez de tener sus propios drivers, recibe información a nivel kernel. Entonces, para la entrada y salida usa al propio kernel. Además, a diferencia de X.org, Wayland no funciona bajo un servidor en el mismo sentido que X.org, por lo que no podemos iniciar un servidor y ver lo que pasa desde otro dispositivo independiente.

Otra diferencia clave es que en Wayland como dije anteriormente, el gestor de ventanas ya hace de compositor, o sea que no se necesita un paso intermedio como en X.org, donde por antigüedad, no se integró un compositor en su diseño.

Fuera de eso, hay otras diferencias ya menores, pero de manera general este es el funcionamiento general que tienen estos protocolos de ventanas.

{{< youtube Cvrhd0gUIVQ >}}


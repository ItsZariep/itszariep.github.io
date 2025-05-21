---
layout: post
title: "¿Como funcionan los juegos de Windows 7 (y XP) en Wine?"
date: 2022-05-12
categories: Linux
tags: [linux, wine]
image: /assets/img/thumb/windows7wine.jpg
---

Hola gente como están? Espero que estén bien, la otra vez instale Windows 7 porque quería jugar un juego que no funcionaba en Linux, pero cuando instale Windows, por nostalgia abrí los juegos que estaban, ya saben, purble place, solitario, ajedrez, etc, incluso recuerdo que la PC de mi padre hace ya muchos años aunque tenia Windows 7 tenia el pinball de XP, supongo que lo habrá instalado o algo porque le gustaba.

Entonces que me pregunte, ¿como funcionaran estos juegos con Wine, en Linux?, así que en este video voy a mostrar como funcionan los juegos que venían por defecto en Windows 7 y Pinball de XP, va a ser con wine vanilla sin modificaciones, así que sin mas que decir, instalo Wine y empecemos

## Pruebas

### Pinball
Voy a empezar con Pinball de XP, que creo que es el que mas nostalgia da, y el juego funciona 100% bien, no hay glitches gráficos y cuando se pone el fullscreen no falla, solo que mi grabador si lo hace, por el cambio de resolución, así que lo grabare con mi celular, aunque como la cámara esta rota, no tiene la mejor calidad

ahora si, vamos a ver los de Windows 7

### Purble Place

empezaremos con Purble place, que creo es el segundo juego que mas nostalgia da, y ya vemos glitches gráficos, al parecer el texto no se esta renderizando bien, y en vez de mostrar “Purble Place”, muestra la linea de código, se ve un tipo comentario de los desarrolladores,

![Purble place]({{ site.baseurl }}/assets/img/content/windows7wine1.webp)

y si abrimos un juego no se ven las fuentes, esto imagino que es por que no las tengo instaladas, en la pantalla de carga lo mismo no se ve el texto que debería, y con la interfaz también, se ve el nombre interno de la variable.

Tampoco se ve la barra superior, así que si queremos ajustar algo, pues nada, no se puede, pero fuera de los glitches de interfaz, el juego como tal va bien.

y saliendo del memorama, si nos vamos a otros juegos, como a la pastelería, es mas o menos lo mismo, se ve bugueada la interfaz pero el juego sigue siendo jugable, se me olvido decir, el juego no tiene sonido,

El de adivinar gente también lo mismo, y si vencemos el juego, en vez de continuar en bucle, el juego se cierra, no se por que.


Si redimensiono la ventana el juego no se rompe, eso esta bien.

 Si vencemos un juego de la pastelería, el personaje se queda hablando mudo, no por que no tenga sonido, si no que en la interfaz no se ven los diálogos de texto que salían, así que termina hablando mudo, y en este caso si continua el bucle.

### Solitarios
 
En solitario spider, nos sale un mensaje vació, y la interfaz se ve bugueada, si la clicko lo toma como que estoy pidiendo ayuda, aunque si presiono H, no me da ayuda.

Si lo completo, muestra la animación de victoria, y luego se cierra el juego, si lo volvemos a abrir funciona bien, y al igual que en Purble Place no tenemos barra, no se a que se deba esto.

los otros solitarios funcionan igual al spider.

### Juegos online

los juegos online no funcionan (directamente no abren), y tampoco se porque, si los abro desde la consola no me bota ningún mensaje de error.

### Mahjong

Mahjong, se ve igual de bugueado que los otros juegos y funciona bien, nada nuevo.

## Ajedrez

Ajedrez es el único que directamente no abre, me lanza un mensaje que no se puede leer, no lo pude ejecutar ni con PlayOnLinux que se supone que era el fallback por si algo fallaba, supongo que necesita cosas mas complejas o librerías que no instale.

### Buscaminas

y por ultimo el buscaminas todopoderoso que funciona de manera correcta, incluso creo que es de los de Windows 7 que mejor funciona, no se ven glitches con las variables ni nada, solo que tampoco se ve la barra superior y no podemos configurarlo, pero funciona.

## Resultados

- Ajedrez y los juegos online fueron los que peor funcionaron, puesto que ni siquiera pude ejecutarlos, pero Ajedrez lanzo un mensaje de error que no se puede leer

- Los juegos de Cartas, PurblePlace y Mahjong funcionan y se pueden jugar con normalidad, pero la interfaz da errores gráficos, se muestra el nombre completo de la variable

- Buscaminas no muestra errores de interfaz mas allá de no mostrar la barra lateral

- Pinball funciona 100% correctamente sin errores gráficos ni cosas raras

## Conclusión

es curioso que los juegos funcionen, yo directamente pensé que no iban a funcionar así de bien, aunque es cierto que la interfaz no se ve del todo bien, pero fuera de eso los juegos son meramente jugables, a excepción de ajedrez y los juegos online, tal vez vea la forma de conseguir los juegos de Windows 10 a ver si se ejecutan o no, pero eso sera en otra ocasión.
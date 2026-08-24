---
layout: post
title: "Como hice mi propio pack de iconos GTK/Qt para Linux y BSD? Pixelitos icon theme"
date: 2022-03-12
categories: [Linux]
tags: [linux, gtk, qt]
image: /img/thumb/pixelitos.jpg
---

Hola gente como estan? Espero que esten bien, en este video voy a mostrar como hice mi tema de iconos, es este se llama pixelitos y como su nombre sugiere es un tema con pixel art

## Procedimiento

lo primero que hice fue agarrar Adwaita para ver como era, lo duplique y puse mi copia en `~/.local/share/icons`

para testear, luego modifique el `index.theme` para ver como era, y reemplaze algunas cosas, despues de eso me di cuenta que era mas facil y practico si quitaba todos los iconos de adwaita y yo metia los mios, en vez de reemplazar iconos, asi que borre todos los iconos de adwaita

para revisar el nombre interno de los iconos en las apps revisaba `/usr/share/applications` o `.local/share/applications` especialmente porque en este segundo directorio se guardan los juegos de Steam, y abri los `.desktop` uno por uno, si, para poder incluir el soporte a varios entornos de escritorio, me tuve que bajar varios y revisar sus entradas, algo que me tomo algunos dias porque eran alrededos de 200 entradas, luego de eso fui testeando los entornos para ver que se viera de manera correcta

otro problema era iconos que habia adentro de las apps, porque no podia ver su nombre interno, sin embargo descubri que si abria el programa desde la consola con la variable `GTK_Debug=interactive` podia ver todo el debug de la app, entre eso se incluia el nombre interno de todos los iconos que se mostraban

llendo mas al proceso de crear iconos, lo primero que hacia era ver que iconos me faltaban, de 2 formas:

* la primera en `/usr/share/applications`

* la segunda en una lista que tenia de personas que me pidieron algun icono

luego abria GIMP el cual configure precisamente para hacer pixel art, y me ponia a hacer el icono, obviamente inspirandome en el icono original, lo que hacia era abrir el icono original con mi visor de imagenes, poner la ventana como siempre visible y arrinconarla en una esquina, luego de eso me ponia a hacer el icono, cuando acababa lo exportaba como 16x16, luego lo redimensionaba a 128x128, y lo exportaba a su respectiva carpeta, esto debido a que GTK por defecto tiene antialiasing

en caso de que sea una app cuyo icono pudiera reciclar como por ejemplo los programas de configuracion de los entornos que regularmente ahi se puede reciclar mucho, lo que hacia era crear links, pero no podia ser cualquier tipo de link, debia ser un link relativo que a diferencia de un link regular, este checa por un archivo que este en ese mismo directorio, y no en un directorio especifico.

Si no hacia esto, cuando compartia el pack de iconos simplemente daba errores, lo triste es que me di cuenta de eso demasiado tarde, y me tomo un dia entero reemplazar links regulares con links relativos, usaba SpaceFM para hacer estas operaciones por 2 motivos, la primera es que guarda las pestañas y es bastante comodo trabajar asi, y el segundo motivo es porque con SpaceFM puedo decidir el nombre de los links al crearlos, por cierto SpaceFM tambien me facilito un monton de trabajo al pasar links regulares a links relativos.

Al final cuando tuve una cantidad decente de iconos, publique el primer lanzamiento en GitHub y Pling pero no es el lanzamiento final puesto que planeo hacer mas iconos para que el pack progrese

cCmo pueden ver, crear un paquete de iconos no tiene mucha complicacion, mas que tu talento al hacer iconos, yo estoy empezando a hacer otro pack de iconos mas tradicional con vectores, pero la verdad es que son pocos iconos y esta bastante temprano.

Y tu, ¿te motivarias a hacer un pack de iconos? Si lo llegas a terminar estaria interesante que lo dejaras en los comentarios.
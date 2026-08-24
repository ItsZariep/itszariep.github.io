---
layout: post
title: "¿Cómo funcionan los AppImage por dentro?"
date: 2024-07-20
categories: [Informativo, Linux]
image: /img/thumb/appimage.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien. Si han usado Linux por no mucho tiempo, lo mas probable es que conozcan o hayan usado un AppImage, que es un formato que presume de poder ejecutarse en cualquier sistema con Linux.

En este vídeo mostraré como funcionan estos programas, si en verdad funcionan en cualquier sin sistema con Linux, y sus pros y contras, asi que sin mas que decir, empecemos.

## ¿Qué es un AppImage?

Primero, para los que no sepan que es un appimage, de manera muy resumida, son programas comprimidos que están configurados para que al abrirlos, ejecuten un script que esta ahí adentro y así se abra el programa en el interior del appimage, ¿pero como es de manera mas detallada?

## ¿Cómo se vé un AppImage por dentro?

Primero, podemos ver al appimage como un programa de Windows, que tiene todo o la mayoría de cosas para funcionar (esto lo explicaré mas adelante), entonces cualquier appimage antes de ser generado se ve como un folder que adentro tiene un programa con sus librerías, como paréntesis y para aclarar, los appimages no suelen ser portables ya que no son archivos escribibles, entonces, por mas que sean muy distribuibles, suelen guardar la configuración en el sistema.

Fuera del paréntesis, que el truco de los appimages es que los programas cuando son compilados, en vez de usar librerías dinámicas como pasa casi siempre con programas para Linux, son compilados usando librerías estáticas, o en su defecto, apuntan a librerías dinámicas que no son las del sistema, esto es bastante importante para compatibilidad, pero en realidad no es necesario tener que hacer esto en su totalidad.

La mayoría de AppImages no tienen todo lo necesario ya que apuntan a la mayoría, o sea, que por ejemplo usan la librería GTK del sistema, el Python del sistema, la librería C del sistema, etc, este tipo de librerías suelen ser bastante nobles y se portan bien al manejar versiones inferiores, además de estar en casi cualquier distribución.

## Detalles al programar

Hasta aqui todo bien, pero no se ha terminado, no puedes agarrar cualquier programa y sencillamente hacerlo appimage, si no que el programa debe estar programado de tal manera que no use rutas especificas para ciertas cosas, ya que al ser un appimage es muy probable que estas rutas especificas se detecten mal y el programa no funcione.

Entonces, lo que se recomienda es el uso rutas relativas a cosas como el binario, o usando variables de entorno, que es información facilisima de obtener.

## Generar un AppImage

Finalmente, si el programa no tiene los problemas anteriores, ya debería estar preparado para ser un appimage, aunque obviamente por la naturaleza de corregir estos problemas, primero se crean muchisimos appimages para ir corrigiendo a prueba y error.

Fuera de los errores, para generar un appimage necesitamos agregar un poco de información al appimage, que no es mucha, mas bien 3 archivos:

- El primero es un icono puede ser png o svg

- El segundo una entrada del escritorio para metadatos

- Y el tecero que es obligatorio, es un script llamado AppRun, el cual indica como se debe ejecutar el programa

Este AppRun aunque no fuera necesario, es bastante útil por que fuera de simplemente indicar que ejecutar, ayuda a cambiar cosas como variables de entorno, preparación, etc.

Después de todo esto, ya solo queda generar el appimage, el cual es un archivo squashfs, o sea que es similar a un ISO para que nos entendamos, esto facilita su montura. Para generarlo hay muchas formas pero los propios de appimage tienen appimagetool que no hace nada mas que agarrar la carpeta con todo lo anterior y empaquetarla en un appimage.

## Pros y Contras

Hasta aquí tenemos el como funciona, pero ¿cuales son sus pros y contras?

Como **pros** tenemos que:

- Es un programa que se ejecuta en casi cualquier distribución moderna.

- Son fáciles de distribuir .

- No requieren de una base extra como si lo requieren flatpak o snap, que también se centran en distribuir programas de manera universal.

Los **contras** son: 

- Su peso, el cual al tener casi todo lo necesario, su espacio en disco aumenta considerablemente.

- Los tiempos de carga iniciales son mas largos, especialmente si se usa un almacenamiento lento.

- Como ultimo aunque mas puntual, si usas un sistema muy raro no esperes que funcione siempre, ya que va en mano del desarrollador el determinar si incluir todo, o solo incluir lo que no es globalizado.

{{< youtube mCHp2XkU8 >}}

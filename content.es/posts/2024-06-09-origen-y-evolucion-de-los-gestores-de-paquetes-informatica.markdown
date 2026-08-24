---
layout: post
title: "Origen y evolución de los gestores de paquetes (informática)"
date: 2024-06-09
categories: [Informativo]
image: /img/thumb/gestoresdepaquetes.jpg
---

Hola, gente. ¿Cómo están? Espero que estén bien. En cualquier sistema Unix-Like, como Linux, por ejemplo, es bastante común que para instalar cualquier software tengamos que recurrir a un gestor de paquetes. Estos gestores de paquetes nos ayudan a instalar software de manera más fácil y ordenada.

En esta ocasión veremos cuál es su historia, su evolución y cómo tanto los usuarios como los desarrolladores han visto estas soluciones. Así que, sin más que decir, empecemos.

## Origen

Primero, empecemos con el origen. Como muchos ya intuirán, la necesidad de tener orden y facilidad al conseguir software nace de la carencia de esto. En los principios de la computación moderna, no había una distribución formalizada de programas. 

Lo que tenían los usuarios de esa época normalmente eran piezas de código fuente, los cuales debían compilar y, en muchos casos, adaptar para poder ejecutarlos. Aquí estamos hablando de los años 70, cuando las computadoras eran un nicho.

Tiempo después, para facilitar estas tareas de compilación, la gente de la Universidad de Berkeley desarrolló herramientas como `make`, el cual automatiza tareas de compilación, instalación y desinstalación. Esto es lo más primitivo que hay que se asemeja a un gestor de paquetes.

Pero un problema que tiene make es que, si bien compila de forma automática, si en el sistema no están las librerías necesarias, el programa no va a compilar. Esto nos lleva Durante mucho tiempo, mientras las computadoras pasaban de ser solo para frikis a ser algo que debería tener cualquiera, esto se quedó así. Pero, obviamente, para las personas que no sabían del tema, les era muy complicado instalar software de esta manera.

## Binarios precompilados

Esto nos lleva a gestores de paquetes más modernos con binarios precompilados. Estos paquetes, como los paquetes modernos, se centraban en un sistema operativo específico, pero eran más fáciles de manejar. Estas ideas ya van más a los años 90, especialmente con Linux. Ya que incluso cuando salió Slackware, este no tenía uno.

Un ejemplo de un primer acercamiento a gestión de paquetes fue `installp` de AIX, que hacía algo similar a estas tareas. También hay otros menos conocidos, pero para resumir, porque son más o menos lo mismo, me voy a adelantar a `dpkg`, el cual, como muchos ya sabrán, es el gestor de paquetes de Debian.

## DPKG y los gestores de paquetes modernos

Dpkg fue un gran avance para los gestores de paquetes modernos, ya que permitía instalar, eliminar y gestionar paquetes de software de manera más estructurada. Después tenemos a RPM, que salió poco tiempo después y cumplió los mismos propósitos. Ambos, durante su desarrollo continuo, contribuyeron a cosas estándar como una compresión estándar o verificación de integridad.

## Repositorios de paquetes

Hasta aquí todo bien, pero había un problema enorme con todo esto: si bien ya había gestores de paquetes en forma, no había una forma fácil de conseguir los paquetes.

De esta carencia, para no complicar la lógica de dpkg ni de RPM, nacen cosas como `apt`, el cual se encarga específicamente de la resolución, obtención y actualización de paquetes y repositorios. Esto fue un tremendo avance porque así los usuarios ya no iban de un lado a otro buscando paquetes, con el riesgo de que sea un paquete incompatible o peligroso.

Después tenemos gestores como `pacman`, que dentro de sí mismo ya incluye las características equivalentes a apt y dpkg juntos, pero es que pacman así se diseñó de base.

## Gestores de codigo fuente

Hasta aquí todo bien. Los usuarios están felices, todo es fácil, todo es rápido. Pero si recuerdan, los frikis instalaban desde el código fuente, y evidentemente hubo gente que seguía prefiriendo compilar paquetes teniendo en cuenta sus ventajas y desventajas.

De aquí nacen cosas como `portage` de Gentoo, que es básicamente un gestor de paquetes, pero que tiene lo necesario para administrar recetas de compilación. Bajo esta filosofía también se suelen manejar las herramientas para crear los paquetes finales. Un ejemplo son los PKGBUILDS de pacman, para crear paquetes y que a su vez son la base del AUR.

## Flatpak y Snap

En principio, hasta aquí acabaría la cronología, ya que a día de hoy se sigue usando el mismo modelo con pequeñas variantes adaptadas a la actualidad. Pero un concepto que se ha vuelto popular especialmente estos últimos años son paqueterías como Flatpak o Snap, las cuales tienen una filosofía y un manejo de dependencias distintos.

En el caso de Snap, directamente los paquetes vienen con todo lo necesario para funcionar independientemente de que si hay repetición en espacio en disco. Además, los Snaps al ser imágenes squash, que es un formato de archivo similar a un ISO, se montan en ejecución.

Flatpak es un poco más distinto y "tradicional" entre mil comillas, ya que este sí resuelve dependencias, pero no lo hace a un nivel tan bajo. O sea, que las dependencias del tipo librerías, por ejemplo, no se resuelven y vienen por paquete, mientras que cosas a un nivel más alto sí son dependencias.

Una potente ventaja de ambos es que las apps están en una sandbox o caja de arena, o sea, que se pueden gestionar permisos, como en Android. Pero la gran desventaja es que son muy pesados, lo que hace que su descarga sea más lenta y se ocupe mayor espacio en disco.

Y ya que mencionamos a Android, posiblemente cualquiera se habrá dado cuenta de que todo esto se parece a la típica tienda de apps como la Google Play, la Apple App Store, la Microsoft Store o incluso en consolas, donde especialmente la gente que piratea sabrá que en algunas se usan cosas similares a los paquetes. El principio es el mismo, pero por temas de cómo funcionan estos sistemas, lo más probable es que sean similares a un Flatpak y cada paquete tenga sus propias cosas de ejecución.

{{< youtube n9mqLX1wTXc >}}

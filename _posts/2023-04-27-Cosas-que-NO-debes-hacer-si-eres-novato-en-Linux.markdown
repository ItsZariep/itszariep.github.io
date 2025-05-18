---
layout: post
title: "Cosas que NO debes hacer si eres novato en Linux"
date: 2023-04-27
categories: Informativo Linux
image: /assets/img/thumb/novatolinux.webp
---

¡Hola gente! ¿como están?, espero que estén bien, si eres novato y estas apenas empezando en el mundo de Linux, lo mas probable es que te la pases buscando bastante información, preguntando en diversas redes sociales, o simplemente probando hacer cosas por cuenta propia, lo cual esta bien, pero en estas actividades, existe la probabilidad de hacer cosas que están mal, no son recomendables, no son eficientes, o incluso, ya sea a corto, mediano o largo plazo, pueden terminar por arruinar tu sistema.

En esta ocasión, te voy a dar algunas recomendaciones de que es lo que debes evitar hacer si eres novato en Linux, y las mejores formas de investigar información, así que sin mas que decir, ¡empecemos!.

## El distrohopping

Primero, empezare con un problema bastante común entre novatos, y es el distrohopping, que consiste en andar cambiando de distribución a cada rato, esto aunque puede ser bueno para encontrar lo que te gusta, si lo haces en exceso, aparte de que perderás un montón de tiempo, tu disco duro se desgastara mucho mas rápido.

Como consejo te recomiendo que primero veas cual entorno te gusta mas, luego como te gustan las actualizaciones. Con eso ya lo tienes, por ejemplo si te gusta KDE Plasma y te gustan los sistemas de lanzamiento continuo, muy posiblemente te estén gustando sistemas como Manjaro, OpenMandriva u OpenSUSE Tumbleweed, por supuesto que hay mas posibles parámetros, pero pienso que estos son los mas esenciales.

## Instalación de programas

Después, hablemos de los programas, en Windows lo mas probable es que hayas descargado software desde el navegador, lo cual en Linux también es posible, pero yo te recomiendo que principalmente instales software software de los repositorios oficiales de la distribución que uses.

Es prácticamente imposible que una distribución venga sin repositorios, pero si es probable que en los repositorios no encuentres algún programa, así que en este caso hay 2 opciones:

* La primera es irte a la pagina oficial del programa y descargar desde ahí, revisando que estés descargando el paquete correspondiente a tu distribución, o si tienes suerte un appimage, que funcionan en cualquier distro.

- La segunda es que uses algo como Flatpak, que es un centro de software bastante completo, aunque instalar programas desde ahí es mas pesado.

Ahora ¿por que no recomiendo instalar software desde el navegador en Linux? esto tiene varios inconvenientes:

- El primero es que te puede pasar que instales el paquete que no es, por ejemplo rpm de redhat en un sistema que use Deb de Debian.

- El segundo es la compatibilidad, esto especialmente con los paquetes Deb, que están hechos para una versión especifica del sistema, y si instalas un paquete ya sea para una versión mas vieja o mas nueva, te puedes hacer un lió con las dependencias, y si forzas la instalación, tu sistema se volverá muy inestable.

- El tercero es la seguridad, no solo en Linux, si no en cualquier sistema, si te pasas instalando software de paginas aleatorias, puedes infectar tu PC y cargarte el sistema operativo.

Por eso siempre recomiendo mejor los repositorios, o si de plano no esta, pues Flatpak o la pagina oficial como ultima opción.

## Configuración del sistema

Lo siguiente es no cambiar la configuración del sistema, o al menos las configuraciones avanzadas tipo archivos y demas si no sabes lo que estás haciendo. Muchos novatos se sienten tentados a modificar la configuración del sistema para ajustarlo a sus necesidades o preferencias personales, pero esto puede causar problemas graves.

Si no sabes exactamente lo que estás haciendo, es mejor dejar la configuración del sistema tal como está, ya que muchas opciones pueden tener consecuencias imprevisibles. 

## La linea de comandos

Lo siguiente tiene que ver con la linea de comandos, aunque esta se vea muy tentadora, si quieres usarla lo primero que debes hacer es aprenderla a usar, en internet hay miles de guías sobre como usarla, de igual manera, la gran mayoría de tareas se pueden hacer de manera sencilla con una interfaz grafica.

## Información y guias de internet

Lo siguiente es no confiar demasiado en la información que encuentras en Internet. Muchas veces, los foros y sitios de discusión sobre Linux están llenos de información incorrecta o desactualizada.

Siempre es mejor verificar la información que encuentras en múltiples fuentes, y comprobar que sea relevante para tu distribución de Linux y tu versión específica, también ver de que fecha son, por que te puede pasar que sigues una guía pero como esta es en plan del 2009, esta bastante desactualizada.

La ultima cosa a evitar son los troleos, esto específicamente con los comandos, si no sabes que hace específicamente un comando o una acción, primero investiga que es lo que hace el comando, incluso con poner un comando completo como tal, te va a salir información ya que muchos troleos son demasiado típicos.

## Usuario `root`

Lo siguiente esta relacionado con el usuario root, este usuario es mas o menos como ser administrador en Windows, pero siendo root te da total libertad de cambiar lo que se te antoje, esto siendo muy riesgoso. De igual forma muchos programas no te dejaran iniciar si estas como root, asi que, usa tu usuario normal para todo, y solo usa root cuando sea realmente necesario.

## Actualizaciones

La ultima recomendación que creo que es importante recalcar es no ignorar las actualizaciones, las actualizaciones en cualquier sistema son importantes para mantener el sistema seguro y compatible, de igual forma las updates en Linux no suelen ser como en windows donde actualizar puede ser algo tedioso

## Recomendaciones extra

Ahora, dejando un poco de lado las cosas que debes evitar, te voy a dar recomendaciones que no son tanto para evitar algo, si no para mejorar la experiencia.

### Unirse a una comunidad

Lo primero es unirte a alguna comunidad de Linux, ya sea una generalista que hable mas o menos de Linux en general, o una dedicada a la distribución que estas usando si ya tienes fijo que esa vas a usar, esto te permitirá aprender bastante de los demás y de repente hasta te entretienes un poco.

Relacionado a lo anterior, si piensas preguntar algo en estos grupos, ya sea por curiosidad o para resolver algún problema, primero busca en internet, y si no encuentras la información o no solucionas tu problema, ya preguntas, esto evitara que pases por la pena de que te digan que con una simple búsqueda por internet lo resolvías y/o se burlen de ti.

### Leer la documentación

Lo segundo es leer documentación, si tienes conocimientos básicos de ingles, la mayoría de distribuciones ofrecen una wiki y/o documentación bastante completa, incluso para muchas cosas puedes usar la wiki de otra distribución, algunas incluyen documentación en español, pero esta es menos.

### Canales de Linux

Lo tercero es seguir algunos canales de Linux, esto no es tan necesario e incluso puede que ni siquiera te interese el contenido de algunos, pero hay varios canales interesantes en el que puedes aprender alguna cosa.

## Conclusión

Lo ultimo que te recomiendo es tener paciencia y ganas, aprender un nuevo sistema y acostumbrarte a este puede llegar a ser complicado, pero no es imposible siempre y cuando te motives a usarlo.

Bueno gente eso fue todo, espero que estos consejos te sean útiles en tu camino como novato en Linux. Recuerda siempre investigar antes de hacer cualquier cambio importante en tu sistema, y nunca subestimes la importancia de aprender cosas nuevas, tampoco tengas miedo de preguntar si no sabes algo ¡Buena suerte!.
---
layout: post
title: "ReactOS: un «Clon» de Windows ligero y de código abierto"
date: 2023-06-29
categories: [Informativo, "Sistemas Operativos"]
image: /assets/img/thumb/reactos.webp
---

¡Hola gente! ¿como están? espero que estén bien, en esta ocasión les mostrare a un sistema curiosos y que seguro algunos ya conocerán si han indagado un poco en internet sobre sistemas operativos, curiosos, este  sistema es ReactOS, el cual intenta ser un clon de nada mas y nada menos que del mismísimo Windows, una labor que claramente es bastante compleja por 2 razones.

- La primera es la complejidad del mismo Windows, que siendo de código cerrado, para imitarlo se deben recurrir a técnicas de reimplementación y prueba y error, ya que hacerle ingeniería inversa a Windows es ilegal.

- La segunda es que Windows se va actualizando y va añadiendo nuevas características y cambios al sistema operativo, cosa que por ejemplo no pasa con FreeDOS, que debido a que no hay nuevas versiones de DOS, es mas facil mantener pulido el sistema.

En este vídeo analizaremos la historia de ReactOS, su progreso y su usabilidad en la actualidad, así que nada mas que decir, empecemos.

## Historia

En 1996, un grupo de desarrolladores liderado por el programador ruso Aleksey Bragin comenzó a trabajar en un proyecto llamado "FreeWin95". El objetivo era crear un sistema operativo de código abierto compatible con Windows 95.

En sus primeras etapas, el proyecto se centró en la ingeniería inversa de Windows 95, tratando de comprender cómo funcionaba el sistema operativo de Microsoft y cómo se comunicaba con el hardware. A medida que el proyecto avanzaba, se fue expandiendo para incluir soporte para Windows NT y sus variantes.

En el año 2004, el proyecto cambió su nombre a ReactOS, reflejando mejor su objetivo de ser un sistema operativo independiente y no solo una reimplementación de Windows. ReactOS adoptó una estructura de desarrollo similar a la del proyecto Wine, que permite ejecutar aplicaciones de Windows en sistemas operativos
basados en Unix, como Linux, donde es mas popular.

A lo largo de los años, ReactOS ha pasado por varias fases de desarrollo. Se han implementado muchas características y componentes clave del sistema operativo, como el kernel, la capa de abstracción de hardware, el sistema de archivos y la interfaz gráfica de usuario. 

ReactOS ha buscado la compatibilidad binaria con las aplicaciones de Windows, lo que significa que se pueden ejecutar directamente sin necesidad de recompilarlas o modificarlas. Esto ha sido posible gracias al estudio exhaustivo de las interfaces y el comportamiento de Windows.

## Desafios técnicos y contratiempos

ReactOS ha enfrentado numerosos desafíos técnicos y de desarrollo a lo largo de los años. La complejidad de replicar el funcionamiento de un sistema operativo tan ampliamente utilizado como Windows ha requerido un esfuerzo considerable por parte de la comunidad de desarrolladores.

Como dije al inicio, para evitar problemas legales por derechos de autor, ReactOS tuvo que ser completamente distinto y no derivado de Windows, lo cual requirió un trabajo minucioso. En enero de 2006, un desarrollador afirmó que ReactOS contenía código derivado de la desensamblación de Microsoft Windows, se discutió esta acusación y se desactivó temporalmente el acceso al repositorio de código de ReactOS.

La comunidad de software libre reaccionó negativamente y la colaboración entre ReactOS y Wine se volvió difícil. Se realizaron auditorías internas para garantizar que se utilizara una técnica de ingeniería inversa limpia y se implementaron políticas claras al respecto. Gran parte del código de ensamblaje presuntamente copiado ha sido reemplazado por código en C para facilitar la portabilidad.

Además, el código fuente filtrado de Windows en 2004 no se consideró un riesgo legal para ReactOS debido a su amplia difusión. Sin embargo, un ingeniero de Microsoft señaló similitudes entre el kernel de ReactOS y el kernel de investigación de Windows, lo que sugiere una posible utilización no autorizada de código fuente.

## Terminología

Aclarando un poco los terminos, para los que no sepan, una desensamblación, o ingenieria inversa, es una forma de acceder al codigo fuente de un binario, pongamos un ejemplo para crear un binario, primero  necesitamos un codigo, ya que no escribiremos manualmente 1's y 0's, entonces, supongamos que tenemos un codigo en C, si lo compilamos sale un binario, pero ese binario no contiene el codigo, son 2 piezas independientes, y si no distribuyes el codigo, en principio nadie lo sabrá.

## Ingenería inversa y legalidad

Sin embargo hay tecnicas de "descompilar" un binario, esto no es facil y requiere bastante prueba y error, pero se ha demostrado que es posible, un ejemplo de hace unos años fue con la decompilación de GTA 3.

Ahora ¿para que se quiere hacer esto? la respuesta es que teniendo el codigo fuente, puedes analizar absolutamente todo del codigo y cambiar lo que se te antoje, y en el caso de programas como juegos, recompilar el programa para otras plataformas las cuales el desarrollador no soportaba en un principio.

sin embargo no todo es color de rosa, ya que en muchos contextos, hacer ingenieria inversa a los software es ilegal, y Microsoft siendo un gigante de la tecnologia, basicamente podría aplastar como hormigas al equipo de ReactOS, por esto, ReactOS en principio no se arriesga a hacer este tipo de practicas.

## ReactOS en la actualidad

A pesar de tantos años, Aunque ReactOS todavía está en desarrollo activo, aun no se considera completamente estable o adecuado para un uso en producción, a pesar de esto, ha logrado importantes hitos a lo largo de los años. Ha demostrado la capacidad de ejecutar aplicaciones de Windows y ha atraído a una comunidad de
usuarios y desarrolladores apasionados que contribuyen al proyecto.

## Usabilidad de ReactOS

Ahora, dejando de lado la historia, que tan usable es el sistema operativo? reactos nos ofrece 2 versiones, una para probar desde un live, y otra para instalar, algo que me paso a mi es que con el live no podia instalar el sistema, me daba un error, asi que si lo van a instalar, en una maquina virtual claro, recomiendo el que es para instalar.

### Instalación

La instalación en bastante simple y rapida primero nos sale una interfaz grafica en terminal para las particiones, luego instala y reinicia, luego cuando booteamos el disco donde lo instalamos, nos saldrá el asistente, y asi en poco menos de 5 minutos tendriamos el sistema funcionando.

Ahora, uno de los propositos de ReactOS, es tener una alternativa ligera de Windows, lo cual tiene logica, ya que si tienes una PC que corre la ultima versión perfectamente, no te pondras a instalar alternativas, pero en fin, a la maquina le di muy pocos recursos, 600mb de ram y 1 nucleo a 1Ghz, algo que sorprende, es que el uso de recursos de ReactOS es realmente bajo, oscilando entre los 70 y 90mb de ram sin hacer nada.

Con el almacenamiento tambien me sorprendió, aunque no vi cuanto tenia recien instalado, con algunas cosas instaladas usaba tan solo 2gb, algo bastante sorprendente, recién instalado debe usar cosa de 1,5Gb.

### Aplicaciones en ReactOS

Hablando de sus aplicaciones, ReactOS de base incluye aplicaciones basicas de toda la vida de Windows, o sea el tipico cmd, bloc de notas, wordpad, las cosas de accesibilidad, algo de conexión remota que supongo que usa algo tipo vnc o rdp, la verdad no lo probé, utilidades del sistema tipo gestor de tareas, editor
de registros y demas, reproductor multimedia, juegos basicos como solitario y buscaminas,
panel de control con bastantes ajustes.

Sin embargo, lo que mas "sorprende" es que tiene un gestor de software, que funciona mas o menos como choco y scoop, o sea que tiene una lista con sources y baja de las web de los programas.

En el gestor de software tenemos una buena cantidad de programas algunos destacables estan, como Audacious, spotify, vlc, gimp, inkscape, librecad, emuladores como finalburn, snes9x, juegos de codigo abierto como assaultcube, navegadores como firefox u opera, clientes vnc, libreoffice, sumatrapdf, Python, notepad++,
codeblocs, git, gnucash, 7zip, cccleaner, un par de drivers y temas visuales, que si bien no hay muchos, me parece genial que se puedan poner temas y personalizarlos, ya que un tema se puede personalizar tal cual el tema classic en windows 7 o inferiores.

Ahora, no todo es de color de rosa, ya que aunque tenemos varios programas, la gran mayoria estan bastante desactualizados, por poner un ejemplo, la ultima versión de gimp en este momento es la 2.10.34, y en los repos
de reactos esta la 2.6.12, o sea una versión de hace mas de 10 años. pero en fin, supongo que hay algunos programas que funcionan con versiones mas modernas aunque no sean del gestor de software.

Instalé algunos programas desde el gestor de paquetes de ReactOS para probar la funcionalidad de este, asi que vamos a hacer un repaso rapido: 

Primero, probando con algo simple, cpu-z, aunque el programa se me bugueó de forma extraña, funcionaba bien.

Abriendo un programa de verdad, abri el navegador kmeleon, que es algo viejo, pero funciona bien, un detalle con usar navegadores viejos, es que los certificados estan tambien viejos, entonces, no estaremos navegando de la forma mas segura, otro detalle es que algunas paginas no se nos mostraran correctamente, tambien instale el navegador firefox, que como nota esta en la versión 48, y la ultima es la 115, aunque algo que me sorperndio es que navegando usa menos de 300mb, lo que demuestra que esto es realmente ligero

Pero bueno, es software viejo, en la conclusión veran a lo que me refiero, pero en contexto, aunque muchas paginas abrian bien, muchas otras me negaban, por ejemplo youtube, y aunque usara una alternativa, igual no se reproducia el video, algo que a decir verdad era de esperarse. 

Ahora, en el office, que es algo que la mayoria usa, no probe versiones viejas del microsoft office, por que nisiquiera tengo esas licencias, pero buscando un poco, vi que office 2010 funcionaba, sobre otras suites, onlyoffice  no me funcionó, ya que necesitaba vcredist 2015, pero este no funciona en versiones viejas.

Con libreoffice, la versión que esta en el gestor de software es libreoffice 5, que funcionaba bien, pero la ultima versión de libreoffice es la 7.

Probando abrir archivos multimedia, descargue una canción y un video de internet, con el reproductor por defecto no tuve suerte, pero con vlc me fué bien, aunque me di cuenta que no tenía sonido, no se si sea cosa dereactos o de mi maquina virtual la verdad, pero le dejamos en que multimedia con vlc si funciona.

Ahora sobre juegos, al ser una vm se pierde mucho rendimiento, yo probe 2 cosas, primero el assaultcube, que es un juego de codigo abierto ligero, me funcionaba "bien", dejando de lado los bajos fps por lo que menciono
de la maquina virtual.

Otro fue un emulador, yo ya sabia que no me podia ir muy lejos, asi que probé el Final Burn que esta en el gestor de software y no tuve éxito, sin embargo descargue MAME y en este caso si me fué bien emulando uno de los ultimos juegos de NeoGeo, el KOF 2003 para ser mas especifico, que de paso lo tengo legal asi que no cuenta mucho como pirateria, pero en fin, sobre juegos creo que esta en el mismo estado que lo demas, juegos viejitos y ligeros funcionan bien, pero no nos podemos ir a algo moderno

La verdad podria seguir mencionando mas programas, pero se llega a lo misma conclusión, asi que llendo a detalles de uso, el sistema dentro de lo que cabe funcionaba bien, la resolución la podia poner a cosas mas altas y no vi nada visual, lo unico es que no tuve sonido, pero ahi le dudo en que si fue reactOS o mi maquina
virtual,

Lo que si me paso es que a veces reactos se quedaba pillado y solo quedaba forzar el apagado, hacer esto hacia que se bloqueara el sistema y no pudiera acceder, aunque lo chistoso es que borrando poweroff.exe, el progama que no me dejaba pasar, el sistema ya arrancaba por mas que le forzara el apagado y lo intentara crashear.

## Conclusión

ReactOS la verdad es una idea de proyecto bastante alta y complicada, que ha tenido bastantes años de  desarrollo, sin embargo, pienso que en cierto sentido se han quedado bastante atascados, para que se den
una idea, yo vi por primera vez este proyecto hace unos 6 años, y estaba en un estado bastante
parecido.

Aunque seria mentira decir que no han progresado, ya que se nota que han agregado bastantes caracteristicas, yo recuerdo que antes por ejemplo no estaba el soporte a btrfs,el treay creo tampoco estaba, y las fuentes se veian raras.

Pero en fin, hablando de compatibilidad de programas, basicamente tendriamos un sistema equivalente a tener Windows XP, una versión bastante vieja de windows esto nos da problemas de compatibilidad con programas modernos y por ende de archivos modernos, o sea que si queremos por ejemplo abrir un archivo, al tener un programa mas viejo, este no lo reconocerá, tambien como vimos en el navegador, los certificados estan mas que caducados.

Incluso si tienes un poco mas de ram, tipo 768mb, puedes probar usar un Linux ligero y la experiencia sera mas o menos buena, pero tendras programas actualizados y una estabilidad claramente superior, ya que recordemos que ReactOS aun es inestable.

En fin, ReactOS es un ejemplo destacado de un proyecto de software libre y de código abierto que busca proporcionar una alternativa de sistema operativo gratuito y compatible con Windows. Aunque aún tiene
un camino por recorrer antes de alcanzar la paridad total con Windows.

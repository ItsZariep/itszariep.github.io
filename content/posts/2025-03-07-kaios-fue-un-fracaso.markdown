---
layout: post
title: "¿KaiOS fué un fracaso?"
date: 2025-03-07
categories: [Informativo]
tags: [kaios, compilacion]
image: /img/thumb/kaios-fracaso.jpg
---

Hola, gente. ¿Cómo están? Espero que estén bien. En esta ocasión voy a hablar de un tema un poco diferente a los que suelo tratar. Se trata de KaiOS, pero en vez de enfocarme en su funcionamiento interno (que, de manera resumida, es Linux booteando directamente a Gecko), voy a intentar analizar y explicar por qué fue un fracaso, a pesar de contar con varios factores a su favor. Así que, sin más que decir, comencemos.

## ¿Que es KaiOS?

Primero, hay que entender el contexto de KaiOS. Este nació con la idea de ser una alternativa a los smartphones, más barata tanto de producir como de vender. Sin embargo, en vez de ser un celular básico, soportaría aplicaciones y redes sociales modernas como Facebook, YouTube o WhatsApp

Como era de esperar, apuntaba a mercados emergentes o en vías de desarrollo, con un público que, si bien no podía permitirse celulares costosos, encontraba insuficiente un celular demasiado básico. KaiOS se posicionaba justamente en el punto medio de precio entre estos dos tipos de celulares.

## Problemas de diseño de KaiOS

Ahora, hablando del diseño del sistema, KaiOS no es un sistema 100 % original ni hecho desde cero. Está basado en Firefox OS, que fue un intento fallido de ofrecer smartphones basados puramente en web apps. Ambos utilizan Linux y bootean directamente a Gecko.

Aquí es donde empiezan los problemas: KaiOS, desde su base, tiene decisiones de diseño bastante cuestionables. La primera es su dependencia exclusiva de tecnologías web. Esto, en teoría, facilitaría que los desarrolladores, especialmente los de redes sociales, hicieran ports con poco o ningún esfuerzo.

### KaiOS es restrictivo

Sin embargo, un gran inconveniente es que en KaiOS de base solo se pueden instalar aplicaciones desde su tienda oficial. Aunque publicarlas es gratuito, representa un trámite extra y también limita a algunos desarrolladores que, por una u otra razón, no pueden distribuir sus aplicaciones en la tienda. Además, el sistema no permite el uso de otras tiendas ni la instalación de apps externas, esto sin hacer un jailbreak o root, aunque el hacer esto ademas de ser algo complicado y peligroso, invalida totalmente la garantia.

### Le faltan funciones basicas

KaiOS tambien peca de la carencia de funciones relativamente basicas fuera de instalar apps externas, como seleccionar texto, una vista multitarea decente, el poder acceder a notificaciones o panel de control adentro de las apps, no tener acceso facil a emojis, no tener modo oscuro, entre muchas otras cosas, cosas que perfectamente pudieron ser implementadas, esto hizo que para muchas personas se les hiciera incomodo y prefirieran invertir un poco mas en un android economico.

### Cuestionable rendimiento

Otro problema es que las tecnologías web, por naturaleza, son bastante pesadas. Esto obligó a que los dispositivos con KaiOS contaran con componentes relativamente más potentes, lo que se traduce en precios un poco mas caros, pero aun así se sintieran limitados.

Por ejemplo, un celular promedio con KaiOS tiene entre 256 y 512 MB de RAM y procesadores de un solo núcleo con velocidades entre 1 y 1.5 GHz. Con esas especificaciones, incluso en sistemas Linux tradicionales, podrías ejecutar aplicaciones más potentes y eficientes por ser nativas. En cambio, las web apps, incluso utilizando WebAssembly, son pesadas y lentas.

Algo interesante en su diseño habría sido permitir la ejecución de aplicaciones nativas y renderizarlas en Gecko de alguna manera, aprovechando que gran parte de Xorg (el protocolo gráfico que suelen usar los sistemas Linux tradicionales) está pensado para funcionar en red. Con un desarrollo moderado, se podría haber logrado que la lógica se ejecutara de forma nativa y la salida se mostrara en Gecko, o incluso abandonar temporalmente Gecko en favor de una vista directa. Sin embargo, dado que el diseño base de KaiOS ni siquiera considera la instalación de aplicaciones externas, esta posibilidad es aún más cuestionable.

### ¿Actualizaciones?

Más allá de las aplicaciones web, otro problema que no supieron manejar fue el de las actualizaciones. Aunque en teoría pueden actualizarse fácilmente, las actualizaciones importantes nunca llegan.

KaiOS ha tenido tres versiones principales, y cuando en 2021 se lanzó KaiOS 3.0, aproximadamente el 90 % de los celulares con la versión 2.5 no pudieron actualizarse.

El problema radica en que Gecko tampoco se actualiza de manera independiente, lo que significa que, con el tiempo, los dispositivos quedan obsoletos porque las tecnologías web que soportan dejan de ser compatibles con las páginas modernas.

Esto es especialmente frustrante porque, con un motor actualizado, incluso con el mismo hardware, se podrían abrir aplicaciones como Discord o Telegram, algo imposible con la versión antigua debido a su pobre soporte.

Pero la cereza del pastel es que las aplicaciones grandes no son ni retrocompatibles ni postcompatibles. Esto provocó que, por ejemplo, WhatsApp y Facebook nunca llegaran a KaiOS 3.0. Además, esta falta de compatibilidad representa un trabajo extra para los desarrolladores, ya que se ven obligados a modificar aplicaciones que antes funcionaban perfectamente solo por cambios internos en la lógica de programación del sistema.

## Marketing

Dejando de lado lo técnico, KaiOS tampoco tuvo una estrategia de publicidad efectiva. Fuera de mercados como India (donde tuvo cierta presencia gracias a la estrategia de JioPhone), KaiOS nunca contó con una campaña publicitaria seria en televisión, internet o anuncios en general.

KaiOS Simplemente llegó a las tiendas sin generar interés, haciendo que la gente lo percibiera como un celular básico para llamadas, sin darle una verdadera oportunidad. Además, su mercado objetivo, fuera de nichos específicos como India, no era muy grande.

La combinación de un público limitado y un sistema restringido a web apps hizo que el dispositivo careciera de otros puntos de interés, lo que llevó a que en general fuera visto como una opción incómoda que solo se usaría si no había otra alternativa.

## El triste estado actual de KaiOS

Actualmente, KaiOS está dejando de ser soportado progresivamente. Las principales empresas no muestran interés en desarrollar para la versión 3.0, y las apps existentes están dejando de funcionar.

En algunos casos, esto ocurre de manera voluntaria: por ejemplo, Facebook, con la implementación de pines de seguridad, hizo que tanto WhatsApp como Facebook fueran imposibles de usar en KaiOS. Como dato adicional, también eliminaron Facebook Basic, lo que significa que ni siquiera se puede acceder a la plataforma desde el navegador, perjudicando aún más a los usuarios de mercados más básicos.

Aparte de eso, el hecho de que KaiOS 2.5 tenga una versión tan desactualizada de Gecko (equivalente a Firefox 48, lanzado en 2016) solo agrava la situación.

### Comunidad

En el ambito de la comunidad, la mayoria de personas que son algo activas han considerado rootear su KaiOS para cambiar la interfaz base, que como dato en KaiOS casi ninguna app tiene modo oscuro, haciendo que para algunas personas sea incomodo o inusable, instalar apps o tiendas de terceros como la banana store e incluso algunos modelos les han cambiado totalmente el sistema.

## Conclusión

KaiOS como concepto es una excelente idea especialmente para mercados emergentes, sin embargo, su aplicación tuvo varias desiciones cuestionables que hizo que tanto los usuarios como las empresas lo usaran por curiosidad y luego lo abandonaran.

Aunque no fué un fracaso como otros sistemas, tampoco fue un exito, haciendo que en la actualidad no valgan la pena y en un futuro proximo lo mas probable es que estos celulares ya no sean tan funcionales debido a su desfase.

Y ustedes, han  tenido un celular KaiOS? creen que haya otros motivos por los cuales KaiOS no tuvo el suficiente exito? dejenme su opinión en los comentarios, eso fué todo, adios.

{{< youtube HtWfdhrOTPQ >}}

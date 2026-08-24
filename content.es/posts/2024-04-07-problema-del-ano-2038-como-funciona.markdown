---
layout: post
title: "Problema del año 2038: ¿Como funciona?"
date: 2024-04-07
categories: [Informativo, Programación]
image: /img/thumb/2038.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. En esta ocasión, no vamos a ver el problema del año 2038 como tal, si no que vamos a ver su problema de raiz, el cual es el desbordamiento de entero, ademas de ver soluciones se han propuesto. 

Este es un problema relacionado con la capacidad de bits que puede manejar un procesador y como es de  esperar, no es la primera vez que ocurre algo similar.  Así que, sin más que decir, ¡empecemos!.

## Causas del problema

Primero, ¿cómo funciona técnicamente el problema? 

Este es causado, como mencioné en la introducción, por el tamaño del bus del CPU. Para que nos entendamos  mejor, imaginemos el tamaño del bus como cajas. Si intentamos meter un objeto de 64cm en una caja de 32cm, evidentemente, este evidentemente no va a entrar. 

Indicios del problema

Si nos remontamos a los primeros indicios populares del problema, tenemos un buen ejemplo en el Pac-Man original, donde el contador de niveles utiliza un un entero de 8 bits sin signo, o sea que puede almacenar  valores del 0 al 255.

Cuando el contador alcanza 255 y se le suma uno en lugar seguir con 256, el contador vuelve a comenzar desde cero, A este fenómeno se le conoce como "Integer Overflow" o "Desbordamiento de entero".

El problema en Pacman viene dado porque el contador de frutas, que se incrementa con cada nivel, comienza desde 1. Así que, cuando el contador de nivel alcanza 255 y se incrementa en uno, vuelve a 0, pero el contador de frutas continúa avanzando. Esto hace que Pac-Man intente dibujar 256 frutas en pantalla en lugar de la cantidad esperada para el nivel actual, lo que resulta en el famoso glitch del nivel 256

## Desbordamiento de entero

Poniendo enfasis en el Desbordamiento de entero, cuando esto sucede pueden pasar 2 cosas:

La primera y la más común es que el contador se reinicie, empezando un ciclo sin fin, y aunque pueda parecer algo inofensivo, puede causar potentes problemas de lógica ya que se está retornando de una manera inesperada.

El segundo caso es que el programa directamente se cierre dando un mensaje de error. Una manera común de evitar eso es poner límites de manera explícita al programar el programa.

## ¿Como conocer el limite?

Ahora, para saber cuál es el límite de un entero, la fórmula es bastante sencilla. Esta consiste en 2 elevado a la capacidad del bus, menos 1 porque se cuenta desde 0 ( `(2^X)-1` ).

Por ejemplo, en el caso específico de Pacman que mencioné hace un momento, Pacman está hecho para funcionar con enteros de 8 bits. Entonces, 2 a la octava potencia nos da exactamente 256, esto menos 1, porque se cuenta desde 0 y no desde 1, da 255.

Pero mucho ojo porque regularmente, si no declaramos los números para que explícitamente no tengan signo, estos lo tendrán. O sea que la máquina tendrá en cuenta como que debe contar números negativos aparte de los positivos, reduciendo aproximadamente el límite a la mitad.

Por precisión, en estos casos la fórmula sería 2 elevado a la capacidad del bus, esta restada menos 1 porque queremos tener en cuenta el signo, el resultado de todo esto, menos 1 ( `(2^(X-1))-1` ).

Si no se entendió muy bien, porque sé que es medio confuso, por ejemplo con 8 bits sería 2 elevado a 7 menos 1, dándonos 127

### Tabla con las conversiones:

| Número de bits | Límite con signo                                   | Límite sin signo                                |
|----------------|----------------------------------------------------|--------------------------------------------------|
| 8              | 127                                                | 255                                              |
| 16             | 32,767                                             | 65,535                                           |
| 32             | 2,147,483,647                                      | 4,294,967,295                                    |
| 64             | 9,223,372,036,854,775,807                          | 18,446,744,073,709,551,615                       |
| 128            | 170,141,183,460,469,231,731,687,303,715,884,105,727| 340,282,366,920,938,463,463,374,607,431,768,211,455 |

> Tabla que muestra los límites en enteros de distintos tamaños, tanto en enteros con signo como en enteros sin signo.

## Problema del año 2038

Ahora, ¿qué es exactamente lo que sucede con el año 2038 del cual hablamos al principio? y ¿por qué justo el 19 de enero de 2038 a las 03 horas con 14 minutos y 7 segundos ocurrirá el evento catastrófico?

Pues bien, en sistemas que usan el tiempo siguiendo las normas POSIX (que para este video no son relevantes, pero básicamente son normas para estandarizar varias cosas entre sistemas operativos distintos), el tiempo
inicia el 1 de enero de 1970 a las 0 horas en punto.

Si seguimos las fórmulas anteriores, nos da que deberían haber `4,294,967,295` segundos, es decir, aproximadamente 136 años entre 1970 y 2038.

Sin embargo, esto obviamente está mal y el límite debería ser alrededor de 2106. ¿Qué pasa ahí?

La razón por la cual el límite es 2038 y no 2106 es porque en la mayoría de las implementaciones de time_t, el entero que guarda los segundos suele tener en cuenta el signo. Si volvemos a las fórmulas, ahora deberían ser 2,147,483,647 segundos, es decir, aproximadamente 68 años. Y aquí ya nos cuadra porque 1970 + 68 nos da justamente 2038.

La razón por la cual es el 19 de enero y no el 1, es porque no son 68 años exactos, sino que son `68.0962597349…` etc., dando un pequeño desfase. 

Ya para terminar con esta sección, si pusieron atención se habrán dado cuenta que `1900 + 136` nos da 2036, entonces si por algún motivo alguna implementación usaba enteros sin signo y una fecha desde el 1900, su limite sería el El 7 de febrero de 2036 a las 06:28:16, y es que hasta el 2010, NTP (un protocolo
para conseguir la hora via internet), usaba un entero de 32 bits sin signo para representarla hora, asi que si un sistema es tan viejo como para no soportar la implementación RFC 5905, este tendrá problemas. 

## El problema del años 2000 es distinto

Antes de dar las soluciones, cabe aclarar que el problema del año 2000 no se relaciona en absoluto con el del año 2038. El problema del año 2000 fue causado por un mero error de programación, en el cual algunos programadores, para establecer fechas, tenían la limitación de que una fecha solo podía empezar en 19.

Otra causa aparte pero similar era que las funciones para obtener los últimos 2 números del año no tenían en cuenta un reinicio al llegar al 2000, y en vez de pasar del 99 al 00, pasaban del 99 al 100.

Un problema un poco más desconocido pero igualmente similar es el planteamiento del problema del año 10000, el cual básicamente consiste en que si para ese año aún hay sistemas que por programación tienen la restricción de que los años solo pueden tener 4 dígitos, en el año 10000 estos se reiniciarían por
su lógica de programación.

Pero bueno, estos casos ya son apartes y me estoy alejando del tema principal del video.

## Soluciones

Ahora bien, ¿qué soluciones existen?

Dejando de lado la solución de migrar a hardware de 64 bits, que si bien es una solución, es la solución aburrida, podemos considerar que desde hace casi 10 años muchos desarrolladores, especialmente de kernels y sistemas operativos, han implementado una solución bastante interesante, la cual consiste en utilizar un entero de 64 bits, aunque pueda sonar contraintuitivo, es posible.

Volviendo al ejemplo de las cajas que mencioné al principio, teníamos un objeto de 64 cm que no cabía en una caja de 32 cm. Sin embargo, al dividir el objeto, este podría entrar, aunque se necesitarían 2 cajas en lugar de una, lo que haría el transporte menos eficiente.

Lo mismo ocurre en este caso: utilizar enteros de 64 bits en sistemas de 32 bits se puede lograr separando los enteros y representándolos, o de manera más sencilla, mediante implementaciones estándar ya existentes que lo hacen de manera más eficiente.

Sin embargo, es importante tener en cuenta que al hacer esto, las operaciones, (especialmente las divisiones y multiplicaciones), se vuelven considerablemente más lentas debido a la interpretación. Aun así, para  representar fechas, que es lo que nos interesa, la pérdida de rendimiento no es tan grande.

Sin embargo la solución de utilizar enteros de 64 bits no es perfecta y puede ocasionar problemas de incompatibilidad, por lo que los programas necesitan ser actualizados para ofrecer un mejor soporte. Por suerte, muchos compiladores facilitan este proceso. 

Aparte de esta solución,tal vez pensaste en usar un entero de 32 bits sin signo. Aunque pueda parecer una buena solución inicialmente, el límite seguiría estando relativamente cercano (en el año 2106). Además, muchos programas, especialmente aquellos que dependen de cálculos y manipulaciones de tiempo, requieren un entero con signo.

Por lo tanto, utilizando un entero de 64 bits con signo, el límite se extiende considerablemente y los programas que dependen de enteros con signo no se ven tan afectados.

Finalmente, existe una "solución" entre comillas, que consiste en ajustar el reloj para que el límite sea posterior. A efectos prácticos, esto podría funcionar, pero si tienes archivos o registros antiguos, podrías enfrentar problemas debido a que, según el reloj interno, se crearon en una fecha incompatible.

En este caso, lo más probable es que corrijan la fecha, lo que resultaría en una pérdida considerable de continuidad.

{{< youtube hBzkL2zfE6g >}}

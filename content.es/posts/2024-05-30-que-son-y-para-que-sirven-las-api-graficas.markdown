---
layout: post
title: "¿Que son y para que sirven las API Graficas? (Vulkan, OpenGL, DirectX, etc)"
date: 2024-05-30
categories: [Informativo, Programación]
image: /img/thumb/apigrafica.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. Si alguna vez han ejecutado un programa que utilice gráficos mínimamente complejos, como un videojuego, un simulador o un programa de modelado 3D, es muy probable que ese programa utilice alguna API gráfica como OpenGL, Vulkan, DirectX, etc.

Estas APIs ayudan a que el programa pueda comunicarse de manera sencilla con la GPU para mostrar gráficos. Pero esto ya se va para la explicación del video, así que sin más que decir, ¡empecemos!

## Historia

Primero, empecemos con cuál es el origen de la necesidad de usar una API gráfica para poder comunicarse con la GPU. En un principio, estas APIs, por evidentes razones, no existían, ya que eran eras muy arcaicas de la computación donde la mayoría de computadoras hogareñas ni siquiera tenían una placa dedicada explícitamente a los gráficos, y las consolas de videojuegos estaban prácticamente en pañales. 

La situación cambió más exactamente a finales de los 80's e inicios de los 90's, donde se empezaron a ver tarjetas gráficas hogareñas como las Voodoo de 3dfx. Aquí es donde surgió el problema inicial, ya que no había realmente un buen soporte por parte de los programas. Y si lo tenías, era porque querías jugar algún juego pesado que soportara esta gráfica, o usabas programas de modelado pesado. Por supuesto, para usar la gráfica, los programadores tenían que escribir código que ejecutara instrucciones en el GPU.

## Problema principal

En cualquier GPU, no necesariamente antigua, es realmente posible escribir instrucciones nativas, pero como ya se imaginarán, con la diversidad de GPUs no es realmente rentable hacer eso. Y menos ahora que tendrías que hacer el trabajo al menos 3 veces, por si quieres soportar Nvidia, AMD e Intel por igual, y peor si te quieres ir a plataformas ARM donde lo más popular es Mali y Adreno. Entonces, para solventar este problema lo más propio es cambiar el esquema de cómo funcionan los gráficos.

## Funcionamiento a nivel driver

Si pusieron atención a lo que expliqué anteriormente, entenderán que el programa se comunica directamente con la GPU, la cual, dependiendo de la implementación, la comunicación vía driver suele ser lo más común, pero sigue siendo cosas específicas de la gráfica. 

Entonces, evidentemente, si el programador necesita hacer código para varios, lo más común es que exista algo universal para que cada quien lo adapte a su manera. Aquí es donde entran las API gráficas. Solo como anotación, las tecnologías de aceleración por hardware funcionan de la misma manera.

## Una API es la solución

Entonces, con este nuevo esquema, tenemos que el programador, en vez de escribir código directo, ahora escribe un código universal. Por parte del fabricante o mantenedor del driver, él también debe escribir una implementación de ese estándar universal que funcione con la GPU deseada. Entonces, el programa le da el código escrito en la API al GPU, el cual ya provee una implementación de esa API, y el driver se encarga de interpretar las instrucciones. 

## Problema de usar una API Grafica

Aquí los únicos "problemas" serían:

1. Si los drivers no proveen una implementación, como es el caso de GPUs viejas que ya no son mantenidas y no tienen Vulkan, por ejemplo.

2. Si la API que se usó para escribir el programa no es posible de implementar en el sistema operativo. Esto pasa, por ejemplo, con DirectX, el cual solo está en Windows. O ya a nivel sistema operativo con MacOS, que desde hace años solo le dan soporte a su propia API llamada Metal.

En una vista general, esos serían los fundamentos para entender cómo se comunican las APIs gráficas con el GPU. Pero estos problemas, en especial el segundo, tienen una solución cuanto menos interesante. Así que para extender un poco el post, las voy a explicar.

### Solución al Problema 1

El primero no tiene mucha ciencia, pero seguro que muchos se han preguntado si no se puede hacer un driver alternativo para que estas GPUs puedan usar implementaciones de GPU más modernas. 

En principio, lo más probable es que no, porque al ser viejas también suelen ser poco potentes y no es rentable andar haciendo drivers. Además, a falta de instrucciones, también puede ser más complejo. Pero en muchos modelos, especialmente de integradas Intel, sucede que con el driver de Windows, el cual, de paso, es de código cerrado, la implementación máxima es OpenGL 1.5.

Pero con sistemas Linux, donde el driver es de código abierto, estas GPUs pueden ejecutar OpenGL 2.0, y más actualmente con la tecnología Gallium de Mesa que funcionan mucho más rápido.

### Solución al Problema 2

En el segundo problema, quedamos que como las implementaciones se hacían a nivel driver, si en un sistema operativo el driver era limitado, el programa no se podía utilizar. Pero, ¿qué acaso no se podrían hacer pasar las instrucciones de una API como instrucciones de otra?.

Bajo este concepto funcionan tecnologías como DXVK, que traslada instrucciones de DirectX a Vulkan, o WineD3D, que hace lo mismo con OpenGL. Estas instrucciones básicamente interceptan las llamadas, recibiendo y ejecutando un equivalente en otra API. En la teoría, esto debería ser más lento, pero en la práctica la pérdida no es mucha. En esta solución, lo más común es que se use una biblioteca de reemplazo, como pueden ser los dll de Windows.

Otra forma de lograr más o menos lo mismo es ejecutando la API gráfica encima de otra API gráfica. De esta manera funcionan cosas como Zink, el cual es un driver de Mesa que ejecuta OpenGL encima de Vulkan, o MoltenVK, que ejecuta Vulkan encima de Metal. Y aunque el proceso es muy similar a como pasa con la primera solución, en el primer caso las llamadas son interceptadas y nada corre encima de otra cosa, como pasa con la segunda solución. Pero en ambos, el resultado es que se pueden ejecutar programas que usan una API en sistemas donde esta API no es compatible.

## Conclusión

Bueno, gente, eso fue todo. Espero que este video les haya sido de ayuda para comprender cómo funcionan las API gráficas que utilizan la mayoría de juegos.

{{< youtube TyCwPkDwdkk >}}

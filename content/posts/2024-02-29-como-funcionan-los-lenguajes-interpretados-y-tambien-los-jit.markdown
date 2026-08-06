---
layout: post
title: "¿Cómo funcionan los lenguajes interpretados? (y también los JIT)"
date: 2024-02-29
categories: [Informativo, Programación]
image: /img/thumb/interpretes.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. Si queremos programar algo, independientemente de lo que sea, debe estar escrito en el lenguaje que entienda la máquina, como puede ser ensamblador. Para esto, lo más común y lo que suele hacerse es compilar el programa. Esto ya lo explique en una ocasión pasada, pero de una forma muy resumida es básicamente una traducción de código legible en C++ por ejemplo, a código maquina.

Hasta aquí todo bien, pero entonces, ¿cómo funcionan lenguajes como Python, Ruby o JavaScript? Estos rompen la regla, entre muchas comillas, y no hay necesidad de compilar un programa escrito en estos lenguajes.

En esta ocasión, veremos cómo funcionan estos lenguajes de una manera general y relativamente simplificada para que no nos perdamos a media explicación, solo como nota también voy a explicar a los lenguajes JIT, que si bien no son interpretes en regla, funcionan de una manera relativamente similar Así que sin más que decir, empecemos.

## Enfoque de un lenguaje interpretado

Al igual que cuando expliqué como funcionan los lenguajes compilados, aquí también haré un pequeño índice y después explicaré con mas detalle, pero primero hay que entender cual es el enfoque de un lenguaje interpretado:

En un lenguaje interpretado, el interprete analiza el codigo y a partir de ahi usa una equivalencia, al ser un binario propio el interprete no necesita compilación. Mientras que en JIT, o Just In Time, el código fuente se ejecuta directamente por algo similar a un interprete, que de forma general podríamos decir que traduce el código fuente y lo ejecuta línea por línea, en tiempo real, o sea que en el fondo si es compilado, pero esto se hace a tiempo real.

Como beneficio tenemos que no es necesario tener que compilar el programa totalmente, esto da mas portabilidad ya que el mismo código puede ejecutarse en diferentes plataformas sin necesidad de recompilar, pero como contra conlleva un rendimiento inferior en comparación con los lenguajes compilados, donde el código se optimiza antes de la ejecución, con esto en mente creo que ya puedo empezar con el índice:

## Componentes clave

1. Análisis léxico, sintáctico y semántico

2. Generación de código intermedio abstracto

3. Ejecución paso a paso


### 1. Análisis léxico, sintáctico y semántico

Antes de siquiera empezar a ejecutar el código, el interprete debe tener una comprensión clara del código, para esto, están estos analisis.

Primero, el analizador léxico divide el código en "tokens" ( los cuales son palabras clave como identificadores, operadores, literales, etc.) Dependiendo de cómo esté montado el interprete, puede variar, pero en general se basan en cosas comunes del lenguaje de programación, además, el análisis léxico se encarga de descartar cosas que no son relevantes para la ejecución, como los espacios, tabulaciones, saltos de linea, comentarios, etc, aunque en lenguajes basados en ideación (como Python) obviamente no se ignoran.

Después, el análisis sintáctico verifica la estructura gramatical del código y construye un árbol de sintaxis abstracta ( o AST) el cual es una representación jerárquica del código fuente. El AST captura la estructura y la relación entre las diferentes partes del programa, Cada nodo en el AST representa un elemento
gramatical, como una expresión, una declaración o una instrucción. Las conexiones entre los nodos reflejan la relación entre estos elementos en el código fuente. 

Finalmente, el análisis semántico verifica la coherencia y el significado del código fuente. A diferencia del análisis léxico y sintáctico, que se centran en la estructura y la gramática del código, el análisis semántico se preocupa por las reglas y significados específicos del lenguaje de programación.

En este ultimo análisis se realizan cosas
como:

- **Verificación de Declaración de Variables**: para evitar errores relacionados con variablesno definidas o mal escritas.

- **Comprobación de Tipos de Datos**: para establecer una coherencia en las operaciones y no intentar sumar un carácter con un numero por ejemplo.

- **Manejo de Alcance (Scope)**: El cual determina dónde una variable es válida y dónde no lo es, asegurándose de que no haya conflictos en la utilización de nombres de variables en diferentes partes del programa.

- **Verificación de Parámetros de Funciones**: Donde el interprete verifica que la cantidad y tipos de los argumentos proporcionados coincidan con la definición de la función

y finalmente el chequeo de reglas semánticas específicas del lenguaje. 

### 2. Generación de código intermedio abstracto

Antes de que el intérprete comience a ejecutar directamente el código fuente, realiza la generación de un código intermedio abstracto. Este es una representación simplificada del código fuente original y sirve como un paso intermedio entre el análisis del código y la ejecución real, y aunque a primeras parezca que es un paso innecesario que entorpece la ejecución, es todo lo contrario y ayuda a optimizar bastante los tiempos de ejecución.

En algunos casos, el código intermedio abstracto también sirve como un punto donde se pueden realizar optimizaciones antes de la ejecución real. Aunque no llega al nivel de optimización que se lograría en un lenguaje compilado, se pueden aplicar algunas mejoras en la eficiencia del código antes de su ejecución.

### 3. Ejecución del código

Esta es la fase en la que el interprete comienza a llevar a cabo las instrucciones del código fuente, ya sea linea por linea, o en bloques pequeños similares a los tokens, creo que lo mas adecuado es explicar su procedimiento por fases:

Primero, esta la interpretación del código, que dependiendo de la implementación del interprete, puede hacer linea por linea, o por bloques similares a los tokens usados en el análisis sintáctico.

Durante esa lectura de código, en caso de JIT se compila en tiempo real las instrucciones para ser ejecutadas directamente en ensamblador, mientras que los interpretes tradicionales en vez de esto ejecutan equivalencias, el interprete, al ser un binario en si mismo, es capaz de representar instrucciones a sumanera sin necesidad de traducir, este método podríamos decir que es parecida a la emulación, aunque no funcionan de manera exactamente similar.

El interprete continua la ejecución hasta que se encuentra con el fin del programa, amenos de que haya una excepción donde no pueda continuar, en este caso se llama al manejo de errores, y si este no puede resolver la excepción, se termina, fuera de eso, también  termina si hay una salida explicita, aquí el interprete se encarga de limpiar todos los datos para que no se queden embarrados en la memoria, y evidentemente lanza una señal de terminación al sistema.

### Conclusión

Bueno gente eso fue todo, es un poco complicado explicar un interprete de forma simplificada, pero espero que con esto tengan una idea mas clara de como funcionan los interpretes de código.

{{< youtube b3Jeyt1JtW8 >}}

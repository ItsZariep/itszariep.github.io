---
layout: post
title: "¿Cómo funcionan los compiladores por dentro?"
date: 2024-01-11
categories: Informativo Programación
image: /assets/img/thumb/compiladores.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. En esta ocasión, vamos a ver cómo funciona un compilador de software. Para aquellos que no lo sepan, de manera muy resumida (ya que lo explicaré con más detalle después), un compilador es similar a un traductor. Convierte instrucciones en lenguaje "humano" a instrucciones que pueda leer una computadora. A continuación veremos qué son, cómo funcionan y cómo están hechos los compiladores de software. Así que, sin más que decir, ¡empecemos!

## ¿Qué es un compilador?

Como ya mencioné al principio, un compilador es un programa informático cuya función principal es traducir código fuente escrito en un lenguaje de programación legible para los humanos a un código ejecutable que puede ser leído por la computadora, como lo que podría ser un programa o una biblioteca.

Es bastante útil porque, de lo contrario, tendríamos que andar con una tabla de instrucciones poniendo bits uno a uno, lo cual es una tortura. Entonces, viéndolo en una situación más "normal", es como si quisiéramos darle instrucciones a alguien, pero esa persona habla otro idioma. Si usamos un traductor que nos traduzca las instrucciones que queremos dar, nos será más fácil y no tendríamos que andar media hora con un diccionario.

## ¿Cómo funciona un compilador?

Ahora, ¿cómo funciona un compilador?

Un compilador debe pasar por varias etapas, (las cuales yo dividiré en 7), para poder traducir código, primero haré un indice y luego las explicare con mas detalle, estas serían:

1. Análisis léxico (Scanner)

2. Análisis sintáctico (Parser)

3. Análisis semántico

4. Generación de código intermedio

5. Optimización de código intermedio

6. Generación de código objetivo

7. Enlace (Linker)

### 1. Análisis Lexico

Esta es la primera fase del proceso de compilación, donde se escanea el código fuente para convertirlo
en unidades más pequeñas llamadas "tokens". Estos tokens representan las partes más básicas y significativas del código.

Entonces, empecemos con que primero el compilador inicia escaneando el código fuente, carácter por carácter de manera secuencial. Durante el escaneo, se identifican y extraen los "tokens" que mencioné anteriormente.

Estos tokens pueden ser palabras clave (como if, else, while), identificadores (como nombres de variables), operadores (+, -, *, /), literales (números, cadenas), etc. Dependiendo de cómo esté montado el compilador,
puede variar, pero en general se basan en cosas comunes del lenguaje de programación.

Después, se eliminan los espacios en blanco y caracteres de formato (como saltos de línea y tabulaciones). Estos elementos normalmente solo son simbólicos visuales pero no afectan la estructura lógica del programa, de manera similar se tratan los comentarios; los cuales muy probablemente serán detectados gracias a los tokens.

Durante todo este análisis se va construyendo una tabla de símbolos que almacena información sobre cada identificador encontrado. Esto puede incluir el tipo de dato, la posición en memoria, etc.

Finalmente, al finalizar la fase de análisis léxico, se obtiene una secuencia de tokens que representa la esencia del código fuente sin detalles de formato o comentarios. Estos tokens se utilizan como entrada para la siguiente fase del compilador, el cual es…

### 2. Análisis Sintáctico (Parser)

Este análisis tiene como función principal es analizar la estructura gramatical del código fuente (el cual ya fué procesado por el análisis Léxico) y construir un árbol de sintaxis abstracta (AST), pero antes de iniciar el análisis sintáctico, el compilador debe tener una comprensión clara de la gramática del lenguaje de programación en el que está escrito el código fuente.

La gramática define las reglas y la estructura permitida en el código, especificando cómo se deben combinar los elementos del lenguaje para formar programas válidos, después de esto, de forma similar al análisis interior, se crean tokens, esto funciona prácticamente igual que como lo expliqué anteriormente.

Durante este proceso, se construye el árbol de sintaxis abstracta (AST), que es una representación jerárquica del código fuente. El AST captura la estructura y la relación entre las diferentes partes del programa, Cada nodo en el AST representa un elemento gramatical, como una expresión, una declaración o una instrucción. Las conexiones entre los nodos reflejan la relación entre estos elementos en el código fuente.

En algunos casos, la gramática del lenguaje puede permitir construcciones ambiguas. El parser debe resolver estas ambigüedades para garantizar una interpretación única del código. Esto se logra mediante reglas de precedencia y asociatividad que definen cómo deben resolverse las ambigüedades en la estructura del código.

En caso de que el parser encuentre errores durante el proceso, generalmente manda un mensaje en la salida del compilador, y si no encuentra errores, sigue al siguiente paso.

### 3. Análisis Semántico

El objetivo del Análisis semántico es verificar la coherencia y el significado del código fuente. A diferencia del análisis léxico y sintáctico, que se centran en la estructura y la gramática del código, el análisis semántico se preocupa por las reglas y significados específicos del lenguaje de programación.

En esta etapa se realizan cosas como:

Verificación de Declaración de Variables para evitar errores relacionados con variables no definidas o mal escritas.

Comprobación de Tipos de Datos para establecer una coherencia en las operaciones y no intentar sumar un carácter con un numero por ejemplo.

Manejo de Alcance (Scope), el cual determina dónde una variable es válida y dónde no lo es, asegurándose de que no haya conflictos en la utilización de nombres de variables en diferentes partes del programa.

Verificación de Parámetros de Funciones, donde el compilador verifica que la cantidad y tipos de los argumentos proporcionados coincidan con la definición de la función.

y finalmente el chequeo de reglas semánticas específicas del lenguaje.

Como extra, opcionalmente el compilador puede realizar optimizaciones basadas en el análisis semántico. Por ejemplo, para identificar oportunidades de mejorar la eficiencia del código, eliminar código redundante o realizar transformaciones que no afecten la lógica del programa pero mejoren su rendimiento.

### 4. Generación de código intermedio

Después de los análisis iniciales, el compilador tiene una comprensión profunda de la estructura y el significado del código fuente. Entonces, con el AST y la información semántica, el compilador procede a generar el código intermedio.

Este una representación del programa en un nivel de abstracción que está entre el código fuente y el código de máquina específico de la arquitectura. este código intermedio es una forma de código que es independiente de la plataforma, lo que significa que no está ligado directamente a una arquitectura de hardware en particular y es mas similar a un pseudo código, hacer esto tiene un par de ventajas como pueden ser portabilidad y  optimización, lo que nos lleva al siguiente paso.

### 5. Optimización del código intermedio

El objetivo de la optimización de código intermedio es mejorar la eficiencia del programa final sin cambiar su lógica. Por ende, se busca generar un ejecutable más rápido, que requiera menos recursos de ya sea de procesamiento o memoria.

Para conseguir esto se hacen varias técnicas como la reorganización de instrucciones o eliminación de código muerto, puede haber otras técnicas pero de forma general estas son mas importantes, después de esto ya pasa al siguiente paso, el cual es…

### 6. Generación de código objetivo

En este proceso el compilador procede a generar código específico para la arquitectura de la máquina de destino, como pueden ser ARM, x86_64, RISCV, etc. Sin embargo, el código objetivo aunque ya es es un código de bajo nivel, aún no es ejecutable, pero está más cerca del lenguaje máquina que el código intermedio.

Este código es específico para la arquitectura de la máquina en la que se ejecutará el programa compilado. Durante esta etapa, el compilador realiza ajustes y optimizaciones específicas para la arquitectura de la máquina de destino.

Esto implica considerar las instrucciones y características particulares del conjunto de instrucciones de la CPU para la que se está compilando, aunque de forma general, por compatibilidad solo se toman en cuenta
las mas esenciales y comunes para software con fines distribuibles.

Entonces, El compilador mapea las construcciones de alto nivel del código intermedio a instrucciones específicas de la arquitectura del hardware. (Como paréntesis, para los que no sepan, mapear proceso de hacer coincidir campos de datos de una fuente con campos de datos de otra fuente) entonces, cada instrucción en el código objetivo se corresponde con una operación específica que la CPU puede ejecutar.

### 7. Enlace (o Linker)

El enlace, también conocido como linker, tiene como objetivo combinar múltiples archivos fuente para formar un programa ejecutable, aunque no es estrictamente necesario, es bastante común que incluyas librerías o otros archivos de código ya sea para tener un orden o no tener que reescribir todo stdio.h, que como sabrán, corto no es.

Entonces, el linker crea tablas de símbolos que contienen información sobre todas las funciones y variables utilizadas en el programa. Estas tablas son fundamentales para la resolución de referencias cruzadas y garantizan la coherencia entre las distintas partes del código, entonces, como dije anteriormente, incorpora las librerías y otros archivos de código necesarios.

Después de resolver todas las referencias cruzadas y vincular las bibliotecas externas, el linker genera el programa ejecutable final. Este archivo ejecutable contiene el código máquina necesario para que finalmente, la computadora ejecute el programa. 

## Conclusión

Bueno gente, eso fue todo, lo he intentado resumir y masticar bastante pero espero que con esta explicación puedan entender o al menos darse a una idea de como funciona un compilador.

En conclusión y resumen, un compilador primero hace diversos análisis para obtener un código mas puro y formal, después genera un pseudocodigo intermedio y lo optimiza, después en base a eso genera el código objetivo, repite ese proceso para todas las librerías y archivos incluidos, y finalmente lo enlaza todo para conseguir un ejecutable.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/Y1KYcXkCiWg?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>